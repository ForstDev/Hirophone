import "server-only";
import { getAllProducts } from "./catalog";
import { readEvents, readOverrides } from "./store";
import type { StoredEvent } from "./types";

export type Ranked = { key: string; label: string; count: number; extra?: string };

export type Stats = {
  range: { days: number; from: string; to: string };
  totals: {
    searches: number;
    views: number;
    cartAdds: number;
    cartUnits: number;
    quotes: number;
    quotedUnits: number;
  };
  rates: {
    viewToCart: number;
    cartToQuote: number;
    zeroResultShare: number;
  };
  topSearches: Ranked[];
  zeroSearches: Ranked[];
  topViewed: Ranked[];
  topCarted: Ranked[];
  topBrands: Ranked[];
  topFilters: Ranked[];
  daily: { day: string; searches: number; views: number; cartAdds: number }[];
  health: {
    products: number;
    withPhoto: number;
    withoutPhoto: number;
    edited: number;
    brands: number;
  };
};

function rank(map: Map<string, { count: number; label: string; extra?: string }>, limit: number): Ranked[] {
  return [...map.entries()]
    .map(([key, v]) => ({ key, label: v.label, count: v.count, extra: v.extra }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
    .slice(0, limit);
}

function bump(
  map: Map<string, { count: number; label: string; extra?: string }>,
  key: string,
  label: string,
  by = 1,
  extra?: string,
) {
  const cur = map.get(key);
  if (cur) {
    cur.count += by;
    if (extra) cur.extra = extra;
  } else {
    map.set(key, { count: by, label, extra });
  }
}

/**
 * Convierte el log crudo de eventos en las cifras que muestra el panel. Todo
 * se calcula al leer, así que no hay un agregado que mantener sincronizado y
 * vaciar el log resetea todos los números a la vez.
 */
export async function getStats(days = 30): Promise<Stats> {
  const products = await getAllProducts();
  const overrides = await readOverrides();
  const all = await readEvents();

  const since = Date.now() - days * 24 * 60 * 60 * 1000;
  const events = all.filter((e) => new Date(e.at).getTime() >= since);

  const totals = {
    searches: 0,
    views: 0,
    cartAdds: 0,
    cartUnits: 0,
    quotes: 0,
    quotedUnits: 0,
  };

  const searches = new Map<string, { count: number; label: string; extra?: string }>();
  const zero = new Map<string, { count: number; label: string; extra?: string }>();
  const viewed = new Map<string, { count: number; label: string; extra?: string }>();
  const carted = new Map<string, { count: number; label: string; extra?: string }>();
  const brands = new Map<string, { count: number; label: string; extra?: string }>();
  const filters = new Map<string, { count: number; label: string; extra?: string }>();
  const byDay = new Map<string, { searches: number; views: number; cartAdds: number }>();

  const day = (e: StoredEvent) => e.at.slice(0, 10);
  const touchDay = (e: StoredEvent) => {
    const k = day(e);
    if (!byDay.has(k)) byDay.set(k, { searches: 0, views: 0, cartAdds: 0 });
    return byDay.get(k)!;
  };

  for (const e of events) {
    const bucket = touchDay(e);

    if (e.type === "search") {
      totals.searches++;
      bucket.searches++;
      const key = e.term.toLowerCase();
      bump(searches, key, e.term, 1, e.results + " resultados");
      if (e.results === 0) bump(zero, key, e.term);
    } else if (e.type === "view") {
      totals.views++;
      bucket.views++;
      bump(viewed, e.slug, e.sku, 1, e.name);
      bump(brands, e.brand, e.brand);
    } else if (e.type === "cart_add") {
      totals.cartAdds++;
      totals.cartUnits += e.qty;
      bucket.cartAdds++;
      bump(carted, e.slug, e.sku, e.qty, e.name);
    } else if (e.type === "quote") {
      totals.quotes++;
      totals.quotedUnits += e.units;
    } else if (e.type === "filter") {
      const label = e.facet === "brand" ? "Marca" : "Gama";
      bump(filters, e.facet + ":" + e.value, e.value, 1, label);
    }
  }

  const daily: Stats["daily"] = [];
  for (let i = Math.min(days, 30) - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    daily.push({ day: d, ...(byDay.get(d) ?? { searches: 0, views: 0, cartAdds: 0 }) });
  }

  const zeroTotal = [...zero.values()].reduce((n, v) => n + v.count, 0);
  const withPhoto = products.filter((p) => p.image).length;

  return {
    range: {
      days,
      from: new Date(since).toISOString().slice(0, 10),
      to: new Date().toISOString().slice(0, 10),
    },
    totals,
    rates: {
      viewToCart: totals.views ? totals.cartAdds / totals.views : 0,
      cartToQuote: totals.cartAdds ? totals.quotes / totals.cartAdds : 0,
      zeroResultShare: totals.searches ? zeroTotal / totals.searches : 0,
    },
    topSearches: rank(searches, 12),
    zeroSearches: rank(zero, 8),
    topViewed: rank(viewed, 10),
    topCarted: rank(carted, 10),
    topBrands: rank(brands, 8),
    topFilters: rank(filters, 10),
    daily,
    health: {
      products: products.length,
      withPhoto,
      withoutPhoto: products.length - withPhoto,
      edited: Object.keys(overrides).length,
      brands: new Set(products.map((p) => p.brand)).size,
    },
  };
}

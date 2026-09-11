import Link from "next/link";
import { BRANDS, GAMAS, brandCounts, gamaCounts } from "@/lib/catalog";
import { toggleParam, isActive } from "@/lib/url";
import type { CatalogFilters } from "@/lib/catalog";

export function FilterRail({
  params,
}: {
  params: Record<string, string | undefined>;
}) {
  const filters: CatalogFilters = { brand: params.brand, gama: params.gama, q: params.q };
  const bCounts = brandCounts(filters);
  const gCounts = gamaCounts(filters);
  const hasFilters = Boolean(params.brand || params.gama || params.q);

  return (
    <aside className="thin-scroll flex flex-col gap-8 lg:sticky lg:top-[132px] lg:max-h-[calc(100vh-160px)] lg:overflow-y-auto lg:pr-2">
      <div className="flex items-center justify-between">
        <p className="label text-ink">Filtros</p>
        {hasFilters && (
          <Link href="/catalogo" className="text-xs font-bold text-orange-600 hover:underline">
            Limpiar todo
          </Link>
        )}
      </div>

      <FilterGroup title="Marca">
        {BRANDS.map((brand) => (
          <FilterCheck
            key={brand}
            href={toggleParam(params, "brand", brand)}
            active={isActive(params, "brand", brand)}
            label={brand}
            count={bCounts[brand]}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Gama">
        {GAMAS.map((gama) => (
          <FilterCheck
            key={gama}
            href={toggleParam(params, "gama", gama)}
            active={isActive(params, "gama", gama)}
            label={gama}
            count={gCounts[gama]}
          />
        ))}
      </FilterGroup>
    </aside>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-bold uppercase tracking-wide text-ink-mute">{title}</p>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

function FilterCheck({
  href,
  active,
  label,
  count,
}: {
  href: string;
  active: boolean;
  label: string;
  count: number;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between rounded-md px-2.5 py-2 text-sm transition-colors ${
        active ? "bg-orange-50 font-bold text-orange-700" : "text-ink-soft hover:bg-surface"
      }`}
    >
      <span className="flex items-center gap-2">
        <span
          className={`flex size-4 shrink-0 items-center justify-center rounded border ${
            active ? "border-orange-500 bg-orange-500" : "border-line-strong"
          }`}
        >
          {active && <span className="size-1.5 rounded-sm bg-white" />}
        </span>
        {label}
      </span>
      <span className="text-xs text-ink-mute">{count}</span>
    </Link>
  );
}

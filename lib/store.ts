import "server-only";
import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { put, get as getBlob } from "@vercel/blob";
import type { ProductOverride, Settings, StoredEvent, TrackEvent } from "./types";
import { WHATSAPP_NUMBER } from "./constants";

/**
 * Almacén de archivos JSON. Local (data/runtime/) cuando no hay un Blob
 * conectado — así `npm run dev` funciona sin configurar nada — y Vercel Blob
 * cuando sí lo hay (`BLOB_READ_WRITE_TOKEN` presente), porque en Vercel el
 * filesystem de las funciones no es persistente entre requests. El resto del
 * código llama siempre a las mismas funciones; no le importa cuál de las dos
 * rutas se usó. Cambiar esto por Postgres más adelante es tocar estas seis
 * funciones y nada más.
 */

const USE_BLOB = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

const RUNTIME = path.join(process.cwd(), "data", "runtime");
const MAX_EVENTS = 8000;

export const DEFAULT_SETTINGS: Settings = {
  whatsapp: WHATSAPP_NUMBER,
  whatsappLabel: "Ventas Hirophone",
  quoteIntro: "Hola Hirophone, quiero cotizar estos equipos en cuotas:",
  contactEmail: "contacto@hirophone.pe",
};

function ensureDir() {
  if (!fs.existsSync(RUNTIME)) fs.mkdirSync(RUNTIME, { recursive: true });
}

async function readJson<T>(name: string, fallback: T): Promise<T> {
  if (USE_BLOB) {
    try {
      const result = await getBlob(`data/${name}`, { access: "private" });
      if (!result || result.statusCode !== 200) return fallback;
      const text = await new Response(result.stream).text();
      return text.trim() ? (JSON.parse(text) as T) : fallback;
    } catch {
      // Todavía no existe ese blob (primer uso) o el store no responde.
      return fallback;
    }
  }

  const file = path.join(RUNTIME, name);
  try {
    if (!fs.existsSync(file)) return fallback;
    const raw = fs.readFileSync(file, "utf8").trim();
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

async function writeJson(name: string, data: unknown): Promise<void> {
  if (USE_BLOB) {
    await put(`data/${name}`, JSON.stringify(data, null, 1), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return;
  }

  ensureDir();
  const file = path.join(RUNTIME, name);
  const tmp = file + "." + process.pid + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(data, null, 1), "utf8");
  fs.renameSync(tmp, file);
}

// --- overrides de producto --------------------------------------------------
// `cache()` deduplica llamadas repetidas dentro de un mismo render/request
// (por ejemplo, brandCounts/gamaCounts piden overrides varias veces): con
// Blob eso evitaría pedidos de red de más; localmente no cambia nada.

export const readOverrides = cache(async (): Promise<Record<string, ProductOverride>> => {
  return readJson<Record<string, ProductOverride>>("overrides.json", {});
});

export async function saveOverride(slug: string, patch: Partial<ProductOverride>) {
  const all = await readOverrides();
  const next: ProductOverride = {
    ...all[slug],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  for (const k of ["price", "compareAtPrice", "initialFrom", "installmentsMax", "badge", "description", "image"] as const) {
    if (next[k] === undefined || next[k] === null) delete next[k];
  }
  all[slug] = next;
  await writeJson("overrides.json", all);
  return next;
}

export async function clearOverride(slug: string) {
  const all = await readOverrides();
  delete all[slug];
  await writeJson("overrides.json", all);
}

// --- ajustes ------------------------------------------------------------

export const readSettings = cache(async (): Promise<Settings> => {
  return { ...DEFAULT_SETTINGS, ...(await readJson<Partial<Settings>>("settings.json", {})) };
});

export async function saveSettings(patch: Partial<Settings>): Promise<Settings> {
  const next = { ...(await readSettings()), ...patch };
  await writeJson("settings.json", next);
  return next;
}

// --- analítica ------------------------------------------------------------

export const readEvents = cache(async (): Promise<StoredEvent[]> => {
  return readJson<StoredEvent[]>("events.json", []);
});

export async function appendEvent(event: TrackEvent) {
  const all = await readEvents();
  all.push({ ...event, at: new Date().toISOString() });
  await writeJson("events.json", all.slice(-MAX_EVENTS));
}

export async function clearEvents() {
  await writeJson("events.json", []);
}

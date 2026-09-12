import type { TrackEvent } from "./types";

/**
 * Analítica sin bloquear la UI: si el endpoint falla, el cliente nunca se
 * entera. `keepalive` deja que el último evento sobreviva a una navegación.
 */
export function track(event: TrackEvent) {
  if (typeof window === "undefined") return;
  try {
    void fetch("/api/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(event),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* la analítica nunca debe romper la página */
  }
}

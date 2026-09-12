import { NextResponse } from "next/server";
import { appendEvent } from "@/lib/store";
import type { TrackEvent } from "@/lib/types";

export const dynamic = "force-dynamic";

const KINDS = new Set(["search", "view", "cart_add", "quote", "filter"]);

/**
 * Recibe la actividad que alimenta el panel: qué se busca, qué se abre, qué
 * se agrega a una cotización y qué se filtra. No se guarda nada
 * identificatorio: ni cookie, ni IP, ni id de sesión.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TrackEvent;

    if (!body || typeof body !== "object" || !KINDS.has(body.type)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    if (body.type === "search") {
      const term = String(body.term ?? "").trim().slice(0, 80);
      if (!term) return NextResponse.json({ ok: true });
      await appendEvent({ type: "search", term, results: Number(body.results) || 0 });
    } else {
      await appendEvent(body);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

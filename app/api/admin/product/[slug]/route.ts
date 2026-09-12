import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/lib/auth";
import { clearOverride, saveOverride } from "@/lib/store";
import { getAllSlugs } from "@/lib/catalog";

export const dynamic = "force-dynamic";

function num(v: unknown): number | undefined {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

function text(v: unknown, max: number): string | undefined {
  if (typeof v !== "string") return undefined;
  const s = v.trim().slice(0, max);
  return s.length ? s : undefined;
}

const BADGES = new Set(["Oferta", "Nuevo", "Más vendido"]);

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!(await getSessionUser())) {
    return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  const { slug } = await params;
  if (!getAllSlugs().includes(slug)) {
    return NextResponse.json({ ok: false, error: "Producto inexistente" }, { status: 404 });
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

  const image =
    typeof body.image === "string" &&
    (body.image.startsWith("http") || body.image.startsWith("/"))
      ? body.image
      : undefined;

  const saved = await saveOverride(slug, {
    price: num(body.price),
    compareAtPrice: body.compareAtPrice == null ? undefined : num(body.compareAtPrice),
    initialFrom: num(body.initialFrom),
    installmentsMax: num(body.installmentsMax),
    badge: typeof body.badge === "string" && BADGES.has(body.badge) ? (body.badge as never) : undefined,
    description: text(body.description, 280),
    image,
  });

  // El catálogo, la ficha y el home leen este registro.
  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true, override: saved });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!(await getSessionUser())) {
    return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  const { slug } = await params;
  await clearOverride(slug);
  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true });
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { filterProducts, getProductBySlug } from "@/lib/catalog";
import { readOverrides } from "@/lib/store";
import { AdminSearch } from "@/components/admin/AdminSearch";
import { ProductEditor } from "@/components/admin/ProductEditor";
import { PencilSimple } from "@phosphor-icons/react/dist/ssr";
import { formatPEN } from "@/lib/format";

export const metadata: Metadata = { title: "Productos" };
export const dynamic = "force-dynamic";

const PER_PAGE = 20;

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const q = sp.q?.trim() ?? "";
  const estado = sp.estado ?? "todos";
  const page = Number(sp.pagina ?? 1) || 1;
  const editing = sp.editar ? await getProductBySlug(sp.editar) : undefined;
  const overrides = await readOverrides();

  const base = await filterProducts({ q: q || undefined });

  const filtered = base.filter((p) => {
    if (estado === "sin-foto") return !p.image;
    if (estado === "editados") return Boolean(overrides[p.slug]);
    return true;
  });

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, pages);
  const items = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const href = (patch: Record<string, string | undefined>) => {
    const next = new URLSearchParams();
    const merged = { q, estado, pagina: String(safePage), ...patch };
    for (const [k, v] of Object.entries(merged)) {
      if (!v || v === "todos" || (k === "pagina" && v === "1")) continue;
      next.set(k, v);
    }
    const qs = next.toString();
    return qs ? "/admin/productos?" + qs : "/admin/productos";
  };

  const TABS = [
    { key: "todos", label: "Todos" },
    { key: "sin-foto", label: "Sin foto" },
    { key: "editados", label: "Editados" },
  ];

  return (
    <div className="px-5 py-8 md:px-10 md:py-12">
      <header className="border-b border-line pb-6">
        <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">Productos</h1>
        <p className="mt-2 max-w-[70ch] text-[13px] leading-relaxed text-ink-mute">
          Busca un equipo por SKU o nombre y edita su precio, cuotas, badge, descripción y
          foto. Los cambios se ven en la tienda al instante.
        </p>
      </header>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <AdminSearch initialValue={q} estado={estado} />

        <div className="flex gap-px overflow-hidden rounded-full bg-line">
          {TABS.map((t) => (
            <Link
              key={t.key}
              href={href({ estado: t.key, pagina: "1", editar: undefined })}
              className={
                "px-4 py-2.5 text-[12px] font-bold transition-colors " +
                (estado === t.key ? "bg-ink text-white" : "bg-paper text-ink-mute hover:text-ink")
              }
            >
              {t.label}
            </Link>
          ))}
        </div>
      </div>

      <p className="mt-4 code-type text-xs text-ink-mute">
        {filtered.length.toLocaleString("es")} {filtered.length === 1 ? "equipo" : "equipos"}
        {q ? ' para "' + q + '"' : ""}
      </p>

      <div className="mt-4 overflow-hidden rounded-lg border border-line bg-paper">
        {items.length === 0 ? (
          <p className="px-5 py-12 text-center text-[13px] text-ink-mute">
            No hay equipos para esa combinación.
          </p>
        ) : (
          <ul className="divide-y divide-line">
            {items.map((p) => (
              <li key={p.slug} className="flex items-center gap-4 px-4 py-3">
                <span className="photo-plate h-14 w-14 shrink-0 rounded-md border border-line">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt=""
                      width={56}
                      height={56}
                      className="h-full w-full object-contain p-1"
                      unoptimized={p.image.startsWith("/uploads/") || p.image.startsWith("http")}
                    />
                  ) : (
                    <span className="code-type text-[9px] text-ink-mute">S/F</span>
                  )}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="code-type text-[12.5px] font-bold text-orange-600">
                      {p.sku}
                    </span>
                    {overrides[p.slug] && (
                      <span className="rounded-full bg-ink px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.06em] text-white">
                        Editado
                      </span>
                    )}
                    {!p.image && (
                      <span className="rounded-full border border-orange-500 px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.06em] text-orange-600">
                        Sin foto
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-[13px] font-medium text-ink">{p.name}</p>
                  <p className="mt-0.5 truncate text-[11.5px] text-ink-mute">
                    {p.brand} / {p.gama} · {formatPEN(p.price)}
                  </p>
                </div>

                <Link
                  href={href({ editar: p.slug })}
                  scroll={false}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-line-strong px-3 py-2 text-[11.5px] font-bold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  <PencilSimple size={13} weight="bold" />
                  Editar
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {pages > 1 && (
        <nav aria-label="Paginación" className="mt-6 flex items-center justify-center gap-2">
          <Link
            href={href({ pagina: String(Math.max(1, safePage - 1)), editar: undefined })}
            className={
              "rounded-md border border-line px-4 py-2 text-xs font-semibold " +
              (safePage === 1 ? "pointer-events-none text-line-strong" : "hover:border-ink")
            }
          >
            Anterior
          </Link>
          <span className="code-type px-2 text-xs text-ink-mute">
            {safePage} de {pages}
          </span>
          <Link
            href={href({ pagina: String(Math.min(pages, safePage + 1)), editar: undefined })}
            className={
              "rounded-md border border-line px-4 py-2 text-xs font-semibold " +
              (safePage === pages ? "pointer-events-none text-line-strong" : "hover:border-ink")
            }
          >
            Siguiente
          </Link>
        </nav>
      )}

      {editing && (
        <ProductEditor
          key={editing.slug}
          product={editing}
          isOverridden={Boolean(overrides[editing.slug])}
          closeHref={href({ editar: undefined })}
        />
      )}
    </div>
  );
}

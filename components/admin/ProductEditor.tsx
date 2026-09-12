"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  X,
  Trash,
  UploadSimple,
  CheckCircle,
  WarningCircle,
  ArrowCounterClockwise,
} from "@phosphor-icons/react";
import { expo } from "@/lib/motion";
import { formatPEN } from "@/lib/format";
import type { Product } from "@/lib/types";

type Status = { kind: "ok" | "error"; message: string } | null;

const BADGES = ["Ninguno", "Oferta", "Nuevo", "Más vendido"] as const;

/**
 * Edita lo que un encargado de tienda toca día a día: precio, inicial,
 * cuotas, la etiqueta del badge, la descripción y la foto. Todo lo demás
 * (specs técnicas, colores) sigue viniendo del catálogo base — eso se edita
 * regenerando data/products.json, no desde acá.
 */
export function ProductEditor({
  product,
  isOverridden,
  closeHref,
}: {
  product: Product;
  isOverridden: boolean;
  closeHref: string;
}) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [price, setPrice] = useState(String(product.price));
  const [compareAtPrice, setCompareAtPrice] = useState(
    product.compareAtPrice ? String(product.compareAtPrice) : "",
  );
  const [initialFrom, setInitialFrom] = useState(String(product.initialFrom));
  const [installmentsMax, setInstallmentsMax] = useState(String(product.installmentsMax));
  const [badge, setBadge] = useState<string>(product.badge ?? "Ninguno");
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState<string | undefined>(product.image);
  const [newUrl, setNewUrl] = useState("");
  const [status, setStatus] = useState<Status>(null);
  const [busy, setBusy] = useState(false);

  const close = () => router.push(closeHref, { scroll: false });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeHref]);

  const save = async () => {
    setBusy(true);
    setStatus(null);

    const res = await fetch("/api/admin/product/" + product.slug, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        price: Number(price),
        compareAtPrice: compareAtPrice ? Number(compareAtPrice) : null,
        initialFrom: Number(initialFrom),
        installmentsMax: Number(installmentsMax),
        badge: badge === "Ninguno" ? null : badge,
        description,
        image: image ?? null,
      }),
    }).catch(() => null);

    const data = await res?.json().catch(() => null);

    if (!res?.ok) {
      setStatus({ kind: "error", message: data?.error ?? "No se pudo guardar" });
      setBusy(false);
      return;
    }

    setStatus({ kind: "ok", message: "Cambios guardados y publicados" });
    setBusy(false);
    router.refresh();
  };

  const restore = async () => {
    setBusy(true);
    await fetch("/api/admin/product/" + product.slug, { method: "DELETE" });
    setBusy(false);
    setStatus({ kind: "ok", message: "Se restauraron los valores originales" });
    router.refresh();
  };

  const upload = async (file: File) => {
    setBusy(true);
    setStatus(null);

    const body = new FormData();
    body.append("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body }).catch(() => null);
    const data = await res?.json().catch(() => null);

    if (!res?.ok || !data?.url) {
      setStatus({ kind: "error", message: data?.error ?? "No se pudo subir la imagen" });
      setBusy(false);
      return;
    }

    setImage(data.url as string);
    setStatus({ kind: "ok", message: "Imagen subida. Guarda para publicarla." });
    setBusy(false);
  };

  const addUrl = () => {
    const url = newUrl.trim();
    if (!url) return;
    if (!url.startsWith("http") && !url.startsWith("/")) {
      setStatus({ kind: "error", message: "La URL tiene que empezar con http o con /" });
      return;
    }
    setImage(url);
    setNewUrl("");
    setStatus(null);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="scrim"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={close}
        className="fixed inset-0 z-[var(--z-modal)] bg-ink/50 backdrop-blur-[2px]"
      />

      <motion.aside
        key="sheet"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={expo(0.45)}
        role="dialog"
        aria-label={"Editar " + product.name}
        className="thin-scroll fixed right-0 top-0 z-[var(--z-modal)] flex h-[100dvh] w-[min(560px,100vw)] flex-col overflow-y-auto bg-paper"
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-paper px-5 py-4">
          <div className="min-w-0">
            <p className="code-type text-[13px] font-bold text-orange-600">{product.sku}</p>
            <h2 className="mt-0.5 truncate text-[15px] font-bold text-ink">{product.name}</h2>
            <p className="mt-0.5 truncate text-[11.5px] text-ink-mute">
              {product.brand} / {product.gama}
            </p>
          </div>
          <button
            onClick={close}
            aria-label="Cerrar editor"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-mute transition-colors hover:bg-surface hover:text-ink"
          >
            <X size={19} weight="bold" />
          </button>
        </header>

        <div className="flex flex-1 flex-col gap-7 px-5 py-6">
          <Field label="Foto" hint="Se sube un archivo o se pega la URL de una imagen. Sin foto, la tienda muestra el ícono genérico.">
            <div className="flex items-center gap-3">
              <span className="photo-plate h-20 w-20 shrink-0 rounded-md border border-line">
                {image ? (
                  <Image
                    src={image}
                    alt=""
                    width={80}
                    height={80}
                    className="h-full w-full object-contain p-1.5"
                    unoptimized={image.startsWith("/uploads/") || image.startsWith("http")}
                  />
                ) : (
                  <span className="code-type text-[9px] text-ink-mute">S/F</span>
                )}
              </span>

              {image && (
                <button
                  onClick={() => setImage(undefined)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-line-strong px-3 py-2 text-[11.5px] font-bold text-ink-mute transition-colors hover:border-ink hover:text-ink"
                >
                  <Trash size={13} />
                  Quitar
                </button>
              )}
            </div>

            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void upload(f);
                  e.target.value = "";
                }}
              />
              <button
                onClick={() => fileRef.current?.click()}
                disabled={busy}
                className="inline-flex items-center justify-center gap-1.5 rounded-md border border-ink px-4 py-2.5 text-xs font-bold text-ink transition-colors hover:bg-ink hover:text-white disabled:opacity-50"
              >
                <UploadSimple size={14} weight="bold" />
                Subir archivo
              </button>

              <div className="flex flex-1 items-center gap-2 rounded-md border border-line-strong px-3">
                <input
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addUrl();
                    }
                  }}
                  placeholder="Pegar URL de imagen"
                  aria-label="URL de imagen"
                  className="h-10 w-full bg-transparent text-[12.5px] focus:outline-none"
                />
                <button
                  onClick={addUrl}
                  className="shrink-0 text-[11.5px] font-bold text-ink-mute hover:text-orange-600"
                >
                  Usar
                </button>
              </div>
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Precio (S/)" hint="Precio de venta actual.">
              <input
                type="number"
                min={0}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="h-11 w-full rounded-md border border-line-strong bg-paper px-3 text-sm text-ink focus:border-orange-500 focus:outline-none"
              />
            </Field>
            <Field label="Precio tachado (S/)" hint="Vacío si no hay oferta.">
              <input
                type="number"
                min={0}
                value={compareAtPrice}
                onChange={(e) => setCompareAtPrice(e.target.value)}
                className="h-11 w-full rounded-md border border-line-strong bg-paper px-3 text-sm text-ink focus:border-orange-500 focus:outline-none"
              />
            </Field>
            <Field label="Inicial desde (S/)" hint="Lo que se pide para llevárselo.">
              <input
                type="number"
                min={0}
                value={initialFrom}
                onChange={(e) => setInitialFrom(e.target.value)}
                className="h-11 w-full rounded-md border border-line-strong bg-paper px-3 text-sm text-ink focus:border-orange-500 focus:outline-none"
              />
            </Field>
            <Field label="Cuotas máximas" hint="Número de meses que se ofrece.">
              <input
                type="number"
                min={1}
                value={installmentsMax}
                onChange={(e) => setInstallmentsMax(e.target.value)}
                className="h-11 w-full rounded-md border border-line-strong bg-paper px-3 text-sm text-ink focus:border-orange-500 focus:outline-none"
              />
            </Field>
          </div>

          <Field label="Badge" hint="Etiqueta que se ve en la tarjeta del catálogo.">
            <select
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              className="h-11 w-full rounded-md border border-line-strong bg-paper px-3 text-sm text-ink focus:border-orange-500 focus:outline-none"
            >
              {BADGES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Descripción" hint="Texto corto que se ve en la ficha del producto.">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              maxLength={280}
              className="w-full resize-y rounded-md border border-line-strong bg-paper px-3 py-2.5 text-[13.5px] text-ink focus:border-orange-500 focus:outline-none"
            />
            <p className="mt-1 text-right text-[11px] text-ink-mute">
              {description.length} / 280
            </p>
          </Field>

          <p className="rounded-md bg-surface px-3 py-2.5 text-[11.5px] text-ink-mute">
            Vista previa del precio:{" "}
            <span className="font-bold text-ink">{formatPEN(Number(price) || 0)}</span>
            {compareAtPrice && (
              <span className="ml-1.5 line-through">{formatPEN(Number(compareAtPrice))}</span>
            )}
          </p>
        </div>

        <footer className="sticky bottom-0 border-t border-line bg-paper px-5 py-4">
          <AnimatePresence>
            {status && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                role="status"
                className={
                  "mb-3 flex items-center gap-2 rounded-md px-3 py-2.5 text-[12.5px] font-semibold " +
                  (status.kind === "ok"
                    ? "bg-surface text-ink"
                    : "border border-orange-500 bg-orange-50 text-orange-700")
                }
              >
                {status.kind === "ok" ? (
                  <CheckCircle size={15} weight="fill" className="text-orange-600" />
                ) : (
                  <WarningCircle size={15} weight="fill" />
                )}
                {status.message}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={save}
              disabled={busy}
              className="flex-1 rounded-full bg-orange-500 px-5 py-3.5 text-[12.5px] font-bold text-white transition-colors hover:bg-orange-600 disabled:bg-line-strong"
            >
              {busy ? "Guardando" : "Guardar y publicar"}
            </button>

            {isOverridden && (
              <button
                onClick={restore}
                disabled={busy}
                className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-3.5 text-xs font-bold text-ink-mute transition-colors hover:border-ink hover:text-ink disabled:opacity-50"
              >
                <ArrowCounterClockwise size={14} weight="bold" />
                Restaurar
              </button>
            )}
          </div>
        </footer>
      </motion.aside>
    </AnimatePresence>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <p className="label text-ink">{label}</p>
        <p className="mt-1 text-[11.5px] leading-snug text-ink-mute">{hint}</p>
      </div>
      {children}
    </div>
  );
}

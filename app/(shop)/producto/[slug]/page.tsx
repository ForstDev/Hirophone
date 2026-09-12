import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaretRight, Star } from "@phosphor-icons/react/dist/ssr";
import { getAllSlugs, getProductBySlug, relatedProducts } from "@/lib/catalog";
import { readSettings } from "@/lib/store";
import { formatPEN } from "@/lib/format";
import { ProductMedia } from "@/components/catalog/ProductMedia";
import { ProductCard } from "@/components/catalog/ProductCard";
import { AddToCart } from "@/components/product/AddToCart";
import { InstallmentEstimator } from "@/components/product/InstallmentEstimator";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

const SPECS_LABELS: Record<string, string> = {
  screen: "Pantalla",
  chip: "Procesador",
  camera: "Cámara",
  battery: "Batería",
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await relatedProducts(product, 4);
  const settings = await readSettings();

  return (
    <div className="shell py-10">
      <nav className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-ink-mute">
        <Link href="/" className="hover:text-orange-600">
          Inicio
        </Link>
        <CaretRight className="size-3" />
        <Link href="/catalogo" className="hover:text-orange-600">
          Catálogo
        </Link>
        <CaretRight className="size-3" />
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="photo-plate relative sticky top-[96px] h-fit rounded-xl p-10">
          {product.badge && (
            <span className="absolute left-8 top-8 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
              {product.badge}
            </span>
          )}
          <ProductMedia
            image={product.image}
            accent={product.accent}
            uid={`detail-${product.slug}`}
            alt={product.name}
            className="mx-auto aspect-[3/4] w-full max-w-[260px]"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <p className="label text-orange-600">{product.brand}</p>
            <h1 className="mt-2 font-display text-3xl font-extrabold text-ink sm:text-4xl">
              {product.name}
            </h1>
            <div className="mt-3 flex items-center gap-2 text-sm text-ink-soft">
              <span className="flex items-center gap-1 font-bold text-ink">
                <Star weight="fill" className="size-4 text-orange-500" />
                {product.rating}
              </span>
              <span>({product.reviews} reseñas)</span>
              <span>·</span>
              <span>SKU {product.sku}</span>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-ink-soft">{product.description}</p>

          <div className="flex flex-col gap-1 border-y border-line py-5">
            {product.compareAtPrice && (
              <span className="code-type text-sm text-ink-mute line-through">
                {formatPEN(product.compareAtPrice)}
              </span>
            )}
            <span className="code-type text-3xl font-extrabold text-ink">
              {formatPEN(product.price)}
            </span>
            <span className="text-sm font-semibold text-navy">
              Hasta {product.installmentsMax} cuotas · desde {formatPEN(product.initialFrom)} de
              inicial
            </span>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-ink-mute">
              Almacenamiento y RAM
            </p>
            <p className="mt-2 text-sm font-semibold text-ink">
              {product.storageGb} GB de almacenamiento · {product.ramGb} GB RAM
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-ink-mute">Colores</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <span
                  key={color}
                  className="rounded-full border border-line px-3.5 py-1.5 text-xs font-semibold text-ink-soft"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>

          <AddToCart product={product} settings={settings} />

          <InstallmentEstimator
            price={product.price}
            initialFrom={product.initialFrom}
            installmentsMax={product.installmentsMax}
          />

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-ink-mute">
              Ficha técnica
            </p>
            <dl className="mt-3 divide-y divide-line rounded-lg border border-line">
              {(["screen", "chip", "camera", "battery"] as const).map((key) => (
                <div key={key} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
                  <dt className="text-ink-mute">{SPECS_LABELS[key]}</dt>
                  <dd className="text-right font-semibold text-ink">{product[key]}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl font-extrabold text-ink">
            También te puede interesar
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { featuredProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Reveal } from "@/components/ui/Reveal";

export async function FeaturedProducts() {
  const products = await featuredProducts(8);

  return (
    <section className="py-20">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label text-orange-600">Destacados</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
              Los más cotizados esta semana
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="flex items-center gap-1.5 text-sm font-bold text-ink-soft hover:text-orange-600"
          >
            Ver catálogo completo
            <CaretRight weight="bold" className="size-3.5" />
          </Link>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={(i % 4) * 0.06}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

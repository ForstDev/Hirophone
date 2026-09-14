import type { Metadata } from "next";
import { Suspense } from "react";
import { filterProducts } from "@/lib/catalog";
import { FilterRail } from "@/components/catalog/FilterRail";
import { CatalogToolbar } from "@/components/catalog/CatalogToolbar";
import { ProductCard } from "@/components/catalog/ProductCard";
import { EmptyResults } from "@/components/catalog/EmptyResults";
import { SearchTracker } from "@/components/catalog/SearchTracker";

export const metadata: Metadata = {
  title: "Catálogo",
  description: "Explora Xiaomi, Samsung, iPhone, Motorola y Honor en cuotas, sin planes post pago.",
};

type SearchParams = Record<string, string | undefined>;

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const products = await filterProducts({
    brand: params.brand,
    gama: params.gama,
    q: params.q,
    sort: params.sort as never,
  });

  return (
    <div className="shell py-10">
      {params.q && <SearchTracker term={params.q} results={products.length} />}
      <header className="mb-8">
        <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
          {params.q ? `Resultados para “${params.q}”` : "Todos los equipos"}
        </h1>
        <p className="mt-2 max-w-xl text-sm text-ink-soft">
          Catálogo de referencia con fines de demostración de diseño: precios e inicial son
          ilustrativos.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <FilterRail params={params} />

        <div className="flex flex-col gap-6">
          <Suspense>
            <CatalogToolbar total={products.length} />
          </Suspense>

          {products.length === 0 ? (
            <EmptyResults />
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

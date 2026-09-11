import Link from "next/link";
import { BRANDS } from "@/lib/catalog";
import { Reveal } from "@/components/ui/Reveal";

export function BrandRail() {
  return (
    <section className="border-y border-line bg-paper py-10">
      <div className="shell">
        <Reveal className="flex flex-wrap items-center justify-between gap-4">
          <p className="label text-ink-mute">Marcas disponibles</p>
          <div className="flex flex-wrap gap-2.5">
            {BRANDS.map((brand) => (
              <Link
                key={brand}
                href={`/catalogo?brand=${encodeURIComponent(brand)}`}
                className="rounded-full border border-line px-5 py-2.5 text-sm font-bold text-ink-soft transition-colors hover:border-orange-400 hover:bg-orange-50 hover:text-orange-700"
              >
                {brand}
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

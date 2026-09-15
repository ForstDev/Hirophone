import Link from "next/link";
import { BRANDS } from "@/lib/catalog";
import { Reveal } from "@/components/ui/Reveal";

export function BrandRail() {
  const loop = [...BRANDS, ...BRANDS];

  return (
    <section className="overflow-hidden border-y border-line bg-paper py-8">
      <Reveal>
        <p className="label mb-5 text-center text-ink-mute">Marcas disponibles</p>
        <div className="flex w-max anim-marquee">
          {[0, 1].map((group) => (
            <div key={group} className="flex shrink-0 items-center" aria-hidden={group === 1}>
              {loop.map((brand, i) => (
                <Link
                  key={`${group}-${brand}-${i}`}
                  href={`/catalogo?brand=${encodeURIComponent(brand)}`}
                  className="mx-5 shrink-0 font-display text-3xl font-extrabold text-line-strong transition-colors hover:text-orange-600 sm:text-4xl"
                  tabIndex={group === 1 ? -1 : 0}
                >
                  {brand}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

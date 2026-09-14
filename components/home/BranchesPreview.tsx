import Image from "next/image";
import Link from "next/link";
import { CaretRight, MapPin, Storefront } from "@phosphor-icons/react/dist/ssr";
import { getBranches } from "@/lib/catalog";
import { Reveal } from "@/components/ui/Reveal";

export function BranchesPreview() {
  const branches = getBranches();
  const lima = branches.filter((b) => b.region === "Lima").length;
  const provincia = branches.filter((b) => b.region === "Provincia").length;

  return (
    <section className="bg-ink py-20 text-white">
      <div className="shell grid gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            Presencia en malls de todo el Perú
          </h2>
          <p className="mt-4 max-w-md text-white/70">
            Encuéntranos dentro de Real Plaza, Mall Aventura, Mall Plaza y Open Plaza.
            Atendemos todos los días de 10:00 a.m. a 10:00 p.m.
          </p>

          <div className="mt-8 flex gap-8">
            <div>
              <p className="font-display text-3xl font-extrabold text-orange-500">{lima}+</p>
              <p className="mt-1 text-sm text-white/60">Tiendas en Lima</p>
            </div>
            <div>
              <p className="font-display text-3xl font-extrabold text-orange-500">{provincia}+</p>
              <p className="mt-1 text-sm text-white/60">Tiendas en provincia</p>
            </div>
          </div>

          <Link
            href="/nosotros#sucursales"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-ink hover:bg-orange-50"
          >
            <Storefront weight="bold" className="size-4" />
            Ver todas las sucursales
            <CaretRight weight="bold" className="size-3.5" />
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="relative overflow-hidden rounded-lg">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <Image
              src="https://www.hirophone.com/cdn/shop/files/photo_5165667921677101654_y_540x.jpg"
              alt="Tienda Hirophone en un mall de Lima"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 90vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
          </div>
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/70 px-4 py-2 text-xs font-semibold backdrop-blur">
            <MapPin weight="fill" className="size-3.5 text-orange-500" />
            Mall Aventura Santa Anita
          </div>
        </Reveal>
      </div>
    </section>
  );
}

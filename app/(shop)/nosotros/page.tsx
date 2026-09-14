import type { Metadata } from "next";
import Image from "next/image";
import { IdentificationCard, ShieldCheck, Storefront, Clock } from "@phosphor-icons/react/dist/ssr";
import { getBranches } from "@/lib/catalog";
import { SITE } from "@/lib/constants";
import { BranchesList } from "@/components/nosotros/BranchesList";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Quiénes somos y dónde encontrar una tienda Hirophone en Lima y provincia.",
};

const VALUES = [
  {
    icon: IdentificationCard,
    title: "Solo con tu DNI",
    text: "Sin planes post pago ni historial complicado: la evaluación se hace en tienda.",
  },
  {
    icon: ShieldCheck,
    title: "9 de cada 10 aprueban",
    text: "La mayoría de solicitudes se aprueba el mismo día, con la inicial ya calculada.",
  },
  {
    icon: Storefront,
    title: "40 tiendas en el Perú",
    text: "Dentro de Real Plaza, Mall Aventura, Mall Plaza y Open Plaza, en Lima y provincia.",
  },
  {
    icon: Clock,
    title: "Abiertos todos los días",
    text: SITE.hours,
  },
];

export default function NosotrosPage() {
  const branches = getBranches();

  return (
    <div>
      <section className="bg-surface">
        <div className="shell grid gap-10 py-14 lg:grid-cols-2 lg:items-center lg:py-20">
          <Reveal>
            <h1 className="font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Llevamos el financiamiento de celulares a todo el Perú
            </h1>
            <p className="mt-4 max-w-md text-ink-soft">
              Hirophone nació para que comprar un smartphone no dependa de un plan post pago
              ni de un buró perfecto. Con tu DNI y una inicial accesible, te llevas el equipo
              el mismo día en cualquiera de nuestras tiendas dentro de los principales malls
              del país.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="relative overflow-hidden rounded-xl">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src="https://www.hirophone.com/cdn/shop/files/photo_5165667921677101654_y_540x.jpg"
                alt="Tienda Hirophone en un mall de Lima"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 90vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="shell grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <div className="flex h-full flex-col gap-3 rounded-lg border border-line bg-paper p-6">
                <div className="flex size-11 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
                  <v.icon weight="bold" className="size-5" />
                </div>
                <h3 className="text-sm font-bold text-ink">{v.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="sucursales" className="scroll-mt-32 bg-surface py-16">
        <div className="shell">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
              Encuentra tu tienda más cercana
            </h2>
            <p className="mt-2 max-w-xl text-sm text-ink-soft">
              Selección de tiendas a modo de referencia. La lista completa de las{" "}
              {SITE.branchesCount} se confirma por WhatsApp según tu distrito o ciudad.
            </p>
          </Reveal>

          <div className="mt-10">
            <BranchesList branches={branches} />
          </div>
        </div>
      </section>
    </div>
  );
}

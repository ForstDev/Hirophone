import { Quotes, Star } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";

const TESTIMONIALS = [
  {
    quote:
      "Muy buen servicio, tienen una gran variedad de equipos y sobre todo a un mejor precio que otras tiendas.",
    name: "Angie Vargas",
  },
  {
    quote:
      "Excelente servicio, la persona que me atendió fue muy paciente y amable. Yo no sabía mucho de celulares y me ayudó a escoger, y la verdad me ha ido muy bien.",
    name: "Jorge Paredes M.",
  },
  {
    quote:
      "Satisfecha con el servicio postventa. No sabía cómo usar algunas herramientas de la cámara, así que fui a la tienda nuevamente y me explicaron a detalle.",
    name: "Flor Suárez Martínez",
  },
];

export function Testimonials() {
  return (
    <section className="bg-surface py-20">
      <div className="shell">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="label text-orange-600">Clientes Hirophone</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Lo que dicen en tienda
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col gap-4 rounded-lg border border-line bg-paper p-7">
                <Quotes weight="fill" className="size-7 text-orange-300" />
                <blockquote className="flex-1 text-sm leading-relaxed text-ink-soft">
                  “{t.quote}”
                </blockquote>
                <figcaption className="flex items-center justify-between border-t border-line pt-4">
                  <span className="text-sm font-bold text-ink">{t.name}</span>
                  <span className="flex gap-0.5 text-orange-500">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} weight="fill" className="size-3.5" />
                    ))}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { MagnifyingGlass, ChatCircleDots, IdentificationCard, Package } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    icon: MagnifyingGlass,
    title: "Elige tu equipo",
    text: "Filtra por marca, gama o presupuesto en el catálogo y arma tu cotización.",
  },
  {
    icon: ChatCircleDots,
    title: "Cotiza por WhatsApp",
    text: "Envía tu selección con un clic. Un asesor te responde al toque.",
  },
  {
    icon: IdentificationCard,
    title: "Evaluación con tu DNI",
    text: "Sin planes post pago ni buró complicado. 9 de cada 10 clientes aprueban.",
  },
  {
    icon: Package,
    title: "Recógelo en tienda",
    text: "Paga la inicial y llévate tu equipo el mismo día en la sucursal más cercana.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-surface py-20">
      <div className="shell">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="label text-orange-600">Cómo funciona</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            De la tienda online a tu bolsillo, en 4 pasos
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08}>
              <div className="relative flex h-full flex-col gap-4 rounded-lg border border-line bg-paper p-6">
                <span className="code-type absolute right-5 top-5 text-2xl font-bold text-line-strong">
                  0{i + 1}
                </span>
                <div className="flex size-12 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
                  <step.icon weight="bold" className="size-6" />
                </div>
                <h3 className="text-base font-bold text-ink">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { CaretRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBanner() {
  return (
    <section className="py-20">
      <div className="shell">
        <Reveal className="relative overflow-hidden rounded-xl bg-orange-500 px-8 py-14 text-center sm:px-16">
          <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 size-64 rounded-full bg-white/10" />
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
            ¿Listo para estrenar tu próximo equipo?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/85">
            Cotiza en menos de un minuto. Nuestro equipo te confirma la aprobación por
            WhatsApp el mismo día.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/catalogo"
              className="flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-orange-600 transition active:scale-[0.97] hover:bg-orange-50"
            >
              Ver catálogo
              <CaretRight weight="bold" className="size-4" />
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border-2 border-white px-6 py-3.5 text-sm font-bold text-white transition active:scale-[0.97] hover:bg-white/10"
            >
              <WhatsappLogo weight="fill" className="size-4" />
              Cotizar por WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

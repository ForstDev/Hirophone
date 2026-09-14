import Image from "next/image";
import Link from "next/link";
import { CaretRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBanner() {
  return (
    <section className="py-20">
      <div className="shell">
        <Reveal className="relative overflow-hidden rounded-xl bg-orange-600">
          <div className="grid items-center gap-8 px-8 py-14 sm:px-12 lg:grid-cols-[1.2fr_0.8fr] lg:py-0">
            <div className="text-center lg:py-14 lg:text-left">
              <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                ¿Listo para estrenar tu próximo equipo?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-white lg:mx-0">
                Cotiza en menos de un minuto. Nuestro equipo te confirma la aprobación por
                WhatsApp el mismo día.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <Link
                  href="/catalogo"
                  className="flex items-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-bold text-orange-700 transition active:scale-[0.97] hover:bg-orange-50"
                >
                  Ver catálogo
                  <CaretRight weight="bold" className="size-4" />
                </Link>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full border-2 border-white px-6 py-4 text-sm font-bold text-white transition active:scale-[0.97] hover:bg-white/10"
                >
                  <WhatsappLogo weight="fill" className="size-4" />
                  Cotizar por WhatsApp
                </a>
              </div>
            </div>

            <div className="relative hidden aspect-square lg:block">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.22),transparent_65%)]" />
              <Image
                src="/products/moto-edge-50.png"
                alt="Moto Edge 50"
                fill
                sizes="360px"
                className="object-contain p-8 drop-shadow-[0_30px_40px_rgba(0,0,0,0.25)]"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

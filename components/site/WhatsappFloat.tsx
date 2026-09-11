"use client";

import { WhatsappLogo } from "@phosphor-icons/react";
import { WHATSAPP_NUMBER, SITE } from "@/lib/constants";

export function WhatsappFloat() {
  const text = encodeURIComponent(
    `${SITE.quoteIntro.replace("estos equipos", "un equipo")} Quisiera que me ayuden a elegir.`,
  );
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] py-3.5 pl-3.5 pr-4 text-sm font-bold text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.4)] transition-transform hover:scale-105"
      style={{ zIndex: "var(--z-drawer)" }}
    >
      <span className="relative flex size-6 items-center justify-center">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/40" />
        <WhatsappLogo weight="fill" className="relative size-6" />
      </span>
      <span className="hidden sm:inline">Cotizar</span>
    </a>
  );
}

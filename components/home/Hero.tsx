"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { CaretRight, IdentificationCard, Storefront, ShieldCheck } from "@phosphor-icons/react";
import { WHATSAPP_NUMBER, SITE } from "@/lib/constants";
import { PhoneGlyph } from "@/components/catalog/PhoneGlyph";
import { stagger, riseItem, expo } from "@/lib/motion";
import featured from "@/data/products.json";

const heroPhones = (featured as { accent: string }[]).slice(0, 3);

const TRUST = [
  { icon: IdentificationCard, label: "Solo con tu DNI" },
  { icon: ShieldCheck, label: "9 de cada 10 aprueban" },
  { icon: Storefront, label: "40 tiendas en el país" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="pointer-events-none absolute -right-24 -top-24 size-[420px] rounded-full bg-orange-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 size-[360px] rounded-full bg-navy-wash blur-3xl" />

      <div className="shell relative grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <motion.div
          variants={stagger()}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6"
        >
          <motion.span
            variants={riseItem}
            className="label inline-flex w-fit items-center gap-2 rounded-full bg-orange-500/10 px-3 py-1.5 text-orange-700"
          >
            Sin planes post pago
          </motion.span>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={expo(0.9, 0.1)}
              className="font-display text-[2.25rem] font-extrabold leading-[1.08] text-ink sm:text-[2.75rem] lg:text-[2.35rem] xl:text-[2.9rem]"
            >
              Estrena celular hoy, en{" "}
              <span className="text-orange-500">cómodas cuotas</span>.
            </motion.h1>
          </div>

          <motion.p variants={riseItem} className="max-w-md text-base text-ink-soft sm:text-lg">
            Elige tu Xiaomi, Samsung, iPhone, Motorola u Honor, cotiza por WhatsApp con tu DNI
            y la inicial, y recógelo el mismo día en la tienda más cercana.
          </motion.p>

          <motion.div variants={riseItem} className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/catalogo"
              className="flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-bold text-white transition active:scale-[0.97] hover:bg-orange-600"
            >
              Ver catálogo
              <CaretRight weight="bold" className="size-4" />
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border-2 border-ink px-6 py-3.5 text-sm font-bold text-ink transition active:scale-[0.97] hover:border-orange-500 hover:text-orange-600"
            >
              Cotizar por WhatsApp
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={expo(0.9, 0.25)}
          className="relative mx-auto grid w-full max-w-sm grid-cols-3 items-end gap-3 sm:max-w-md"
        >
          {heroPhones.map((p, i) => (
            <div
              key={i}
              className="photo-plate rounded-xl p-3"
              style={{ marginBottom: i === 1 ? 0 : 28 }}
            >
              <PhoneGlyph accent={p.accent} uid={`hero-${i}`} className="w-full" />
            </div>
          ))}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-xs font-bold text-white shadow-lg">
            {SITE.claim}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function TrustStrip() {
  return (
    <div className="border-b border-line bg-paper">
      <div className="shell flex flex-wrap justify-center gap-x-8 gap-y-3 py-5 text-sm font-semibold text-ink-soft sm:justify-start">
        {TRUST.map(({ icon: Icon, label }) => (
          <span key={label} className="flex items-center gap-2">
            <Icon weight="fill" className="size-4 text-orange-500" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

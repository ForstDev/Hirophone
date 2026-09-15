"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { CaretRight, IdentificationCard, Storefront, ShieldCheck } from "@phosphor-icons/react";
import { WHATSAPP_NUMBER, SITE } from "@/lib/constants";
import { stagger, riseItem, expo } from "@/lib/motion";
import allProducts from "@/data/products.json";

type HeroProduct = { slug: string; name: string; image?: string; badge?: string };

const HERO_SLUGS = ["samsung-galaxy-s24-ultra", "iphone-15", "xiaomi-14t"];
const heroPhones = HERO_SLUGS.map(
  (slug) => (allProducts as HeroProduct[]).find((p) => p.slug === slug)!,
);

const TRUST = [
  { icon: IdentificationCard, label: "Solo con tu DNI" },
  { icon: ShieldCheck, label: "9 de cada 10 aprueban" },
  { icon: Storefront, label: "40 tiendas en el país" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_60%_50%_at_80%_20%,var(--color-orange-100),transparent)]" />

      <div className="shell relative grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <motion.div
          variants={stagger()}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6"
        >
          <motion.span
            variants={riseItem}
            className="label inline-flex w-fit items-center gap-2 rounded-full bg-orange-500/10 px-3 py-1.5 text-orange-800"
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
              <span className="text-orange-600">cómodas cuotas</span>.
            </motion.h1>
          </div>

          <motion.p variants={riseItem} className="max-w-md text-base text-ink-soft sm:text-lg">
            Elige tu Xiaomi, Samsung, iPhone, Motorola u Honor, cotiza por WhatsApp con tu DNI
            y la inicial, y recógelo el mismo día en la tienda más cercana.
          </motion.p>

          <motion.div variants={riseItem} className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/catalogo"
              className="flex items-center gap-2 rounded-full bg-orange-600 px-6 py-4 text-sm font-bold text-white transition active:scale-[0.97] hover:bg-orange-700"
            >
              Ver catálogo
              <CaretRight weight="bold" className="size-4" />
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border-2 border-ink px-6 py-4 text-sm font-bold text-ink transition active:scale-[0.97] hover:border-orange-500 hover:text-orange-600"
            >
              Cotizar por WhatsApp
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={expo(0.9, 0.25)}
          className="relative mx-auto aspect-[4/4.4] w-full max-w-[300px] sm:max-w-[360px]"
        >
          {heroPhones[1]?.image && (
            <Link
              href={`/producto/${heroPhones[1].slug}`}
              className="photo-plate absolute bottom-[6%] left-0 z-0 aspect-[3/4.3] w-[46%] -rotate-6 overflow-hidden rounded-lg border-4 border-paper shadow-[0_18px_34px_-14px_rgba(23,20,15,0.35)] transition-transform duration-300 hover:-rotate-3 hover:scale-[1.03]"
            >
              <Image
                src={heroPhones[1].image}
                alt={heroPhones[1].name}
                fill
                sizes="200px"
                className="object-contain p-3"
              />
            </Link>
          )}

          {heroPhones[2]?.image && (
            <Link
              href={`/producto/${heroPhones[2].slug}`}
              className="photo-plate absolute bottom-[6%] right-0 z-0 aspect-[3/4.3] w-[46%] rotate-6 overflow-hidden rounded-lg border-4 border-paper shadow-[0_18px_34px_-14px_rgba(23,20,15,0.35)] transition-transform duration-300 hover:rotate-3 hover:scale-[1.03]"
            >
              <Image
                src={heroPhones[2].image}
                alt={heroPhones[2].name}
                fill
                sizes="200px"
                className="object-contain p-3"
              />
            </Link>
          )}

          {heroPhones[0]?.image && (
            <Link
              href={`/producto/${heroPhones[0].slug}`}
              className="photo-plate absolute left-1/2 top-0 z-10 aspect-[3/4.3] w-[62%] -translate-x-1/2 overflow-hidden rounded-xl shadow-[0_30px_54px_-16px_rgba(254,102,1,0.4)] transition-transform duration-300 hover:-translate-y-1"
            >
              <Image
                src={heroPhones[0].image}
                alt={heroPhones[0].name}
                fill
                sizes="240px"
                priority
                className="object-contain p-4"
              />
              {heroPhones[0].badge && (
                <span className="absolute left-3 top-3 rounded-full bg-orange-600 px-2.5 py-1 text-[0.65rem] font-bold text-white">
                  {heroPhones[0].badge}
                </span>
              )}
            </Link>
          )}

          <div className="absolute -bottom-5 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-xs font-bold text-white shadow-lg">
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

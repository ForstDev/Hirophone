"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { WarningCircle, Eye, EyeClosed } from "@phosphor-icons/react";
import { Logo } from "@/components/brand/Logo";
import { expo } from "@/lib/motion";

export function LoginForm({ next }: { next?: string }) {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ user, pass }),
    }).catch(() => null);

    if (!res || !res.ok) {
      const data = await res?.json().catch(() => null);
      setError(data?.error ?? "No se pudo conectar con el servidor");
      setBusy(false);
      return;
    }

    router.replace(next && next.startsWith("/admin") ? next : "/admin");
    router.refresh();
  };

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-surface p-4 sm:p-8">
      <div className="pointer-events-none absolute -left-24 -top-24 size-[420px] rounded-full bg-orange-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 size-[420px] rounded-full bg-navy-wash blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={expo(0.6)}
        className="relative grid w-full max-w-[960px] overflow-hidden rounded-2xl bg-paper shadow-[0_40px_80px_-24px_rgba(23,20,15,0.25)] lg:grid-cols-2"
      >
        <div className="relative hidden flex-col justify-between overflow-hidden bg-ink p-10 text-white lg:flex">
          <div className="pointer-events-none absolute -bottom-16 -right-16 size-72 rounded-full bg-orange-500/20 blur-3xl" />

          <Logo variant="compact" size={40} />

          <div className="relative z-10">
            <h1 className="max-w-[16ch] font-display text-5xl font-extrabold leading-[1.05] tracking-tight">
              Panel de <span className="text-orange-500">catálogo</span>
            </h1>
            <p className="mt-5 max-w-[42ch] text-sm leading-relaxed text-white/55">
              Edita precios, cuotas y fotos de los equipos, revisa qué buscan los
              clientes y qué se está cotizando por WhatsApp.
            </p>
          </div>

          <div className="relative z-0 flex items-end justify-between">
            <p className="text-[11.5px] text-white/55">Propuesta de e-commerce para Hirophone Perú.</p>
            <div className="photo-plate relative -mb-10 -mr-4 aspect-[3/4.3] w-28 shrink-0 rotate-6 overflow-hidden rounded-lg border-4 border-ink shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)]">
              <Image
                src="/products/samsung-galaxy-s24-ultra.jpg"
                alt=""
                fill
                sizes="112px"
                className="object-contain p-2"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-12 sm:px-12 sm:py-16">
          <form onSubmit={submit} className="w-full max-w-[360px]">
            <Link href="/" className="mb-10 inline-block text-ink lg:hidden">
              <Logo variant="compact" size={40} />
            </Link>

            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink">
              Ingresar
            </h2>
            <p className="mt-2 text-sm text-ink-mute">Acceso al panel administrativo.</p>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="user" className="label text-ink-soft">
                  Usuario
                </label>
                <input
                  id="user"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  autoComplete="username"
                  required
                  className="h-12 rounded-lg border border-line-strong bg-paper px-4 text-sm text-ink transition-colors focus:border-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-500/10"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="pass" className="label text-ink-soft">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="pass"
                    type={showPass ? "text" : "password"}
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="h-12 w-full rounded-lg border border-line-strong bg-paper px-4 pr-11 text-sm text-ink transition-colors focus:border-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-500/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                    className="absolute right-0 top-0 flex h-12 w-11 items-center justify-center text-ink-mute transition-colors hover:text-ink"
                  >
                    {showPass ? <EyeClosed size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
                className="mt-4 flex items-start gap-2 rounded-md border border-orange-500 bg-orange-50 px-3 py-2.5 text-[12.5px] font-medium text-orange-800"
              >
                <WarningCircle size={16} weight="fill" className="mt-px shrink-0" />
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="mt-6 w-full rounded-full bg-orange-600 px-6 py-4 text-sm font-bold text-white transition enabled:active:scale-[0.98] hover:bg-orange-700 disabled:bg-line-strong"
            >
              {busy ? "Verificando" : "Entrar"}
            </button>

            <p className="mt-6 border-t border-line pt-5 text-xs leading-relaxed text-ink-mute">
              Demo: usuario <span className="code-type font-semibold text-ink">admin</span>,
              contraseña <span className="code-type font-semibold text-ink">admin</span>. Se
              cambian con las variables HIROPHONE_ADMIN_USER y HIROPHONE_ADMIN_PASS.
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

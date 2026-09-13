"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { WarningCircle } from "@phosphor-icons/react";
import { Logo } from "@/components/brand/Logo";
import { expo } from "@/lib/motion";

export function LoginForm({ next }: { next?: string }) {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
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
    <div className="grid min-h-[100dvh] lg:grid-cols-2">
      <div className="relative hidden flex-col items-start justify-between bg-ink p-12 text-white lg:flex">
        <Logo variant="compact" size={40} />
        <div>
          <h1 className="max-w-[16ch] font-display text-[42px] font-extrabold leading-[1.05] tracking-tight">
            Panel de <span className="text-orange-500">catálogo</span>
          </h1>
          <p className="mt-5 max-w-[42ch] text-sm leading-relaxed text-white/55">
            Edita precios, cuotas y fotos de los equipos, revisa qué buscan los
            clientes y qué se está cotizando por WhatsApp.
          </p>
        </div>
        <p className="text-[11.5px] text-white/35">Propuesta de e-commerce para Hirophone Perú.</p>
      </div>

      <div className="flex items-center justify-center bg-paper px-6 py-16">
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={expo(0.6)}
          className="w-full max-w-[380px]"
        >
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
                className="h-12 rounded-md border border-line-strong bg-paper px-3.5 text-sm text-ink focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="pass" className="label text-ink-soft">
                Contraseña
              </label>
              <input
                id="pass"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                autoComplete="current-password"
                required
                className="h-12 rounded-md border border-line-strong bg-paper px-3.5 text-sm text-ink focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              className="mt-4 flex items-start gap-2 rounded-md border border-orange-500 bg-orange-50 px-3 py-2.5 text-[12.5px] font-medium text-orange-700"
            >
              <WarningCircle size={16} weight="fill" className="mt-px shrink-0" />
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="mt-6 w-full rounded-full bg-orange-500 px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-orange-600 disabled:bg-line-strong"
          >
            {busy ? "Verificando" : "Entrar"}
          </button>

          <p className="mt-6 border-t border-line pt-5 text-xs leading-relaxed text-ink-mute">
            Demo: usuario <span className="code-type font-semibold text-ink">admin</span>,
            contraseña <span className="code-type font-semibold text-ink">admin</span>. Se
            cambian con las variables HIROPHONE_ADMIN_USER y HIROPHONE_ADMIN_PASS.
          </p>
        </motion.form>
      </div>
    </div>
  );
}

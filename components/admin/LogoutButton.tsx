"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { SignOut } from "@phosphor-icons/react";

export function LogoutButton() {
  const router = useRouter();
  const [pending, start] = useTransition();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    start(() => {
      router.replace("/admin/login");
      router.refresh();
    });
  };

  return (
    <button
      onClick={logout}
      disabled={pending}
      className="inline-flex items-center gap-1.5 text-left text-xs font-semibold text-white/70 transition-colors hover:text-orange-500 disabled:opacity-50"
    >
      <SignOut size={14} weight="bold" />
      {pending ? "Cerrando" : "Cerrar sesión"}
    </button>
  );
}

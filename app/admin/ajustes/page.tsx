import type { Metadata } from "next";
import { readSettings } from "@/lib/store";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const metadata: Metadata = { title: "Ajustes" };
export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await readSettings();

  return (
    <div className="px-5 py-8 md:px-10 md:py-12">
      <header className="border-b border-line pb-6">
        <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">Ajustes</h1>
        <p className="mt-2 max-w-[70ch] text-[13px] leading-relaxed text-ink-mute">
          Datos de contacto y el mensaje con el que sale cada cotización por WhatsApp.
        </p>
      </header>

      <SettingsForm settings={settings} />
    </div>
  );
}

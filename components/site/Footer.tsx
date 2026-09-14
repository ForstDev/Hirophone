import Link from "next/link";
import {
  InstagramLogo,
  FacebookLogo,
  TiktokLogo,
  WhatsappLogo,
  MapPin,
  EnvelopeSimple,
  Clock,
} from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/brand/Logo";
import { SITE } from "@/lib/constants";
import { readSettings } from "@/lib/store";
import { formatWhatsappLabel } from "@/lib/format";
import { OpenCartButton } from "@/components/cart/OpenCartButton";

const TIENDA = [
  { href: "/catalogo", label: "Catálogo completo" },
  { href: "/catalogo?gama=Entrada", label: "Gama de entrada" },
  { href: "/catalogo?gama=Media", label: "Gama media" },
  { href: "/catalogo?gama=Alta", label: "Gama alta" },
];

const AYUDA = [
  { href: "/nosotros", label: "Quiénes somos" },
  { href: "/nosotros#sucursales", label: "Nuestras sucursales" },
];

export async function Footer() {
  const settings = await readSettings();
  const SOCIALS = [
    { href: SITE.instagram, label: "Instagram", Icon: InstagramLogo },
    { href: SITE.facebook, label: "Facebook", Icon: FacebookLogo },
    { href: SITE.tiktok, label: "TikTok", Icon: TiktokLogo },
    { href: `https://wa.me/${settings.whatsapp}`, label: "WhatsApp", Icon: WhatsappLogo },
    // Solo se muestran las redes con un enlace confirmado en lib/constants.ts.
  ].filter((s) => s.href);

  return (
    <footer className="bg-black text-white">
      <div className="shell grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-white/60">
            {SITE.branchesCount} dentro de Real Plaza, Mall Aventura, Mall Plaza y Open
            Plaza en Lima y provincia. Financiamos tu smartphone solo con tu DNI y la
            inicial, sin planes post pago.
          </p>
          <div className="flex gap-2 pt-1">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-orange-500 hover:text-orange-500"
              >
                <Icon className="size-[1.15rem]" weight="fill" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol title="Tienda" items={TIENDA} />
        <div className="flex flex-col gap-4">
          <p className="label text-white/45">Ayuda</p>
          <ul className="flex flex-col gap-2.5">
            {AYUDA.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-sm text-white/75 hover:text-orange-500">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <OpenCartButton className="text-sm text-white/75 hover:text-orange-500">
                Mi cotización
              </OpenCartButton>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <p className="label text-white/45">Contacto</p>
          <a
            href={`https://wa.me/${settings.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-2.5 text-sm text-white/75 hover:text-orange-500"
          >
            <WhatsappLogo weight="fill" className="mt-0.5 size-4 shrink-0" />
            {formatWhatsappLabel(settings.whatsapp)}
          </a>
          <a
            href={`mailto:${settings.contactEmail}`}
            className="flex items-start gap-2.5 text-sm text-white/75 hover:text-orange-500"
          >
            <EnvelopeSimple weight="fill" className="mt-0.5 size-4 shrink-0" />
            {settings.contactEmail}
          </a>
          <p className="flex items-start gap-2.5 text-sm text-white/75">
            <Clock weight="fill" className="mt-0.5 size-4 shrink-0" />
            {SITE.hours}
          </p>
          <p className="flex items-start gap-2.5 text-sm text-white/75">
            <MapPin weight="fill" className="mt-0.5 size-4 shrink-0" />
            {SITE.branchesCount} en Lima y provincia
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Hirophone Perú. Todos los derechos reservados.</p>
          <p>Propuesta de rediseño: catálogo y precios con fines demostrativos.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="label text-white/45">{title}</p>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="text-sm text-white/75 hover:text-orange-500">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

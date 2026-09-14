import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return (
    <div className="shell flex flex-col items-center gap-5 py-32 text-center">
      <span className="code-type text-6xl font-extrabold text-orange-500">404</span>
      <h1 className="font-display text-2xl font-extrabold text-ink">
        No encontramos esta página
      </h1>
      <p className="max-w-sm text-sm text-ink-soft">
        El enlace puede estar mal escrito o el equipo ya no está disponible. Vuelve al
        catálogo para seguir viendo celulares en cuotas.
      </p>
      <Link
        href="/catalogo"
        className="flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-bold text-white transition active:scale-[0.97] hover:bg-orange-600"
      >
        Ver catálogo
        <CaretRight weight="bold" className="size-4" />
      </Link>
    </div>
  );
}

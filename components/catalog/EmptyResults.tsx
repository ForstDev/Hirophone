import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

export function EmptyResults() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-line-strong py-20 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-surface-2 text-ink-mute">
        <MagnifyingGlass className="size-6" />
      </span>
      <div>
        <p className="font-bold text-ink">No encontramos equipos con esos filtros</p>
        <p className="mt-1 text-sm text-ink-soft">
          Prueba quitando algún filtro o buscando otra marca o modelo.
        </p>
      </div>
      <Link
        href="/catalogo"
        className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition active:scale-[0.97] hover:bg-orange-600"
      >
        Ver todo el catálogo
      </Link>
    </div>
  );
}

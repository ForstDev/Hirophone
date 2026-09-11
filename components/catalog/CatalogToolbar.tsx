"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const SORTS = [
  { value: "relevancia", label: "Más relevantes" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
  { value: "nombre", label: "Alfabéticamente" },
];

export function CatalogToolbar({ total }: { total: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function onSort(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value === "relevancia") params.delete("sort");
    else params.set("sort", e.target.value);
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm text-ink-soft">
        <span className="font-bold text-ink">{total}</span>{" "}
        {total === 1 ? "equipo encontrado" : "equipos encontrados"}
      </p>
      <select
        defaultValue={searchParams.get("sort") ?? "relevancia"}
        onChange={onSort}
        className="rounded-full border border-line bg-paper px-4 py-2 text-sm font-semibold text-ink outline-none"
      >
        {SORTS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}

import Link from "next/link";
import { getStats } from "@/lib/stats";
import { StatCard } from "@/components/admin/StatCard";
import { RankList } from "@/components/admin/RankList";
import { ActivityChart } from "@/components/admin/ActivityChart";
import { ResetEvents } from "@/components/admin/ResetEvents";

export const dynamic = "force-dynamic";

const pct = (n: number) => (n * 100).toFixed(1).replace(".", ",") + "%";

export default async function AdminDashboard() {
  const s = await getStats(30);
  const noActivity = s.totals.searches + s.totals.views + s.totals.cartAdds === 0;

  return (
    <div className="px-5 py-8 md:px-10 md:py-12">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Indicadores
          </h1>
          <p className="mt-2 text-[13px] text-ink-mute">
            Últimos {s.range.days} días, del {s.range.from} al {s.range.to}.
          </p>
        </div>
        <ResetEvents />
      </header>

      {noActivity && (
        <div className="mt-6 rounded-lg border border-line bg-paper px-5 py-4">
          <p className="text-[13.5px] font-semibold text-ink">Todavía no hay actividad</p>
          <p className="mt-1 max-w-[70ch] text-[12.5px] leading-relaxed text-ink-mute">
            Los indicadores se llenan solos con el uso de la tienda. Navega el{" "}
            <Link href="/catalogo" className="font-semibold text-orange-600 underline underline-offset-2">
              catálogo
            </Link>
            , busca un equipo y agrégalo a una cotización para verlos aparecer.
          </p>
        </div>
      )}

      <section className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-line lg:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Búsquedas" value={s.totals.searches} />
        <StatCard label="Fichas vistas" value={s.totals.views} />
        <StatCard label="Agregados a cotizar" value={s.totals.cartAdds} />
        <StatCard label="Unidades agregadas" value={s.totals.cartUnits} />
        <StatCard label="Cotizaciones enviadas" value={s.totals.quotes} accent />
        <StatCard label="Unidades cotizadas" value={s.totals.quotedUnits} accent />
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <ActivityChart data={s.daily} />

        <div className="rounded-lg border border-line bg-paper">
          <div className="border-b border-line px-5 py-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.09em] text-ink">
              Tasas de conversión
            </h2>
          </div>
          <dl className="divide-y divide-line">
            <Rate
              term="Ficha vista que termina en cotización"
              value={pct(s.rates.viewToCart)}
              hint="Cuánto de lo que se mira se agrega a la lista."
            />
            <Rate
              term="Listas que se envían por WhatsApp"
              value={pct(s.rates.cartToQuote)}
              hint="Cotizaciones enviadas sobre ítems agregados."
            />
            <Rate
              term="Búsquedas sin resultados"
              value={pct(s.rates.zeroResultShare)}
              hint="Demanda que el catálogo no está cubriendo."
              warn={s.rates.zeroResultShare > 0.15}
            />
          </dl>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <RankList
          title="Búsquedas más frecuentes"
          subtitle="Lo que los clientes escriben en el buscador."
          items={s.topSearches}
          hrefFor={(i) => "/catalogo?q=" + encodeURIComponent(i.label)}
          empty="Sin búsquedas registradas todavía."
        />
        <RankList
          title="Búsquedas sin resultados"
          subtitle="Modelos que el catálogo no cubre. La lista de compras de Hirophone."
          items={s.zeroSearches}
          tone="warn"
          empty="Ninguna búsqueda quedó sin resultados."
        />
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <RankList
          title="Equipos más vistos"
          subtitle="Fichas abiertas, por SKU."
          items={s.topViewed}
          hrefFor={(i) => "/producto/" + i.key}
          empty="Sin fichas vistas todavía."
        />
        <RankList
          title="Más agregados a cotización"
          subtitle="Ordenado por unidades, no por clics."
          items={s.topCarted}
          hrefFor={(i) => "/producto/" + i.key}
          unit="und"
          empty="Sin items agregados todavía."
        />
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <RankList
          title="Marcas más consultadas"
          items={s.topBrands}
          hrefFor={(i) => "/catalogo?brand=" + encodeURIComponent(i.label)}
          empty="Sin datos de marcas todavía."
        />
        <RankList
          title="Filtros más usados"
          subtitle="Qué facetas usan para llegar al equipo."
          items={s.topFilters}
          empty="Sin filtros aplicados todavía."
        />
      </section>

      <section className="mt-6 rounded-lg border border-line bg-paper">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.09em] text-ink">
            Salud del catálogo
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-b-lg bg-line md:grid-cols-4">
          <StatCard label="Equipos" value={s.health.products} compact />
          <StatCard label="Con foto real" value={s.health.withPhoto} compact />
          <StatCard
            label="Con ícono genérico"
            value={s.health.withoutPhoto}
            compact
            warn={s.health.withoutPhoto > 0}
          />
          <StatCard label="Editados a mano" value={s.health.edited} compact />
        </div>

        <div className="border-t border-line px-5 py-4">
          <p className="max-w-[80ch] text-[12.5px] leading-relaxed text-ink-mute">
            {s.health.withoutPhoto} equipos todavía muestran el ícono genérico. Sube su foto
            real desde{" "}
            <Link
              href="/admin/productos?estado=sin-foto"
              className="font-semibold text-orange-600 underline underline-offset-2"
            >
              Productos
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

function Rate({
  term,
  value,
  hint,
  warn = false,
}: {
  term: string;
  value: string;
  hint: string;
  warn?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 px-5 py-4">
      <div className="min-w-0">
        <dt className="text-[13px] font-semibold text-ink">{term}</dt>
        <dd className="mt-1 text-[12px] leading-snug text-ink-mute">{hint}</dd>
      </div>
      <span
        className={
          "code-type shrink-0 text-xl font-bold " + (warn ? "text-orange-600" : "text-ink")
        }
      >
        {value}
      </span>
    </div>
  );
}

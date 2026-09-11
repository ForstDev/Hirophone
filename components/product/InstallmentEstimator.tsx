"use client";

import { useMemo, useState } from "react";
import { formatPEN } from "@/lib/format";

export function InstallmentEstimator({
  price,
  initialFrom,
  installmentsMax,
}: {
  price: number;
  initialFrom: number;
  installmentsMax: number;
}) {
  const options = useMemo(() => {
    const steps = [3, 6, 9, 12, 18, 24].filter((n) => n <= installmentsMax);
    return steps.length ? steps : [installmentsMax];
  }, [installmentsMax]);
  const [months, setMonths] = useState(options[Math.min(2, options.length - 1)]);

  const financed = price - initialFrom;
  const monthly = Math.ceil(financed / months);

  return (
    <div className="rounded-lg border border-line-strong bg-navy-wash p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-navy">
        Simulador de cuotas (referencial)
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMonths(m)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
              months === m
                ? "bg-navy text-white"
                : "border border-line-strong bg-paper text-ink-soft hover:border-navy"
            }`}
          >
            {m} meses
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-ink-mute">Inicial</p>
          <p className="code-type text-lg font-bold text-ink">{formatPEN(initialFrom)}</p>
        </div>
        <div>
          <p className="text-ink-mute">Cuota estimada</p>
          <p className="code-type text-lg font-bold text-navy">{formatPEN(monthly)} / mes</p>
        </div>
      </div>

      <p className="mt-4 text-[0.7rem] leading-relaxed text-ink-mute">
        Estimado sin intereses de referencia, sujeto a evaluación crediticia con tu DNI. El
        monto final se confirma por WhatsApp antes de la compra.
      </p>
    </div>
  );
}

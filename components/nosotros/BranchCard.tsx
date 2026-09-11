import { MapPin, Clock } from "@phosphor-icons/react/dist/ssr";
import type { Branch } from "@/lib/types";

export function BranchCard({ branch }: { branch: Branch }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-line bg-paper p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="label text-orange-600">{branch.name}</p>
          <h3 className="mt-1 text-base font-bold leading-snug text-ink">{branch.mall}</h3>
        </div>
        <span className="shrink-0 rounded-full bg-surface-2 px-2.5 py-1 text-[0.65rem] font-bold text-ink-soft">
          {branch.region}
        </span>
      </div>
      <p className="flex items-start gap-2 text-sm text-ink-soft">
        <MapPin weight="fill" className="mt-0.5 size-4 shrink-0 text-ink-mute" />
        {branch.address}
      </p>
      <p className="flex items-center gap-2 text-sm text-ink-soft">
        <Clock weight="fill" className="size-4 shrink-0 text-ink-mute" />
        {branch.hours}
      </p>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import type { Branch } from "@/lib/types";
import { BranchCard } from "./BranchCard";

const TABS = ["Todas", "Lima", "Provincia"] as const;

export function BranchesList({ branches }: { branches: Branch[] }) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Todas");

  const filtered = useMemo(
    () => (tab === "Todas" ? branches : branches.filter((b) => b.region === tab)),
    [branches, tab],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-fit gap-1 rounded-full border border-line bg-surface p-1">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
              tab === t ? "bg-ink text-white" : "text-ink-soft hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((branch) => (
          <BranchCard key={branch.id} branch={branch} />
        ))}
      </div>
    </div>
  );
}

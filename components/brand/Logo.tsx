import clsx from "clsx";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="12" fill="url(#hiro-mark-grad)" />
      <path
        d="M13 17.5C13 13.634 16.134 10.5 20 10.5C23.866 10.5 27 13.634 27 17.5V19"
        stroke="white"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
      <rect x="11.5" y="19" width="6" height="9.5" rx="2.4" fill="white" />
      <rect x="22.5" y="19" width="6" height="9.5" rx="2.4" fill="white" fillOpacity="0.55" />
      <defs>
        <linearGradient id="hiro-mark-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF8626" />
          <stop offset="1" stopColor="#E85A00" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Logo({
  className,
  tone = "light",
  markClassName,
}: {
  className?: string;
  tone?: "light" | "dark";
  markClassName?: string;
}) {
  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={clsx("h-9 w-9 shrink-0", markClassName)} />
      <span
        className={clsx(
          "font-display text-[1.35rem] font-extrabold tracking-tight leading-none",
          tone === "light" ? "text-ink" : "text-white",
        )}
      >
        Hiro<span className="text-orange-500">phone</span>
      </span>
    </span>
  );
}

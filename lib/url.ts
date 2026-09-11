export function toggleParam(
  params: Record<string, string | undefined>,
  key: string,
  value: string,
): string {
  const current = (params[key] ?? "").split(",").filter(Boolean);
  const next = current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value];

  const merged = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (!v || k === key) continue;
    merged.set(k, v);
  }
  if (next.length) merged.set(key, next.join(","));

  const qs = merged.toString();
  return qs ? `/catalogo?${qs}` : "/catalogo";
}

export function isActive(params: Record<string, string | undefined>, key: string, value: string) {
  return (params[key] ?? "").split(",").includes(value);
}

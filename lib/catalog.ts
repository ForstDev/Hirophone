import "server-only";
import productsRaw from "@/data/products.json";
import branchesRaw from "@/data/branches.json";
import type { Product, ProductOverride, Branch, Brand, Gama } from "./types";
import { readOverrides } from "./store";

const baseProducts = productsRaw as Product[];
const branches = branchesRaw as Branch[];

export const BRANDS: Brand[] = ["Xiaomi", "Samsung", "Apple", "Motorola", "Honor"];
export const GAMAS: Gama[] = ["Entrada", "Media", "Alta"];

/**
 * Aplica los overrides del panel admin sobre el JSON base. Los overrides
 * viven aparte (data/runtime/overrides.json, o Vercel Blob en producción)
 * para que nunca se pisen al reemplazar data/products.json con el catálogo
 * real.
 */
function withOverride(p: Product, overrides: Record<string, ProductOverride>): Product {
  const o = overrides[p.slug];
  if (!o) return p;
  return {
    ...p,
    price: o.price ?? p.price,
    compareAtPrice: "compareAtPrice" in o ? o.compareAtPrice : p.compareAtPrice,
    initialFrom: o.initialFrom ?? p.initialFrom,
    installmentsMax: o.installmentsMax ?? p.installmentsMax,
    badge: "badge" in o ? o.badge : p.badge,
    description: o.description ?? p.description,
    image: o.image ?? p.image,
  };
}

// `readOverrides` está cacheado por request (ver lib/store.ts), así que pedir
// overrides una vez por producto acá (brandCounts, por ejemplo, llama a esto
// muchas veces) no dispara pedidos de red repetidos.
async function products(): Promise<Product[]> {
  const overrides = await readOverrides();
  return baseProducts.map((p) => withOverride(p, overrides));
}

export async function getAllProducts(): Promise<Product[]> {
  return products();
}

/**
 * Solo los slugs del catálogo base, sin tocar overrides — para
 * `generateStaticParams`, que corre en build y no debería depender de un
 * store remoto (ni cambiar qué páginas existen porque alguien editó un
 * precio).
 */
export function getAllSlugs(): string[] {
  return baseProducts.map((p) => p.slug);
}

export function getBranches(): Branch[] {
  return branches;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const base = baseProducts.find((p) => p.slug === slug);
  if (!base) return undefined;
  const overrides = await readOverrides();
  return withOverride(base, overrides);
}

export async function isOverridden(slug: string): Promise<boolean> {
  return Boolean((await readOverrides())[slug]);
}

export type CatalogFilters = {
  brand?: string;
  gama?: string;
  q?: string;
  sort?: "relevancia" | "precio-asc" | "precio-desc" | "nombre";
};

export async function filterProducts(filters: CatalogFilters): Promise<Product[]> {
  let list = await products();

  if (filters.brand) {
    const brands = filters.brand.split(",");
    list = list.filter((p) => brands.includes(p.brand));
  }

  if (filters.gama) {
    const gamas = filters.gama.split(",");
    list = list.filter((p) => gamas.includes(p.gama));
  }

  if (filters.q) {
    const term = filters.q.trim().toLowerCase();
    if (term) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term) ||
          p.sku.toLowerCase().includes(term),
      );
    }
  }

  switch (filters.sort) {
    case "precio-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "precio-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "nombre":
      list.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      list.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0) || b.rating - a.rating);
  }

  return list;
}

export async function brandCounts(filters: CatalogFilters): Promise<Record<string, number>> {
  const counts: Record<string, number> = {};
  for (const brand of BRANDS) {
    const list = await filterProducts({ ...filters, brand: undefined });
    counts[brand] = list.filter((p) => p.brand === brand).length;
  }
  return counts;
}

export async function gamaCounts(filters: CatalogFilters): Promise<Record<string, number>> {
  const counts: Record<string, number> = {};
  for (const gama of GAMAS) {
    const list = await filterProducts({ ...filters, gama: undefined });
    counts[gama] = list.filter((p) => p.gama === gama).length;
  }
  return counts;
}

export async function relatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const all = await products();
  return all
    .filter((p) => p.slug !== product.slug && p.brand === product.brand)
    .concat(all.filter((p) => p.slug !== product.slug && p.brand !== product.brand))
    .filter((p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i)
    .slice(0, limit);
}

export async function featuredProducts(limit = 8): Promise<Product[]> {
  const list = await products();
  return list
    .sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0) || b.rating - a.rating)
    .slice(0, limit);
}

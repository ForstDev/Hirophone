import productsRaw from "@/data/products.json";
import branchesRaw from "@/data/branches.json";
import type { Product, Branch, Brand, Gama } from "./types";

const products = productsRaw as Product[];
const branches = branchesRaw as Branch[];

export const BRANDS: Brand[] = ["Xiaomi", "Samsung", "Apple", "Motorola", "Honor"];
export const GAMAS: Gama[] = ["Entrada", "Media", "Alta"];

export function getAllProducts(): Product[] {
  return products;
}

export function getBranches(): Branch[] {
  return branches;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export type CatalogFilters = {
  brand?: string;
  gama?: string;
  q?: string;
  sort?: "relevancia" | "precio-asc" | "precio-desc" | "nombre";
};

export function filterProducts(filters: CatalogFilters): Product[] {
  let list = [...products];

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

export function brandCounts(filters: CatalogFilters): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const brand of BRANDS) {
    counts[brand] = filterProducts({ ...filters, brand: undefined }).filter(
      (p) => p.brand === brand,
    ).length;
  }
  return counts;
}

export function gamaCounts(filters: CatalogFilters): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const gama of GAMAS) {
    counts[gama] = filterProducts({ ...filters, gama: undefined }).filter(
      (p) => p.gama === gama,
    ).length;
  }
  return counts;
}

export function relatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.slug !== product.slug && p.brand === product.brand)
    .concat(products.filter((p) => p.slug !== product.slug && p.brand !== product.brand))
    .filter((p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i)
    .slice(0, limit);
}

export function featuredProducts(limit = 8): Product[] {
  return [...products]
    .sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0) || b.rating - a.rating)
    .slice(0, limit);
}

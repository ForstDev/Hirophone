export type Brand = "Xiaomi" | "Samsung" | "Apple" | "Motorola" | "Honor";

export type Gama = "Entrada" | "Media" | "Alta";

export type Product = {
  id: string;
  slug: string;
  sku: string;
  brand: Brand;
  name: string;
  gama: Gama;
  storageGb: number;
  ramGb: number;
  colors: string[];
  price: number;
  compareAtPrice?: number;
  initialFrom: number;
  installmentsMax: number;
  badge?: "Oferta" | "Nuevo" | "Más vendido";
  rating: number;
  reviews: number;
  screen: string;
  chip: string;
  camera: string;
  battery: string;
  description: string;
  accent: string;
  /** Foto real, subida desde el panel admin o sembrada en el JSON. Sin ella, cae al ícono vectorial. */
  image?: string;
};

export type CartLine = {
  slug: string;
  sku: string;
  name: string;
  brand: Brand;
  price: number;
  initialFrom: number;
  accent: string;
  image?: string;
  qty: number;
};

export type Branch = {
  id: string;
  name: string;
  mall: string;
  city: string;
  region: "Lima" | "Provincia";
  address: string;
  hours: string;
};

/** Campos que un admin puede sobrescribir sin tocar data/products.json. */
export type ProductOverride = {
  price?: number;
  compareAtPrice?: number;
  initialFrom?: number;
  installmentsMax?: number;
  badge?: "Oferta" | "Nuevo" | "Más vendido";
  description?: string;
  image?: string;
  updatedAt: string;
};

export type Settings = {
  whatsapp: string;
  whatsappLabel: string;
  quoteIntro: string;
  contactEmail: string;
};

export type TrackEvent =
  | { type: "search"; term: string; results: number }
  | { type: "view"; slug: string; sku: string; name: string; brand: string }
  | { type: "cart_add"; slug: string; sku: string; name: string; qty: number }
  | { type: "quote"; lines: number; units: number }
  | { type: "filter"; facet: "brand" | "gama"; value: string };

export type StoredEvent = TrackEvent & { at: string };

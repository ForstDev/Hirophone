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
};

export type CartLine = {
  slug: string;
  sku: string;
  name: string;
  brand: Brand;
  price: number;
  initialFrom: number;
  accent: string;
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

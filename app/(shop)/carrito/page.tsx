import { CartPage } from "@/components/cart/CartPage";

export const metadata = {
  title: "Mi cotización",
};

export default function CarritoPage() {
  return (
    <div className="shell py-10">
      <header className="mb-8">
        <p className="label text-orange-600">Cotización</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Tu cotización
        </h1>
        <p className="mt-2 max-w-xl text-sm text-ink-soft">
          Revisa los equipos, ajusta cantidades y envía todo por WhatsApp. No se realiza
          ningún cobro aquí: la compra siempre se confirma en tienda con tu DNI.
        </p>
      </header>
      <CartPage />
    </div>
  );
}

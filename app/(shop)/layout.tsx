import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { WhatsappFloat } from "@/components/site/WhatsappFloat";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { readSettings } from "@/lib/store";

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const settings = await readSettings();

  return (
    <CartProvider settings={settings}>
      <SmoothScroll />
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsappFloat settings={settings} />
      <CartDrawer />
    </CartProvider>
  );
}

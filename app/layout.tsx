import type { Metadata, Viewport } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { WhatsappFloat } from "@/components/site/WhatsappFloat";
import { CartProvider } from "@/components/cart/CartProvider";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Hirophone Perú | Celulares en cuotas, sin planes post pago",
    template: "%s | Hirophone Perú",
  },
  description:
    "Financia tu smartphone Xiaomi, Samsung, Apple, Motorola u Honor solo con tu DNI y la inicial. Cotiza por WhatsApp y recógelo en una de nuestras 40 tiendas en Lima y provincia.",
};

export const viewport: Viewport = {
  themeColor: "#fe6601",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={sora.variable + " " + inter.variable + " " + jetbrains.variable}
    >
      <head>
        <noscript>
          <style>
            {"[style*='opacity:0'],[style*='opacity: 0']{opacity:1!important;transform:none!important}"}
          </style>
        </noscript>
      </head>
      <body>
        <CartProvider>
          <SmoothScroll />
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsappFloat />
        </CartProvider>
      </body>
    </html>
  );
}

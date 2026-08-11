import type { Metadata } from "next";
import { Outfit, Newsreader } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/navbar";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/cart-drawer";
import { CheckoutModal } from "@/components/checkout-modal";
import { BillModal } from "@/components/bill-modal";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CCD Digital Hub | Chai Coffee Darbar - JKLU Jaipur",
  description: "The official digital food portal of Chai Coffee Darbar at JKLU. Cold coffii, maggi, burgers, pizzas and more under ₹100.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${outfit.className} ${newsreader.variable} antialiased bg-[#FAF8F5] text-[#1C1917] min-h-screen flex flex-col`}
      >
        <CartProvider>
          <NavBar />
          <main className="flex-1 w-full pt-16 md:pt-20">
            {children}
          </main>
          <CartDrawer />
          <CheckoutModal />
          <BillModal />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}

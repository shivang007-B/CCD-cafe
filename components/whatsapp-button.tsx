"use client";

import { MessageCircle, ShoppingBag } from "lucide-react";
import React from "react";
import { useCart } from "@/lib/cart-context";

export function WhatsAppButton() {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const whatsappNumber = "919530151383";
  const message = encodeURIComponent("Hi CCD! I'd like to place an order from the website.");
  const href = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
      {/* Floating Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative flex items-center justify-center p-3.5 bg-[#1A1816] text-[#F5C518] border border-[#D99B00]/40 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#D99B00]"
        aria-label="Open Food Cart"
        title="View Food Cart"
      >
        <ShoppingBag className="h-6 w-6" />
        {totalItemsCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-[#DC2626] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            {totalItemsCount}
          </span>
        )}
      </button>

      {/* Floating WhatsApp Button */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center p-3.5 bg-[#25D366] text-white rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
        aria-label="Order via WhatsApp 9530151383"
        title="Chat on WhatsApp (9530151383)"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Order via WhatsApp</span>
      </a>
    </div>
  );
}

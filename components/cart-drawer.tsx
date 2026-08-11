"use client";

import React from "react";
import { useCart } from "@/lib/cart-context";
import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    packingFee,
    total,
    setIsCheckoutOpen,
    totalItemsCount,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] text-[#1C1917] shadow-2xl flex flex-col border-l border-[#E7E0D3]">
          {/* Header */}
          <div className="p-6 bg-[#1A1816] text-[#FAF8F5] flex items-center justify-between border-b border-[#332E29]">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#D99B00]/20 rounded-full text-[#F5C518]">
                <ShoppingBag size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold font-serif tracking-wide text-white">Your Food Cart</h2>
                <p className="text-xs text-[#C4AD8A]">{totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} selected</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#C4AD8A] hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-[#F2EDE4] border border-[#E7E0D3] flex items-center justify-center text-[#9E6F00]">
                  <ShoppingBag size={36} />
                </div>
                <h3 className="text-lg font-bold text-[#1C1917]">Your Cart is Empty</h3>
                <p className="text-sm text-[#78716C] max-w-xs">
                  Craving something delicious? Explore our menu and add your favorite JKLU treats.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-6 py-2.5 bg-[#D99B00] text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#F5C518] transition-colors"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.id}-${item.selectedOption || ''}`}
                  className="p-4 bg-white border border-[#E7E0D3] rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
                >
                  {item.img && (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#F2EDE4]">
                      <Image
                        src={item.img}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-[#1C1917] truncate">{item.name}</h4>
                    {item.selectedOption && (
                      <p className="text-xs text-[#78716C]">{item.selectedOption}</p>
                    )}
                    <p className="text-sm font-bold text-[#D99B00] mt-0.5">₹{item.price}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-[#E7E0D3] rounded-lg bg-[#FAF8F5]">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 text-[#78716C] hover:text-[#1C1917] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-7 text-center font-bold text-xs">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 text-[#78716C] hover:text-[#1C1917] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-[#C0392B] hover:bg-[#C0392B]/10 rounded-lg transition-colors"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Total */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E7E0D3] space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#78716C]">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {packingFee > 0 && (
                  <div className="flex justify-between text-[#78716C]">
                    <span>Pizza Packing Charge</span>
                    <span>₹{packingFee}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-[#1C1917] pt-2 border-t border-[#E7E0D3]">
                  <span>Total Amount</span>
                  <span className="text-[#D99B00] text-lg font-serif">₹{total}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#78716C] bg-[#FAF8F5] p-2.5 rounded-lg border border-[#E7E0D3]">
                <ShieldCheck size={16} className="text-[#D99B00] shrink-0" />
                <span>Fast checkout & instant WhatsApp receipt generation.</span>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 bg-gradient-to-r from-[#DC2626] to-[#C0392B] text-white font-bold text-sm uppercase tracking-wider rounded-xl hover:opacity-95 shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

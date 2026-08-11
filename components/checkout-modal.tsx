"use client";

import React, { useState } from "react";
import { useCart, OrderCustomerInfo, ConfirmedOrder } from "@/lib/cart-context";
import { X, User, Phone, MapPin, CreditCard, FileText, CheckCircle2, ShoppingBag } from "lucide-react";

export function CheckoutModal() {
  const {
    cart,
    subtotal,
    packingFee,
    total,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    setConfirmedOrder,
    setIsBillOpen,
  } = useCart();

  const [formData, setFormData] = useState<OrderCustomerInfo>({
    name: "",
    phone: "",
    deliveryType: "delivery",
    address: "",
    notes: "",
    paymentMethod: "upi",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isCheckoutOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Full Name is required";
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      errs.phone = "Valid 10-digit Phone Number is required";
    }
    if (formData.deliveryType === "delivery" && !formData.address.trim()) {
      errs.address = "Hostel / Room Address is required for delivery";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate Invoice ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const invoiceId = `CCD-${new Date().getFullYear()}-${randomNum}`;
    const dateStr = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const newOrder: ConfirmedOrder = {
      invoiceId,
      date: dateStr,
      customer: { ...formData },
      items: [...cart],
      subtotal,
      packingFee,
      total,
    };

    setConfirmedOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    setIsBillOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] text-[#1C1917] w-full max-w-xl rounded-2xl shadow-2xl border border-[#E7E0D3] overflow-hidden flex flex-col my-8">
        
        {/* Header */}
        <div className="bg-[#1A1816] text-white p-6 flex items-center justify-between border-b border-[#332E29]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#D99B00]/20 rounded-xl text-[#F5C518]">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif">Checkout Portal</h2>
              <p className="text-xs text-[#C4AD8A]">Enter details to generate your official bill</p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 text-[#C4AD8A] hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
          
          {/* Order Summary Snapshot */}
          <div className="bg-white p-4 rounded-xl border border-[#E7E0D3] space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#9E6F00] flex items-center gap-1.5">
              <ShoppingBag size={14} /> Order Summary ({cart.length} items)
            </h3>
            <div className="max-h-32 overflow-y-auto divide-y divide-[#E7E0D3]/50 text-xs">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedOption || ''}`} className="py-1.5 flex justify-between">
                  <span>{item.quantity}x {item.name} {item.selectedOption ? `(${item.selectedOption})` : ''}</span>
                  <span className="font-semibold">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-[#E7E0D3] flex justify-between font-bold text-sm text-[#1C1917]">
              <span>Total Payable</span>
              <span className="text-[#DC2626] font-serif text-base">₹{total}</span>
            </div>
          </div>

          {/* Customer Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#9E6F00] flex items-center gap-1.5">
              <User size={14} /> Customer Details
            </h3>

            <div>
              <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E7E0D3] rounded-lg text-sm focus:outline-none focus:border-[#D99B00]"
                />
                <User size={16} className="absolute left-3 top-3 text-[#78716C]" />
              </div>
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                WhatsApp Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E7E0D3] rounded-lg text-sm focus:outline-none focus:border-[#D99B00]"
                />
                <Phone size={16} className="absolute left-3 top-3 text-[#78716C]" />
              </div>
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>

            {/* Delivery vs Pickup */}
            <div>
              <label className="block text-xs font-semibold text-[#1C1917] mb-2">Order Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, deliveryType: "delivery" })}
                  className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    formData.deliveryType === "delivery"
                      ? "bg-[#D99B00] text-black border-[#D99B00] shadow-sm"
                      : "bg-white text-[#78716C] border-[#E7E0D3]"
                  }`}
                >
                  <MapPin size={16} /> Campus Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, deliveryType: "pickup" })}
                  className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    formData.deliveryType === "pickup"
                      ? "bg-[#D99B00] text-black border-[#D99B00] shadow-sm"
                      : "bg-white text-[#78716C] border-[#E7E0D3]"
                  }`}
                >
                  <CheckCircle2 size={16} /> Counter Pickup
                </button>
              </div>
            </div>

            {formData.deliveryType === "delivery" && (
              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                  Hostel / Room Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Boys Hostel 1, Room 304"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-[#E7E0D3] rounded-lg text-sm focus:outline-none focus:border-[#D99B00]"
                />
                {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#1C1917] mb-1">Special Cooking Request (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Extra ice in coffee, less spicy maggi"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-[#E7E0D3] rounded-lg text-sm focus:outline-none focus:border-[#D99B00]"
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-xs font-semibold text-[#1C1917] mb-2 flex items-center gap-1.5">
                <CreditCard size={14} /> Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: "upi" })}
                  className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all ${
                    formData.paymentMethod === "upi"
                      ? "bg-[#1A1816] text-[#F5C518] border-[#1A1816]"
                      : "bg-white text-[#78716C] border-[#E7E0D3]"
                  }`}
                >
                  GPay / UPI / QR Code
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: "cash" })}
                  className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all ${
                    formData.paymentMethod === "cash"
                      ? "bg-[#1A1816] text-[#F5C518] border-[#1A1816]"
                      : "bg-white text-[#78716C] border-[#E7E0D3]"
                  }`}
                >
                  Cash on Delivery / Pickup
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-[#DC2626] text-white font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-[#C0392B] shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Confirm & Generate Bill</span>
            <FileText size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

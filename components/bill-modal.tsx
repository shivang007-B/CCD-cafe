"use client";

import React from "react";
import { useCart } from "@/lib/cart-context";
import { X, Send, Printer, CheckCircle2, Coffee, Receipt, PhoneCall } from "lucide-react";

export function BillModal() {
  const { confirmedOrder, isBillOpen, setIsBillOpen } = useCart();

  if (!isBillOpen || !confirmedOrder) return null;

  const targetWhatsAppNumber = "919530151383";

  // Build itemized WhatsApp message text
  const itemsText = confirmedOrder.items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.name}* x${item.quantity} = ₹${item.price * item.quantity}`
    )
    .join("\n");

  const fullWAMessage = `🧾 *NEW ORDER BILL - CHAI COFFEE DARBAR (CCD)*
----------------------------------------
*Invoice No:* #${confirmedOrder.invoiceId}
*Date:* ${confirmedOrder.date}

👤 *Customer Info:*
*Name:* ${confirmedOrder.customer.name}
*Phone:* ${confirmedOrder.customer.phone}
*Order Type:* ${
    confirmedOrder.customer.deliveryType === "delivery"
      ? `Hostel Delivery (${confirmedOrder.customer.address})`
      : "Counter Pickup at Degda Complex"
  }
${confirmedOrder.customer.notes ? `*Notes:* ${confirmedOrder.customer.notes}\n` : ""}
----------------------------------------
🛍️ *Itemized Order:*
${itemsText}
----------------------------------------
*Subtotal:* ₹${confirmedOrder.subtotal}
${confirmedOrder.packingFee > 0 ? `*Packing Fee:* ₹${confirmedOrder.packingFee}\n` : ""}\
*TOTAL AMOUNT:* ₹${confirmedOrder.total}
*Payment Method:* ${confirmedOrder.customer.paymentMethod.toUpperCase()}
----------------------------------------
Please confirm & process my order. Thank you!`;

  const waLink = `https://wa.me/${targetWhatsAppNumber}?text=${encodeURIComponent(fullWAMessage)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white text-[#1C1917] w-full max-w-lg rounded-2xl shadow-2xl border border-[#E7E0D3] overflow-hidden flex flex-col my-8 printable-receipt">
        
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-[#1A1816] to-[#2D2824] text-white p-6 relative flex flex-col items-center text-center border-b border-[#D99B00]/40">
          <button
            onClick={() => setIsBillOpen(false)}
            className="absolute top-4 right-4 p-2 text-[#C4AD8A] hover:text-white hover:bg-white/10 rounded-full transition-colors no-print"
          >
            <X size={20} />
          </button>
          
          <div className="w-12 h-12 rounded-full bg-[#D99B00]/20 border border-[#F5C518]/40 flex items-center justify-center text-[#F5C518] mb-2">
            <Coffee size={24} />
          </div>
          <h2 className="text-2xl font-bold font-serif tracking-wider text-white">CHAI COFFEE DARBAR</h2>
          <p className="text-xs text-[#C4AD8A] font-medium tracking-widest uppercase">JKLU Campus · Degda Complex, Jaipur</p>
          <div className="mt-3 px-3 py-1 bg-[#D99B00]/20 border border-[#D99B00]/40 rounded-full text-[#F5C518] text-xs font-semibold flex items-center gap-1.5">
            <CheckCircle2 size={14} /> Bill Generated Successfully
          </div>
        </div>

        {/* Bill Receipt Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
          
          {/* Metadata */}
          <div className="flex justify-between items-start text-xs border-b border-dashed border-[#E7E0D3] pb-4">
            <div>
              <p className="text-[#78716C]">Invoice Number</p>
              <p className="font-mono font-bold text-sm text-[#1C1917]">#{confirmedOrder.invoiceId}</p>
            </div>
            <div className="text-right">
              <p className="text-[#78716C]">Date & Time</p>
              <p className="font-semibold text-[#1C1917]">{confirmedOrder.date}</p>
            </div>
          </div>

          {/* Customer Details */}
          <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E7E0D3] text-xs space-y-1">
            <p className="font-bold text-[#9E6F00] uppercase tracking-wider mb-1">Customer & Delivery Info</p>
            <p><span className="text-[#78716C]">Name:</span> <strong className="text-[#1C1917]">{confirmedOrder.customer.name}</strong></p>
            <p><span className="text-[#78716C]">Phone:</span> <strong className="text-[#1C1917]">{confirmedOrder.customer.phone}</strong></p>
            <p>
              <span className="text-[#78716C]">Type:</span>{" "}
              <strong className="text-[#1C1917]">
                {confirmedOrder.customer.deliveryType === "delivery"
                  ? `Campus Delivery (${confirmedOrder.customer.address})`
                  : "Self Pickup at Counter"}
              </strong>
            </p>
            {confirmedOrder.customer.notes && (
              <p><span className="text-[#78716C]">Note:</span> <em>{confirmedOrder.customer.notes}</em></p>
            )}
          </div>

          {/* Itemized Table */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[#78716C] border-b border-[#E7E0D3] pb-1">
              <span>Item Description</span>
              <span>Amount</span>
            </div>
            <div className="divide-y divide-[#E7E0D3]/40 text-xs">
              {confirmedOrder.items.map((item, idx) => (
                <div key={idx} className="py-2 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-[#1C1917]">{item.name}</p>
                    <p className="text-[#78716C]">{item.quantity} x ₹{item.price} {item.selectedOption ? `(${item.selectedOption})` : ''}</p>
                  </div>
                  <span className="font-mono font-bold text-[#1C1917]">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Calculations */}
          <div className="border-t border-dashed border-[#E7E0D3] pt-4 space-y-1.5 text-xs">
            <div className="flex justify-between text-[#78716C]">
              <span>Subtotal</span>
              <span className="font-mono">₹{confirmedOrder.subtotal}</span>
            </div>
            {confirmedOrder.packingFee > 0 && (
              <div className="flex justify-between text-[#78716C]">
                <span>Pizza Packing Charge</span>
                <span className="font-mono">₹{confirmedOrder.packingFee}</span>
              </div>
            )}
            <div className="flex justify-between text-[#78716C]">
              <span>Payment Mode</span>
              <span className="font-semibold uppercase">{confirmedOrder.customer.paymentMethod}</span>
            </div>
            <div className="flex justify-between font-bold text-base text-[#1C1917] pt-2 border-t border-[#E7E0D3]">
              <span>GRAND TOTAL</span>
              <span className="font-mono text-xl text-[#DC2626]">₹{confirmedOrder.total}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 bg-[#FAF8F5] border-t border-[#E7E0D3] space-y-3 no-print">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 bg-[#25D366] hover:bg-[#1DA851] text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Send size={18} />
            <span>Send Bill to WhatsApp (9530151383)</span>
          </a>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handlePrint}
              className="py-2.5 px-4 bg-white border border-[#E7E0D3] text-[#1C1917] hover:bg-[#EFE9DF] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <Printer size={16} /> Print / Save PDF
            </button>
            <button
              onClick={() => setIsBillOpen(false)}
              className="py-2.5 px-4 bg-[#1A1816] text-[#F5C518] hover:bg-[#2D2824] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <Receipt size={16} /> Close Bill
            </button>
          </div>
          <p className="text-[11px] text-[#78716C] text-center">
            Clicking the WhatsApp button opens WhatsApp to dispatch your order directly to <strong>9530151383</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}

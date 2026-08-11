"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Coffee,
  Plus,
  ShoppingBag,
  CheckCircle2,
  Sparkles,
  Flame,
  Search,
  Check,
  Utensils,
  Clock,
  MapPin,
  Phone,
  ShieldAlert,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { motion, AnimatePresence } from "framer-motion";

/* ══════════════════════════════════════════════════════
   TYPES
   ══════════════════════════════════════════════════════ */
interface MenuItem {
  id: number;
  name: string;
  price: number;
  desc: string;
  img: string;
  category?: string;
}

/* ══════════════════════════════════════════════════════
   COMPLETE CCD MENU DATA
   ══════════════════════════════════════════════════════ */
const menuData: Record<string, MenuItem[]> = {
  "Cold Coffii": [
    { id: 1, name: "Thick Cold Coffee", price: 50, desc: "The legendary JKLU student fuel.", img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80&fit=crop&auto=format" },
    { id: 2, name: "Cold Coffii with Extra Ice Cream", price: 60, desc: "Extra scoop for the extra vibe.", img: "/mqdefault.jpg" },
    { id: 3, name: "Cold Coffii with Choco Chips", price: 70, desc: "Crunchy choco chips in every sip.", img: "/cc.jpg" },
    { id: 4, name: "Hazelnut Coffii", price: 70, desc: "Rich hazelnut flavor coffee.", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80&fit=crop&auto=format" },
    { id: 5, name: "Caramel Coffii", price: 70, desc: "Sweet caramel drizzle coffee.", img: "/cr.jpg" },
    { id: 6, name: "Banana Coffii", price: 60, desc: "Healthy banana blend coffee.", img: "/Banana_3.webp" },
    { id: 7, name: "Extra Strong Coffii", price: 10, desc: "Add extra shot to any coffee.", img: "/sc.avif" },
  ],
  "Mojito": [
    { id: 8, name: "Green Mint Mojito", price: 50, desc: "Fresh mint, refreshing sip.", img: "/gm.webp" },
    { id: 9, name: "Blue Lagoon Mojito", price: 50, desc: "Blue curacao twist mojito.", img: "/bl.jpeg" },
    { id: 10, name: "Black Current Mojito", price: 50, desc: "Berry burst in every glass.", img: "https://images.unsplash.com/photo-1570696516188-ade861b84a49?w=600&q=80&fit=crop&auto=format" },
    { id: 11, name: "Green Apple Mojito", price: 50, desc: "Tangy green apple refresher.", img: "/ga.jpeg" },
  ],
  "Thick Shakes": [
    { id: 12, name: "Black Current Shake", price: 60, desc: "Rich black current thick shake.", img: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&q=80&fit=crop&auto=format" },
    { id: 13, name: "Strawberry Shake", price: 60, desc: "Classic strawberry blend.", img: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&q=80&fit=crop&auto=format" },
    { id: 14, name: "Vanilla Shake", price: 60, desc: "Smooth vanilla thick shake.", img: "https://images.unsplash.com/photo-1568901839119-631418a3910d?w=600&q=80&fit=crop&auto=format" },
    { id: 15, name: "Oreo Shake", price: 60, desc: "Crushed Oreo cookie shake.", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80&fit=crop&auto=format" },
    { id: 16, name: "Butterscotch Shake", price: 70, desc: "Crunchy butterscotch delight.", img: "/bs.jpeg" },
    { id: 17, name: "Chocolate Shake", price: 60, desc: "Rich chocolate thick shake.", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80&fit=crop&auto=format" },
    { id: 18, name: "Kit Kat Shake", price: 80, desc: "Kit Kat blended shake.", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80&fit=crop&auto=format" },
    { id: 19, name: "Biscoff Shake", price: 80, desc: "Lotus Biscoff caramel shake.", img: "/b1.jpg" },
  ],
  "Maggi": [
    { id: 20, name: "Plain Maggi", price: 40, desc: "The OG 2 minute noodle.", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80&fit=crop&auto=format" },
    { id: 21, name: "Masala Maggi", price: 45, desc: "Extra masala, extra taste.", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80&fit=crop&auto=format" },
    { id: 22, name: "Schezwan Maggi", price: 50, desc: "Spicy schezwan tossed maggi.", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80&fit=crop&auto=format" },
    { id: 23, name: "Veg Tadka Maggi", price: 50, desc: "Maggi with veggie tadka.", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80&fit=crop&auto=format" },
    { id: 24, name: "Perry Perry Cheese Maggi", price: 70, desc: "Peri peri + cheese overload.", img: "https://images.unsplash.com/photo-1542528180-1c2803fa048c?w=600&q=80&fit=crop&auto=format" },
    { id: 25, name: "Egg Maggi (2 Eggs)", price: 70, desc: "Maggi loaded with 2 eggs.", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80&fit=crop&auto=format" },
  ],
  "Burgers": [
    { id: 26, name: "Veg Burger", price: 50, desc: "Crispy veg patty burger.", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80&fit=crop&auto=format" },
    { id: 27, name: "Veg Cheese Burger", price: 70, desc: "Melted cheese slice burger.", img: "https://images.unsplash.com/photo-1586816001966-79b736744398?w=600&q=80&fit=crop&auto=format" },
    { id: 28, name: "Double Cheese Burger", price: 80, desc: "Loaded with double cheese.", img: "https://images.unsplash.com/photo-1586816001966-79b736744398?w=600&q=80&fit=crop&auto=format" },
    { id: 29, name: "CCD Special Burger", price: 90, desc: "Chef's secret sauce burger.", img: "https://images.unsplash.com/photo-1586816001966-79b736744398?w=600&q=80&fit=crop&auto=format" },
  ],
  "Pizza": [
    { id: 30, name: "Margherita Pizza", price: 79, desc: "Classic cheese pizza.", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80&fit=crop&auto=format" },
    { id: 31, name: "Corn & Cheese Pizza", price: 89, desc: "Sweet corn and extra cheese.", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80&fit=crop&auto=format" },
    { id: 32, name: "CCD Special Pizza", price: 99, desc: "Loaded veggies & double cheese.", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80&fit=crop&auto=format" },
    { id: 33, name: "Paneer Cheese Pizza", price: 99, desc: "Fresh cottage cheese toppings.", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80&fit=crop&auto=format" },
  ],
  "Snacks & Fries": [
    { id: 34, name: "Salted French Fries", price: 60, desc: "Classic crispy fries.", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80&fit=crop&auto=format" },
    { id: 35, name: "Peri Peri French Fries", price: 70, desc: "Spicy peri peri seasoned fries.", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80&fit=crop&auto=format" },
    { id: 36, name: "Cheese French Fries", price: 99, desc: "Smothered in hot liquid cheese.", img: "https://images.unsplash.com/photo-1630431341973-02e1b662ec35?w=600&q=80&fit=crop&auto=format" },
  ]
};

const categories = Object.keys(menuData);

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("Cold Coffii");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const { addToCart, setIsCartOpen } = useCart();

  const handleAddToCart = (item: MenuItem, cat: string) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      category: cat,
      img: item.img,
    });

    setAddedItem(`Added "${item.name}" to cart`);
    setTimeout(() => setAddedItem(null), 2500);
  };

  // Filter items if searching
  const filteredItems = searchQuery.trim()
    ? Object.entries(menuData).flatMap(([cat, items]) =>
        items
          .filter((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((i) => ({ ...i, category: cat }))
      )
    : menuData[activeCategory].map((i) => ({ ...i, category: activeCategory }));

  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] font-sans min-h-screen pb-20">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {addedItem && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 bg-[#1A1816] text-[#F5C518] border border-[#D99B00]/40 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3"
          >
            <CheckCircle2 size={18} className="text-[#25D366]" />
            <span className="text-xs font-bold font-sans tracking-wide">{addedItem}</span>
            <button
              onClick={() => setIsCartOpen(true)}
              className="ml-2 text-[10px] uppercase font-bold text-white underline hover:text-[#F5C518]"
            >
              View Cart
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Banner */}
      <div className="bg-[#1A1816] text-white py-16 px-6 border-b border-[#D99B00]/30 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D99B00]/20 border border-[#D99B00]/40 text-[#F5C518] text-xs font-bold uppercase tracking-widest rounded-full mb-3">
              <Sparkles size={14} /> Est. JKLU Campus · Jaipur
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
              CCD <span className="gold-gradient-text italic">Kuch Bhi</span> Menu
            </h1>
            <p className="text-sm text-[#C4AD8A] mt-2 max-w-xl">
              Taste Jo Dil Maange. Every item under ₹100. From legendary Cold Coffii to late-night Maggi.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-auto min-w-[300px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search 73+ items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-[#D99B00]/40 text-white rounded-xl text-sm focus:outline-none focus:border-[#F5C518] placeholder-white/40"
              />
              <Search size={18} className="absolute left-3.5 top-3.5 text-[#F5C518]" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation Tabs */}
      {!searchQuery && (
        <div className="sticky top-16 md:top-20 z-30 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E7E0D3] py-4 shadow-sm">
          <div className="max-w-[1200px] mx-auto px-6 overflow-x-auto no-scrollbar flex items-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-[#1A1816] text-[#F5C518] border border-[#D99B00] shadow-md"
                    : "bg-white text-[#78716C] border border-[#E7E0D3] hover:border-[#D99B00] hover:text-[#1C1917]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Menu Grid */}
      <div className="max-w-[1200px] mx-auto px-6 pt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif font-bold text-[#1C1917]">
            {searchQuery ? `Search Results for "${searchQuery}"` : activeCategory}
          </h2>
          <span className="text-xs font-bold uppercase text-[#78716C]">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <Utensils size={48} className="mx-auto text-[#78716C]" />
            <h3 className="text-lg font-bold text-[#1C1917]">No items found</h3>
            <p className="text-sm text-[#78716C]">Try searching for something else like "Coffee", "Maggi" or "Pizza".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="menu-card flex flex-col justify-between overflow-hidden group"
              >
                {/* Item Image */}
                <div className="relative h-48 w-full bg-[#F2EDE4] overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#1A1816]/90 text-[#F5C518] font-serif font-bold text-lg px-3 py-1 rounded-lg border border-[#D99B00]/40 shadow-md">
                    ₹{item.price}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#1C1917]">{item.name}</h3>
                    <p className="text-xs text-[#78716C] mt-1 line-clamp-2">{item.desc}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#E7E0D3]">
                    <button
                      onClick={() => handleAddToCart(item, item.category || activeCategory)}
                      className="py-2.5 px-3 bg-[#D99B00] text-black hover:bg-[#F5C518] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Plus size={14} /> Add Cart
                    </button>
                    <button
                      onClick={() => {
                        handleAddToCart(item, item.category || activeCategory);
                        setIsCartOpen(true);
                      }}
                      className="py-2.5 px-3 bg-[#1A1816] text-white hover:bg-[#2D2824] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag size={14} /> Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Notes */}
      <div className="max-w-[1200px] mx-auto px-6 mt-16 pt-8 border-t border-[#E7E0D3] text-center text-xs text-[#78716C] space-y-2">
        <p>
          Pizza Packing <strong>₹10 Extra</strong> &nbsp;·&nbsp; Self Service from Counter &nbsp;·&nbsp; Degda Complex, Opposite JKLU Jaipur
        </p>
        <p>
          Order accepted after payment &amp; WhatsApp bill dispatch &nbsp;·&nbsp; Direct WhatsApp: <strong>95301 51383</strong>
        </p>
      </div>
    </div>
  );
}
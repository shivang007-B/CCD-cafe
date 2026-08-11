"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  Star,
  Coffee,
  ChevronRight,
  MapPin,
  Phone,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ShoppingBag,
  Plus,
  Flame,
  Sparkles,
  Utensils,
  CheckCircle2,
  Pizza,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";

/* ══════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════ */
const reviews = [
  { user: "@JKLU_Dev", text: "Cold Coffii saved my deadline.", time: "12m ago" },
  { user: "@RiyaCampus", text: "Pav Bhaji = Peak Comfort Food.", time: "45m ago" },
  { user: "@TechBro24", text: "Perry Perry Cheese Maggi is fire!", time: "1h ago" },
  { user: "@ChaiLover", text: "Kulhad Chai at 15 is unbeatable", time: "2h ago" },
  { user: "@FoodieSingh", text: "CCD Special Pizza > everything else", time: "3h ago" },
];

const introVideos = [
  {
    id: 1,
    title: "JKLU Campus Vibe",
    subtitle: "Experience student life at Chai Coffee Darbar",
    src: "/intro (1).mp4",
  },
  {
    id: 2,
    title: "Culinary Craft & Sizzles",
    subtitle: "From thick coffii blend to loaded peri peri maggi",
    src: "/intro (2).mp4",
  },
];

const heroSlides = [
  { label: "Cold Coffii", img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1400&q=90&fit=crop&auto=format" },
  { label: "Masala Maggi", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1400&q=90&fit=crop&auto=format" },
  { label: "CCD Special Pizza", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1400&q=90&fit=crop&auto=format" },
];

const specials = [
  { id: 1, name: "Thick Cold Coffee", price: 50, category: "Cold Coffii", tag: "Best Seller", img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=85&fit=crop&auto=format" },
  { id: 2, name: "CCD Special Pizza", price: 99, category: "Pizza", tag: "Chef's Pick", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=85&fit=crop&auto=format" },
  { id: 3, name: "Perry Perry Cheese Maggi", price: 70, category: "Maggi", tag: "Spicy Hit", img: "https://images.unsplash.com/photo-1542528180-1c2803fa048c?w=600&q=85&fit=crop&auto=format" },
  { id: 4, name: "Veg Cheese Burger", price: 70, category: "Burgers", tag: "Fan Fav", img: "https://images.unsplash.com/photo-1586816001966-79b736744398?w=600&q=85&fit=crop&auto=format" },
  { id: 5, name: "Biscoff Shake", price: 80, category: "Thick Shakes", tag: "New", img: "/b1.jpg" },
  { id: 6, name: "Cheese French Fry", price: 99, category: "Snacks", tag: "Must Try", img: "https://images.unsplash.com/photo-1630431341973-02e1b662ec35?w=600&q=85&fit=crop&auto=format" },
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const [activeSlide, setActiveSlide] = useState(0);
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const { addToCart, setIsCartOpen } = useCart();

  useEffect(() => {
    const id = setInterval(() => {
      setActiveSlide((p) => (p + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [activeVideoIdx, isPlaying, isMuted]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleAddToCart = (item: (typeof specials)[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
      img: item.img,
    });
    setAddedNotice(`Added "${item.name}" to your Cart!`);
    setTimeout(() => setAddedNotice(null), 3000);
  };

  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] font-sans overflow-x-hidden min-h-screen">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {addedNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 bg-[#1A1816] text-[#F5C518] border border-[#D99B00]/40 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3"
          >
            <CheckCircle2 size={18} className="text-[#25D366]" />
            <span className="text-xs font-bold font-sans tracking-wide">{addedNotice}</span>
            <button
              onClick={() => setIsCartOpen(true)}
              className="ml-2 text-[10px] uppercase font-bold text-white underline hover:text-[#F5C518]"
            >
              View Cart
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════ 1. DUAL INTRO VIDEO HERO ══════════════════ */}
      <section className="relative w-full h-[90vh] min-h-[620px] bg-[#1A1816] flex items-end overflow-hidden border-b border-[#D99B00]/30">
        
        {/* Background Video (Seamlessly Switch between Intro 1 & Intro 2) */}
        <video
          ref={videoRef}
          key={introVideos[activeVideoIdx].src}
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] saturate-[1.3] transition-opacity duration-700"
          src={introVideos[activeVideoIdx].src}
          autoPlay
          muted={isMuted}
          loop
          playsInline
        />

        {/* Video Overlay Gradients & Grain */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1816] via-[#1A1816]/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#1A1816]/40 to-[#1A1816] z-10 pointer-events-none" />

        {/* Video Controls Bar */}
        <div className="absolute top-6 right-6 z-30 flex items-center gap-2 bg-[#1A1816]/80 backdrop-blur-md p-1.5 rounded-full border border-[#D99B00]/30">
          <button
            onClick={togglePlay}
            className="p-2 text-[#F5C518] hover:bg-white/10 rounded-full transition-colors"
            title={isPlaying ? "Pause Video" : "Play Video"}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            onClick={toggleMute}
            className="p-2 text-[#F5C518] hover:bg-white/10 rounded-full transition-colors"
            title={isMuted ? "Unmute Video" : "Mute Video"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>

        {/* Hero Content */}
        <motion.div
          className="relative z-20 w-full max-w-[1200px] mx-auto px-6 pb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D99B00]/20 border border-[#D99B00]/40 text-[#F5C518] text-xs font-bold tracking-widest uppercase mb-4">
              <Sparkles size={14} /> Est. JKLU Campus · Jaipur
            </div>

            <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-white leading-none">
              Chai Coffee <br />
              <span className="gold-gradient-text italic font-serif">Darbar</span> Digital
            </h1>

            <p className="mt-4 text-sm md:text-base text-[#FAF8F5]/80 max-w-lg leading-relaxed font-sans">
              Every item under ₹100. The official digital home of JKLU&apos;s favorite student hangout — thick cold coffii, peri peri maggi, burgers &amp; pizzas.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/menu"
                className="px-7 py-3.5 bg-[#D99B00] hover:bg-[#F5C518] text-[#1C1917] font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center gap-2"
              >
                <Utensils size={16} /> View Full Menu
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="px-7 py-3.5 bg-gradient-to-r from-[#DC2626] to-[#C0392B] hover:opacity-90 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center gap-2"
              >
                <ShoppingBag size={16} /> Open Cart &amp; Order
              </button>
            </div>
          </div>

          {/* Dual Video Switcher Selector */}
          <div className="bg-[#1A1816]/90 backdrop-blur-md p-4 rounded-2xl border border-[#D99B00]/30 w-full md:w-auto min-w-[280px] space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#D99B00] flex items-center gap-1.5 mb-2">
              <Flame size={14} /> Switch Intro Video
            </p>
            {introVideos.map((vid, idx) => (
              <button
                key={vid.id}
                onClick={() => setActiveVideoIdx(idx)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                  activeVideoIdx === idx
                    ? "bg-[#D99B00]/20 border-[#F5C518] text-[#F5C518]"
                    : "bg-white/5 border-transparent text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div>
                  <p className="text-xs font-bold">{vid.title}</p>
                  <p className="text-[10px] text-[#C4AD8A] truncate">{vid.subtitle}</p>
                </div>
                {activeVideoIdx === idx && (
                  <span className="w-2 h-2 rounded-full bg-[#F5C518] animate-ping" />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════ 2. INFO STRIP ══════════════════ */}
      <div className="w-full bg-[#1A1816] border-b border-[#D99B00]/20 text-white py-10">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Clock size={20} />, label: "Timings", val: "8 AM – 9:45 PM", sub: "Open every day for students" },
            { icon: <Phone size={20} />, label: "Direct WhatsApp", val: "95301 51383", sub: "Instant Bill & Order Dispatch" },
            { icon: <MapPin size={20} />, label: "Campus Location", val: "Degda Complex", sub: "Opposite JKLU Main Gate" },
          ].map((info) => (
            <motion.div
              key={info.label}
              className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-3 bg-[#D99B00]/20 rounded-xl text-[#F5C518] border border-[#D99B00]/30">
                {info.icon}
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#D99B00]">{info.label}</p>
                <p className="text-lg font-serif font-bold text-white mt-0.5">{info.val}</p>
                <p className="text-xs text-[#C4AD8A] mt-0.5">{info.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══════════════════ 3. BENTO DASHBOARD ══════════════════ */}
      <section className="py-20 max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-[#D99B00] block mb-1">
            Live Campus Hub
          </span>
          <h2 className="text-4xl font-serif font-bold text-[#1C1917]">
            What&apos;s <span className="gold-gradient-text italic">Happening</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* HERO TILE */}
          <div className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden border border-[#E7E0D3] shadow-md min-h-[380px] bg-[#1A1816] group">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Image
                  src={heroSlides[activeSlide].img}
                  alt={heroSlides[activeSlide].label}
                  fill
                  className="object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1816] via-transparent to-transparent z-10" />

            <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-[#1A1816]/80 backdrop-blur-md border border-[#D99B00]/40 rounded-full text-[#F5C518] text-xs font-bold">
              {heroSlides[activeSlide].label}
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F5C518]">Grab Big Deals</span>
              <h3 className="text-3xl font-serif font-bold mt-1">On Yummy Campus Meals</h3>
            </div>
          </div>

          {/* STAT TILE */}
          <div className="bg-white border border-[#E7E0D3] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <span className="font-serif text-5xl font-bold text-[#D99B00]">142+</span>
              <div className="p-3 bg-[#D99B00]/10 rounded-xl text-[#D99B00]">
                <Star size={20} fill="currentColor" />
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#78716C]">Orders This Hour</p>
              <p className="text-lg font-serif font-bold text-[#1C1917] mt-1">Masala Maggi</p>
              <div className="h-1.5 bg-[#F2EDE4] rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#D99B00] to-[#F5C518] w-4/5 rounded-full" />
              </div>
            </div>
          </div>

          {/* LIVE REVIEWS TILE */}
          <div className="bg-white border border-[#E7E0D3] rounded-2xl p-6 shadow-sm md:row-span-2 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif font-bold text-lg text-[#1C1917]">Student Vibes</h3>
              <div className="flex items-center gap-1.5 text-xs text-[#DC2626] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-ping" /> Live
              </div>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto max-h-[220px] pr-1">
              {reviews.map((rev, idx) => (
                <div key={idx} className="p-3 bg-[#FAF8F5] border border-[#E7E0D3] rounded-xl text-xs space-y-1">
                  <div className="flex justify-between font-bold text-[#D99B00]">
                    <span>{rev.user}</span>
                    <span className="text-[10px] text-[#78716C]">{rev.time}</span>
                  </div>
                  <p className="italic text-[#1C1917]">&ldquo;{rev.text}&rdquo;</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="w-full mt-4 py-2.5 bg-[#1A1816] text-[#F5C518] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#2D2824] transition-colors"
            >
              Order Your Favorite
            </button>
          </div>

          {/* QUICK COLD COFFEE TILE */}
          <div className="bg-[#1A1816] text-white border border-[#D99B00]/30 rounded-2xl p-6 shadow-md flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <div className="p-3 bg-[#D99B00]/20 rounded-xl text-[#F5C518]">
                <Coffee size={20} />
              </div>
              <ArrowUpRight size={20} className="text-[#C4AD8A]" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#D99B00]">Campus Legend</p>
              <h4 className="text-lg font-serif font-bold mt-1 text-white">Thick Cold Coffee</h4>
              <button
                onClick={() =>
                  handleAddToCart({
                    id: 1,
                    name: "Thick Cold Coffee",
                    price: 50,
                    category: "Cold Coffii",
                    tag: "Best Seller",
                    img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=85&fit=crop&auto=format",
                  })
                }
                className="w-full mt-4 py-2.5 bg-[#D99B00] text-black text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#F5C518] transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus size={14} /> Add to Cart — ₹50
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ 4. SPECIALS (Campus Favourites) ══════════════════ */}
      <section className="py-16 max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#D99B00] block mb-1">
              Handpicked For You
            </span>
            <h2 className="text-4xl font-serif font-bold text-[#1C1917]">
              Campus <span className="gold-gradient-text italic">Favourites</span>
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#DC2626] hover:underline"
          >
            Explore All 73 Items <ChevronRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {specials.map((item, idx) => (
            <motion.div
              key={item.id}
              className="menu-card flex flex-col justify-between overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <div className="relative h-52 w-full overflow-hidden bg-[#F2EDE4]">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-108"
                />
                <div className="absolute top-3 left-3 bg-[#DC2626] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                  {item.tag}
                </div>
                <div className="absolute bottom-3 right-3 font-serif font-bold text-xl text-[#F5C518] bg-[#1A1816]/90 px-3 py-1 rounded-lg border border-[#D99B00]/40 shadow-md">
                  ₹{item.price}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#1C1917]">{item.name}</h3>
                  <p className="text-xs text-[#78716C] mt-1">{item.category}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E7E0D3]">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="py-2.5 px-3 bg-[#D99B00] text-black hover:bg-[#F5C518] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <Plus size={14} /> Add Cart
                  </button>
                  <button
                    onClick={() => {
                      handleAddToCart(item);
                      setIsCartOpen(true);
                    }}
                    className="py-2.5 px-3 bg-[#1A1816] text-white hover:bg-[#2D2824] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <ShoppingBag size={14} /> Order Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════ 5. CTA BANNER ══════════════════ */}
      <section className="pb-20 max-w-[1200px] mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden bg-[#1A1816] border border-[#D99B00]/30 shadow-xl p-10 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F5C518] block mb-2">
              Chai Coffee Darbar Digital
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
              Explore Our <span className="gold-gradient-text italic">Full 73 Item</span> Menu
            </h2>
            <p className="mt-4 text-sm text-[#C4AD8A] leading-relaxed">
              Every single item is under ₹100. Cold coffii, thick shakes, loaded maggi, garlic bread &amp; crispy burgers — ready for quick pickup or campus delivery.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/menu"
              className="px-8 py-4 bg-[#D99B00] hover:bg-[#F5C518] text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              See Menu <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
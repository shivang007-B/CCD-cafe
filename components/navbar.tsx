"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Coffee, Menu, X, ArrowUpRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function NavBar() {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const pathname = usePathname();
    const { totalItemsCount, setIsCartOpen } = useCart();

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Menu", href: "/menu" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                isScrolled
                    ? "bg-[#1A1816]/95 backdrop-blur-md py-3 shadow-md border-b border-[#D99B00]/20"
                    : "bg-[#1A1816]/80 backdrop-blur-sm py-4 border-b border-white/5"
            }`}
        >
            <div className="max-w-[1200px] mx-auto px-4 xl:px-0">
                <div className="flex items-center justify-between h-14 md:h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="text-[#F5C518] p-2 bg-[#D99B00]/15 rounded-xl border border-[#D99B00]/30 group-hover:bg-[#D99B00]/30 transition-all">
                            <Coffee className="h-5 w-5 md:h-6 md:w-6" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-serif font-bold text-lg md:text-xl text-white tracking-wider leading-none">
                                <span className="text-[#F5C518] italic">C</span>CD
                            </span>
                            <span className="text-[10px] md:text-xs text-[#C4AD8A] leading-none mt-1 font-sans tracking-wide">
                                JKLU Students Hangout Spot
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-7">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-xs font-bold font-sans uppercase tracking-widest transition-colors hover:text-[#F5C518] ${
                                    pathname === link.href ? "text-[#F5C518]" : "text-[#FAF8F5]/80"
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Cart Drawer Trigger */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative flex items-center gap-2 px-4 py-2 bg-[#FAF8F5]/10 hover:bg-[#FAF8F5]/20 text-[#F5C518] border border-[#D99B00]/40 rounded-full font-bold text-xs uppercase tracking-wider transition-all"
                            aria-label="Open Food Cart"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            <span>Cart</span>
                            {totalItemsCount > 0 && (
                                <span className="bg-[#DC2626] text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border border-white">
                                    {totalItemsCount}
                                </span>
                            )}
                        </button>

                        <Link
                            href="/menu"
                            className="px-5 py-2.5 bg-gradient-to-r from-[#DC2626] to-[#C0392B] text-white hover:opacity-90 rounded-full font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5 transition-all"
                        >
                            Order Now <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </nav>

                    {/* Mobile Menu & Cart */}
                    <div className="md:hidden flex items-center gap-3">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 text-[#F5C518]"
                            aria-label="Open Cart"
                        >
                            <ShoppingBag className="h-6 w-6" />
                            {totalItemsCount > 0 && (
                                <span className="absolute top-0 right-0 bg-[#DC2626] text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                    {totalItemsCount}
                                </span>
                            )}
                        </button>
                        <button
                            className="p-2 text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6 text-[#F5C518]" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Drawer */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-[#1A1816] border-b border-[#D99B00]/30 shadow-xl absolute top-full left-0 right-0">
                    <nav className="flex flex-col p-5 gap-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-bold uppercase tracking-wider p-2.5 rounded-lg font-sans transition-all ${
                                    pathname === link.href
                                        ? "bg-[#D99B00]/20 text-[#F5C518] border border-[#D99B00]/30"
                                        : "text-[#FAF8F5]/80 hover:bg-white/5"
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/menu"
                            className="w-full mt-2 py-3 text-center bg-[#DC2626] text-white rounded-xl font-bold uppercase tracking-wider text-xs"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            View Menu & Order
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}

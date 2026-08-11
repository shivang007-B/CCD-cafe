import Image from "next/image";
import { Coffee, GraduationCap, Clock, Utensils, Pizza, Camera, Sparkles, Heart, Award } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="bg-[#FAF8F5] text-[#1C1917] font-sans min-h-screen py-16 px-6">
            <div className="max-w-5xl mx-auto space-y-16">
                
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#D99B00]/15 border border-[#D99B00]/30 text-[#D99B00] text-xs font-bold uppercase tracking-widest rounded-full">
                        <Sparkles size={14} /> Our Heritage
                    </div>
                    <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#1C1917]">
                        Our <span className="gold-gradient-text italic">Story</span>
                    </h1>
                    <p className="text-base text-[#78716C] font-serif italic">
                        More than just a cafe. An emotion of JKLU campus since day one.
                    </p>
                </div>

                {/* Hub of JKLU Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="font-serif text-3xl font-bold text-[#1C1917]">The Heart of JKLU Campus</h2>
                        <p className="text-[#78716C] leading-relaxed text-sm md:text-base">
                            What started as a small stall serving tea and simple snacks quickly blossomed into the unofficial heart of the JKLU campus. Chai Coffee Darbar isn&apos;t just where you go when you&apos;re hungry; it&apos;s where ideas are born, projects are finished at the 11th hour, and lifelong friendships are forged over a shared plate of Double Masala Maggi.
                        </p>
                        <p className="text-[#78716C] leading-relaxed text-sm md:text-base">
                            We understand the student budget and the student appetite. That&apos;s why our commitment has always been: high quality, generous portions, and prices that don&apos;t make you think twice — with every item under ₹100.
                        </p>

                        <div className="grid grid-cols-3 gap-4 pt-2">
                            <div className="flex flex-col items-center text-center p-3 bg-white border border-[#E7E0D3] rounded-xl shadow-sm">
                                <div className="p-2.5 bg-[#D99B00]/15 text-[#D99B00] rounded-full mb-2">
                                    <GraduationCap className="w-5 h-5" />
                                </div>
                                <div className="font-bold text-xs text-[#1C1917]">Student Rates</div>
                            </div>
                            <div className="flex flex-col items-center text-center p-3 bg-white border border-[#E7E0D3] rounded-xl shadow-sm">
                                <div className="p-2.5 bg-[#D99B00]/15 text-[#D99B00] rounded-full mb-2">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div className="font-bold text-xs text-[#1C1917]">Swift Service</div>
                            </div>
                            <div className="flex flex-col items-center text-center p-3 bg-white border border-[#E7E0D3] rounded-xl shadow-sm">
                                <div className="p-2.5 bg-[#D99B00]/15 text-[#D99B00] rounded-full mb-2">
                                    <Coffee className="w-5 h-5" />
                                </div>
                                <div className="font-bold text-xs text-[#1C1917]">Thick Brews</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-[380px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl border border-[#D99B00]/40 bg-[#1A1816]">
                        <Image
                            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80&fit=crop&auto=format"
                            alt="Cafe Vibe"
                            fill
                            className="object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1816] via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                            <span className="font-serif text-3xl font-bold italic text-[#F5C518]">The Campus Vibe Check</span>
                        </div>
                    </div>
                </div>

                {/* Wall of Love Testimonials */}
                <div className="space-y-10">
                    <div className="text-center space-y-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#D99B00]">Student Love</span>
                        <h2 className="font-serif text-3xl font-bold text-[#1C1917]">The Wall of Love</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white border border-[#E7E0D3] p-6 rounded-2xl shadow-sm space-y-4">
                            <div className="text-[#D99B00] text-3xl font-serif leading-none">&ldquo;</div>
                            <p className="text-xs text-[#78716C] italic leading-relaxed">
                                CCD&apos;s thick cold coffee literally got me through my final year engineering projects. It&apos;s the fuel of JKLU.
                            </p>
                            <div className="font-bold text-xs text-[#1C1917] pt-2 border-t border-[#E7E0D3]">- Rahul S., B.Tech &apos;25</div>
                        </div>
                        <div className="bg-[#1A1816] text-white border border-[#D99B00]/40 p-6 rounded-2xl shadow-md space-y-4">
                            <div className="text-[#F5C518] text-3xl font-serif leading-none">&ldquo;</div>
                            <p className="text-xs text-[#C4AD8A] italic leading-relaxed">
                                You haven&apos;t really experienced JKLU if you haven&apos;t debated with friends over a plate of peri peri cheese maggi.
                            </p>
                            <div className="font-bold text-xs text-[#F5C518] pt-2 border-t border-white/10">- Priya K., Design &apos;24</div>
                        </div>
                        <div className="bg-white border border-[#E7E0D3] p-6 rounded-2xl shadow-sm space-y-4">
                            <div className="text-[#D99B00] text-3xl font-serif leading-none">&ldquo;</div>
                            <p className="text-xs text-[#78716C] italic leading-relaxed">
                                The only place near campus where the food feels like a warm hug from home after a long day of lectures.
                            </p>
                            <div className="font-bold text-xs text-[#1C1917] pt-2 border-t border-[#E7E0D3]">- Aman M., BBA &apos;26</div>
                        </div>
                    </div>
                </div>

                {/* Gallery Section with Real Vector Icons */}
                <div className="space-y-8">
                    <div className="text-center space-y-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#D99B00]">Real Flavors</span>
                        <h2 className="font-serif text-3xl font-bold text-[#1C1917]">Gallery Snapshot</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: <Utensils className="w-8 h-8 text-[#D99B00]" />, title: "Burgers" },
                            { icon: <Coffee className="w-8 h-8 text-[#D99B00]" />, title: "Cold Coffii" },
                            { icon: <Pizza className="w-8 h-8 text-[#D99B00]" />, title: "Special Pizza" },
                            { icon: <Camera className="w-8 h-8 text-[#D99B00]" />, title: "Memories" },
                        ].map((item, idx) => (
                            <div key={idx} className="aspect-square bg-white border border-[#E7E0D3] rounded-2xl overflow-hidden relative flex flex-col items-center justify-center p-6 text-center hover:border-[#D99B00] hover:shadow-md transition-all group">
                                <div className="p-4 bg-[#D99B00]/10 rounded-2xl group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <span className="mt-3 font-bold text-xs text-[#1C1917]">{item.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

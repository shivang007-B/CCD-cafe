"use client";

import { MapPin, Phone, Clock, MessageCircle, Sparkles, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
    const waNumber = "919530151383";
    const waMessage = encodeURIComponent("Hi CCD! I have a query / order request from the website.");

    return (
        <div className="bg-[#FAF8F5] text-[#1C1917] font-sans min-h-screen py-16 px-6">
            <div className="max-w-6xl mx-auto space-y-12">
                
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#D99B00]/15 border border-[#D99B00]/30 text-[#D99B00] text-xs font-bold uppercase tracking-widest rounded-full">
                        <Sparkles size={14} /> Location &amp; Orders
                    </div>
                    <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#1C1917]">
                        Find <span className="gold-gradient-text italic">Us</span>
                    </h1>
                    <p className="text-sm text-[#78716C] leading-relaxed">
                        We&apos;re right at Degda Complex, opposite JKLU main gate. Stop by for a quick bite or drop a message via WhatsApp to send your order bill directly.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

                    {/* Contact Info Card */}
                    <div className="lg:col-span-1 bg-white border border-[#E7E0D3] rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6">
                        <div>
                            <h3 className="font-serif text-2xl font-bold mb-6 text-[#1C1917]">Get in Touch</h3>

                            <div className="space-y-6 text-xs md:text-sm">
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#D99B00]/15 p-3 rounded-xl text-[#D99B00] shrink-0 border border-[#D99B00]/30">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#1C1917] mb-0.5">Our Campus Location</h4>
                                        <p className="text-[#78716C] leading-relaxed">Degda Complex, Opposite JK Lakshmipat University,<br />Mahapura, Ajmer Road, Jaipur 302026</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-[#D99B00]/15 p-3 rounded-xl text-[#D99B00] shrink-0 border border-[#D99B00]/30">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#1C1917] mb-0.5">Operating Hours</h4>
                                        <p className="text-[#78716C] mb-1">Mon - Sun: 8:00 AM - 9:45 PM</p>
                                        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#25D366] bg-[#25D366]/10 px-2.5 py-0.5 rounded-full border border-[#25D366]/20">
                                            <CheckCircle2 size={12} /> Open Every Day
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-[#D99B00]/15 p-3 rounded-xl text-[#D99B00] shrink-0 border border-[#D99B00]/30">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#1C1917] mb-0.5">Direct Phone &amp; WhatsApp</h4>
                                        <p className="text-[#1C1917] font-semibold font-mono text-sm">+91 95301 51383</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-[#E7E0D3]">
                            <a
                                href={`https://wa.me/${waNumber}?text=${waMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3.5 bg-[#25D366] hover:bg-[#1DA851] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Chat on WhatsApp (9530151383)
                            </a>
                        </div>
                    </div>

                    {/* Google Map Section */}
                    <div className="lg:col-span-2 bg-white border border-[#E7E0D3] rounded-2xl overflow-hidden shadow-sm h-full min-h-[420px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.187310543507!2d75.64817088495679!3d26.833973683161678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396ce216ca882df%3A0xc3f34e38e8cb9b7c!2sJK%20Lakshmipat%20University!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: "450px" }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="CCD Location Map"
                            className="w-full h-full grayscale-[15%] contrast-110"
                        ></iframe>
                    </div>

                </div>
            </div>
        </div>
    );
}

// src/components/sections/ContactSection.tsx
import { ArrowRight, CheckCircle2, Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import type { Lang } from "../data/content";
import { copy } from "../data/content";

const inputCls =
    "mt-2 w-full rounded-2xl border border-navy-200 bg-white/70 px-4 py-3.5 text-sm font-medium text-navy-900 placeholder-navy-400 outline-none transition focus:border-bolt-500 focus:bg-white focus:ring-2 focus:ring-bolt-500/20 dark:border-navy-700 dark:bg-navy-800/70 dark:text-white";

export default function ContactSection({ lang }: { lang: Lang }) {
    const t = copy[lang];
    const en = lang === "en";

    const contactRows = [
        {
            Icon: MapPin,
            label: en ? "Office" : "Ofisi",
            value: "KIBAHA, PWANI, Tanzania",
            iconBg: "bg-[#1e3a8a]",
            iconShadow: "shadow-blue-900/20",
        },
        {
            Icon: Mail,
            label: en ? "Email" : "Barua pepe",
            value: "ogbestseller01@gmail.com",
            iconBg: "bg-[#fbbf24]",
            iconShadow: "shadow-amber-500/20",
        },
        {
            Icon: Phone,
            label: en ? "Phone" : "Simu",
            value: "+255 612 118 849 · +255 679 117 297",
            iconBg: "bg-[#34d399]",
            iconShadow: "shadow-emerald-500/20",
        },
    ];

    return (
        <section id="contact" className="section-pad relative overflow-hidden bg-[#f8fafc] dark:bg-navy-900">
            {/* Subtle grid background */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
                style={{
                    backgroundImage:
                        "linear-gradient(#001533 1px, transparent 1px), linear-gradient(90deg, #001533 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />

            <div className="container-page relative">
                {/* Header */}
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <h2 className="text-4xl font-black tracking-tight text-navy-900 sm:text-5xl dark:text-white">
                        {t.contactTitle}
                    </h2>
                    <p className="mt-5 text-lg leading-8 text-navy-600 dark:text-navy-200">
                        {t.contactText}
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
                    {/* Left: contact info cards */}
                    <div className="space-y-4">
                        {contactRows.map(({ Icon, label, value, iconBg, iconShadow }) => (
                            <div
                                key={label}
                                className="group flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-navy-700 dark:bg-navy-800"
                            >
                                <div
                                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg} text-white shadow-lg ${iconShadow}`}
                                >
                                    <Icon size={22} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-bold uppercase tracking-wider text-navy-400 dark:text-navy-400">
                                        {label}
                                    </p>
                                    <p className="mt-1 truncate text-lg font-bold text-navy-900 dark:text-white">
                                        {value}
                                    </p>
                                </div>
                                <ArrowRight
                                    size={18}
                                    className="shrink-0 text-navy-200 transition group-hover:translate-x-1 group-hover:text-navy-400 dark:text-navy-600"
                                />
                            </div>
                        ))}

                        {/* Reply fast highlight */}
                        <div className="relative mt-6 flex items-center gap-4 rounded-2xl border-2 border-dashed border-navy-200 bg-white/60 p-5 dark:border-navy-700 dark:bg-navy-800/60">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1e3a8a] text-white shadow-lg shadow-blue-900/20">
                                <Clock size={22} />
                            </div>
                            <div className="flex-1">
                                <p className="text-base font-bold text-navy-900 dark:text-white">
                                    {en ? "We reply fast" : "Tunajibu haraka"}
                                </p>
                                <p className="text-sm font-medium text-navy-500 dark:text-navy-300">
                                    {en
                                        ? "Usually within 2 hours during business days."
                                        : "Kwa kawaida ndani ya saa 2 wakati wa siku za kazi."}
                                </p>
                            </div>
                            <CheckCircle2 className="shrink-0 text-[#34d399]" size={24} />
                        </div>
                    </div>

                    {/* Right: form */}
                    <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/60 p-7 shadow-xl backdrop-blur-xl sm:p-9 dark:border-navy-700 dark:bg-navy-800/60">
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 to-white/10" />

                        <div className="relative">
                            <div className="mb-8 flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1e3a8a] text-white shadow-lg shadow-blue-900/20">
                                    <MessageSquare size={22} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-navy-900 dark:text-white">
                                        {en ? "Send us a message" : "Tutumie ujumbe"}
                                    </h3>
                                    <p className="text-sm font-medium text-navy-500 dark:text-navy-300">
                                        {en
                                            ? "We'll get back to you within 2 hours"
                                            : "Tutakujibu ndani ya saa 2"}
                                    </p>
                                </div>
                            </div>

                            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <label className="text-sm font-bold text-navy-900 dark:text-navy-200">
                                        {en ? "Name" : "Jina"}
                                        <input
                                            className={inputCls}
                                            placeholder={en ? "Your name" : "Jina lako"}
                                        />
                                    </label>
                                    <label className="text-sm font-bold text-navy-900 dark:text-navy-200">
                                        {en ? "Email" : "Barua pepe"}
                                        <input
                                            type="email"
                                            className={inputCls}
                                            placeholder="you@example.com"
                                        />
                                    </label>
                                </div>
                                <label className="block text-sm font-bold text-navy-900 dark:text-navy-200">
                                    {en ? "Message" : "Ujumbe"}
                                    <textarea
                                        className={`${inputCls} min-h-36 resize-none`}
                                        placeholder={
                                            en ? "How can we help?" : "Tunawezaje kukusaidia?"
                                        }
                                    />
                                </label>
                                <button
                                    type="submit"
                                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#0f172a] py-4 text-base font-bold text-white transition hover:bg-navy-800 hover:shadow-lg hover:shadow-navy-900/20"
                                >
                                    <ArrowRight
                                        size={17}
                                        className="transition-transform group-hover:translate-x-1"
                                    />
                                    {en ? "Send message" : "Tuma ujumbe"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
// src/components/sections/ContactSection.tsx
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import type { Lang } from "../data/content";
import { copy } from "../data/content";

const inputCls =
    "mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium outline-none transition focus:border-bolt-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white";

export default function ContactSection({ lang }: { lang: Lang }) {
    const t = copy[lang];
    const en = lang === "en";

    return (
        <section id="contact" className="section-pad bg-white dark:bg-navy-900">
            <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                    <span className="eyebrow">{t.contactEyebrow}</span>
                    <h2 className="text-4xl font-black tracking-tight sm:text-5xl dark:text-white">
                        {t.contactTitle}
                    </h2>
                    <p className="mt-5 max-w-xl text-lg leading-8 text-slate-500 dark:text-slate-300">
                        {t.contactText}
                    </p>

                    <ul className="mt-8 space-y-4">
                        {[
                            {
                                Icon: MapPin,
                                label: en ? "Office" : "Ofisi",
                                value: "Morocco, Dar es Salaam, Tanzania",
                            },
                            {
                                Icon: Mail,
                                label: en ? "Email" : "Barua pepe",
                                value: "ogbestseller01@gmail.com",
                            },
                            {
                                Icon: Phone,
                                label: en ? "Phone" : "Simu",
                                value: "+255 612 118 849 · +255 679 117 297",
                            },
                        ].map(({ Icon, label, value }) => (
                            <li key={label} className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-bolt-500/15 text-bolt-700 dark:text-bolt-300">
                  <Icon size={20} />
                </span>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400">
                                        {label}
                                    </p>
                                    <p className="font-bold dark:text-white">{value}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <form
                    className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-xl shadow-navy-800/5 sm:p-9 dark:border-slate-700 dark:bg-navy-800"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div className="grid gap-5 sm:grid-cols-2">
                        <label className="text-sm font-bold dark:text-slate-200">
                            {en ? "Name" : "Jina"}
                            <input
                                className={inputCls}
                                placeholder={en ? "Your name" : "Jina lako"}
                            />
                        </label>
                        <label className="text-sm font-bold dark:text-slate-200">
                            {en ? "Email" : "Barua pepe"}
                            <input
                                type="email"
                                className={inputCls}
                                placeholder="you@example.com"
                            />
                        </label>
                    </div>
                    <label className="mt-5 block text-sm font-bold dark:text-slate-200">
                        {en ? "Message" : "Ujumbe"}
                        <textarea
                            className={`${inputCls} min-h-36`}
                            placeholder={
                                en ? "How can we help?" : "Tunawezaje kukusaidia?"
                            }
                        />
                    </label>
                    <button className="btn-primary mt-5 w-full">
                        {en ? "Send message" : "Tuma ujumbe"} <ArrowRight size={17} />
                    </button>
                </form>
            </div>
        </section>
    );
}
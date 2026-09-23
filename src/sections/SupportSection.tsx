// src/components/sections/SupportSection.tsx
import { ArrowRight, Headphones, MessageCircle, Phone } from "lucide-react";
import type { Lang } from "../data/content";
import { copy } from "../data/content";

export default function SupportSection({ lang }: { lang: Lang }) {
    const t = copy[lang];
    const en = lang === "en";

    return (
        <section
            id="support"
            className="section-pad bg-slate-50 dark:bg-navy-800/50"
        >
            <div className="container-page">
                <div className="relative overflow-hidden rounded-[36px] bg-navy-900 p-8 text-white sm:p-12 dark:ring-1 dark:ring-slate-700">
                    <span className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-bolt-500/20 blur-3xl" />
                    <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                        <div>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-bolt-300">
                <Headphones size={16} /> {en ? "Support" : "Msaada"}
              </span>
                            <h2 className="mt-4 text-4xl font-black">{t.supportTitle}</h2>
                            <p className="mt-4 max-w-xl leading-7 text-slate-300">
                                {t.supportText}
                            </p>
                        </div>
                        <div className="grid gap-3">
                            <a
                                href="mailto:info.nearbyfundi@gmail.com"
                                className="group flex items-center gap-4 rounded-2xl bg-bolt-400 p-4 font-bold text-navy-900 transition hover:bg-bolt-300"
                            >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-900 text-bolt-300">
                  <MessageCircle size={20} />
                </span>
                                <span className="flex-1">
                  {en ? "Email support" : "Tuma barua pepe"}
                </span>
                                <ArrowRight
                                    size={18}
                                    className="transition group-hover:translate-x-1"
                                />
                            </a>
                            <a
                                href="tel:0682131140"
                                className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 font-bold transition hover:bg-white/10"
                            >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10">
                  <Phone size={20} />
                </span>
                                <span className="flex-1">
                  {en ? "Call" : "Piga simu"} +255 679 117 297
                </span>
                                <ArrowRight
                                    size={18}
                                    className="transition group-hover:translate-x-1"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
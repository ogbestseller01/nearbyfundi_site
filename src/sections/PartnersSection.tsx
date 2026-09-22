// src/components/sections/PartnersSection.tsx
import { ExternalLink } from "lucide-react";
import type { Lang } from "../data/content";
import { copy, partners } from "../data/content";
import { Reveal } from "../components/Motion";
import PartnerLogo from "./PartnerLogo";

export default function PartnersSection({ lang }: { lang: Lang }) {
    const t = copy[lang];
    const en = lang === "en";

    return (
        <section
            id="partners"
            className="section-pad bg-[#f6fbf9] dark:bg-slate-900/40"
        >
            <div className="container-page">
                <Reveal className="mx-auto max-w-3xl text-center">
                    <span className="eyebrow">{t.partnersEyebrow}</span>
                    <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl dark:text-white">
                        {t.partnersTitle}
                    </h2>
                    <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                        {t.partnersText}
                    </p>
                </Reveal>

                <div className="mt-14">
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 md:gap-6">
                        {partners.map((p) => (
                            <a
                                key={p.name}
                                href={p.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative flex min-w-[160px] max-w-[220px] flex-1 flex-col items-center gap-4 rounded-3xl border border-slate-200/80 bg-white px-6 py-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/10 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-emerald-500/60"
                            >
                                <PartnerLogo logo={p.logo} logoText={p.logoText} />
                                <div>
                                    <h3 className="text-base font-black text-slate-900 dark:text-white">
                                        {p.name}
                                    </h3>
                                    <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                        {en ? p.descriptionEn : p.descriptionSw}
                                    </p>
                                </div>
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 opacity-0 transition group-hover:opacity-100 dark:text-emerald-400">
                  {en ? "Visit website" : "Tembelea tovuti"}
                                    <ExternalLink
                                        size={13}
                                        className="transition group-hover:translate-x-0.5"
                                    />
                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
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
            className="section-pad bg-navy-50 dark:bg-navy-800/40"
        >
            <div className="container-page">
                <Reveal className="mx-auto max-w-3xl text-center">
                    <span className="eyebrow">{t.partnersEyebrow}</span>
                    <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl dark:text-white">
                        {t.partnersTitle}
                    </h2>
                    <p className="mt-5 text-lg leading-8 text-navy-600 dark:text-navy-200">
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
                                className="group relative flex min-w-[160px] max-w-[220px] flex-1 flex-col items-center gap-4 rounded-3xl border border-navy-200/80 bg-white px-6 py-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-bolt-400 hover:shadow-xl hover:shadow-bolt-500/10 dark:border-navy-700 dark:bg-navy-800 dark:hover:border-bolt-500/60"
                            >
                                <PartnerLogo logo={p.logo} logoText={p.logoText} />
                                <div>
                                    <h3 className="text-base font-black text-navy-800 dark:text-white">
                                        {p.name}
                                    </h3>
                                    <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-bolt-900 dark:text-bolt-800">
                                        {en ? p.descriptionEn : p.descriptionSw}
                                    </p>
                                </div>
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-bolt-700 opacity-0 transition group-hover:opacity-100 dark:text-bolt-400">
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
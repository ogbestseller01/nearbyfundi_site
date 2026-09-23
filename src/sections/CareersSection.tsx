// src/components/sections/CareersSection.tsx
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import type { Lang } from "../data/content";
import { copy } from "../data/content";

export default function CareersSection({ lang }: { lang: Lang }) {
    const t = copy[lang];
    const en = lang === "en";

    return (
        <section
            id="careers"
            className="bg-white py-16 sm:py-20 dark:bg-navy-900"
        >
            <div className="container-page">
                <div className="relative overflow-hidden rounded-[36px] bg-bolt-400 p-8 sm:p-14">
                    <span className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold-300/60 blur-2xl" />
                    <span className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-white/30 blur-2xl" />
                    <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                        <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-3.5 py-1.5 text-xs font-bold text-bolt-300">
                <BriefcaseBusiness size={14} /> {en ? "Careers" : "Kazi"}
              </span>
                            <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-navy-900 sm:text-5xl">
                                {t.careersTitle}
                            </h2>
                            <p className="mt-5 max-w-2xl text-lg leading-8 text-navy-800/80">
                                {t.careersText}
                            </p>
                        </div>
                        <a
                            href="mailto:info.nearbyfundi@gmail.com?subject=Careers%20at%20NearbyFundi"
                            className="btn-dark"
                        >
                            {en ? "Send your CV" : "Tuma CV yako"} <ArrowRight size={17} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
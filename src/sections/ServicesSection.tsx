// src/components/sections/ServicesSection.tsx
import { useMemo, useState } from "react";
import {
    ArrowRight,
    Building2,
    CarFront,
    ChevronDown,
    Droplets,
    Flame,
    Grid3x3,
    Home,
    type LucideIcon,
    PartyPopper,
    Refrigerator,
    Search,
    Shirt,
    Smartphone,
    Sofa,
    Sparkles,
    X,
    Zap,
} from "lucide-react";
import type { Lang } from "../data/content";
import { copy } from "../data/content";
import { serviceCategories, totalServiceCount } from "../data/services";
import { Reveal } from "../components/Motion";

const categoryIcons: Record<string, LucideIcon> = {
    Building2,
    Zap,
    Droplets,
    Refrigerator,
    Smartphone,
    CarFront,
    Shirt,
    Sofa,
    Flame,
    Sparkles,
    Home,
    PartyPopper,
};

export default function ServicesSection({ lang }: { lang: Lang }) {
    const t = copy[lang];
    const en = lang === "en";

    const [serviceLang, setServiceLang] = useState<Lang>(lang);
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [query, setQuery] = useState("");
    const [expanded, setExpanded] = useState(false);
    const normalizedQuery = query.trim().toLowerCase();

    const filteredCategories = useMemo(() => {
        return serviceCategories
            .map((cat) => {
                const items = cat.items.filter((item) => {
                    if (!(activeCategory === "all" || activeCategory === cat.key))
                        return false;
                    if (!normalizedQuery) return true;
                    return (
                        item.en.toLowerCase().includes(normalizedQuery) ||
                        (item.sw ?? "").toLowerCase().includes(normalizedQuery)
                    );
                });
                return { ...cat, items };
            })
            .filter((cat) => cat.items.length > 0);
    }, [activeCategory, normalizedQuery]);

    const resultCount = filteredCategories.reduce(
        (n, c) => n + c.items.length,
        0
    );
    const isBrowsingAll = activeCategory === "all" && !normalizedQuery;
    const visibleCategories =
        isBrowsingAll && !expanded
            ? filteredCategories.slice(0, 4)
            : filteredCategories;

    const pillBtn = (active: boolean) =>
        `flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-sm font-bold transition ${
            active
                ? "bg-slate-950 text-white dark:bg-emerald-400 dark:text-slate-950"
                : "text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-800"
        }`;

    return (
        <section
            id="services"
            className="section-pad bg-[#f6fbf9] dark:bg-slate-900/40"
        >
            <div className="container-page">
                <Reveal className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                    <div>
                        <span className="eyebrow">{t.serviceEyebrow}</span>
                        <h2 className="max-w-2xl text-4xl font-black tracking-tight sm:text-5xl dark:text-white">
                            {t.serviceTitle}
                        </h2>
                        <p className="mt-4 max-w-xl text-slate-500 dark:text-slate-400">
                            {t.serviceSubtitle}
                        </p>
                    </div>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-1.5 font-black text-emerald-700 dark:text-emerald-400"
                    >
                        {en ? "Talk to us" : "Zungumza nasi"} <ArrowRight size={16} />
                    </a>
                </Reveal>

                <div className="mt-10 grid gap-8 lg:grid-cols-[260px_1fr]">
                    <aside>
                        <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-2 lg:sticky lg:top-24 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
                            <button
                                onClick={() => {
                                    setActiveCategory("all");
                                    setExpanded(false);
                                }}
                                className={pillBtn(activeCategory === "all")}
                            >
                                <Grid3x3 size={16} />
                                {t.serviceAllCategories}
                            </button>
                            {serviceCategories.map((cat) => {
                                const Icon = categoryIcons[cat.icon] ?? Grid3x3;
                                const active = activeCategory === cat.key;
                                return (
                                    <button
                                        key={cat.key}
                                        onClick={() => {
                                            setActiveCategory(active ? "all" : cat.key);
                                            setExpanded(false);
                                        }}
                                        className={pillBtn(active)}
                                    >
                                        <Icon size={16} />
                                        <span className="whitespace-nowrap lg:whitespace-normal">
                      {serviceLang === "en" ? cat.labelEn : cat.labelSw}
                    </span>
                                        <span
                                            className={`ml-auto rounded-full px-1.5 py-0.5 text-[11px] ${
                                                active
                                                    ? "bg-white/20"
                                                    : "bg-slate-200/70 dark:bg-slate-800"
                                            }`}
                                        >
                      {cat.items.length}
                    </span>
                                    </button>
                                );
                            })}
                        </div>
                    </aside>

                    <div className="min-w-0">
                        <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-center dark:border-slate-700 dark:bg-slate-900">
                            <div className="relative flex-1">
                                <Search
                                    size={18}
                                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        setExpanded(true);
                                    }}
                                    type="text"
                                    placeholder={t.serviceSearchPlaceholder}
                                    className="w-full rounded-2xl bg-slate-50 py-3.5 pl-11 pr-10 text-sm font-medium outline-none transition focus:bg-slate-100 dark:bg-slate-800 dark:text-white"
                                />
                                {query && (
                                    <button
                                        onClick={() => setQuery("")}
                                        aria-label="Clear search"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-white"
                                    >
                                        <X size={15} />
                                    </button>
                                )}
                            </div>
                            <div className="flex shrink-0 items-center gap-2.5 px-1">
                <span className="text-xs font-semibold text-slate-400">
                  {t.serviceViewLang}
                </span>
                                <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1 dark:bg-slate-800">
                                    {(["en", "sw"] as const).map((code) => (
                                        <button
                                            key={code}
                                            onClick={() => setServiceLang(code)}
                                            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                                                serviceLang === code
                                                    ? "bg-white shadow-sm dark:bg-slate-600"
                                                    : "opacity-60 hover:opacity-100"
                                            }`}
                                        >
                                            <img
                                                src={code === "en" ? "/uk-flag.png" : "/tz-flag.jpg"}
                                                alt={code === "en" ? "English" : "Swahili"}
                                                className="h-3.5 w-3.5 rounded-sm object-cover"
                                            />
                                            {code.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <p className="mt-5 text-sm font-semibold text-slate-400">
                            {resultCount}{" "}
                            {resultCount === 1
                                ? t.serviceResultsOne
                                : t.serviceResultsMany}
                        </p>

                        {resultCount === 0 ? (
                            <div className="mt-4 rounded-3xl border border-dashed border-slate-300 p-12 text-center text-slate-400 dark:border-slate-700">
                                {t.serviceNoResults}
                            </div>
                        ) : (
                            <div className="mt-4 space-y-8">
                                {visibleCategories.map((cat) => {
                                    const Icon = categoryIcons[cat.icon] ?? Grid3x3;
                                    return (
                                        <div key={cat.key}>
                                            <div className="mb-3 flex items-center gap-2.5">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                          <Icon size={17} />
                        </span>
                                                <h3 className="font-black text-slate-800 dark:text-white">
                                                    {serviceLang === "en" ? cat.labelEn : cat.labelSw}
                                                </h3>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {cat.items.map((item) => (
                                                    <span
                                                        key={item.id}
                                                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-emerald-900/30"
                                                    >
                            {serviceLang === "en"
                                ? item.en
                                : item.sw ?? item.en}
                          </span>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {isBrowsingAll && filteredCategories.length > 4 && (
                            <div className="mt-8">
                                <button
                                    onClick={() => setExpanded((e) => !e)}
                                    className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-700 transition hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                                >
                                    {expanded ? t.serviceShowLess : t.serviceShowMore}
                                    <ChevronDown
                                        size={16}
                                        className={
                                            expanded ? "rotate-180 transition" : "transition"
                                        }
                                    />
                                </button>
                            </div>
                        )}

                        <p className="mt-8 text-sm font-medium text-slate-400">
                            {totalServiceCount}+ {t.serviceCatalogNote}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
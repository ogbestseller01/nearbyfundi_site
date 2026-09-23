// src/components/sections/ServicesSection.tsx
import { useEffect, useMemo, useRef, useState } from "react";
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
    Paintbrush,
    PartyPopper,
    Refrigerator,
    Search,
    Shirt,
    Smartphone,
    Sofa,
    Sparkles,
    Wallet,
    X,
    Zap,
} from "lucide-react";
import type { Lang } from "../data/content";
import { copy } from "../data/content";
import { serviceCategories, totalServiceCount } from "../data/services";
import { Reveal } from "../components/Motion";

/** Every `icon` string used in data/services.ts must exist here. */
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
    Paintbrush,
    Wallet,
};

/** How many categories show before "Show more" (browse-all mode). */
const PREVIEW_CATEGORIES = 4;
/** How many chips per category show before "+N more" (browse-all mode). */
const PREVIEW_CHIPS = 12;

export default function ServicesSection({ lang }: { lang: Lang }) {
    const t = copy[lang];
    const en = lang === "en";

    const [serviceLang, setServiceLang] = useState<Lang>(lang);
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [query, setQuery] = useState("");
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [openCategories, setOpenCategories] = useState<Set<string>>(
        () => new Set()
    );
    const railRef = useRef<HTMLDivElement>(null);

    const normalizedQuery = query.trim().toLowerCase();

    // Keep the list language in sync when the site language changes.
    useEffect(() => {
        setServiceLang(lang);
    }, [lang]);

    // On mobile, keep the selected category pill visible in the scroll rail.
    useEffect(() => {
        const rail = railRef.current;
        if (!rail) return;
        if (window.matchMedia("(min-width: 1024px)").matches) return;
        rail
            .querySelector<HTMLElement>('[data-active="true"]')
            ?.scrollIntoView({
                inline: "center",
                block: "nearest",
                behavior: "smooth",
            });
    }, [activeCategory]);

    const filteredCategories = useMemo(() => {
        return serviceCategories
            .map((cat) => {
                const items = cat.items.filter((item) => {
                    if (activeCategory !== "all" && activeCategory !== cat.key)
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
    const hasFilters = activeCategory !== "all" || query !== "";

    const visibleCategories =
        isBrowsingAll && !showAllCategories
            ? filteredCategories.slice(0, PREVIEW_CATEGORIES)
            : filteredCategories;

    const selectCategory = (key: string) => {
        setActiveCategory(key);
        setShowAllCategories(false);
    };

    const clearFilters = () => {
        setQuery("");
        selectCategory("all");
    };

    const toggleCategoryChips = (key: string) => {
        setOpenCategories((prev) => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            return next;
        });
    };

    const pillBtn = (active: boolean) =>
        [
            // layout: horizontal chip on mobile, full-width row on desktop
            "flex min-h-11 shrink-0 snap-start items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-left text-sm font-bold transition",
            "lg:gap-2.5 lg:whitespace-normal",
            active
                ? "bg-navy-900 text-white dark:bg-bolt-400 dark:text-navy-900"
                : [
                    "bg-white text-navy-600 ring-1 ring-navy-200",
                    "lg:bg-transparent lg:ring-0 lg:hover:bg-white",
                    "dark:bg-navy-800 dark:text-navy-200 dark:ring-navy-700",
                    "dark:lg:bg-transparent dark:lg:hover:bg-navy-800",
                ].join(" "),
        ].join(" ");

    return (
        <section
            id="services"
            className="section-pad overflow-x-clip bg-navy-50 dark:bg-navy-800/40"
        >
            <div className="container-page">
                {/* ---------- Header ---------- */}
                <Reveal className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                    <div className="min-w-0">
                        <span className="eyebrow">{t.serviceEyebrow}</span>
                        <h2 className="max-w-2xl text-balance text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl dark:text-white">
                            {t.serviceTitle}
                        </h2>
                        <p className="mt-3 max-w-xl text-base text-bolt-900 sm:mt-4 dark:text-bolt-800">
                            {t.serviceSubtitle}
                        </p>
                    </div>
                    <a
                        href="#contact"
                        className="inline-flex shrink-0 items-center gap-1.5 self-start font-black text-bolt-700 md:self-auto dark:text-bolt-400"
                    >
                        {en ? "Talk to us" : "Zungumza nasi"} <ArrowRight size={16} />
                    </a>
                </Reveal>

                {/* ---------- Body ---------- */}
                {/* grid-cols-1 + min-w-0 stop the scrolling category rail from
            stretching the page wider than the screen on mobile. */}
                <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">
                    {/* ----- Categories: scroll rail (mobile) / sidebar (desktop) ----- */}
                    <aside className="min-w-0">
                        <div
                            ref={railRef}
                            role="group"
                            aria-label={t.serviceAllCategories}
                            className="flex snap-x gap-2 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:snap-none lg:flex-col lg:gap-1.5 lg:overflow-y-auto lg:overflow-x-hidden lg:pb-0"
                        >
                            <button
                                type="button"
                                data-active={activeCategory === "all"}
                                aria-pressed={activeCategory === "all"}
                                onClick={() => selectCategory("all")}
                                className={pillBtn(activeCategory === "all")}
                            >
                                <Grid3x3 size={16} className="shrink-0" />
                                {t.serviceAllCategories}
                            </button>

                            {serviceCategories.map((cat) => {
                                const Icon = categoryIcons[cat.icon] ?? Grid3x3;
                                const active = activeCategory === cat.key;
                                return (
                                    <button
                                        type="button"
                                        key={cat.key}
                                        data-active={active}
                                        aria-pressed={active}
                                        onClick={() => selectCategory(active ? "all" : cat.key)}
                                        className={pillBtn(active)}
                                    >
                                        <Icon size={16} className="shrink-0" />
                                        <span>
                      {serviceLang === "en" ? cat.labelEn : cat.labelSw}
                    </span>
                                        <span
                                            className={`ml-1 rounded-full px-1.5 py-0.5 text-[11px] lg:ml-auto ${
                                                active
                                                    ? "bg-white/20"
                                                    : "bg-navy-200/70 dark:bg-navy-700"
                                            }`}
                                        >
                      {cat.items.length}
                    </span>
                                    </button>
                                );
                            })}
                        </div>
                    </aside>

                    {/* ----- Results ----- */}
                    <div className="min-w-0">
                        {/* Search + language toggle */}
                        <div className="flex flex-col gap-3 rounded-3xl border border-navy-200 bg-white p-2.5 sm:p-3 md:flex-row md:items-center dark:border-navy-700 dark:bg-navy-800">
                            <div className="relative min-w-0 flex-1">
                                <Search
                                    size={18}
                                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-bolt-800"
                                />
                                <input
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        setShowAllCategories(true);
                                    }}
                                    type="search"
                                    inputMode="search"
                                    enterKeyHint="search"
                                    autoComplete="off"
                                    aria-label={t.serviceSearchPlaceholder}
                                    placeholder={t.serviceSearchPlaceholder}
                                    // text-base on mobile stops iOS Safari zooming in on focus
                                    className="h-12 w-full appearance-none rounded-2xl bg-navy-50 pl-11 pr-11 text-base font-medium outline-none transition placeholder:text-bolt-800/70 focus:bg-navy-100 sm:text-sm dark:bg-navy-900 dark:text-white dark:focus:bg-navy-900 [&::-webkit-search-cancel-button]:hidden"
                                />
                                {query && (
                                    <button
                                        type="button"
                                        onClick={() => setQuery("")}
                                        aria-label={en ? "Clear search" : "Futa utafutaji"}
                                        className="absolute right-1.5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-bolt-800 hover:bg-navy-200 hover:text-navy-700 dark:hover:bg-navy-700 dark:hover:text-white"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>

                            <div className="flex shrink-0 items-center justify-between gap-2.5 px-1 md:justify-start">
                <span className="text-xs font-semibold text-bolt-800">
                  {t.serviceViewLang}
                </span>
                                <div
                                    role="group"
                                    aria-label={t.serviceViewLang}
                                    className="flex items-center gap-1 rounded-full bg-navy-100 p-1 dark:bg-navy-900"
                                >
                                    {(["en", "sw"] as const).map((code) => (
                                        <button
                                            type="button"
                                            key={code}
                                            aria-pressed={serviceLang === code}
                                            onClick={() => setServiceLang(code)}
                                            className={`flex min-h-9 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                                                serviceLang === code
                                                    ? "bg-white shadow-sm dark:bg-navy-600"
                                                    : "opacity-60 hover:opacity-100"
                                            }`}
                                        >
                                            <img
                                                src={code === "en" ? "/uk-flag.png" : "/tz-flag.jpg"}
                                                alt=""
                                                aria-hidden="true"
                                                className="h-3.5 w-3.5 rounded-sm object-cover"
                                            />
                                            {code.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Result count + clear filters */}
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 sm:mt-5">
                            <p
                                className="text-sm font-semibold text-bolt-800"
                                aria-live="polite"
                            >
                                {resultCount}{" "}
                                {resultCount === 1
                                    ? t.serviceResultsOne
                                    : t.serviceResultsMany}
                            </p>
                            {hasFilters && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="text-sm font-bold text-bolt-700 underline-offset-4 hover:underline dark:text-bolt-400"
                                >
                                    {en ? "Clear filters" : "Futa vichujio"}
                                </button>
                            )}
                        </div>

                        {/* Chips */}
                        {resultCount === 0 ? (
                            <div className="mt-4 rounded-3xl border border-dashed border-navy-200 p-8 text-center text-bolt-800 sm:p-12 dark:border-navy-700">
                                {t.serviceNoResults}
                            </div>
                        ) : (
                            <div className="mt-4 space-y-7 sm:space-y-8">
                                {visibleCategories.map((cat) => {
                                    const Icon = categoryIcons[cat.icon] ?? Grid3x3;
                                    const chipsOpen = openCategories.has(cat.key);
                                    const capped =
                                        isBrowsingAll &&
                                        !chipsOpen &&
                                        cat.items.length > PREVIEW_CHIPS;
                                    const shown = capped
                                        ? cat.items.slice(0, PREVIEW_CHIPS)
                                        : cat.items;
                                    const hiddenCount = cat.items.length - shown.length;
                                    const canCollapse =
                                        isBrowsingAll &&
                                        chipsOpen &&
                                        cat.items.length > PREVIEW_CHIPS;

                                    return (
                                        <div key={cat.key}>
                                            <div className="mb-3 flex items-center gap-2.5">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-bolt-500/15 text-bolt-700 dark:text-bolt-300">
                          <Icon size={17} />
                        </span>
                                                <h3 className="min-w-0 text-base font-black text-navy-800 sm:text-lg dark:text-white">
                                                    {serviceLang === "en" ? cat.labelEn : cat.labelSw}
                                                </h3>
                                            </div>

                                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                {shown.map((item) => (
                                                    <span
                                                        key={item.id}
                                                        className="max-w-full break-words rounded-full border border-navy-200 bg-white px-3.5 py-1.5 text-[13px] font-semibold leading-snug text-navy-700 transition sm:px-4 sm:py-2 sm:text-sm motion-safe:sm:hover:-translate-y-0.5 sm:hover:border-bolt-400 sm:hover:bg-bolt-50 dark:border-navy-700 dark:bg-navy-800 dark:text-navy-200 dark:sm:hover:bg-bolt-900/30"
                                                    >
                            {serviceLang === "en" ? item.en : item.sw ?? item.en}
                          </span>
                                                ))}

                                                {(hiddenCount > 0 || canCollapse) && (
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleCategoryChips(cat.key)}
                                                        className="rounded-full border border-dashed border-bolt-400 px-3.5 py-1.5 text-[13px] font-black text-bolt-700 transition hover:bg-bolt-50 sm:px-4 sm:py-2 sm:text-sm dark:text-bolt-400 dark:hover:bg-bolt-900/30"
                                                    >
                                                        {canCollapse
                                                            ? t.serviceShowLess
                                                            : `+${hiddenCount} ${en ? "more" : "zaidi"}`}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Show more / less categories */}
                        {isBrowsingAll && filteredCategories.length > PREVIEW_CATEGORIES && (
                            <div className="mt-8">
                                <button
                                    type="button"
                                    onClick={() => setShowAllCategories((v) => !v)}
                                    className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-navy-200 bg-white px-6 py-3 text-sm font-black text-navy-700 transition hover:border-bolt-400 sm:w-auto dark:border-navy-700 dark:bg-navy-800 dark:text-navy-200"
                                >
                                    {showAllCategories ? t.serviceShowLess : t.serviceShowMore}
                                    <ChevronDown
                                        size={16}
                                        className={
                                            showAllCategories ? "rotate-180 transition" : "transition"
                                        }
                                    />
                                </button>
                            </div>
                        )}

                        <p className="mt-8 text-sm font-medium text-bolt-800">
                            {totalServiceCount}+ {t.serviceCatalogNote}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
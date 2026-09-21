import { useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CarFront,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Droplets,
  ExternalLink,
  Flame,
  Grid3x3,
  Headphones,
  Home,
  type LucideIcon,
  Mail,
  MapPin,
  MessageCircle,
  PartyPopper,
  Phone,
  Plus,
  Refrigerator,
  Search,
  Send,
  Shirt,
  Smartphone,
  Sofa,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Lang } from "../data/content";
import { copy, blogSlides, partners } from "../data/content";
import { serviceCategories, totalServiceCount } from "../data/services";
import { Reveal, Stagger, StaggerItem } from "./Motion";
import AppPlayground from "./AppPlayground";
import PhoneMockup from "./PhoneMockup";

const categoryIcons: Record<string, LucideIcon> = {
  Building2, Zap, Droplets, Refrigerator, Smartphone, CarFront,
  Shirt, Sofa, Flame, Sparkles, Home, PartyPopper,
};

const faqs = [
  ["What is NearbyFundi?", "NearbyFundi is a platform that helps customers discover nearby technicians, request services and communicate with fundis."],
  ["Can technicians join the platform?", "Yes. Technicians can create a profile, add their services and working area, then go through the platform's verification process."],
  ["Does NearbyFundi support Swahili?", "Yes. The product and website are designed with English and Swahili support."],
  ["Can I chat with a technician?", "Yes. The app includes chat so customers and technicians can communicate around a service request."],
];

function PartnerLogo({ logo, logoText }: { logo: string; logoText: string }) {
  const [failed, setFailed] = useState(false);
  if (failed || !logo) {
    return (
        <span className="inline-flex h-12 items-center rounded-2xl bg-slate-950 px-5 text-lg font-black text-white dark:bg-emerald-400 dark:text-slate-950">
        {logoText}
      </span>
    );
  }
  return (
      <span className="inline-flex h-12 items-center rounded-2xl bg-white px-4 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
      <img src={logo} alt={logoText} className="h-7 w-auto object-contain" onError={() => setFailed(true)} />
    </span>
  );
}

const inputCls =
    "mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium outline-none transition focus:border-emerald-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white";

export default function Sections({ lang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const t = copy[lang];
  const en = lang === "en";
  const reduce = useReducedMotion();
  const [faq, setFaq] = useState<number | null>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Services state (own language toggle, defaults to site language)
  const [serviceLang, setServiceLang] = useState<Lang>(lang);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const normalizedQuery = query.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    return serviceCategories
        .map((cat) => {
          const items = cat.items.filter((item) => {
            if (!(activeCategory === "all" || activeCategory === cat.key)) return false;
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

  const resultCount = filteredCategories.reduce((n, c) => n + c.items.length, 0);
  const isBrowsingAll = activeCategory === "all" && !normalizedQuery;
  const visibleCategories = isBrowsingAll && !expanded ? filteredCategories.slice(0, 4) : filteredCategories;

  const scrollBlog = (dir: "left" | "right") =>
      scrollRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });

  const steps = [
    { Icon: Search, title: en ? "Discover" : "Tafuta", text: en ? "Browse services and technicians around your area." : "Tazama huduma na mafundi waliopo karibu." },
    { Icon: Send, title: en ? "Request" : "Omba huduma", text: en ? "Describe your job and send a service request." : "Eleza kazi yako na tuma ombi la huduma." },
    { Icon: MessageCircle, title: en ? "Connect" : "Wasiliana", text: en ? "Chat and coordinate directly with your technician." : "Wasiliana na kuratibu moja kwa moja na fundi." },
    { Icon: BadgeCheck, title: en ? "Complete" : "Maliza kazi", text: en ? "Get the job done and build trust through reviews." : "Kamilisha kazi na jenga uaminifu kupitia tathmini." },
  ];

  const pillBtn = (active: boolean) =>
      `flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-sm font-bold transition ${
          active
              ? "bg-slate-950 text-white dark:bg-emerald-400 dark:text-slate-950"
              : "text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-800"
      }`;

  return (
      <>
        {/* ───────── About ───────── */}
        <section id="about" className="section-pad bg-white dark:bg-slate-950">
          <div className="container-page">
            <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
              <Reveal>
                <span className="eyebrow">{t.aboutEyebrow}</span>
                <h2 className="text-4xl font-black tracking-tight sm:text-5xl dark:text-white">{t.aboutTitle}</h2>
                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">{t.aboutText}</p>
              </Reveal>

              {/* Fanned phones */}
              <div className="relative mx-auto h-[480px] w-full max-w-[560px]">
                <div className="absolute inset-x-6 bottom-4 top-16 rounded-[48px] bg-gradient-to-br from-emerald-100 via-teal-50 to-amber-100 dark:from-emerald-900/30 dark:via-slate-900 dark:to-amber-900/20" />
                <motion.div
                    className="absolute left-0 top-14 hidden -rotate-6 sm:block"
                    whileHover={reduce ? undefined : { y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                >
                  <PhoneMockup screen="home" label={en ? "Find fundi" : "Tafuta fundi"} />
                </motion.div>
                <motion.div
                    className="absolute right-0 top-14 hidden rotate-6 sm:block"
                    whileHover={reduce ? undefined : { y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                >
                  <PhoneMockup screen="chat" label={en ? "Send message" : "Tuma ujumbe"} />
                </motion.div>
                <motion.div
                    className="absolute left-1/2 top-0 z-10 -translate-x-1/2"
                    animate={reduce ? undefined : { y: [0, -8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <PhoneMockup screen="request" label={en ? "Track request" : "Fuatilia ombi"} />
                </motion.div>
              </div>
            </div>

            {/* Four steps, connected */}
            <Stagger className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4" delay={0.05}>
              {steps.map(({ Icon, title, text }, i) => (
                  <StaggerItem key={title}>
                    <div className="relative">
                      {i < steps.length - 1 && (
                          <span className="absolute left-16 right-[-2rem] top-6 hidden h-px bg-gradient-to-r from-emerald-300 to-transparent lg:block dark:from-emerald-700" />
                      )}
                      <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                      <Icon size={22} />
                    </span>
                        <span className="text-sm font-bold text-slate-400">{i + 1}</span>
                      </div>
                      <h3 className="mt-4 text-lg font-black dark:text-white">{title}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-slate-500 dark:text-slate-400">{text}</p>
                    </div>
                  </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Interactive app journey */}
        <AppPlayground lang={lang} />

        {/* ───────── Services ───────── */}
        <section id="services" className="section-pad bg-[#f6fbf9] dark:bg-slate-900/40">
          <div className="container-page">
            <Reveal className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <span className="eyebrow">{t.serviceEyebrow}</span>
                <h2 className="max-w-2xl text-4xl font-black tracking-tight sm:text-5xl dark:text-white">{t.serviceTitle}</h2>
                <p className="mt-4 max-w-xl text-slate-500 dark:text-slate-400">{t.serviceSubtitle}</p>
              </div>
              <a href="#contact" className="inline-flex items-center gap-1.5 font-black text-emerald-700 dark:text-emerald-400">
                {en ? "Talk to us" : "Zungumza nasi"} <ArrowRight size={16} />
              </a>
            </Reveal>

            <div className="mt-10 grid gap-8 lg:grid-cols-[260px_1fr]">
              {/* Category sidebar (scrolls sideways on mobile) */}
              <aside>
                <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-2 lg:sticky lg:top-24 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
                  <button
                      onClick={() => { setActiveCategory("all"); setExpanded(false); }}
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
                            onClick={() => { setActiveCategory(active ? "all" : cat.key); setExpanded(false); }}
                            className={pillBtn(active)}
                        >
                          <Icon size={16} />
                          <span className="whitespace-nowrap lg:whitespace-normal">
                        {serviceLang === "en" ? cat.labelEn : cat.labelSw}
                      </span>
                          <span className={`ml-auto rounded-full px-1.5 py-0.5 text-[11px] ${active ? "bg-white/20" : "bg-slate-200/70 dark:bg-slate-800"}`}>
                        {cat.items.length}
                      </span>
                        </button>
                    );
                  })}
                </div>
              </aside>

              {/* Results */}
              <div className="min-w-0">
                <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-center dark:border-slate-700 dark:bg-slate-900">
                  <div className="relative flex-1">
                    <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setExpanded(true); }}
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
                    <span className="text-xs font-semibold text-slate-400">{t.serviceViewLang}</span>
                    <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1 dark:bg-slate-800">
                      {(["en", "sw"] as const).map((code) => (
                          <button
                              key={code}
                              onClick={() => setServiceLang(code)}
                              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                                  serviceLang === code ? "bg-white shadow-sm dark:bg-slate-600" : "opacity-60 hover:opacity-100"
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
                  {resultCount} {resultCount === 1 ? t.serviceResultsOne : t.serviceResultsMany}
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
                              {serviceLang === "en" ? item.en : item.sw ?? item.en}
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
                        <ChevronDown size={16} className={expanded ? "rotate-180 transition" : "transition"} />
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

        {/* ───────── Blog: screen slider ───────── */}
        <section id="blog" className="section-pad bg-white dark:bg-slate-950">
          <div className="container-page">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="eyebrow">{t.blogEyebrow}</span>
                <h2 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl dark:text-white">{t.blogTitle}</h2>
              </div>
              <div className="flex gap-2">
                {(["left", "right"] as const).map((d) => (
                    <button
                        key={d}
                        onClick={() => scrollBlog(d)}
                        className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 transition hover:bg-slate-950 hover:text-white dark:border-slate-700 dark:text-white dark:hover:bg-emerald-400 dark:hover:text-slate-950"
                        aria-label={d === "left" ? "Previous" : "Next"}
                    >
                      {d === "left" ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                    </button>
                ))}
              </div>
            </div>

            <div ref={scrollRef} className="blog-scroll mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4">
              {blogSlides.map((slide, i) => (
                  <article
                      key={i}
                      className="group relative aspect-[9/16] w-[260px] shrink-0 snap-start overflow-hidden rounded-[28px] bg-slate-900 sm:w-[300px]"
                  >
                    <img
                        src={slide.img}
                        alt={en ? slide.titleEn : slide.titleSw}
                        className="absolute inset-0 h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent p-5 pt-24 text-white">
                      <h3 className="text-lg font-black">{en ? slide.titleEn : slide.titleSw}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-slate-300">{en ? slide.descEn : slide.descSw}</p>
                    </div>
                  </article>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Partners (horizontal redesign) ───────── */}
        <section id="partners" className="section-pad bg-[#f6fbf9] dark:bg-slate-900/40">
          <div className="container-page">
            {/* Header */}
            <Reveal className="mx-auto max-w-3xl text-center">
              <span className="eyebrow">{t.partnersEyebrow}</span>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl dark:text-white">
                {t.partnersTitle}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                {t.partnersText}
              </p>
            </Reveal>

            {/* Horizontal partners strip */}
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
                        <ExternalLink size={13} className="transition group-hover:translate-x-0.5" />
                  </span>
                    </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Careers ───────── */}
        <section id="careers" className="bg-white py-16 sm:py-20 dark:bg-slate-950">
          <div className="container-page">
            <div className="relative overflow-hidden rounded-[36px] bg-emerald-400 p-8 sm:p-14">
              <span className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-amber-300/60 blur-2xl" />
              <span className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-white/30 blur-2xl" />
              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3.5 py-1.5 text-xs font-bold text-emerald-300">
                  <BriefcaseBusiness size={14} /> {en ? "Careers" : "Kazi"}
                </span>
                  <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">{t.careersTitle}</h2>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-900/80">{t.careersText}</p>
                </div>
                <a href="mailto:info.nearbyfundi@gmail.com?subject=Careers%20at%20NearbyFundi" className="btn-dark">
                  {en ? "Send your CV" : "Tuma CV yako"} <ArrowRight size={17} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── FAQ ───────── */}
        <section id="faq" className="section-pad bg-white dark:bg-slate-950">
          <div className="container-page grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <span className="eyebrow">{t.nav.faq}</span>
              <h2 className="text-4xl font-black tracking-tight sm:text-5xl dark:text-white">{t.faqTitle}</h2>
              <p className="mt-5 text-slate-500 dark:text-slate-400">
                {en ? "Everything you need to understand the platform." : "Kila kitu unachohitaji kuelewa kuhusu jukwaa."}
              </p>
              <a href="#contact" className="mt-6 inline-flex items-center gap-1.5 font-black text-emerald-700 dark:text-emerald-400">
                {en ? "Still have a question?" : "Bado una swali?"} <ArrowRight size={16} />
              </a>
            </div>

            <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
              {faqs.map(([q, a], i) => {
                const isOpen = faq === i;
                return (
                    <div key={q}>
                      <button
                          className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-black dark:text-white"
                          onClick={() => setFaq(isOpen ? null : i)}
                          aria-expanded={isOpen}
                      >
                        {q}
                        <span
                            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition ${
                                isOpen ? "rotate-45 bg-emerald-400 text-slate-950" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                            }`}
                        >
                      <Plus size={18} />
                    </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden"
                            >
                              <p className="max-w-2xl pb-6 leading-7 text-slate-500 dark:text-slate-400">{a}</p>
                            </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ───────── Support ───────── */}
        <section id="support" className="section-pad bg-slate-50 dark:bg-slate-900/50">
          <div className="container-page">
            <div className="relative overflow-hidden rounded-[36px] bg-slate-950 p-8 text-white sm:p-12 dark:ring-1 dark:ring-slate-700">
              <span className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
              <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-300">
                  <Headphones size={16} /> {en ? "Support" : "Msaada"}
                </span>
                  <h2 className="mt-4 text-4xl font-black">{t.supportTitle}</h2>
                  <p className="mt-4 max-w-xl leading-7 text-slate-300">{t.supportText}</p>
                </div>
                <div className="grid gap-3">
                  <a
                      href="mailto:info.nearbyfundi@gmail.com"
                      className="group flex items-center gap-4 rounded-2xl bg-emerald-400 p-4 font-bold text-slate-950 transition hover:bg-emerald-300"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-slate-950 text-emerald-300"><MessageCircle size={20} /></span>
                    <span className="flex-1">{en ? "Email support" : "Tuma barua pepe"}</span>
                    <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                  </a>
                  <a
                      href="tel:0682131140"
                      className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 font-bold transition hover:bg-white/10"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10"><Phone size={20} /></span>
                    <span className="flex-1">{en ? "Call" : "Piga simu"} +255 679 117 297</span>
                    <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Contact ───────── */}
        <section id="contact" className="section-pad bg-white dark:bg-slate-950">
          <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="eyebrow">{t.contactEyebrow}</span>
              <h2 className="text-4xl font-black tracking-tight sm:text-5xl dark:text-white">{t.contactTitle}</h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-500 dark:text-slate-300">{t.contactText}</p>

              <ul className="mt-8 space-y-4">
                {[
                  { Icon: MapPin, label: en ? "Office" : "Ofisi", value: "Morocco, Dar es Salaam, Tanzania" },
                  { Icon: Mail, label: en ? "Email" : "Barua pepe", value: "ogbestseller01@gmail.com" },
                  { Icon: Phone, label: en ? "Phone" : "Simu", value: "+255 612 118 849 · +255 679 117 297" },
                ].map(({ Icon, label, value }) => (
                    <li key={label} className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                    <Icon size={20} />
                  </span>
                      <div>
                        <p className="text-xs font-semibold text-slate-400">{label}</p>
                        <p className="font-bold dark:text-white">{value}</p>
                      </div>
                    </li>
                ))}
              </ul>
            </div>

            <form
                className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/5 sm:p-9 dark:border-slate-700 dark:bg-slate-900"
                onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-bold dark:text-slate-200">
                  {en ? "Name" : "Jina"}
                  <input className={inputCls} placeholder={en ? "Your name" : "Jina lako"} />
                </label>
                <label className="text-sm font-bold dark:text-slate-200">
                  {en ? "Email" : "Barua pepe"}
                  <input type="email" className={inputCls} placeholder="you@example.com" />
                </label>
              </div>
              <label className="mt-5 block text-sm font-bold dark:text-slate-200">
                {en ? "Message" : "Ujumbe"}
                <textarea className={`${inputCls} min-h-36`} placeholder={en ? "How can we help?" : "Tunawezaje kukusaidia?"} />
              </label>
              <button className="btn-primary mt-5 w-full">
                {en ? "Send message" : "Tuma ujumbe"} <ArrowRight size={17} />
              </button>
            </form>
          </div>
        </section>
      </>
  );
}
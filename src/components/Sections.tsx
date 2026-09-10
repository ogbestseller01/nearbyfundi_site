import { useMemo, useRef, useState } from "react";
import {
  ArrowRight,
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
  MessageCircle,
  PartyPopper,
  Refrigerator,
  Search,
  Shirt,
  Smartphone,
  Sofa,
  Sparkles,
  X,
  Zap
} from "lucide-react";
import type { Lang } from "../data/content";
import { copy, blogSlides, partners } from "../data/content";
import { serviceCategories, totalServiceCount } from "../data/services";

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
  PartyPopper
};

const faqs = [
  [
    "What is NearbyFundi?",
    "NearbyFundi is a platform that helps customers discover nearby technicians, request services and communicate with fundis."
  ],
  [
    "Can technicians join the platform?",
    "Yes. Technicians can create a profile, add their services and working area, then go through the platform's verification process."
  ],
  [
    "Does NearbyFundi support Swahili?",
    "Yes. The product and website are designed with English and Swahili support."
  ],
  [
    "Can I chat with a technician?",
    "Yes. The app includes chat so customers and technicians can communicate around a service request."
  ]
];

export default function Sections({
  lang,
  setLang
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  const t = copy[lang];
  const [faq, setFaq] = useState<number | null>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Services section state — has its own language toggle (defaults to the site language)
  const [serviceLang, setServiceLang] = useState<Lang>(lang);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    return serviceCategories
      .map((cat) => {
        const items = cat.items.filter((item) => {
          const matchesCategory = activeCategory === "all" || activeCategory === cat.key;
          if (!matchesCategory) return false;
          if (!normalizedQuery) return true;
          const en = item.en.toLowerCase();
          const sw = (item.sw ?? "").toLowerCase();
          return en.includes(normalizedQuery) || sw.includes(normalizedQuery);
        });
        return { ...cat, items };
      })
      .filter((cat) => cat.items.length > 0);
  }, [activeCategory, normalizedQuery]);

  const resultCount = filteredCategories.reduce((n, c) => n + c.items.length, 0);
  const isBrowsingAll = activeCategory === "all" && !normalizedQuery;
  const visibleCategories =
    isBrowsingAll && !expanded ? filteredCategories.slice(0, 4) : filteredCategories;

  const scrollBlog = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth"
    });
  };

  return (
    <>
      {/* About */}
      <section id="about" className="section-pad bg-white dark:bg-slate-950">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="eyebrow">{t.aboutEyebrow}</span>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl dark:text-white">
              {t.aboutTitle}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              {t.aboutText}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                [
                  "01",
                  lang === "en" ? "Discover" : "Tafuta",
                  lang === "en"
                    ? "Browse services and technicians around your area."
                    : "Tazama huduma na mafundi waliopo karibu."
                ],
                [
                  "02",
                  lang === "en" ? "Request" : "Omba huduma",
                  lang === "en"
                    ? "Describe your job and send a service request."
                    : "Eleza kazi yako na tuma ombi la huduma."
                ],
                [
                  "03",
                  lang === "en" ? "Connect" : "Wasiliana",
                  lang === "en"
                    ? "Chat and coordinate directly with your technician."
                    : "Wasiliana na kuratibu moja kwa moja na fundi."
                ],
                [
                  "04",
                  lang === "en" ? "Complete" : "Maliza kazi",
                  lang === "en"
                    ? "Get the job done and build trust through reviews."
                    : "Kamilisha kazi na jenga uaminifu kupitia tathmini."
                ]
              ].map(([n, title, text]) => (
                <div
                  key={n}
                  className="rounded-2xl border border-slate-200 p-5 dark:border-slate-700 dark:bg-slate-900"
                >
                  <span className="text-xs font-black text-bolt-600">{n}</span>
                  <h3 className="mt-2 font-black dark:text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[40px] bg-slate-950 p-8 text-white sm:p-12 dark:bg-slate-900 dark:ring-1 dark:ring-slate-700">
            <div className="flex items-start justify-between">
              <div className="rounded-2xl bg-bolt-500 p-3 text-slate-950">
                <Search />
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">
                Product flow
              </span>
            </div>
            <h3 className="mt-10 text-3xl font-black">
              From “I need help” to “job done.”
            </h3>
            <div className="mt-8 space-y-5">
              {[
                "Choose a location or address",
                "Choose a service",
                "View recommended technicians",
                "Send a service request",
                "Chat and track progress",
                "Complete the service and leave a review"
              ].map((x, i) => (
                <div
                  key={x}
                  className="flex items-center gap-4 border-b border-white/10 pb-5 last:border-0"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-bolt-500 text-xs font-black text-slate-950">
                    {i + 1}
                  </span>
                  <span className="font-bold">{x}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section-pad bg-[#f6fbf9] dark:bg-slate-900/40">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="eyebrow">{t.serviceEyebrow}</span>
              <h2 className="max-w-2xl text-4xl font-black tracking-tight sm:text-5xl dark:text-white">
                {t.serviceTitle}
              </h2>
              <p className="mt-4 max-w-xl text-slate-500 dark:text-slate-400">
                {t.serviceSubtitle}
              </p>
            </div>
            <a href="#contact" className="font-black text-bolt-700 dark:text-bolt-400">
              Talk to us <ArrowRight size={16} className="inline" />
            </a>
          </div>

          {/* Controls: search + per-section language toggle */}
          <div className="mt-10 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-700 dark:bg-slate-900 dark:shadow-soft-dark sm:flex-row sm:items-center sm:p-5">
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
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-10 text-sm font-medium outline-none transition focus:border-bolt-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-white"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-2.5 border-t border-slate-100 pt-3 dark:border-slate-800 sm:border-t-0 sm:pt-0">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
                {t.serviceViewLang}
              </span>
              <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800">
                <button
                  onClick={() => setServiceLang("en")}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                    serviceLang === "en"
                      ? "bg-white shadow-sm dark:bg-slate-700"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src="/uk-flag.png" alt="English" className="h-3.5 w-3.5 rounded-sm object-cover" />
                  EN
                </button>
                <button
                  onClick={() => setServiceLang("sw")}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                    serviceLang === "sw"
                      ? "bg-white shadow-sm dark:bg-slate-700"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src="/tz-flag.jpg" alt="Swahili" className="h-3.5 w-3.5 rounded-sm object-cover" />
                  SW
                </button>
              </div>
            </div>
          </div>

          {/* Category filter pills */}
          <div className="mt-6 flex gap-2.5 overflow-x-auto pb-2">
            <button
              onClick={() => {
                setActiveCategory("all");
                setExpanded(false);
              }}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition ${
                activeCategory === "all"
                  ? "border-bolt-500 bg-bolt-500 text-slate-950"
                  : "border-slate-200 bg-white text-slate-600 hover:border-bolt-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              <Grid3x3 size={15} />
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
                  className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition ${
                    active
                      ? "border-bolt-500 bg-bolt-500 text-slate-950"
                      : "border-slate-200 bg-white text-slate-600 hover:border-bolt-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                  }`}
                >
                  <Icon size={15} />
                  {serviceLang === "en" ? cat.labelEn : cat.labelSw}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[11px] ${
                      active ? "bg-slate-950/10" : "bg-slate-100 dark:bg-slate-800"
                    }`}
                  >
                    {cat.items.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results count */}
          <p className="mt-5 text-sm font-semibold text-slate-400">
            {resultCount} {resultCount === 1 ? t.serviceResultsOne : t.serviceResultsMany}
          </p>

          {/* Service groups */}
          {resultCount === 0 ? (
            <div className="mt-6 rounded-3xl border border-dashed border-slate-300 p-12 text-center text-slate-400 dark:border-slate-700">
              {t.serviceNoResults}
            </div>
          ) : (
            <div className="mt-6 space-y-8">
              {visibleCategories.map((cat) => {
                const Icon = categoryIcons[cat.icon] ?? Grid3x3;
                return (
                  <div key={cat.key}>
                    <div className="mb-3.5 flex items-center gap-2.5">
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-bolt-700 dark:bg-emerald-900/40 dark:text-bolt-400">
                        <Icon size={17} />
                      </div>
                      <h3 className="font-black text-slate-800 dark:text-white">
                        {serviceLang === "en" ? cat.labelEn : cat.labelSw}
                      </h3>
                      <span className="text-xs font-bold text-slate-400">
                        {cat.items.length}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
                      {cat.items.map((item) => (
                        <div
                          key={item.id}
                          className="card group flex items-center justify-between gap-2 px-4 py-3.5 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-bolt-400 dark:text-slate-200"
                        >
                          <span className="leading-snug">
                            {serviceLang === "en" ? item.en : item.sw ?? item.en}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {isBrowsingAll && filteredCategories.length > 4 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setExpanded((e) => !e)}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-700 transition hover:border-bolt-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                {expanded ? t.serviceShowLess : t.serviceShowMore}
                <ChevronDown
                  size={16}
                  className={expanded ? "rotate-180 transition" : "transition"}
                />
              </button>
            </div>
          )}

          <p className="mt-10 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
            {totalServiceCount}+ {t.serviceCatalogNote}
          </p>
        </div>
      </section>

      {/* Blog - horizontal slideshow */}
      <section id="blog" className="section-pad bg-white dark:bg-slate-950">
        <div className="container-page">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">{t.blogEyebrow}</span>
              <h2 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl dark:text-white">
                {t.blogTitle}
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scrollBlog("left")}
                className="rounded-full border border-slate-200 p-2.5 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollBlog("right")}
                className="rounded-full border border-slate-200 p-2.5 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="blog-scroll mt-10 flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
          >
            {blogSlides.map((slide, i) => (
              <article
                key={i}
                className="card w-[280px] shrink-0 snap-start overflow-hidden sm:w-[320px]"
              >
                <div className="aspect-[9/16] overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={slide.img}
                    alt={lang === "en" ? slide.titleEn : slide.titleSw}
                    className="h-full w-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-black text-bolt-600">
                    SCREEN {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-lg font-black dark:text-white">
                    {lang === "en" ? slide.titleEn : slide.titleSw}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {lang === "en" ? slide.descEn : slide.descSw}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="section-pad bg-[#f6fbf9] dark:bg-slate-900/40">
        <div className="container-page">
          <span className="eyebrow">{t.partnersEyebrow}</span>
          <h2 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl dark:text-white">
            {t.partnersTitle}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            {t.partnersText}
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {partners.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card group flex flex-col justify-between p-8 transition hover:-translate-y-1 hover:border-bolt-400"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-12 items-center rounded-2xl bg-slate-950 px-5 text-lg font-black text-white dark:bg-bolt-500 dark:text-slate-950">
                      {p.logoText}
                    </span>
                    <ExternalLink
                      size={18}
                      className="text-slate-400 transition group-hover:text-bolt-600"
                    />
                  </div>
                  <h3 className="mt-6 text-2xl font-black dark:text-white">{p.name}</h3>
                  <p className="mt-3 leading-7 text-slate-500 dark:text-slate-400">
                    {lang === "en" ? p.descriptionEn : p.descriptionSw}
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-bolt-700 dark:text-bolt-400">
                  Visit website <ArrowRight size={15} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section id="careers" className="section-pad bg-bolt-500">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="eyebrow bg-slate-950 text-bolt-400">
              <BriefcaseBusiness size={14} /> Careers
            </span>
            <h2 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
              {t.careersTitle}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-800">
              {t.careersText}
            </p>
          </div>
          <a
            href="mailto:info.nearbyfundi@gmail.com?subject=Careers%20at%20NearbyFundi"
            className="btn-dark"
          >
            Send your CV <ArrowRight size={17} />
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-pad bg-white dark:bg-slate-950">
        <div className="container-page grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <span className="eyebrow">{t.nav.faq}</span>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl dark:text-white">
              {t.faqTitle}
            </h2>
            <p className="mt-5 text-slate-500 dark:text-slate-400">
              Everything you need to understand the platform.
            </p>
          </div>
          <div className="space-y-3">
            {faqs.map(([q, a], i) => (
              <div
                key={q}
                className="rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900"
              >
                <button
                  className="flex w-full items-center justify-between gap-4 p-5 text-left font-black dark:text-white"
                  onClick={() => setFaq(faq === i ? null : i)}
                >
                  {q}
                  <ChevronDown
                    size={19}
                    className={faq === i ? "rotate-180 transition" : "transition"}
                  />
                </button>
                {faq === i && (
                  <p className="px-5 pb-5 leading-7 text-slate-500 dark:text-slate-400">
                    {a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support */}
      <section id="support" className="section-pad bg-slate-50 dark:bg-slate-900/50">
        <div className="container-page">
          <div className="rounded-[36px] bg-slate-950 p-8 text-white sm:p-12 lg:flex lg:items-center lg:justify-between dark:ring-1 dark:ring-slate-700">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-bolt-400">
                <Headphones size={16} /> Support
              </span>
              <h2 className="mt-4 text-4xl font-black">{t.supportTitle}</h2>
              <p className="mt-4 max-w-xl leading-7 text-slate-300">
                {t.supportText}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 lg:mt-0">
              <a className="btn-primary" href="mailto:info.nearbyfundi@gmail.com">
                <MessageCircle size={17} /> Email support
              </a>
              <a
                className="rounded-full border border-white/20 px-6 py-3.5 font-bold hover:bg-white/10"
                href="tel:0682131140"
              >
                Call +255 679 117 297
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-pad bg-white dark:bg-slate-950">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">{t.contactEyebrow}</span>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl dark:text-white">
              {t.contactTitle}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-500 dark:text-slate-300">
              {t.contactText}
            </p>
            <div className="mt-8 space-y-3 text-sm dark:text-slate-300">
              <p>
                <b>Office:</b> Morocco, Dar es Salaam, Tanzania
              </p>
              <p>
                <b>Email:</b> ogbestseller01@gmail.com
              </p>
              <p>
                <b>Phone:</b> +255 612 118 849 · +255 679 117 297 . +255 612 118 849
              </p>
            </div>
          </div>
          <form
            className="card p-7 sm:p-9"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-bold dark:text-slate-200">
                Name
                <input
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none focus:border-bolt-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                  placeholder="Your name"
                />
              </label>
              <label className="text-sm font-bold dark:text-slate-200">
                Email
                <input
                  type="email"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none focus:border-bolt-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="mt-5 block text-sm font-bold dark:text-slate-200">
              Message
              <textarea
                className="mt-2 min-h-36 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none focus:border-bolt-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                placeholder="How can we help?"
              />
            </label>
            <button className="btn-primary mt-5 w-full">
              Send message <ArrowRight size={17} />
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

import { ArrowDownRight, CheckCircle2, MapPin, ShieldCheck, Smartphone, Sparkles } from "lucide-react";
import type { Lang } from "../data/content";
import { copy } from "../data/content";
import { motion, Reveal, Stagger, StaggerItem } from "./Motion";

export default function Hero({ lang }: { lang: Lang }) {
  const t = copy[lang];

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-[#f0faf6] via-[#f6fbf9] to-white pt-[74px] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      {/* Animated background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-bolt-500/25 blur-3xl dark:bg-bolt-500/15"
          animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-20 top-40 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/10"
          animate={{ x: [0, -30, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-teal-300/15 blur-3xl dark:bg-teal-500/10"
          animate={{ y: [0, -25, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
            backgroundSize: "48px 48px"
          }}
        />
      </div>

      <div className="container-page relative grid min-h-[min(860px,100svh)] items-center gap-12 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:py-20">
        {/* Left copy */}
        <div className="relative z-10">
          <Stagger delay={0.05} stagger={0.1}>
            <StaggerItem>
              <span className="eyebrow shadow-sm ring-1 ring-emerald-200/60 dark:ring-emerald-800/50">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bolt-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-bolt-500" />
                </span>
                {t.heroEyebrow}
              </span>
            </StaggerItem>

            <StaggerItem>
              <h1 className="max-w-3xl text-4xl font-black leading-[1.06] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-[3.5rem] xl:text-6xl dark:text-white">
                {lang === "en" ? (
                  <>
                    Find a trusted fundi.{" "}
                    <span className="bg-gradient-to-r from-bolt-600 to-emerald-500 bg-clip-text text-transparent dark:from-bolt-400 dark:to-emerald-300">
                      Right when you need one.
                    </span>
                  </>
                ) : (
                  <>
                    Mpate fundi unayemwamini,{" "}
                    <span className="bg-gradient-to-r from-bolt-600 to-emerald-500 bg-clip-text text-transparent dark:from-bolt-400 dark:to-emerald-300">
                      pale unapomhitaji.
                    </span>
                  </>
                )}
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                {t.heroText}
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#services"
                  className="btn-primary group shadow-lg shadow-bolt-500/25"
                >
                  {t.find}
                  <ArrowDownRight
                    size={18}
                    className="transition group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  />
                </a>
                <a href="#about" className="btn-dark">
                  {t.explore}
                </a>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
                {(
                  [
                    [ShieldCheck, lang === "en" ? "Trusted profiles" : "Wasifu wa kuamini"],
                    [Smartphone, lang === "en" ? "Mobile-first" : "Imejengwa kwa simu"],
                    [CheckCircle2, lang === "en" ? "Simple requests" : "Maombi rahisi"]
                  ] as const
                ).map(([Icon, text]) => (
                  <div
                    key={text}
                    className="flex items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white/70 px-3.5 py-3 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-xl bg-bolt-500/15 text-bolt-600 dark:bg-bolt-500/20 dark:text-bolt-400">
                      <Icon size={16} />
                    </span>
                    {text}
                  </div>
                ))}
              </div>
            </StaggerItem>
          </Stagger>
        </div>

        {/* Right visual mock */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <Reveal variant="scaleIn" delay={0.25} duration={0.7}>
            <div className="relative">
              {/* floating badge */}
              <motion.div
                className="absolute -left-2 top-8 z-20 flex items-center gap-2 rounded-2xl border border-white/20 bg-white/90 px-3 py-2 shadow-xl backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/90 sm:-left-6"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-bolt-500 text-slate-950">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {lang === "en" ? "Near you" : "Karibu yako"}
                  </p>
                  <p className="text-sm font-black text-slate-900 dark:text-white">
                    Dar es Salaam
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="absolute -right-1 bottom-24 z-20 flex items-center gap-2 rounded-2xl border border-white/20 bg-slate-950 px-3 py-2 text-white shadow-xl sm:-right-4"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              >
                <Sparkles size={16} className="text-bolt-400" />
                <span className="text-xs font-bold">
                  {lang === "en" ? "Verified fundis" : "Mafundi waliothibitishwa"}
                </span>
              </motion.div>

              <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-bolt-500/30 via-emerald-400/20 to-teal-500/10 blur-2xl dark:from-bolt-500/20 dark:via-emerald-500/10" />

              <div className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-slate-950 p-3 shadow-2xl ring-1 ring-white/10 dark:border-slate-700 sm:rounded-[32px] sm:p-5">
                <div className="mb-4 flex items-center justify-between text-white">
                  <div>
                    <p className="text-xs font-bold tracking-wide text-bolt-400">NearbyFundi</p>
                    <p className="mt-0.5 text-lg font-black sm:text-xl">
                      {lang === "en" ? "Services, nearby." : "Huduma, karibu."}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold backdrop-blur">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-bolt-400" />
                    Live
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  <motion.div
                    className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <img
                      src="/screenshots/map-fundis.png"
                      alt="Find fundis map"
                      className="h-48 w-full object-cover object-top sm:h-56 lg:h-64"
                      loading="eager"
                    />
                  </motion.div>
                  <motion.div
                    className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <img
                      src="/screenshots/dashboard.png"
                      alt="Dashboard"
                      className="h-48 w-full object-cover object-top sm:h-56 lg:h-64"
                      loading="eager"
                    />
                  </motion.div>
                </div>

                {/* bottom strip of more screens */}
                <div className="mt-2.5 grid grid-cols-3 gap-2 sm:mt-3 sm:gap-3">
                  {["/screenshots/search.png", "/screenshots/services-pricing.png", "/screenshots/login.png"].map(
                    (src, i) => (
                      <motion.div
                        key={src}
                        className="overflow-hidden rounded-xl border border-white/10 bg-slate-900"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.45 }}
                        whileHover={{ scale: 1.03 }}
                      >
                        <img
                          src={src}
                          alt=""
                          className="h-16 w-full object-cover object-top sm:h-20"
                          loading="lazy"
                        />
                      </motion.div>
                    )
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent dark:from-slate-950" />
    </section>
  );
}

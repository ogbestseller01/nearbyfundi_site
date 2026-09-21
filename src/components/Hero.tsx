import { useEffect, useRef } from "react";
import { ArrowDownRight, BadgeCheck, MapPin, Sparkles, Users } from "lucide-react";
import type { Lang } from "../data/content";
import { copy } from "../data/content";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "./Motion";

// African constellation (view 0..100)
const continentNodes = [
  { id: "n1", x: 38, y: 12 }, { id: "n2", x: 48, y: 14 }, { id: "n3", x: 58, y: 16 },
  { id: "n4", x: 22, y: 32 }, { id: "n5", x: 34, y: 38 }, { id: "n6", x: 46, y: 34 },
  { id: "n7", x: 56, y: 33 }, { id: "n8", x: 68, y: 44 }, { id: "n9", x: 50, y: 56 },
  { id: "n10", x: 62, y: 54 }, { id: "n11", x: 42, y: 68 }, { id: "n12", x: 58, y: 72 },
  { id: "n13", x: 43, y: 84 }, { id: "n14", x: 52, y: 94 }, { id: "n15", x: 74, y: 80 },
];

const nodeConnections = [
  ["n1", "n2"], ["n2", "n3"], ["n1", "n4"], ["n4", "n5"], ["n5", "n6"],
  ["n2", "n6"], ["n3", "n7"], ["n6", "n7"], ["n7", "n8"], ["n6", "n9"],
  ["n7", "n9"], ["n7", "n10"], ["n9", "n10"], ["n9", "n11"], ["n9", "n12"],
  ["n11", "n13"], ["n12", "n13"], ["n13", "n14"], ["n12", "n15"], ["n10", "n12"],
];

const bubbles = [
  { size: "w-80 h-80", pos: "-left-20 top-10", color: "bg-emerald-500/20 dark:bg-emerald-500/15", delay: 0, duration: 8 },
  { size: "w-96 h-96", pos: "-right-24 top-32", color: "bg-amber-500/15 dark:bg-amber-500/10", delay: 1, duration: 10 },
  { size: "w-80 h-80", pos: "left-1/3 bottom-10", color: "bg-amber-500/20 dark:bg-amber-500/15", delay: 2, duration: 9 },
];

/* ---------- Animated counter (counts up when scrolled into view) ---------- */
function Counter({ to, suffix = "", duration = 2.2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const value = useMotionValue(0);
  const text = useTransform(value, (v) => Math.round(v).toLocaleString("en-US") + suffix);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      value.set(to);
      return;
    }
    const controls = animate(value, to, { duration, ease: [0.16, 1, 0.3, 1], delay: 0.6 });
    return () => controls.stop();
  }, [inView, reduce, to, duration, value]);

  return <motion.span ref={ref}>{text}</motion.span>;
}

/* ---------- Bouncing word: drops in with a spring, then hops on hover ---------- */
const wordVariants = {
  hidden: { opacity: 0, y: -60, scale: 0.85, rotate: -4 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 380,
      damping: 11, // low damping = visible bounce
      mass: 0.8,
      delay: 0.2 + i * 0.09,
    },
  }),
};

function BounceLine({
                      words,
                      offset = 0,
                      reduce,
                    }: {
  words: string[];
  offset?: number;
  reduce: boolean;
}) {
  return (
      <>
        {words.map((word, i) => (
            <motion.span
                key={`${word}-${i}`}
                custom={offset + i}
                variants={wordVariants}
                initial={reduce ? false : "hidden"}
                animate="visible"
                whileHover={
                  reduce
                      ? undefined
                      : { y: [0, -14, 0, -6, 0], transition: { duration: 0.55, ease: "easeOut" } }
                }
                className="mr-[0.28em] inline-block cursor-default last:mr-0"
            >
              {word}
            </motion.span>
        ))}
      </>
  );
}

export default function Hero({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const reduce = !!useReducedMotion();

  const line1 = lang === "en" ? ["Find", "a", "trusted", "fundi."] : ["Mpate", "fundi", "unayemwamini,"];
  const line2 = lang === "en" ? ["Right", "when", "you", "need", "one."] : ["pale", "unapomhitaji."];

  const stats = [
    {
      Icon: BadgeCheck,
      value: 5000,
      label: lang === "en" ? "Verified fundis" : "Mafundi waliothibitishwa",
    },
    {
      Icon: Users,
      value: 100000,
      label: lang === "en" ? "Happy customers" : "Wateja walioridhika",
    },
  ];

  return (
      <section
          id="home"
          className="relative overflow-hidden bg-gradient-to-b from-[#f0faf6] via-[#f6fbf9] to-white pt-[74px] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
      >
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {bubbles.map((b, idx) => (
              <motion.div
                  key={idx}
                  className={`absolute rounded-full blur-3xl ${b.size} ${b.pos} ${b.color}`}
                  animate={reduce ? undefined : { y: [0, -35, 0], x: [0, 25, 0], scale: [1, 1.15, 1] }}
                  transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
              />
          ))}

          <div className="absolute inset-0 flex items-center justify-center opacity-30 dark:opacity-40">
            <svg className="h-full w-full max-w-6xl" viewBox="0 0 100 100" preserveAspectRatio="none">
              {nodeConnections.map(([fromId, toId], idx) => {
                const a = continentNodes.find((n) => n.id === fromId)!;
                const b = continentNodes.find((n) => n.id === toId)!;
                return (
                    <motion.line
                        key={`line-${idx}`}
                        x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                        stroke="currentColor"
                        className="text-amber-500/60 dark:text-amber-400/50"
                        strokeWidth="0.3"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: reduce ? 0.6 : [0.3, 0.8, 0.3] }}
                        transition={{
                          pathLength: { duration: 2, delay: idx * 0.05 },
                          opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                        }}
                    />
                );
              })}
              {continentNodes.map((node, idx) => (
                  <g key={node.id}>
                    <motion.circle
                        cx={node.x} cy={node.y} r="1.2"
                        className="fill-amber-400/20 dark:fill-amber-300/30"
                        animate={reduce ? undefined : { scale: [1, 2.2, 1], opacity: [0.4, 0.9, 0.4] }}
                        transition={{ duration: 3 + (idx % 3), repeat: Infinity, ease: "easeInOut", delay: idx * 0.15 }}
                    />
                    <circle cx={node.x} cy={node.y} r="0.6" className="fill-amber-500 dark:fill-amber-300" />
                  </g>
              ))}
            </svg>
          </div>

          <div
              className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
              style={{
                backgroundImage: "radial-gradient(circle, #0f172a 1.2px, transparent 1.2px)",
                backgroundSize: "32px 32px",
              }}
          />
        </div>

        <div className="container-page relative grid min-h-[min(860px,100svh)] items-center gap-12 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:py-20">
          {/* Left copy */}
          <div className="relative z-10">
            <Stagger delay={0.05} stagger={0.1}>
              <StaggerItem>
              <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50/80 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm backdrop-blur-md dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <Sparkles size={14} className="text-emerald-500" />
                {t.heroEyebrow}
              </span>
              </StaggerItem>

              {/* Bouncing headline */}
              <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.06] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-[3.5rem] xl:text-6xl dark:text-white">
              <span className="block">
                <BounceLine words={line1} reduce={reduce} />
              </span>
                <span className="mt-1 block bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-300 dark:to-amber-300">
                <BounceLine words={line2} offset={line1.length} reduce={reduce} />
              </span>
              </h1>

              <StaggerItem>
                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">{t.heroText}</p>
              </StaggerItem>

              <StaggerItem>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#services" className="btn-primary group shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/35">
                    {t.find}
                    <ArrowDownRight size={18} className="transition group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                  </a>
                  <a href="#app-demo" className="btn-dark">{t.explore}</a>
                </div>
              </StaggerItem>

              {/* Counters */}
              <StaggerItem>
                <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
                  {stats.map(({ Icon, value, label }) => (
                      <motion.div
                          key={label}
                          whileHover={reduce ? undefined : { y: -4 }}
                          transition={{ type: "spring", stiffness: 400, damping: 14 }}
                          className="flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-3.5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/60"
                      >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                      <Icon size={22} />
                    </span>
                        <div>
                          <p className="text-2xl font-black tabular-nums leading-none tracking-tight text-slate-950 dark:text-white">
                            <Counter to={value} suffix="+" />
                          </p>
                          <p className="mt-1 text-sm font-semibold text-slate-600 dark:text-slate-300">{label}</p>
                        </div>
                      </motion.div>
                  ))}
                </div>
              </StaggerItem>
            </Stagger>
          </div>

          {/* Right visual */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <Reveal variant="scaleIn" delay={0.25} duration={0.7}>
              <div className="relative">
                <motion.div
                    className="absolute -inset-4 rounded-[40px] bg-gradient-to-r from-emerald-500/25 via-amber-500/20 to-teal-500/25 opacity-70 blur-2xl dark:opacity-40"
                    animate={reduce ? undefined : { scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Badge: location */}
                <motion.div
                    className="absolute -left-2 top-8 z-20 flex items-center gap-2.5 rounded-2xl border border-white/40 bg-white/80 p-2.5 shadow-xl backdrop-blur-lg dark:border-slate-700/60 dark:bg-slate-900/80 sm:-left-6"
                    animate={reduce ? undefined : { y: [0, -10, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500 text-white shadow-md">
                  <MapPin size={20} />
                </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {lang === "en" ? "Near you" : "Karibu yako"}
                    </p>
                    <p className="text-sm font-black text-slate-900 dark:text-white">Dar es Salaam</p>
                  </div>
                </motion.div>

                {/* Badge: verified */}
                <motion.div
                    className="absolute -right-1 bottom-24 z-20 flex items-center gap-2 rounded-2xl border border-white/20 bg-slate-950/90 px-3.5 py-2.5 text-white shadow-2xl backdrop-blur-md sm:-right-4"
                    animate={reduce ? undefined : { y: [0, 10, 0] }}
                    transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                  <span className="text-xs font-bold text-emerald-400">
                  {lang === "en" ? "Verified fundis" : "Mafundi waliothibitishwa"}
                </span>
                </motion.div>

                {/* Mockup card */}
                <div className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-slate-950 p-3 shadow-2xl ring-1 ring-white/10 dark:border-slate-800 sm:rounded-[32px] sm:p-5">
                  <div className="mb-4 flex items-center justify-between text-white">
                    <div>
                      <p className="text-xs font-bold tracking-wide text-emerald-400">NearbyFundi</p>
                      <p className="mt-0.5 text-lg font-black sm:text-xl">
                        {lang === "en" ? "Services, nearby." : "Huduma, karibu."}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold backdrop-blur">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      Live
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                    {[
                      { src: "/screenshots/map-fundis.png", alt: "Find fundis map" },
                      { src: "/screenshots/dashboard.png", alt: "Dashboard" },
                    ].map((img) => (
                        <motion.div
                            key={img.src}
                            className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900"
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <img src={img.src} alt={img.alt} className="h-48 w-full object-cover object-top sm:h-56 lg:h-64" loading="eager" />
                        </motion.div>
                    ))}
                  </div>

                  <div className="mt-2.5 grid grid-cols-3 gap-2 sm:mt-3 sm:gap-3">
                    {["/screenshots/search.png", "/screenshots/services-pricing.png", "/screenshots/login.png"].map((src, i) => (
                        <motion.div
                            key={src}
                            className="overflow-hidden rounded-xl border border-white/10 bg-slate-900"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.1, duration: 0.45 }}
                            whileHover={{ scale: 1.05 }}
                        >
                          <img src={src} alt="" className="h-16 w-full object-cover object-top sm:h-20" loading="lazy" />
                        </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent dark:from-slate-950" />
      </section>
  );
}
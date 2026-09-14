import { useEffect, useRef, useState, useCallback } from "react";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  LogIn,
  MapPin,
  Search,
  ClipboardList,
  Navigation,
  RotateCcw,
  Hand,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Lang } from "../data/content";
import { Reveal } from "./Motion";

type Step = {
  id: string;
  img: string;
  titleEn: string;
  titleSw: string;
  descEn: string;
  descSw: string;
  icon: typeof UserPlus;
  tipEn: string;
  tipSw: string;
};

const STEPS: Step[] = [
  {
    id: "signup",
    img: "/screenshots/journey-signup.png",
    titleEn: "Create account",
    titleSw: "Fungua akaunti",
    descEn: "Sign up with name, email, phone (+255) and password. Agree to terms and you are in.",
    descSw: "Jisajili kwa jina, barua pepe, simu (+255) na nenosiri. Kubali masharti na uingie.",
    icon: UserPlus,
    tipEn: "Fill details → Sign Up",
    tipSw: "Jaza taarifa → Jisajili",
  },
  {
    id: "login",
    img: "/screenshots/journey-login.png",
    titleEn: "Welcome back",
    titleSw: "Karibu tena",
    descEn: "Sign in with email and password, or continue with Google. Forgot password? Reset in one tap.",
    descSw: "Ingia kwa barua pepe na nenosiri, au endelea na Google. Umesahau nenosiri? Rekebisha kwa gusa moja.",
    icon: LogIn,
    tipEn: "Email + password → Sign In",
    tipSw: "Barua pepe + nenosiri → Ingia",
  },
  {
    id: "location",
    img: "/screenshots/journey-pick-location.png",
    titleEn: "Pick location",
    titleSw: "Chagua eneo",
    descEn: "Drop a pin on the map (Dar es Salaam and beyond). Tap Use this location to continue.",
    descSw: "Weka alama kwenye ramani (Dar es Salaam na kwingineko). Gusa Tumia eneo hili kuendelea.",
    icon: MapPin,
    tipEn: "Tap map → Use this location",
    tipSw: "Gusa ramani → Tumia eneo hili",
  },
  {
    id: "find",
    img: "/screenshots/journey-find-fundi.png",
    titleEn: "Find Fundi",
    titleSw: "Tafuta Fundi",
    descEn: "See technicians near you on the map. Filter by service — AC repair, gas refill, and more.",
    descSw: "Ona mafundi karibu nawe kwenye ramani. Chuja kwa huduma — ukarabati wa AC, gas, na zaidi.",
    icon: Search,
    tipEn: "Filter service → tap a pin",
    tipSw: "Chuja huduma → gusa alama",
  },
  {
    id: "requests",
    img: "/screenshots/journey-requests.png",
    titleEn: "Your requests",
    titleSw: "Maombi yako",
    descEn: "Track accepted, pending and completed jobs. Open details or cancel when needed.",
    descSw: "Fuatilia kazi zilizokubaliwa, zinazosubiri na zilizokamilika. Fungua maelezo au batilisha.",
    icon: ClipboardList,
    tipEn: "Track or View Details",
    tipSw: "Fuatilia au Angalia Maelezo",
  },
  {
    id: "tracking",
    img: "/screenshots/journey-live-tracking.png",
    titleEn: "Live tracking",
    titleSw: "Ufuatiliaji wa moja kwa moja",
    descEn: "Watch your fundi on the map in real time — distance, ETA, speed and status.",
    descSw: "Fuatilia fundi wako kwenye ramani kwa wakati halisi — umbali, ETA, kasi na hali.",
    icon: Navigation,
    tipEn: "Live map until job done",
    tipSw: "Ramani hai hadi kazi iishe",
  },
];

type Props = { lang: Lang };

export default function AppPlayground({ lang }: Props) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [direction, setDirection] = useState(1);
  const stripRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const current = STEPS[step];
  const Icon = current.icon;

  const go = useCallback(
    (next: number) => {
      const clamped = ((next % STEPS.length) + STEPS.length) % STEPS.length;
      setDirection(clamped > step || (step === STEPS.length - 1 && clamped === 0) ? 1 : -1);
      setStep(clamped);
    },
    [step]
  );

  const next = useCallback(() => go(step + 1), [go, step]);
  const prev = useCallback(() => go(step - 1), [go, step]);

  useEffect(() => {
    if (!playing || reduce) return;
    const t = setInterval(() => {
      setDirection(1);
      setStep((s) => (s + 1) % STEPS.length);
    }, 3500);
    return () => clearInterval(t);
  }, [playing, reduce]);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const card = el.children[step] as HTMLElement | undefined;
    if (!card) return;
    const left = card.offsetLeft - (el.clientWidth - card.clientWidth) / 2;
    el.scrollTo({ left, behavior: "smooth" });
  }, [step]);

  const t = {
    eyebrow: lang === "en" ? "App journey" : "Safari ya app",
    title: lang === "en" ? "Play the app journey." : "Cheza safari ya programu.",
    subtitle:
      lang === "en"
        ? "Scroll or tap through the real NearbyFundi flow — sign up, login, pick location, find a fundi, manage requests and live-track. A motion toy of the mobile experience."
        : "Scroll au gusa kupitia mtiririko halisi wa NearbyFundi — jisajili, ingia, chagua eneo, tafuta fundi, simamia maombi na ufuatiliaji wa moja kwa moja.",
    play: lang === "en" ? "Auto-play" : "Cheza kiotomatiki",
    pause: lang === "en" ? "Pause" : "Simamisha",
    reset: lang === "en" ? "Restart" : "Anza upya",
    stepOf: lang === "en" ? "Step" : "Hatua",
    of: lang === "en" ? "of" : "kati ya",
    tip: lang === "en" ? "Try this" : "Jaribu hivi",
    scrollHint: lang === "en" ? "Swipe phones or use arrows" : "Telezesha simu au tumia mishale",
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.94,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.94,
    }),
  };

  return (
    <section
      id="app-demo"
      className="relative overflow-hidden section-pad bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-bolt-500/20 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-2xl" />
      </div>

      <div className="container-page relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow !bg-bolt-500/20 !text-bolt-300">{t.eyebrow}</span>
          <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">{t.title}</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">{t.subtitle}</p>
        </Reveal>

        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-2">
          {STEPS.map((s, i) => {
            const active = i === step;
            const done = i < step;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setPlaying(false);
                  go(i);
                }}
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-bold transition sm:text-sm ${
                  active
                    ? "bg-bolt-500 text-slate-950 shadow-lg shadow-bolt-500/30"
                    : done
                      ? "bg-white/15 text-white hover:bg-white/25"
                      : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span
                  className={`grid h-5 w-5 place-items-center rounded-full text-[10px] ${
                    active ? "bg-slate-950/20" : done ? "bg-bolt-500/40 text-bolt-200" : "bg-white/10"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="hidden sm:inline">{lang === "en" ? s.titleEn : s.titleSw}</span>
              </button>
            );
          })}
        </div>

        <div className="relative mt-10">
          <p className="mb-4 flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
            <Hand size={14} className="text-bolt-400" />
            {t.scrollHint}
          </p>

          <div
            ref={stripRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-[max(1rem,calc(50%-140px))] pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onScroll={() => setPlaying(false)}
          >
            {STEPS.map((s, i) => {
              const active = i === step;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setPlaying(false);
                    go(i);
                  }}
                  className={`snap-center shrink-0 transition-all duration-300 ${
                    active ? "scale-100 opacity-100" : "scale-90 opacity-50 hover:opacity-80"
                  }`}
                >
                  <div
                    className={`relative w-[260px] sm:w-[280px] ${
                      active ? "drop-shadow-[0_20px_40px_rgba(32,201,151,0.25)]" : ""
                    }`}
                  >
                    {active && (
                      <div className="absolute -inset-4 rounded-[48px] bg-gradient-to-br from-bolt-500/30 via-emerald-400/15 to-cyan-400/20 blur-xl" />
                    )}
                    <div className="relative rounded-[36px] border-[7px] border-slate-800 bg-slate-950 p-1 shadow-2xl ring-1 ring-white/10">
                      <div className="overflow-hidden rounded-[28px] bg-slate-900">
                        <div className="mx-auto mt-1.5 h-4 w-20 rounded-full bg-slate-950" />
                        <div className="relative aspect-[9/19] w-full overflow-hidden">
                          <img
                            src={s.img}
                            alt={lang === "en" ? s.titleEn : s.titleSw}
                            className="absolute inset-0 h-full w-full object-cover object-top"
                            draggable={false}
                            loading={i === 0 ? "eager" : "lazy"}
                          />
                        </div>
                      </div>
                    </div>
                    <p
                      className={`mt-3 text-center text-sm font-bold ${
                        active ? "text-bolt-300" : "text-slate-500"
                      }`}
                    >
                      {lang === "en" ? s.titleEn : s.titleSw}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_auto_1fr]">
          <div className="hidden lg:block" />

          <div className="flex flex-col items-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setPlaying(false);
                  prev();
                }}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-bolt-500 px-5 font-bold text-slate-950 transition hover:bg-bolt-400"
              >
                {playing ? <Pause size={16} /> : <Play size={16} />}
                {playing ? t.pause : t.play}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlaying(false);
                  next();
                }}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlaying(false);
                  setDirection(-1);
                  setStep(0);
                }}
                className="ml-1 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-slate-300 transition hover:bg-white/15"
                aria-label={t.reset}
                title={t.reset}
              >
                <RotateCcw size={16} />
              </button>
            </div>

            <p className="mt-4 text-xs font-medium text-slate-400">
              {t.stepOf} {step + 1} {t.of} {STEPS.length}
            </p>
            <div className="mt-3 h-1.5 w-48 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-bolt-400 to-emerald-400"
                initial={false}
                animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mx-auto w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:mx-0"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-bolt-500 text-slate-950 shadow-lg shadow-bolt-500/30">
                <Icon size={22} strokeWidth={2.2} />
              </div>
              <h3 className="mt-4 text-xl font-black">
                {lang === "en" ? current.titleEn : current.titleSw}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {lang === "en" ? current.descEn : current.descSw}
              </p>
              <div className="mt-4 rounded-2xl border border-bolt-400/30 bg-bolt-500/10 px-3.5 py-2.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-bolt-300">
                  {t.tip}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-white">
                  {lang === "en" ? current.tipEn : current.tipSw}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 hidden justify-center lg:flex">
          <div className="relative w-[300px]">
            <div className="absolute -inset-6 rounded-[52px] bg-gradient-to-br from-bolt-500/25 via-emerald-400/15 to-cyan-400/15 blur-2xl" />
            <div className="relative rounded-[40px] border-[8px] border-slate-800 bg-slate-950 p-1.5 shadow-2xl ring-1 ring-white/10">
              <div className="relative overflow-hidden rounded-[32px] bg-slate-900">
                <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-slate-950" />
                <div className="relative aspect-[9/19] w-full overflow-hidden">
                  <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.img
                      key={current.id}
                      src={current.img}
                      alt={lang === "en" ? current.titleEn : current.titleSw}
                      custom={direction}
                      variants={reduce ? undefined : slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="absolute inset-0 h-full w-full object-cover object-top"
                      draggable={false}
                    />
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useCallback, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  LogIn,
  MapPin,
  MessageCircle,
  Pause,
  Play,
  RotateCcw,
  Search,
  UserPlus,
  Wrench,
  BookOpen,
  Eye,
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
    titleEn: "Create your account",
    titleSw: "Fungua akaunti yako",
    descEn:
      "Sign up with full name, email, phone (+255) and password. Verify your phone and you are ready to find fundis.",
    descSw:
      "Jisajili kwa jina kamili, barua pepe, simu (+255) na nenosiri. Thibitisha simu yako na uwe tayari kutafuta mafundi.",
    icon: UserPlus,
    tipEn: "Fill details → Create Account",
    tipSw: "Jaza taarifa → Fungua Akaunti",
  },
  {
    id: "login",
    img: "/screenshots/journey-login.png",
    titleEn: "Sign in or create account",
    titleSw: "Ingia au fungua akaunti",
    descEn:
      "Sign in with email & password or phone & password. Or continue with Google / Apple. New users can create an account in seconds.",
    descSw:
      "Ingia kwa barua pepe na nenosiri au simu na nenosiri. Au endelea na Google / Apple. Watumiaji wapya wanaweza fungua akaunti kwa sekunde chache.",
    icon: LogIn,
    tipEn: "Email/Phone + password → Sign In",
    tipSw: "Barua pepe/Simu + nenosiri → Ingia",
  },
  {
    id: "find",
    img: "/screenshots/journey-find-fundi.png",
    titleEn: "Find a fundi near you",
    titleSw: "Tafuta fundi karibu nawe",
    descEn:
      "Search a place, pick a location on the map, or filter by service. NearbyFundi shows verified technicians ready to help.",
    descSw:
      "Tafuta mahali, chagua eneo kwenye ramani, au chuja kwa huduma. NearbyFundi inaonyesha mafundi waliothibitishwa walio tayari kusaidia.",
    icon: Search,
    tipEn: "Search location or pick on map",
    tipSw: "Tafuta eneo au chagua kwenye ramani",
  },
  {
    id: "map",
    img: "/screenshots/journey-map-fundis.png",
    titleEn: "See fundis on the map",
    titleSw: "Ona mafundi kwenye ramani",
    descEn:
      "Technicians appear on the map with distance and ratings. Tap any pin or card to explore who can solve your problem.",
    descSw:
      "Mafundi wanaonekana kwenye ramani pamoja na umbali na tathmini. Gusa pin au kadi yoyote kuona nani anaweza kutatua tatizo lako.",
    icon: MapPin,
    tipEn: "Tap a fundi pin or card",
    tipSw: "Gusa pin au kadi ya fundi",
  },
  {
    id: "preview",
    img: "/screenshots/journey-fundi-preview.png",
    titleEn: "Preview & view profile",
    titleSw: "Angalia na fungua wasifu",
    descEn:
      "Quick view of rating, distance, jobs done and services. Tap View Profile for full details before you book.",
    descSw:
      "Muhtasari wa tathmini, umbali, kazi zilizofanywa na huduma. Gusa View Profile kwa maelezo kamili kabla ya kuweka ombi.",
    icon: Eye,
    tipEn: "View Profile → Request Fundi",
    tipSw: "Angalia Wasifu → Omba Fundi",
  },
  {
    id: "request",
    img: "/screenshots/request-fundi.png",
    titleEn: "Request this fundi",
    titleSw: "Omba fundi huyu",
    descEn:
      "Choose the service, describe your issue, set the job location and submit. Your fundi is notified instantly.",
    descSw:
      "Chagua huduma, eleza tatizo lako, weka eneo la kazi na wasilisha. Fundi wako anapata taarifa papo hapo.",
    icon: Wrench,
    tipEn: "Select service → describe → Submit",
    tipSw: "Chagua huduma → eleza → Wasilisha",
  },
  {
    id: "requests",
    img: "/screenshots/journey-my-requests.png",
    titleEn: "Track your requests",
    titleSw: "Fuatilia maombi yako",
    descEn:
      "See all requests (pending, accepted, rejected). Open any accepted request and tap View Job to continue.",
    descSw:
      "Ona maombi yote (yanayosubiri, yaliyokubaliwa, yaliyokataliwa). Fungua ombi lililokubaliwa na gusa View Job kuendelea.",
    icon: ClipboardList,
    tipEn: "View Job → Chat with fundi",
    tipSw: "Angalia Kazi → Ongea na fundi",
  },
  {
    id: "chat",
    img: "/screenshots/journey-chat.png",
    titleEn: "Chat & get contact",
    titleSw: "Ongea na pata mawasiliano",
    descEn:
      "Bargain details, share photos and get the fundi’s contact so you can coordinate the job smoothly.",
    descSw:
      "Jadili maelezo, shiriki picha na upate nambari ya fundi ili kuratibu kazi kwa urahisi.",
    icon: MessageCircle,
    tipEn: "Chat → agree → get contact",
    tipSw: "Ongea → kubaliana → pata mawasiliano",
  },
  {
    id: "blog",
    img: "/screenshots/journey-blog.png",
    titleEn: "Explore fundi posts",
    titleSw: "Angalia machapisho ya mafundi",
    descEn:
      "Visit the Blog to see real work photos and updates from technicians — proof of quality before you book.",
    descSw:
      "Tembelea Blog kuona picha za kazi za kweli na masasisho kutoka kwa mafundi — ushahidi wa ubora kabla ya kuweka ombi.",
    icon: BookOpen,
    tipEn: "Browse Blog for real results",
    tipSw: "Angalia Blog kwa matokeo ya kweli",
  },
];

const STEP_MS = 4500;

type Props = { lang: Lang };

export default function NearByFindiAppPlayground({ lang }: Props) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [direction, setDirection] = useState(1);
  const reduce = useReducedMotion();

  const current = STEPS[step];
  const en = lang === "en";

  const go = useCallback(
    (to: number) => {
      const n = ((to % STEPS.length) + STEPS.length) % STEPS.length;
      setDirection(to > step ? 1 : -1);
      setStep(n);
    },
    [step]
  );

  useEffect(() => {
    if (!playing || reduce) return;
    const id = setTimeout(() => {
      setDirection(1);
      setStep((s) => (s + 1) % STEPS.length);
    }, STEP_MS);
    return () => clearTimeout(id);
  }, [playing, reduce, step]);

  const t = {
    eyebrow: en ? "NearbyFundi for customers" : "NearbyFundi kwa wateja",
    title: en
      ? "Your complete customer journey."
      : "Safari yako kamili kama mteja.",
    subtitle: en
      ? "Sign in, find nearby fundis, request the one you like, chat to agree details and get contact — then get the job done."
      : "Ingia, tafuta mafundi wa karibu, omba unayempenda, ongea kukubaliana maelezo na upate mawasiliano — kisha kazi ifanyike.",
    play: en ? "Play" : "Cheza",
    pause: en ? "Pause" : "Simamisha",
    restart: en ? "Restart" : "Anza upya",
    tip: en ? "Try this:" : "Jaribu hivi:",
    swipe: en ? "Swipe the phone or pick a step" : "Telezesha simu au chagua hatua",
    step: en ? "Step" : "Hatua",
    of: en ? "of" : "kati ya",
  };

  const slide = {
    enter: (d: number) => ({ x: d > 0 ? 70 : -70, opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -70 : 70, opacity: 0, scale: 0.96 }),
  };

  return (
    <section
      id="app-demo"
      className="relative overflow-hidden section-pad bg-white"
    >
      {/* Ambient light + grid — light version */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-bolt-500/10 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-gold-400/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#001533 1px, transparent 1px), linear-gradient(90deg, #001533 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        {/* Left: story + step rail */}
        <div className="order-2 lg:order-1">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-bolt-500/30 bg-bolt-500/10 px-3.5 py-1.5 text-xs font-bold text-bolt-700">
              {t.eyebrow}
            </span>
            <h2 className="mt-4 max-w-xl text-4xl font-black leading-[1.08] tracking-tight text-navy-800 sm:text-5xl">
              {t.title}
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-8 text-navy-600">
              {t.subtitle}
            </p>
          </Reveal>

          <ol className="mt-10 space-y-1">
            {STEPS.map((s, i) => {
              const active = i === step;
              const done = i < step;
              const Icon = s.icon;
              return (
                <li key={s.id} className="relative pl-7">
                  <span className="absolute bottom-0 left-0 top-0 w-[3px] rounded-full bg-navy-200" />
                  {done && (
                    <span className="absolute bottom-0 left-0 top-0 w-[3px] rounded-full bg-bolt-500/70" />
                  )}
                  {active && (
                    <motion.span
                      key={`${s.id}-${playing}`}
                      className="absolute left-0 top-0 w-[3px] origin-top rounded-full bg-gradient-to-b from-bolt-500 to-gold-400"
                      style={{ height: "100%" }}
                      initial={{ scaleY: playing && !reduce ? 0 : 1 }}
                      animate={{ scaleY: 1 }}
                      transition={{
                        duration: playing && !reduce ? STEP_MS / 1000 : 0.2,
                        ease: "linear",
                      }}
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setPlaying(false);
                      go(i);
                    }}
                    aria-current={active ? "step" : undefined}
                    className="group flex w-full items-start gap-4 rounded-2xl px-3 py-3.5 text-left transition hover:bg-navy-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-bolt-500"
                  >
                    <span
                      className={`mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl transition ${
                        active
                          ? "bg-bolt-500 text-white shadow-lg shadow-bolt-500/30"
                          : done
                            ? "bg-bolt-500/15 text-bolt-700"
                            : "bg-navy-100 text-bolt-800 group-hover:text-navy-700"
                      }`}
                    >
                      <Icon size={19} strokeWidth={2.2} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={`block text-base font-extrabold transition sm:text-lg ${
                          active
                            ? "text-navy-800"
                            : "text-bolt-800 group-hover:text-navy-700"
                        }`}
                      >
                        {en ? s.titleEn : s.titleSw}
                      </span>

                      <AnimatePresence initial={false}>
                        {active && (
                          <motion.span
                            key="body"
                            initial={reduce ? false : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={
                              reduce ? undefined : { height: 0, opacity: 0 }
                            }
                            transition={{
                              duration: 0.32,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="block overflow-hidden"
                          >
                            <span className="mt-1.5 block max-w-md text-sm leading-6 text-navy-600">
                              {en ? s.descEn : s.descSw}
                            </span>
                            <span className="mt-3 inline-flex flex-wrap items-center gap-x-2 rounded-lg bg-navy-100 px-3 py-1.5 text-sm">
                              <span className="font-semibold text-gold-700">
                                {t.tip}
                              </span>
                              <span className="font-medium text-navy-800">
                                {en ? s.tipEn : s.tipSw}
                              </span>
                            </span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setPlaying(false);
                go(step - 1);
              }}
              aria-label="Previous"
              className="grid h-11 w-11 place-items-center rounded-full border border-navy-200 bg-white text-navy-700 transition hover:bg-navy-100"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-bolt-500 px-5 font-bold text-white transition hover:bg-bolt-400"
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
              {playing ? t.pause : t.play}
            </button>
            <button
              type="button"
              onClick={() => {
                setPlaying(false);
                go(step + 1);
              }}
              aria-label="Next"
              className="grid h-11 w-11 place-items-center rounded-full border border-navy-200 bg-white text-navy-700 transition hover:bg-navy-100"
            >
              <ChevronRight size={20} />
            </button>
            <button
              type="button"
              onClick={() => {
                setDirection(-1);
                setStep(0);
                setPlaying(true);
              }}
              aria-label={t.restart}
              title={t.restart}
              className="grid h-11 w-11 place-items-center rounded-full text-bolt-800 transition hover:bg-navy-100 hover:text-navy-800"
            >
              <RotateCcw size={16} />
            </button>
            <span className="ml-1 text-sm font-medium text-bolt-900">
              {t.step} {step + 1} {t.of} {STEPS.length}
            </span>
          </div>
        </div>

        {/* Right: phone */}
        <div className="order-1 flex flex-col items-center lg:order-2">
          <div className="relative w-[280px] sm:w-[310px]">
            <motion.div
              className="absolute -inset-8 rounded-[64px] bg-gradient-to-br from-bolt-400/25 via-bolt-400/10 to-gold-300/20 blur-2xl"
              animate={
                reduce
                  ? undefined
                  : { opacity: [0.6, 1, 0.6], scale: [1, 1.04, 1] }
              }
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={reduce ? false : { opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, y: -10, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 380, damping: 18 }}
                className="absolute -left-4 top-14 z-20 flex items-center gap-2.5 rounded-2xl border border-navy-200 bg-white py-2 pl-2 pr-4 shadow-xl sm:-left-14"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-bolt-500 text-white">
                  <current.icon size={18} strokeWidth={2.4} />
                </span>
                <span className="text-sm font-extrabold text-navy-800">
                  {en ? current.titleEn : current.titleSw}
                </span>
              </motion.div>
            </AnimatePresence>

            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) < 60) return;
                setPlaying(false);
                go(info.offset.x < 0 ? step + 1 : step - 1);
              }}
              className="relative cursor-grab touch-pan-y rounded-[44px] border-[9px] border-navy-800 bg-navy-900 p-1.5 shadow-[0_40px_80px_-20px_rgba(15,23,42,0.35)] ring-1 ring-navy-200 active:cursor-grabbing"
            >
              <div className="relative overflow-hidden rounded-[34px] bg-navy-800">
                <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-navy-900" />
                <div className="relative aspect-[9/19] w-full overflow-hidden">
                  <AnimatePresence
                    initial={false}
                    custom={direction}
                    mode="popLayout"
                  >
                    <motion.img
                      key={current.id}
                      src={current.img}
                      alt={en ? current.titleEn : current.titleSw}
                      custom={direction}
                      variants={reduce ? undefined : slide}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className="absolute inset-0 h-full w-full select-none object-cover object-top"
                      draggable={false}
                    />
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-8 flex items-center gap-2">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`${t.step} ${i + 1}`}
                onClick={() => {
                  setPlaying(false);
                  go(i);
                }}
                className={`h-2 rounded-full transition-all ${
                  i === step
                    ? "w-8 bg-bolt-500"
                    : "w-2 bg-navy-200 hover:bg-bolt-800"
                }`}
              />
            ))}
          </div>
          <p className="mt-4 flex items-center gap-2 text-xs font-medium text-bolt-900">
            <Hand size={14} className="text-bolt-600" />
            {t.swipe}
          </p>
        </div>
      </div>
    </section>
  );
}

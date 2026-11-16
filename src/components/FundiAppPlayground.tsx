import { useCallback, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  LayoutDashboard,
  LogIn,
  MessageCircle,
  Pause,
  Play,
  RotateCcw,
  Briefcase,
  Ticket,
  Images,
  Hand,
  UserPlus,
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
  icon: typeof LogIn;
  tipEn: string;
  tipSw: string;
};

const STEPS: Step[] = [
  {
    id: "register",
    img: "/screenshots/fundi-register.png",
    titleEn: "Create fundi account",
    titleSw: "Fungua akaunti ya fundi",
    descEn:
      "Start registration with photo, full name, phone (+255), email and password. Then complete ID, biometrics, working location and services — account is reviewed and approved.",
    descSw:
      "Anza usajili kwa picha, jina kamili, simu (+255), barua pepe na nenosiri. Kisha kamilisha kitambulisho, biometriki, eneo la kazi na huduma — akaunti inakaguliwa na kuidhinishwa.",
    icon: UserPlus,
    tipEn: "Fill details → Submit for approval",
    tipSw: "Jaza taarifa → Wasilisha kwa idhini",
  },
  {
    id: "login",
    img: "/screenshots/fundi-login.png",
    titleEn: "Sign in",
    titleSw: "Ingia",
    descEn:
      "Once approved, sign in with email or phone and password to manage your services and jobs.",
    descSw:
      "Baada ya kuidhinishwa, ingia kwa barua pepe au simu na nenosiri kusimamia huduma na kazi zako.",
    icon: LogIn,
    tipEn: "Email/Phone + password → Sign In",
    tipSw: "Barua pepe/Simu + nenosiri → Ingia",
  },
  {
    id: "dashboard",
    img: "/screenshots/fundi-dashboard.png",
    titleEn: "Dashboard overview",
    titleSw: "Muhtasari wa dashibodi",
    descEn:
      "See total requests, pending, completed, jobs and tickets at a glance — plus your latest customer requests.",
    descSw:
      "Ona jumla ya maombi, yanayosubiri, yaliyokamilika, kazi na tiketi kwa mtazamo mmoja — pamoja na maombi ya hivi karibuni.",
    icon: LayoutDashboard,
    tipEn: "Check counts → open Latest Requests",
    tipSw: "Angalia hesabu → fungua Maombi ya hivi karibuni",
  },
  {
    id: "requests",
    img: "/screenshots/fundi-requests.png",
    titleEn: "Customer requests",
    titleSw: "Maombi ya wateja",
    descEn:
      "Review incoming requests. Accept the ones you can take or reject. Accepting turns the request into a job.",
    descSw:
      "Pitia maombi yanayoingia. Kubali unayoweza kufanya au kataa. Kukubali kunabadilisha ombi kuwa kazi.",
    icon: ClipboardList,
    tipEn: "Accept or Reject → View Job",
    tipSw: "Kubali au Kataa → Angalia Kazi",
  },
  {
    id: "jobs",
    img: "/screenshots/fundi-jobs.png",
    titleEn: "Jobs & tickets",
    titleSw: "Kazi na tiketi",
    descEn:
      "Accepted requests become jobs. Tickets are created automatically so you can track each job until completion.",
    descSw:
      "Maombi yaliyokubaliwa yanakuwa kazi. Tiketi zinaundwa kiotomatiki ili ufuatilie kila kazi hadi ikamilike.",
    icon: Briefcase,
    tipEn: "Open job → track tickets",
    tipSw: "Fungua kazi → fuatilia tiketi",
  },
  {
    id: "tickets",
    img: "/screenshots/fundi-tickets.png",
    titleEn: "Track tickets",
    titleSw: "Fuatilia tiketi",
    descEn:
      "Each job has tickets for progress tracking — on progress or completed — so nothing falls through the cracks.",
    descSw:
      "Kila kazi ina tiketi za kufuatilia maendeleo — zinazoendelea au zilizokamilika — ili kitu kisikoseke.",
    icon: Ticket,
    tipEn: "Filter by status → open ticket",
    tipSw: "Chuja kwa hali → fungua tiketi",
  },
  {
    id: "chat",
    img: "/screenshots/fundi-chat.png",
    titleEn: "Chat with customer",
    titleSw: "Ongea na mteja",
    descEn:
      "From an accepted request, chat to bargain details, share photos and exchange contact so the job goes smoothly.",
    descSw:
      "Kutoka ombi lililokubaliwa, ongea kujadili maelezo, shiriki picha na badilishana mawasiliano ili kazi iendelee vizuri.",
    icon: MessageCircle,
    tipEn: "Chat → agree → get contact",
    tipSw: "Ongea → kubaliana → pata mawasiliano",
  },
  {
    id: "blog",
    img: "/screenshots/fundi-blog.png",
    titleEn: "Manage your posts",
    titleSw: "Simamia machapisho yako",
    descEn:
      "Create, edit and delete posts on the Blog — show real work photos so customers trust and book you.",
    descSw:
      "Unda, hariri na futa machapisho kwenye Blog — onyesha picha za kazi za kweli ili wateja waamini na wakuchague.",
    icon: Images,
    tipEn: "Create / Edit / Delete posts",
    tipSw: "Unda / Hariri / Futa machapisho",
  },
];

const STEP_MS = 4500;

type Props = { lang: Lang };

export default function FundiAppPlayground({ lang }: Props) {
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
    eyebrow: en ? "Fundi App for technicians" : "Fundi App kwa mafundi",
    title: en
      ? "Built for the people who do the work."
      : "Imejengwa kwa wale wanaofanya kazi.",
    subtitle: en
      ? "Register, get approved, manage requests and jobs, chat with customers and showcase your work — all in one app."
      : "Jisajili, idhinishwa, simamia maombi na kazi, ongea na wateja na onyesha kazi zako — yote katika programu moja.",
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
      id="fundi-app"
      className="relative overflow-hidden section-pad bg-navy-900 text-white"
    >
      {/* Ambient light + grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-0 h-[28rem] w-[28rem] rounded-full bg-bolt-500/15 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-gold-400/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
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
            <span className="inline-flex items-center gap-2 rounded-full border border-bolt-400/40 bg-bolt-500/20 px-3.5 py-1.5 text-xs font-bold text-bolt-200">
              {t.eyebrow}
            </span>
            <h2 className="mt-4 max-w-xl text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl">
              {t.title}
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-8 text-bolt-100/90">
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
                  <span className="absolute bottom-0 left-0 top-0 w-[3px] rounded-full bg-white/15" />
                  {done && (
                    <span className="absolute bottom-0 left-0 top-0 w-[3px] rounded-full bg-bolt-400/70" />
                  )}
                  {active && (
                    <motion.span
                      key={`${s.id}-${playing}`}
                      className="absolute left-0 top-0 w-[3px] origin-top rounded-full bg-gradient-to-b from-bolt-400 to-gold-400"
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
                    className="group flex w-full items-start gap-4 rounded-2xl px-3 py-3.5 text-left transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-bolt-400"
                  >
                    <span
                      className={`mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl transition ${
                        active
                          ? "bg-bolt-500 text-white shadow-lg shadow-bolt-500/30"
                          : done
                            ? "bg-bolt-500/25 text-bolt-200"
                            : "bg-white/10 text-bolt-100 group-hover:text-white"
                      }`}
                    >
                      <Icon size={19} strokeWidth={2.2} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={`block text-base font-extrabold transition sm:text-lg ${
                          active
                            ? "text-white"
                            : "text-bolt-100/90 group-hover:text-white"
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
                            <span className="mt-1.5 block max-w-md text-sm leading-6 text-bolt-100/80">
                              {en ? s.descEn : s.descSw}
                            </span>
                            <span className="mt-3 inline-flex flex-wrap items-center gap-x-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm">
                              <span className="font-semibold text-gold-300">
                                {t.tip}
                              </span>
                              <span className="font-medium text-white">
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
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/10"
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
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/10"
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
              className="grid h-11 w-11 place-items-center rounded-full text-bolt-200 transition hover:bg-white/10 hover:text-white"
            >
              <RotateCcw size={16} />
            </button>
            <span className="ml-1 text-sm font-medium text-bolt-200">
              {t.step} {step + 1} {t.of} {STEPS.length}
            </span>
          </div>
        </div>

        {/* Right: phone */}
        <div className="order-1 flex flex-col items-center lg:order-2">
          <div className="relative w-[280px] sm:w-[310px]">
            <motion.div
              className="absolute -inset-8 rounded-[64px] bg-gradient-to-br from-bolt-400/30 via-bolt-400/10 to-gold-300/20 blur-2xl"
              animate={
                reduce
                  ? undefined
                  : { opacity: [0.55, 1, 0.55], scale: [1, 1.04, 1] }
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
                className="absolute -left-4 top-14 z-20 flex items-center gap-2.5 rounded-2xl border border-white/15 bg-navy-800 py-2 pl-2 pr-4 shadow-xl sm:-left-14"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-bolt-500 text-white">
                  <current.icon size={18} strokeWidth={2.4} />
                </span>
                <span className="text-sm font-extrabold text-white">
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
              className="relative cursor-grab touch-pan-y rounded-[44px] border-[9px] border-navy-700 bg-navy-950 p-1.5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/10 active:cursor-grabbing"
            >
              <div className="relative overflow-hidden rounded-[34px] bg-navy-900">
                <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-navy-950" />
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
                    ? "w-8 bg-bolt-400"
                    : "w-2 bg-white/25 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
          <p className="mt-4 flex items-center gap-2 text-xs font-medium text-bolt-200">
            <Hand size={14} className="text-bolt-300" />
            {t.swipe}
          </p>
        </div>
      </div>
    </section>
  );
}

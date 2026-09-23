import { useCallback, useEffect, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    LogIn,
    MessageCircle,
    Bell,
    Pause,
    Play,
    RotateCcw,
    Images,
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
    icon: typeof LogIn;
    tipEn: string;
    tipSw: string;
};

const STEPS: Step[] = [
    {
        id: "login",
        img: "/screenshots/fundapp1.jpeg",
        titleEn: "Login",
        titleSw: "Ingia",
        descEn: "Secure login for fundis and technicians to access their account.",
        descSw: "Ingia salama kwa mafundi na wateknolojia kufikia akaunti yao.",
        icon: LogIn,
        tipEn: "Email + password → Sign In",
        tipSw: "Barua pepe + nenosiri → Ingia",
    },
    {
        id: "dashboard",
        img: "/screenshots/fundiapp2.jpeg",
        titleEn: "Dashboard",
        titleSw: "Dashibodi",
        descEn: "See pending jobs, earnings, ratings and daily performance at a glance.",
        descSw: "Ona kazi zinazosubiri, mapato, tathmini na utendaji wa kila siku.",
        icon: LayoutDashboard,
        tipEn: "Check jobs & earnings",
        tipSw: "Angalia kazi na mapato",
    },
    {
        id: "works",
        img: "/screenshots/fundiapp3.jpeg",
        titleEn: "Works & Posts",
        titleSw: "Kazi na Machapisho",
        descEn: "Showcase completed jobs and posts so customers can see your real work.",
        descSw: "Onyesha kazi zilizokamilika na machapisho ili wateja waone kazi zako.",
        icon: Images,
        tipEn: "Add photos of your work",
        tipSw: "Ongeza picha za kazi zako",
    },
    {
        id: "chat",
        img: "/screenshots/fundiapp4.jpeg",
        titleEn: "Chat with customers",
        titleSw: "Ongea na wateja",
        descEn: "Direct chat between fundis and customers to coordinate jobs easily.",
        descSw: "Mazungumzo ya moja kwa moja kati ya mafundi na wateja kuratibu kazi.",
        icon: MessageCircle,
        tipEn: "Reply to customer messages",
        tipSw: "Jibu ujumbe wa wateja",
    },
    {
        id: "notifications",
        img: "/screenshots/fundiapp5.jpeg",
        titleEn: "Notifications",
        titleSw: "Arifa",
        descEn: "Stay updated with new job requests, messages and important alerts.",
        descSw: "Pata taarifa za maombi mapya ya kazi, ujumbe na arifa muhimu.",
        icon: Bell,
        tipEn: "Never miss a new job",
        tipSw: "Usikose kazi mpya",
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
            ? "Login, manage jobs, showcase your work, chat with customers and never miss a notification — all in one app."
            : "Ingia, simamia kazi, onyesha kazi zako, ongea na wateja na usikose arifa — yote katika programu moja.",
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
                            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
                        backgroundSize: "56px 56px",
                        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
                        WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
                    }}
                />
            </div>

            <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
                {/* Left: story + step rail */}
                <div className="order-2 lg:order-1">
                    <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-bolt-500/30 bg-bolt-500/10 px-3.5 py-1.5 text-xs font-bold text-gold-400">
              {t.eyebrow}
            </span>
                        <h2 className="mt-4 max-w-xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl">
                            {t.title}
                        </h2>
                        <p className="mt-5 max-w-lg text-lg leading-8 text-navy-200">
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
                                    <span className="absolute bottom-0 left-0 top-0 w-[3px] rounded-full bg-white/10" />
                                    {done && (
                                        <span className="absolute bottom-0 left-0 top-0 w-[3px] rounded-full bg-bolt-400/70" />
                                    )}
                                    {active && (
                                        <motion.span
                                            key={`${s.id}-${playing}`}
                                            className="absolute left-0 top-0 w-[3px] origin-top rounded-full bg-gradient-to-b from-bolt-300 to-gold-300"
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
                                        className="group flex w-full items-start gap-4 rounded-2xl px-3 py-3.5 text-left transition hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-bolt-300"
                                    >
                    <span
                        className={`mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl transition ${
                            active
                                ? "bg-gold-500 text-navy-900 shadow-lg shadow-gold-500/30"
                                : done
                                    ? "bg-gold-500/15 text-gold-400"
                                    : "bg-white/5 text-navy-200 group-hover:text-white"
                        }`}
                    >
                      <Icon size={19} strokeWidth={2.2} />
                    </span>

                                        <span className="min-w-0 flex-1">
                      <span
                          className={`block text-base font-extrabold transition sm:text-lg ${
                              active
                                  ? "text-white"
                                  : "text-navy-200 group-hover:text-white"
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
                                exit={reduce ? undefined : { height: 0, opacity: 0 }}
                                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                                className="block overflow-hidden"
                            >
                            <span className="mt-1.5 block max-w-md text-sm leading-6 text-navy-200">
                              {en ? s.descEn : s.descSw}
                            </span>
                                <span className="mt-3 inline-flex flex-wrap items-center gap-x-2 rounded-lg bg-white/[0.06] px-3 py-1.5 text-sm">
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
                            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/15"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            type="button"
                            onClick={() => setPlaying((p) => !p)}
                            className="inline-flex h-11 items-center gap-2 rounded-full bg-gold-500 px-5 font-bold text-navy-900 transition hover:bg-gold-400"
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
                            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/15"
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
                            className="grid h-11 w-11 place-items-center rounded-full text-navy-200 transition hover:bg-white/10 hover:text-white"
                        >
                            <RotateCcw size={16} />
                        </button>
                        <span className="ml-1 text-sm font-medium text-navy-200">
              {t.step} {step + 1} {t.of} {STEPS.length}
            </span>
                    </div>
                </div>

                {/* Right: phone */}
                <div className="order-1 flex flex-col items-center lg:order-2">
                    <div className="relative w-[280px] sm:w-[310px]">
                        <motion.div
                            className="absolute -inset-8 rounded-[64px] bg-gradient-to-br from-bolt-400/30 via-bolt-400/15 to-gold-300/25 blur-2xl"
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
                                className="absolute -left-4 top-14 z-20 flex items-center gap-2.5 rounded-2xl border border-white/15 bg-navy-800/90 py-2 pl-2 pr-4 shadow-2xl backdrop-blur sm:-left-14"
                            >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold-500 text-navy-900">
                  <current.icon size={18} strokeWidth={2.4} />
                </span>
                                <span className="text-sm font-extrabold">
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
                            className="relative cursor-grab touch-pan-y rounded-[44px] border-[9px] border-navy-800 bg-navy-900 p-1.5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10 active:cursor-grabbing"
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
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
                                        : "w-2 bg-white/25 hover:bg-white/50"
                                }`}
                            />
                        ))}
                    </div>
                    <p className="mt-4 flex items-center gap-2 text-xs font-medium text-navy-200">
                        <Hand size={14} className="text-gold-400" />
                        {t.swipe}
                    </p>
                </div>
            </div>
        </section>
    );
}
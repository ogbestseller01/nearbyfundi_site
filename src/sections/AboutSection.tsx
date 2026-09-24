// src/components/sections/AboutSection.tsx
import {
    BadgeCheck,
    MessageCircle,
    Search,
    Send,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Lang } from "../data/content";
import { Reveal, Stagger, StaggerItem } from "../components/Motion";
import PhoneMockup from "../components/PhoneMockup";

export default function AboutSection({ lang }: { lang: Lang }) {
    const en = lang === "en";
    const reduce = useReducedMotion();

    const steps = [
        {
            Icon: Search,
            title: en ? "Discover" : "Tafuta",
            text: en
                ? "Browse services and technicians around your area."
                : "Tazama huduma na mafundi waliopo karibu.",
        },
        {
            Icon: Send,
            title: en ? "Request" : "Omba huduma",
            text: en
                ? "Describe your job and send a service request."
                : "Eleza kazi yako na tuma ombi la huduma.",
        },
        {
            Icon: MessageCircle,
            title: en ? "Connect" : "Wasiliana",
            text: en
                ? "Chat and coordinate directly with your technician."
                : "Wasiliana na kuratibu moja kwa moja na fundi.",
        },
        {
            Icon: BadgeCheck,
            title: en ? "Complete" : "Maliza kazi",
            text: en
                ? "Get the job done and build trust through reviews."
                : "Kamilisha kazi na jenga uaminifu kupitia tathmini.",
        },
    ];

    return (
        <section
            id="about"
            className="relative overflow-hidden section-pad bg-navy-50 dark:bg-navy-900"
        >
            {/* ───────── Background map image ───────── */}
            {/* Desktop: full section. Mobile/tablet: soft faded version.
                Dark mode: the map is turned deep yellow and kept faint but visible. */}
            <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 lg:opacity-60 dark:opacity-40 dark:brightness-90 dark:saturate-200 dark:sepia"
                    style={{ backgroundImage: "url('/about-map.png')" }}
                />

                {/* Desktop overlay: fades left → right (same colour as the section
                    background, so there is no visible seam). Kept light in dark mode
                    so the map shows through on the right. */}
                <div className="absolute inset-0 hidden bg-gradient-to-r from-navy-50 via-navy-50/85 to-navy-50/20 lg:block dark:from-navy-900 dark:via-navy-900/70 dark:to-navy-900/0" />

                {/* Mobile / tablet overlay: fades top → bottom */}
                <div className="absolute inset-0 bg-gradient-to-b from-navy-50 via-navy-50/90 to-navy-50/60 lg:hidden dark:from-navy-900 dark:via-navy-900/60 dark:to-navy-900/30" />

                {/* Dark mode only: faint deep-yellow tint over the map */}
                <div className="absolute inset-0 hidden bg-gradient-to-t from-gold-400/20 via-gold-400/10 to-transparent dark:block lg:bg-gradient-to-l" />
            </div>

            {/* Soft ambient glows */}
            <div className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-bolt-400/10 blur-3xl sm:h-[26rem] sm:w-[26rem]" />
                <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-gold-300/10 blur-3xl sm:h-[28rem] sm:w-[28rem]" />
            </div>

            <div className="container-page relative z-10">
                <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
                    {/* ───────── Left: text ───────── */}
                    <Reveal>
                        <div className="text-center lg:text-left">
                            <span className="inline-flex items-center gap-2 rounded-full border border-bolt-500/20 bg-white/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-bolt-800 shadow-sm backdrop-blur-md dark:border-bolt-500/30 dark:bg-navy-800/80 dark:text-gold-400">
                                {en ? "Built for Tanzania" : "Imejengwa kwa Tanzania"}
                            </span>

                            <h2 className="mt-5 text-3xl font-black tracking-tight text-navy-800 sm:text-4xl lg:text-5xl dark:text-white">
                                {en
                                    ? "Local service discovery, made simple."
                                    : "Kupata huduma za karibu, kwa urahisi."}
                            </h2>

                            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-navy-600 sm:text-lg sm:leading-8 lg:mx-0 lg:mt-6 dark:text-navy-200">
                                {en
                                    ? "NearbyFundi is a digital platform that makes it easier to discover, request and communicate with skilled technicians. Customers get convenience. Fundis get visibility and new jobs."
                                    : "NearbyFundi ni jukwaa la kidijitali linalorahisisha kutafuta, kuomba na kuwasiliana na mafundi wenye ujuzi. Wateja wanapata urahisi; mafundi wanapata wateja na kazi zaidi."}
                            </p>
                        </div>
                    </Reveal>

                    {/* ───────── Right: phones ───────── */}
                    <div className="relative mx-auto h-[460px] w-full max-w-[560px] sm:h-[480px]">
                        <motion.div
                            className="absolute left-0 top-14 hidden sm:block"
                            style={{ rotate: -6 }}
                            whileHover={reduce ? undefined : { y: -8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 18 }}
                        >
                            <PhoneMockup
                                screen="home"
                                label={en ? "Find fundi" : "Tafuta fundi"}
                            />
                        </motion.div>

                        <motion.div
                            className="absolute right-0 top-14 hidden sm:block"
                            style={{ rotate: 6 }}
                            whileHover={reduce ? undefined : { y: -8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 18 }}
                        >
                            <PhoneMockup
                                screen="chat"
                                label={en ? "Send message" : "Tuma ujumbe"}
                            />
                        </motion.div>

                        {/* Outer div does the centering; inner motion.div does the float.
                            (framer-motion overwrites CSS transforms, so the two must be separate.) */}
                        <div className="absolute inset-x-0 top-0 z-10 flex justify-center">
                            <motion.div
                                animate={reduce ? undefined : { y: [0, -8, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <PhoneMockup
                                    screen="request"
                                    label={en ? "Track request" : "Fuatilia ombi"}
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* ───────── Steps ─────────
                    < lg : centered stack (1 column on phones, 2 × 2 on tablets)
                    lg+  : 4-column timeline with a fading line between steps */}
                <Stagger
                    className="mx-auto mt-14 grid max-w-md grid-cols-1 sm:max-w-3xl sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 lg:mt-20 lg:max-w-none lg:grid-cols-4 lg:gap-x-8"
                    delay={0.05}
                >
                    {steps.map(({ Icon, title, text }, i) => {
                        const isLast = i === steps.length - 1;

                        return (
                            <StaggerItem key={title}>
                                <div
                                    className={`relative flex flex-col items-center text-center lg:block lg:text-left ${
                                        isLast ? "" : "pb-10 sm:pb-0"
                                    }`}
                                >
                                    {/* Vertical connector – phones only, centered between steps */}
                                    {!isLast && (
                                        <span
                                            aria-hidden="true"
                                            className="absolute bottom-2 left-1/2 h-6 w-px -translate-x-1/2 bg-gradient-to-b from-navy-700/60 to-navy-700/0 sm:hidden dark:from-navy-200/50 dark:to-navy-200/0"
                                        />
                                    )}

                                    {/* Icon (+ number and horizontal line on desktop) */}
                                    <div className="flex items-center gap-3 lg:w-full">
                                        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-navy-100/90 text-navy-800 shadow-sm backdrop-blur-sm dark:bg-navy-700/80 dark:text-navy-100">
                                            <Icon className="h-7 w-7" />
                                        </span>

                                        <span
                                            aria-hidden="true"
                                            className="hidden text-base font-extrabold text-navy-700 lg:block dark:text-navy-200"
                                        >
                                            {i + 1}
                                        </span>
                                        {!isLast && (
                                            <span
                                                aria-hidden="true"
                                                className="hidden h-px flex-1 bg-gradient-to-r from-navy-700/70 to-navy-700/0 lg:block dark:from-navy-200/60 dark:to-navy-200/0"
                                            />
                                        )}
                                    </div>

                                    {/* Text */}
                                    <div className="mt-4 lg:mt-6">
                                        <h3 className="flex items-baseline justify-center gap-2 text-xl font-black text-navy-900 lg:justify-start dark:text-white">
                                            <span
                                                aria-hidden="true"
                                                className="text-sm font-extrabold text-navy-500 lg:hidden dark:text-navy-300"
                                            >
                                                {i + 1}
                                            </span>
                                            {title}
                                        </h3>
                                        <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-navy-600 sm:text-base sm:leading-7 lg:mx-0 dark:text-navy-200">
                                            {text}
                                        </p>
                                    </div>
                                </div>
                            </StaggerItem>
                        );
                    })}
                </Stagger>
            </div>
        </section>
    );
}
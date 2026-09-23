// src/components/sections/AboutSection.tsx
import {
    BadgeCheck,
    MessageCircle,
    Search,
    Send,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Lang } from "../data/content";
import { copy } from "../data/content";
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
            className="relative overflow-hidden section-pad bg-navy-50 dark:bg-navy-800/40"
        >
            {/* soft ambient glow — replaces plain white */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-40 top-0 h-[26rem] w-[26rem] rounded-full bg-bolt-400/10 blur-3xl" />
                <div className="absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-gold-300/10 blur-3xl" />
            </div>

            <div className="container-page relative">
                <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
                    <Reveal>
                        <span className="inline-flex items-center gap-2 rounded-full border border-bolt-500/20 bg-bolt-50/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-bolt-800 shadow-sm backdrop-blur-md dark:border-bolt-500/30 dark:bg-bolt-950/40 dark:text-gold-400">
                            {en ? "Built for Tanzania" : "Imejengwa kwa Tanzania"}
                        </span>

                        <h2 className="mt-5 text-4xl font-black tracking-tight text-navy-800 sm:text-5xl dark:text-white">
                            {en
                                ? "Local service discovery, made simple."
                                : "Kupata huduma za karibu, kwa urahisi."}
                        </h2>

                        <p className="mt-6 max-w-xl text-lg leading-8 text-navy-600 dark:text-navy-200">
                            {en
                                ? "NearbyFundi is a digital platform that makes it easier to discover, request and communicate with skilled technicians. Customers get convenience. Fundis get visibility and new jobs."
                                : "NearbyFundi ni jukwaa la kidijitali linalorahisisha kutafuta, kuomba na kuwasiliana na mafundi wenye ujuzi. Wateja wanapata urahisi; mafundi wanapata wateja na kazi zaidi."}
                        </p>
                    </Reveal>

                    <div className="relative mx-auto h-[480px] w-full max-w-[560px]">
                        <div className="absolute inset-x-6 bottom-4 top-16 rounded-[48px] bg-gradient-to-br from-bolt-100 via-bolt-50 to-gold-100 dark:from-bolt-900/30 dark:via-navy-800 dark:to-gold-900/20" />

                        <motion.div
                            className="absolute left-0 top-14 hidden -rotate-6 sm:block"
                            whileHover={reduce ? undefined : { y: -8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 18 }}
                        >
                            <PhoneMockup
                                screen="home"
                                label={en ? "Find fundi" : "Tafuta fundi"}
                            />
                        </motion.div>

                        <motion.div
                            className="absolute right-0 top-14 hidden rotate-6 sm:block"
                            whileHover={reduce ? undefined : { y: -8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 18 }}
                        >
                            <PhoneMockup
                                screen="chat"
                                label={en ? "Send message" : "Tuma ujumbe"}
                            />
                        </motion.div>

                        <motion.div
                            className="absolute left-1/2 top-0 z-10 -translate-x-1/2"
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

                <Stagger
                    className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
                    delay={0.05}
                >
                    {steps.map(({ Icon, title, text }, i) => (
                        <StaggerItem key={title}>
                            <div className="relative">
                                {i < steps.length - 1 && (
                                    <span className="absolute left-16 right-[-2rem] top-6 hidden h-px bg-gradient-to-r from-bolt-300 to-transparent lg:block dark:from-bolt-700" />
                                )}
                                <div className="flex items-center gap-3">
                                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-bolt-500/15 text-bolt-700 dark:text-gold-400">
                                        <Icon size={22} />
                                    </span>
                                    <span className="text-sm font-bold text-bolt-800">
                                        {i + 1}
                                    </span>
                                </div>
                                <h3 className="mt-4 text-lg font-black text-navy-800 dark:text-white">
                                    {title}
                                </h3>
                                <p className="mt-1.5 text-sm leading-6 text-bolt-900 dark:text-bolt-800">
                                    {text}
                                </p>
                            </div>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
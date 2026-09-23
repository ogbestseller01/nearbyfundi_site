// src/components/sections/FaqSection.tsx
import { useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { Lang } from "../data/content";
import { copy } from "../data/content";

const faqs = [
    [
        "What is NearbyFundi?",
        "NearbyFundi is a platform that helps customers discover nearby technicians, request services and communicate with fundis.",
    ],
    [
        "Can technicians join the platform?",
        "Yes. Technicians can create a profile, add their services and working area, then go through the platform's verification process.",
    ],
    [
        "Does NearbyFundi support Swahili?",
        "Yes. The product and website are designed with English and Swahili support.",
    ],
    [
        "Can I chat with a technician?",
        "Yes. The app includes chat so customers and technicians can communicate around a service request.",
    ],
];

export default function FaqSection({ lang }: { lang: Lang }) {
    const t = copy[lang];
    const en = lang === "en";
    const [faq, setFaq] = useState<number | null>(0);

    return (
        <section id="faq" className="section-pad bg-white dark:bg-navy-900">
            <div className="container-page grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
                <div className="lg:sticky lg:top-28 lg:self-start">
                    <span className="eyebrow">{t.nav.faq}</span>
                    <h2 className="text-4xl font-black tracking-tight sm:text-5xl dark:text-white">
                        {t.faqTitle}
                    </h2>
                    <p className="mt-5 text-bolt-900 dark:text-bolt-800">
                        {en
                            ? "Everything you need to understand the platform."
                            : "Kila kitu unachohitaji kuelewa kuhusu jukwaa."}
                    </p>
                    <a
                        href="#contact"
                        className="mt-6 inline-flex items-center gap-1.5 font-black text-bolt-700 dark:text-bolt-400"
                    >
                        {en ? "Still have a question?" : "Bado una swali?"}{" "}
                        <ArrowRight size={16} />
                    </a>
                </div>

                <div className="divide-y divide-navy-200 border-y border-navy-200 dark:divide-navy-800 dark:border-navy-800">
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
                                            isOpen
                                                ? "rotate-45 bg-gold-500 text-navy-900"
                                                : "bg-navy-100 text-navy-600 dark:bg-navy-800 dark:text-navy-200"
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
                                            transition={{
                                                duration: 0.28,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <p className="max-w-2xl pb-6 leading-7 text-bolt-900 dark:text-bolt-800">
                                                {a}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
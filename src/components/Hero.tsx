import { ArrowDownRight, BadgeCheck, CheckCircle2, MapPin, MessageCircle, Sparkles, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Lang } from "../data/content";
import { copy } from "../data/content";
import { Reveal, Stagger, StaggerItem } from "./Motion";

export default function Hero({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const reduce = !!useReducedMotion();

  const stats = [
    { Icon: BadgeCheck, value: "5,000+", label: lang === "en" ? "Verified fundis" : "Mafundi waliothibitishwa" },
    { Icon: Users, value: "100,000+", label: lang === "en" ? "Happy customers" : "Wateja walioridhika" },
  ];

  return (
      <section id="home" className="hero-new relative overflow-hidden pt-[72px]">
        <div className="hero-grid absolute inset-0" />
        <div className="hero-glow hero-glow-one absolute -left-32 top-20 h-96 w-96 rounded-full blur-3xl" />
        <div className="hero-glow hero-glow-two absolute -right-32 top-12 h-[32rem] w-[32rem] rounded-full blur-3xl" />

        <div className="container-page relative z-10 grid min-h-[calc(100svh-72px)] items-center gap-12 py-14 lg:grid-cols-[1.02fr_.98fr] lg:py-20">
          {/* LEFT COLUMN: TEXT CONTENT (Unchanged) */}
          <Stagger delay={0.05} stagger={0.08}>
            <StaggerItem>
              <div className="hero-kicker">
                <span className="pulse-dot" />
                <Sparkles size={14} />
                {t.heroEyebrow}
              </div>
            </StaggerItem>

            <StaggerItem>
              <h1 className="hero-title mt-6 max-w-4xl">
                {lang === "en" ? (
                    <>
                      Find a trusted <span>fundi.</span>
                      <br />
                      Right when you need one.
                    </>
                ) : (
                    <>
                      Mpate <span>fundi unayemwamini,</span>
                      <br />
                      pale unapomhitaji.
                    </>
                )}
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
                {t.heroText}
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#services" className="btn-primary hero-cta">
                  {t.find}
                  <ArrowDownRight size={18} />
                </a>
                <a href="#app-demo" className="btn-dark hero-cta">
                  {t.explore}
                </a>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
                {stats.map(({ Icon, value, label }) => (
                    <div key={label} className="stat-card">
                      <span className="stat-icon"><Icon size={21} /></span>
                      <div>
                        <strong>{value}</strong>
                        <p>{label}</p>
                      </div>
                    </div>
                ))}
              </div>
            </StaggerItem>
          </Stagger>

          {/* RIGHT COLUMN: VISUAL (Simplified to just the image + floating cards) */}
          <Reveal variant="scaleIn" delay={0.18} duration={0.7}>
            <div className="hero-visual relative mx-auto w-full max-w-[590px]">
              {/* Background Orbits */}
              <div className="hero-orbit orbit-one" />
              <div className="hero-orbit orbit-two" />

              {/* Main Image Container (Replacing the dashboard) */}
              <motion.div
                  className="relative z-10 overflow-hidden rounded-2xl shadow-xl border border-white/20 bg-white/50 backdrop-blur-sm"
                  animate={reduce ? undefined : { y: [0, -8, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                    src="/screenshots/homeimg.jpeg"
                    alt="NearbyFundi Home Interface"
                    className="w-full h-auto object-cover rounded-2xl"
                />
              </motion.div>

              {/* Floating Card: Verified (Top Left) */}
              <motion.div
                  className="floating-card floating-card-top absolute -left-4 top-10 z-20"
                  animate={reduce ? undefined : { y: [0, -10, 0], rotate: [0, 1, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="floating-icon green"><CheckCircle2 size={17} /></span>
                <div><strong>{lang === "en" ? "Verified" : "Imethibitishwa"}</strong><small>{lang === "en" ? "Trusted technician" : "Fundi anayeaminika"}</small></div>
              </motion.div>

              {/* Floating Card: Chat Directly (Bottom Right) */}
              <motion.div
                  className="floating-card floating-card-bottom absolute -right-4 bottom-10 z-20"
                  animate={reduce ? undefined : { y: [0, 8, 0], rotate: [0, -1, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: .5 }}
              >
                <span className="floating-icon amber"><MessageCircle size={17} /></span>
                <div><strong>{lang === "en" ? "Chat directly" : "Wasiliana moja kwa moja"}</strong><small>{lang === "en" ? "Coordinate the job" : "Panga kazi na fundi"}</small></div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>
  );
}
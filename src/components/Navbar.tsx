import { Menu, X, ArrowUpRight, Moon, Sun } from "lucide-react";
import { useState } from "react";
import type { Lang } from "../data/content";
import { copy } from "../data/content";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  lang: Lang;
  setLang: (l: Lang) => void;
  dark: boolean;
  toggleDark: () => void;
};

export default function Navbar({ lang, setLang, dark, toggleDark }: Props) {
  const [open, setOpen] = useState(false);
  const t = copy[lang];

  const links = [
    ["home", "#home"],
    ["about", "#about"],
    ["services", "#services"],
    ["blog", "#blog"],
    ["partners", "#partners"],
    ["careers", "#careers"],
    ["faq", "#faq"],
    ["support", "#support"],
    ["contact", "#contact"],
  ] as const;

  return (
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200/60 bg-white/90 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/90">
        <div className="container-page flex h-[72px] items-center justify-between gap-4">
          {/* Logo */}
          <a
              href="#home"
              onClick={() => setOpen(false)}
              className="flex shrink-0 items-center gap-2.5 font-black tracking-tight"
          >
            <img
                src="/nearbyfundi-logo.png"
                alt="NearbyFundi"
                className="h-9 w-auto object-contain"
            />
            <span className="text-[1.35rem] leading-none">
            Nearby<span className="text-bolt-600">Fundi</span>
          </span>
          </a>

          {/* Desktop nav links */}
          <nav className="hidden items-center gap-6 xl:flex">
            {links.map(([key, href]) => (
                <a
                    key={key}
                    href={href}
                    className="text-[13px] font-semibold text-slate-600 transition-colors hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                >
                  {t.nav[key]}
                </a>
            ))}
          </nav>

          {/* Desktop right controls */}
          <div className="hidden items-center gap-2.5 lg:flex">
            {/* Language switcher */}
            <div className="flex items-center rounded-full border border-slate-200 bg-slate-50/80 p-1 dark:border-slate-700 dark:bg-slate-900/80">
              <button
                  onClick={() => setLang("en")}
                  className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-bold transition ${
                      lang === "en"
                          ? "bg-white shadow-sm dark:bg-slate-700"
                          : "opacity-65 hover:opacity-100"
                  }`}
                  title="English"
              >
                <img
                    src="/uk-flag.png"
                    alt=""
                    className="h-3.5 w-3.5 rounded-[2px] object-cover"
                />
                EN
              </button>
              <button
                  onClick={() => setLang("sw")}
                  className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-bold transition ${
                      lang === "sw"
                          ? "bg-white shadow-sm dark:bg-slate-700"
                          : "opacity-65 hover:opacity-100"
                  }`}
                  title="Kiswahili"
              >
                <img
                    src="/tz-flag.jpg"
                    alt=""
                    className="h-3.5 w-3.5 rounded-[2px] object-cover"
                />
                SW
              </button>
            </div>

            {/* Dark mode */}
            <button
                onClick={toggleDark}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                aria-label={dark ? t.lightMode : t.darkMode}
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* CTA */}
            <a
                href="#contact"
                className="btn-dark inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold"
            >
              {t.find}
              <ArrowUpRight size={15} strokeWidth={2.5} />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
              className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 lg:hidden dark:text-slate-200"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
              <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="overflow-hidden border-t border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950 lg:hidden"
              >
                <div className="container-page flex flex-col gap-0.5 px-4 pb-6 pt-3">
                  {links.map(([key, href]) => (
                      <a
                          key={key}
                          href={href}
                          onClick={() => setOpen(false)}
                          className="rounded-xl px-3 py-3 text-[15px] font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900"
                      >
                        {t.nav[key]}
                      </a>
                  ))}

                  <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                    {/* Language */}
                    <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-900">
                      <button
                          onClick={() => setLang("en")}
                          className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold ${
                              lang === "en"
                                  ? "bg-white shadow-sm dark:bg-slate-700"
                                  : "opacity-70"
                          }`}
                      >
                        <img
                            src="/uk-flag.png"
                            alt=""
                            className="h-3.5 w-3.5 rounded-[2px] object-cover"
                        />
                        English
                      </button>
                      <button
                          onClick={() => setLang("sw")}
                          className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold ${
                              lang === "sw"
                                  ? "bg-white shadow-sm dark:bg-slate-700"
                                  : "opacity-70"
                          }`}
                      >
                        <img
                            src="/tz-flag.jpg"
                            alt=""
                            className="h-3.5 w-3.5 rounded-[2px] object-cover"
                        />
                        Kiswahili
                      </button>
                    </div>

                    {/* Dark mode */}
                    <button
                        onClick={toggleDark}
                        className="flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200"
                    >
                      {dark ? <Sun size={14} /> : <Moon size={14} />}
                      {dark ? t.lightMode : t.darkMode}
                    </button>
                  </div>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </header>
  );
}
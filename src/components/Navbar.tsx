import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Lang } from "../data/content";
import { copy } from "../data/content";

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
    ["partners", "#partners"],
    ["careers", "#careers"],
    ["faq", "#faq"],
    ["support", "#support"],
    ["contact", "#contact"],
  ] as const;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
      <header className="site-nav w-full max-w-[100vw]">
        <div className="nav-bar mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* LEFT: Logo */}
          <a href="#home" className="brand" onClick={() => setOpen(false)}>
  <span
      className="logo-plate"
      style={{
        width: "80px",
        height: "80px",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "16px",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
  >
    <img
        src="/ogonegrouplogo.png"
        alt="One Group"
        className="logo-img"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
    />
  </span>
            <span className="brand-text">
    Nearby<span>Fundi</span>
  </span>
          </a>

          {/* CENTER: Desktop links */}
          <nav className="desktop-nav hidden items-center gap-1 lg:flex" aria-label="Main">
            {links.map(([key, href]) => (
                <a key={key} href={href} className="nav-link">
                  {t.nav[key]}
                </a>
            ))}
          </nav>

          {/* RIGHT: Desktop actions (HIDDEN ON MOBILE) */}
          <div className="desktop-actions hidden items-center gap-3 lg:flex">
            <div className="language-switch">
              <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={lang === "en" ? "active" : ""}
              >
                <img src="/uk-flag.png" alt="" /> EN
              </button>
              <button
                  type="button"
                  onClick={() => setLang("sw")}
                  className={lang === "sw" ? "active" : ""}
              >
                <img src="/tz-flag.jpg" alt="" /> SW
              </button>
            </div>

            <button
                type="button"
                onClick={toggleDark}
                className="icon-button"
                aria-label={dark ? t.lightMode : t.darkMode}
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <a href="#contact" className="nav-cta">
              {t.find}
              <ArrowUpRight size={15} />
            </a>
          </div>

          {/* RIGHT: Mobile controls wrapper (HIDDEN ON DESKTOP) */}
          <div className="mobile-controls flex items-center gap-2 lg:hidden">
            <button
                type="button"
                onClick={toggleDark}
                className="icon-button"
                aria-label={dark ? t.lightMode : t.darkMode}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
                type="button"
                className={`mobile-menu-button${open ? " is-open" : ""}`}
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
            >
              {open ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        <AnimatePresence>
          {open && (
              <>
                <motion.div
                    className="mobile-menu-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setOpen(false)}
                    aria-hidden="true"
                />
                <motion.div
                    id="mobile-menu"
                    className="mobile-menu"
                    initial={{ opacity: 0, x: "100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "100%" }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    role="dialog"
                    aria-modal="true"
                >
                  <div className="mobile-menu-header w-full flex justify-between items-center pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
                    <span className="mobile-menu-title font-bold text-lg text-navy-900 dark:text-white">Menu</span>
                    <button
                        type="button"
                        className="icon-button"
                        onClick={() => setOpen(false)}
                    >
                      <X size={22} />
                    </button>
                  </div>

                  <nav className="mobile-menu-links flex flex-col gap-2 w-full" aria-label="Mobile">
                    {links.map(([key, href], i) => (
                        <motion.a
                            key={key}
                            href={href}
                            className="mobile-link text-center py-3 font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                            onClick={() => setOpen(false)}
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: 0.03 * i }}
                        >
                          {t.nav[key]}
                        </motion.a>
                    ))}
                  </nav>

                  <div className="mobile-menu-footer w-full flex flex-col gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                    <div className="language-switch justify-center">
                      <button
                          type="button"
                          onClick={() => setLang("en")}
                          className={lang === "en" ? "active" : ""}
                      >
                        <img src="/uk-flag.png" alt="" /> English
                      </button>
                      <button
                          type="button"
                          onClick={() => setLang("sw")}
                          className={lang === "sw" ? "active" : ""}
                      >
                        <img src="/tz-flag.jpg" alt="" /> Kiswahili
                      </button>
                    </div>
                    <a href="#contact" className="nav-cta justify-center py-3" onClick={() => setOpen(false)}>
                      {t.find}
                      <ArrowUpRight size={15} />
                    </a>
                  </div>
                </motion.div>
              </>
          )}
        </AnimatePresence>
      </header>
  );
}
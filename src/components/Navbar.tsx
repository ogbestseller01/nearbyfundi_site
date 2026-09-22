import { Menu, X, ArrowUpRight, Moon, Sun } from "lucide-react";
import { useState } from "react";
import type { Lang } from "../data/content";
import { copy } from "../data/content";
import { motion, AnimatePresence } from "framer-motion";

type Props = { lang: Lang; setLang: (l: Lang) => void; dark: boolean; toggleDark: () => void; };

export default function Navbar({ lang, setLang, dark, toggleDark }: Props) {
  const [open, setOpen] = useState(false);
  const t = copy[lang];
  const links = [
    ["home", "#home"], ["about", "#about"], ["services", "#services"], ["partners", "#partners"],
    ["careers", "#careers"], ["faq", "#faq"], ["support", "#support"], ["contact", "#contact"],
  ] as const;

  return (
    <header className="site-nav">
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        <a href="#home" onClick={() => setOpen(false)} className="brand">
          <img src="/nearbyfundi-logo.png" alt="NearbyFundi" className="h-9 w-auto object-contain" />
          <span>Nearby<span>Fundi</span></span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map(([key, href]) => (
            <a key={key} href={href} className="nav-link">{t.nav[key]}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <div className="language-switch">
            <button onClick={() => setLang("en")} className={lang === "en" ? "active" : ""}>
              <img src="/uk-flag.png" alt="" /> EN
            </button>
            <button onClick={() => setLang("sw")} className={lang === "sw" ? "active" : ""}>
              <img src="/tz-flag.jpg" alt="" /> SW
            </button>
          </div>
          <button onClick={toggleDark} className="icon-button" aria-label={dark ? t.lightMode : t.darkMode}>
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a href="#contact" className="nav-cta">{t.find}<ArrowUpRight size={15} /></a>
        </div>

        <button className="mobile-menu-button lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}} className="mobile-drawer lg:hidden">
            <div className="container-page flex flex-col gap-1 pb-5 pt-3">
              {links.map(([key, href]) => (
                <a key={key} href={href} onClick={() => setOpen(false)} className="mobile-link">{t.nav[key]}</a>
              ))}
              <div className="mt-3 flex items-center gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
                <div className="language-switch">
                  <button onClick={() => setLang("en")} className={lang === "en" ? "active" : ""}><img src="/uk-flag.png" alt="" /> English</button>
                  <button onClick={() => setLang("sw")} className={lang === "sw" ? "active" : ""}><img src="/tz-flag.jpg" alt="" /> Kiswahili</button>
                </div>
                <button onClick={toggleDark} className="icon-button">{dark ? <Sun size={16}/> : <Moon size={16}/>}</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

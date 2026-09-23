import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Sections from "./components/Sections";
import Footer from "./components/Footer";
import type { Lang } from "./data/content";

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("nf-theme");
    if (stored === "light") {
      setDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDark = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("nf-theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-white text-navy-800 transition-colors dark:bg-navy-900 dark:text-white">
      <Navbar lang={lang} setLang={setLang} dark={dark} toggleDark={toggleDark} />
      <main>
        <Hero lang={lang} />
        <Sections lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}

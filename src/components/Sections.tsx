// src/components/Sections.tsx
import type { Lang } from "../data/content";
import AppPlayground from "./NearByFindiAppPlayground";
import FundiAppPlayground from "./FundiAppPlayground";
import {
  AboutSection,
  CareersSection,
  ContactSection,
  FaqSection,
  PartnersSection,
  ServicesSection,
  SupportSection,
} from "../sections";

type Props = { lang: Lang };

export default function Sections({ lang }: Props) {
  return (
      <>
        {/* ───────── About ───────── */}
        <AboutSection lang={lang} />

        {/* Interactive NearbyFundi customer journey */}
        <AppPlayground lang={lang} />

        {/* Interactive Fundi App journey */}
        <FundiAppPlayground lang={lang} />

        {/* ───────── Services ───────── */}
        <ServicesSection lang={lang} />

        {/* ───────── Partners ───────── */}
        <PartnersSection lang={lang} />

        {/* ───────── Careers ───────── */}
        <CareersSection lang={lang} />

        {/* ───────── FAQ ───────── */}
        <FaqSection lang={lang} />

        {/* ───────── Support ───────── */}
        <SupportSection lang={lang} />

        {/* ───────── Contact ───────── */}
        <ContactSection lang={lang} />
      </>
  );
}
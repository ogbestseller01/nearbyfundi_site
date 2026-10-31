
import { useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  X,
  Send,
} from "lucide-react";
import type { Lang } from "../data/content";

export default function Footer({ lang }: { lang: Lang }) {
  const [chatOpen, setChatOpen] = useState(false);
  const en = lang === "en";

  return (
    <>
      <footer className="bg-[#000E20] text-white">

        <div className="container-page py-14 sm:py-16">

          {/* Main Footer Columns */}
          <div className="grid gap-12 lg:grid-cols-[1.5fr_0.8fr_0.9fr_1.25fr]">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-4">
                <span
                  className="logo-plate shrink-0"
                  style={{ height: 80, width: 80 }}
                >
                  <img
                    src="/ogonegrouplogo.png"
                    alt="One Group"
                    className="logo-img"
                  />
                </span>

                <span className="text-xl font-black sm:text-2xl">
                  Nearby<span className="text-gold-400">Fundi</span>
                </span>
              </div>

              <p className="mt-7 max-w-sm text-[15px] leading-8 text-slate-400">
                {en
                  ? "Connecting customers with trusted local technicians and service providers."
                  : "Tunaunganisha wateja na mafundi na watoa huduma wa karibu wanaoaminika."}
              </p>

              {/* Social Media */}
              <div className="mt-7 flex gap-3">

                <a
                  href="#"
                  aria-label="Instagram"
                  className="grid h-14 w-14 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                >
                  <Instagram size={23} />
                </a>

                <a
                  href="#"
                  aria-label="Facebook"
                  className="grid h-14 w-14 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                >
                  <Facebook size={23} />
                </a>

                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="grid h-14 w-14 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                >
                  <Linkedin size={23} />
                </a>

              </div>
            </div>

            {/* Product */}
<div>
  <h4 className="text-base font-bold uppercase tracking-wider text-slate-200">
    {en ? "Product" : "Bidhaa"}
  </h4>

  <div className="mt-7 space-y-5 text-base text-slate-400">
    <a
      href="#"
      className="block transition hover:text-white"
    >
      NearbyFundi
    </a>
    <a
      href="#"
      className="block transition hover:text-white"
    >
      FundiApp
    </a>
  </div>
</div>

            {/* Company */}
            <div>
              <h4 className="text-base font-bold uppercase tracking-wider text-slate-200">
                {en ? "Company" : "Kampuni"}
              </h4>

              <div className="mt-7 space-y-5 text-base text-slate-400">

                <a href="#careers" className="block transition hover:text-white">
                  {en ? "Careers" : "Ajira"}
                </a>

                <a href="#faq" className="block transition hover:text-white">
                  FAQ
                </a>

                <a href="#support" className="block transition hover:text-white">
                  {en ? "Support" : "Msaada"}
                </a>

              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-base font-bold uppercase tracking-wider text-slate-200">
                {en ? "Contact" : "Mawasiliano"}
              </h4>

              <div className="mt-7 space-y-5 text-base text-slate-400">

                <a
                  href="mailto:ogbestseller01@gmail.com"
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <Mail size={21} className="shrink-0 text-blue-400" />
                  <span>ogbestseller01@gmail.com</span>
                </a>

                <a
                  href="tel:+255746382880"
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <Phone size={21} className="shrink-0 text-blue-400" />
                  <span>+255 746 382 880</span>
                </a>

                <a
                  href="tel:+255679117297"
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <Phone size={21} className="shrink-0 text-blue-400" />
                  <span>+255 679 117 297</span>
                </a>

                <a
                  href="tel:+255612118849"
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <Phone size={21} className="shrink-0 text-blue-400" />
                  <span>+255 612 118 849</span>
                </a>

                <p className="flex items-center gap-3">
                  <MapPin size={21} className="shrink-0 text-blue-400" />
                  <span>Kibaha, Pwani, Tanzania</span>
                </p>

              </div>
            </div>

          </div>

          {/* App Downloads - Apple and Android */}
          <div className="mt-12 flex flex-col gap-7 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">

            {/* Fundi App */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                {en ? "Download Fundi App" : "Pakua App ya Fundi"}
              </p>

              <div className="flex flex-wrap items-center gap-3">

                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download on the App Store"
                  className="transition hover:scale-[1.03] hover:opacity-90"
                >
                  <img
                    src="/AppleStoreIcon.svg"
                    alt="Download on the App Store"
                    className="h-11 w-auto"
                  />
                </a>

                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get it on Google Play"
                  className="transition hover:scale-[1.03] hover:opacity-90"
                >
                  <img
                    src="/Google_Play_Store.svg"
                    alt="Get it on Google Play"
                    className="h-11 w-auto"
                  />
                </a>

              </div>
            </div>

            {/* NearbyFundi App */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                {en ? "Download NearbyFundi" : "Pakua NearbyFundi"}
              </p>

              <div className="flex flex-wrap items-center gap-3">

                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download NearbyFundi on the App Store"
                  className="transition hover:scale-[1.03] hover:opacity-90"
                >
                  <img
                    src="/AppleStoreIcon.svg"
                    alt="Download on the App Store"
                    className="h-11 w-auto"
                  />
                </a>

                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get NearbyFundi on Google Play"
                  className="transition hover:scale-[1.03] hover:opacity-90"
                >
                  <img
                    src="/Google_Play_Store.svg"
                    alt="Get it on Google Play"
                    className="h-11 w-auto"
                  />
                </a>

              </div>
            </div>

          </div>

          {/* Help Section */}
          <div className="mt-12 flex flex-col justify-between gap-6 border-t border-white/10 pt-12 sm:flex-row sm:items-center">

            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-slate-400">
                {en ? "Need Help?" : "Unahitaji Msaada?"}
              </p>

              <p className="mt-2 text-base leading-7 text-slate-300">
                {en
                  ? "Ask our assistant anything about the NearbyFundi platform."
                  : "Uliza msaidizi wetu swali lolote kuhusu mfumo wa NearbyFundi."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setChatOpen(true)}
              className="inline-flex shrink-0 items-center justify-center gap-3 rounded-full border border-blue-500/20 bg-blue-500/10 px-7 py-4 text-base font-bold text-blue-300 transition hover:bg-blue-500/20"
            >
              <MessageCircle size={21} />
              {en ? "AI Support" : "Msaada wa AI"}
            </button>

          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-white/10">

          <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-sm text-slate-500 sm:flex-row">

            <span>
              © {new Date().getFullYear()} NearbyFundi.{" "}
              {en ? "All rights reserved." : "Haki zote zimehifadhiwa."}
            </span>

            <span>
              {en ? "Developed by" : "Imetengenezwa na"}{" "}
              <a
                href="https://ogonegroup.co.tz/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-400 transition hover:text-gold-400"
              >
                OG-ONEGROUP
              </a>
            </span>

          </div>

        </div>

      </footer>

      {/* AI Support Modal */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-navy-950/70 p-4 backdrop-blur-sm sm:items-center sm:justify-center">

          <button
            type="button"
            aria-label="Close modal"
            className="absolute inset-0 cursor-default"
            onClick={() => setChatOpen(false)}
          />

          <div className="relative z-10 flex h-[520px] w-full max-w-md flex-col overflow-hidden rounded-3xl border border-navy-700 bg-navy-800 shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-navy-700 bg-navy-900 px-5 py-4">

              <div className="flex items-center gap-3">

                <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-500/20 text-gold-400">
                  <MessageCircle size={20} />
                </span>

                <div>
                  <p className="font-bold text-white">
                    {en ? "AI Support" : "Msaada wa AI"}
                  </p>

                  <p className="text-xs text-slate-400">
                    {en ? "Coming soon • Placeholder" : "Inakuja hivi karibuni"}
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() => setChatOpen(false)}
                className="rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <X size={19} />
              </button>

            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-5">

              <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-navy-900 px-4 py-3 text-sm text-slate-300">
                {en
                  ? "Habari! 👋 I'm the NearbyFundi AI assistant (demo). How can I help you today?"
                  : "Habari! 👋 Mimi ni msaidizi wa AI wa NearbyFundi (demo). Nawezaje kukusaidia?"}
              </div>

              <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-bolt-600 px-4 py-3 text-sm text-white">
                {en
                  ? "This is just a demo for now."
                  : "Hii ni demo kwa sasa."}
              </div>

            </div>

            {/* Input */}
            <form
              className="border-t border-navy-700 p-4"
              onSubmit={(e) => e.preventDefault()}
            >

              <div className="flex items-center gap-2">

                <input
                  type="text"
                  placeholder={en ? "Type your message..." : "Andika ujumbe wako..."}
                  className="min-w-0 flex-1 rounded-2xl border border-navy-700 bg-navy-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                />

                <button
                  type="submit"
                  aria-label="Send message"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-bolt-500 text-navy-950 transition hover:bg-bolt-400"
                >
                  <Send size={18} />
                </button>

              </div>

              <p className="mt-3 text-center text-[11px] text-slate-500">
                {en
                  ? "Real AI chatbot will be connected later."
                  : "AI chatbot halisi itaunganishwa baadaye."}
              </p>

            </form>

          </div>
        </div>
      )}

    </>
  );
}

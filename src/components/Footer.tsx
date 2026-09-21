import { useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MessageCircle,
  X,
  Send,
  MapPin,
} from "lucide-react";
import type { Lang } from "../data/content";

export default function Footer({ lang }: { lang: Lang }) {
  const [chatOpen, setChatOpen] = useState(false);
  const en = lang === "en";

  return (
      <>
        <footer className="bg-slate-950 text-white">
          <div className="container-page py-16">
            {/* Top section */}
            <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
              {/* Brand column */}
              <div>
                <div className="flex items-center gap-2.5 text-xl font-black">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400 text-slate-950">
                  N
                </span>
                  <span>
                  Nearby<span className="text-emerald-400">Fundi</span>
                </span>
                </div>

                <p className="mt-5 max-w-xs leading-7 text-slate-400">
                  {en
                      ? "Connecting customers with trusted local technicians and service providers."
                      : "Tunaunganisha wateja na mafundi na watoa huduma wa karibu wanaoaminika."}
                </p>

                {/* Social */}
                <div className="mt-6 flex gap-2.5">
                  <a
                      href="#"
                      className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
                      aria-label="Instagram"
                  >
                    <Instagram size={17} />
                  </a>
                  <a
                      href="#"
                      className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
                      aria-label="Facebook"
                  >
                    <Facebook size={17} />
                  </a>
                  <a
                      href="#"
                      className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
                      aria-label="LinkedIn"
                  >
                    <Linkedin size={17} />
                  </a>
                </div>
              </div>

              {/* Product */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                  Product
                </h4>
                <div className="mt-5 space-y-3 text-sm text-slate-400">
                  <a href="#about" className="block transition hover:text-white">About</a>
                  <a href="#app-demo" className="block transition hover:text-white">App journey</a>
                  <a href="#services" className="block transition hover:text-white">Services</a>
                  <a href="#blog" className="block transition hover:text-white">Blog</a>
                  <a href="#partners" className="block transition hover:text-white">Partners</a>
                </div>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                  Company
                </h4>
                <div className="mt-5 space-y-3 text-sm text-slate-400">
                  <a href="#careers" className="block transition hover:text-white">Careers</a>
                  <a href="#faq" className="block transition hover:text-white">FAQ</a>
                  <a href="#support" className="block transition hover:text-white">Support</a>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                  Contact
                </h4>
                <div className="mt-5 space-y-3.5 text-sm text-slate-400">
                  <a href="mailto:ogbestseller01@gmail.com" className="flex items-center gap-2.5 transition hover:text-white">
                    <Mail size={15} className="shrink-0 text-emerald-400" />
                    ogbestseller01@gmail.com
                  </a>
                  <a href="tel:+255746382880" className="flex items-center gap-2.5 transition hover:text-white">
                    <Phone size={15} className="shrink-0 text-emerald-400" />
                    +255 746 382 880
                  </a>
                  <a href="tel:+255679117297" className="flex items-center gap-2.5 transition hover:text-white">
                    <Phone size={15} className="shrink-0 text-emerald-400" />
                    +255 679 117 297
                  </a>
                  <a href="tel:+255612118849" className="flex items-center gap-2.5 transition hover:text-white">
                    <Phone size={15} className="shrink-0 text-emerald-400" />
                    +255 612 118 849
                  </a>
                  <p className="flex items-start gap-2.5">
                    <MapPin size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                    Morocco, Dar es Salaam, Tanzania
                  </p>
                </div>
              </div>
            </div>

            {/* Divider + Store badges + AI button */}
            <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center">
              {/* Store badges */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                    href="https://apps.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:opacity-90 hover:scale-[1.03]"
                    aria-label="Download on the App Store"
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
                    className="transition hover:opacity-90 hover:scale-[1.03]"
                    aria-label="Get it on Google Play"
                >
                  <img
                      src="/Google_Play_Store.svg"
                      alt="Get it on Google Play"
                      className="h-11 w-auto"
                  />
                </a>
              </div>

              {/* AI Support Demo button */}
              <button
                  onClick={() => setChatOpen(true)}
                  className="inline-flex items-center gap-2.5 rounded-full bg-emerald-500/15 px-5 py-2.5 text-sm font-bold text-emerald-300 ring-1 ring-emerald-500/30 transition hover:bg-emerald-500/25"
              >
                <MessageCircle size={16} />
                {en ? "AI Support (Demo)" : "Msaada wa AI (Demo)"}
              </button>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10">
            <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-slate-500 sm:flex-row">
              <span>© {new Date().getFullYear()} NearbyFundi. All rights reserved.</span>
              <span>
              Developed by{" "}
                <a
                    href="https://www.selcom.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-slate-400 transition hover:text-emerald-400"
                >
                OG-ONE GROUP
              </a>
            </span>
            </div>
          </div>
        </footer>

        {/* ───── AI Support Demo Modal ───── */}
        {chatOpen && (
            <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:items-center sm:justify-center">
              <div
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                  onClick={() => setChatOpen(false)}
              />

              <div className="relative z-10 flex h-[520px] w-full max-w-md flex-col overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-700 bg-slate-950 px-5 py-4">
                  <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <MessageCircle size={20} />
                </span>
                    <div>
                      <p className="font-bold text-white">
                        {en ? "AI Support (Demo)" : "Msaada wa AI (Demo)"}
                      </p>
                      <p className="text-xs text-slate-400">
                        {en ? "Coming soon • placeholder" : "Inakuja hivi karibuni"}
                      </p>
                    </div>
                  </div>
                  <button
                      onClick={() => setChatOpen(false)}
                      className="rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                      aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto p-5">
                  <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-slate-800 px-4 py-3 text-sm text-slate-200">
                    {en
                        ? "Habari! 👋 I'm the NearbyFundi AI assistant (demo). How can I help you today?"
                        : "Habari! 👋 Mimi ni msaidizi wa AI wa NearbyFundi (demo). Nawezaje kukusaidia?"}
                  </div>
                  <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-emerald-600 px-4 py-3 text-sm text-white">
                    {en ? "This is just a demo form for now." : "Hii ni fomu ya demo kwa sasa."}
                  </div>
                </div>

                {/* Input */}
                <form
                    className="border-t border-slate-700 p-4"
                    onSubmit={(e) => e.preventDefault()}
                >
                  <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder={en ? "Type your message..." : "Andika ujumbe wako..."}
                        className="flex-1 rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-500"
                    />
                    <button
                        type="submit"
                        className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-500 text-slate-950 transition hover:bg-emerald-400"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                  <p className="mt-2 text-center text-[11px] text-slate-500">
                    {en
                        ? "Demo only • Real AI chatbot will be connected later"
                        : "Demo tu • AI chatbot halisi itaunganishwa baadaye"}
                  </p>
                </form>
              </div>
            </div>
        )}
      </>
  );
}
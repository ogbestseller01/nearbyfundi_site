import { CheckCircle2, ChevronRight, MapPin, MessageCircle, Search, Signal, Wifi } from "lucide-react";

type Props = { screen: "home" | "request" | "chat"; label: string };

const data = {
  home: {
    title: "Find a fundi",
    sub: "Services near you",
    icon: MapPin,
    items: ["Electrician", "Plumber", "Appliance repair"],
  },
  request: {
    title: "Service request",
    sub: "Fundi is on the way",
    icon: CheckCircle2,
    items: ["Distance 2.4 km", "Arrival 12 min", "Request #NF2048"],
  },
  chat: {
    title: "Chat with fundi",
    sub: "Online now",
    icon: MessageCircle,
    items: ["Hello, I am on my way.", "I have arrived nearby.", "Thank you."],
  },
};

export default function PhoneMockup({ screen, label }: Props) {
  const d = data[screen];
  const Icon = d.icon;

  return (
      <div className="mx-auto w-[230px] rounded-[38px] border-[7px] border-navy-800 bg-navy-800 p-1 shadow-2xl ring-1 ring-black/10">
        <div className="flex h-[430px] flex-col overflow-hidden rounded-[30px] bg-slate-50">
          {/* Status bar */}
          <div className="relative flex items-center justify-between px-5 pt-2.5 text-[10px] font-bold text-slate-700">
            <span>9:41</span>
            <span className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-navy-800" />
            <span className="flex items-center gap-1">
            <Signal size={10} />
            <Wifi size={10} />
          </span>
          </div>

          {/* Header card */}
          <div className="mx-3 mt-4 flex items-center gap-3 rounded-2xl bg-bolt-400 p-3.5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy-900 text-bolt-300">
            <Icon size={19} />
          </span>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-black leading-tight text-navy-900">{d.title}</p>
              <p className="truncate text-[10px] font-semibold text-slate-800">{d.sub}</p>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 space-y-2 overflow-hidden px-3 pt-3">
            {screen === "home" && (
                <>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[10px] font-semibold text-slate-400">
                    <Search size={11} /> Search services
                  </div>
                  {/* mini map */}
                  <div className="relative h-20 overflow-hidden rounded-xl bg-bolt-100">
                    <div
                        className="absolute inset-0 opacity-60"
                        style={{
                          backgroundImage:
                              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                          backgroundSize: "16px 16px",
                        }}
                    />
                    {[
                      ["18%", "30%"],
                      ["55%", "55%"],
                      ["78%", "25%"],
                    ].map(([l, tp], i) => (
                        <span
                            key={i}
                            className="absolute grid h-4 w-4 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-bolt-600 ring-2 ring-white"
                            style={{ left: l, top: tp }}
                        />
                    ))}
                  </div>
                  {d.items.map((item) => (
                      <div
                          key={item}
                          className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[11px] font-bold text-slate-700"
                      >
                        {item}
                        <ChevronRight size={12} className="text-slate-400" />
                      </div>
                  ))}
                </>
            )}

            {screen === "request" && (
                <>
                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500">
                      <span>On the way</span>
                      <span className="text-bolt-600">65%</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-[65%] rounded-full bg-bolt-500" />
                    </div>
                  </div>
                  {d.items.map((item) => (
                      <div
                          key={item}
                          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[11px] font-bold text-slate-700"
                      >
                        <CheckCircle2 size={13} className="shrink-0 text-bolt-500" />
                        {item}
                      </div>
                  ))}
                </>
            )}

            {screen === "chat" &&
                d.items.map((item, i) => {
                  const mine = i === d.items.length - 1;
                  return (
                      <div key={item} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                        <p
                            className={`max-w-[85%] px-3 py-2 text-[11px] font-semibold leading-snug ${
                                mine
                                    ? "rounded-2xl rounded-br-md bg-bolt-500 text-white"
                                    : "rounded-2xl rounded-bl-md border border-slate-200 bg-white text-slate-700"
                            }`}
                        >
                          {item}
                        </p>
                      </div>
                  );
                })}
          </div>

          {/* Action */}
          <div className="p-3">
            <div className="rounded-xl bg-navy-900 py-3 text-center text-[11px] font-bold text-white">{label}</div>
          </div>
        </div>
      </div>
  );
}
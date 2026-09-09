import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";

const slides = [
  {
    id: 1,
    title: "AI Lead Generator Pro",
    subtitle: "Capture & qualify leads 24/7 automatically",
    highlights: [
      "WhatsApp + Web chat in one inbox",
      "AI qualifies leads before you see them",
      "Auto-follow up sequences built in",
    ],
    bg: "from-cyan-900/60 to-indigo-900/60",
    accent: "#00C6A7",
    icon: "🤖",
  },
  {
    id: 2,
    title: "Smart Automation Dashboard",
    subtitle: "One dashboard to run your entire business",
    highlights: [
      "Real-time lead pipeline view",
      "Trigger actions from WhatsApp replies",
      "Integrates with your existing CRM",
    ],
    bg: "from-violet-900/60 to-cyan-900/60",
    accent: "#7C3AED",
    icon: "⚡",
  },
  {
    id: 3,
    title: "Multi-Channel Outreach",
    subtitle: "Reach clients on WhatsApp, Email & SMS simultaneously",
    highlights: [
      "Personalised messages at scale",
      "Schedule campaigns in advance",
      "Analytics on every message sent",
    ],
    bg: "from-teal-900/60 to-blue-900/60",
    accent: "#0EA5E9",
    icon: "📣",
  },
  {
    id: 4,
    title: "No-Code Setup in Minutes",
    subtitle: "Launch your AI agent without writing a single line of code",
    highlights: [
      "Drag-and-drop flow builder",
      "Pre-built templates for Real Estate, Medical & more",
      "Go live in under 30 minutes",
    ],
    bg: "from-emerald-900/60 to-teal-900/60",
    accent: "#10B981",
    icon: "🚀",
  },
];

export function NewArrival() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused]);

  const goTo = (i: number) => setCurrent(i);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  const slide = slides[current];

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: "linear-gradient(135deg, #0c1021 0%, #0d2233 60%, #0a1a2e 100%)" }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Back Button */}
      <a
        href="/"
        className="fixed top-24 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
        style={{
          background: "rgba(0,198,167,0.15)",
          border: "1px solid rgba(0,198,167,0.3)",
          color: "#00C6A7"
        }}
      >
        &larr; Back to Home
      </a>

      <div className="flex flex-col items-center pt-32 pb-8 px-4 text-center">
        {/* Badge */}
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-6"
          style={{
            background: "linear-gradient(90deg, #00C6A7 0%, #7C3AED 100%)",
            color: "#fff",
            boxShadow: "0 0 20px rgba(0,198,167,0.4)",
          }}
        >
          🚀 JUST LAUNCHED
        </span>

        <h1
          className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
          style={{
            background: "linear-gradient(90deg, #00C6A7 0%, #7C3AED 50%, #0EA5E9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Lead Generator Pro
        </h1>

        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-2">
          Your AI-powered sales agent that never sleeps — captures, qualifies, and follows up with every lead automatically.
        </p>
        <p className="text-sm text-slate-500 mb-10">
          Built for Real Estate · Medical · Legal · Restaurant · Agency
        </p>

        {/* Slider */}
        <div
          className={`relative w-full max-w-4xl rounded-2xl overflow-hidden mb-8 ${fullscreen ? "fixed inset-0 z-50 max-w-none rounded-none" : ""}`}
          style={{
            border: "1px solid rgba(0,198,167,0.3)",
            boxShadow: "0 0 40px rgba(0,198,167,0.15)",
            minHeight: "360px",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <video
            src="/new-arrival-demo.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover absolute inset-0"
            style={{ zIndex: 1 }}
          />

          <div
            className={`absolute inset-0 bg-gradient-to-br ${slide.bg} flex flex-col justify-end p-8`}
            style={{ backdropFilter: "blur(4px)", zIndex: 2 }}
          >
            <div className="flex flex-col gap-3 text-left">
              <span className="text-5xl">{slide.icon}</span>
              <h2 className="text-2xl md:text-4xl font-bold text-white">{slide.title}</h2>
              <p className="text-slate-300 text-base md:text-lg">{slide.subtitle}</p>
              <ul className="flex flex-col gap-1 mt-2">
                {slide.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-200">
                    <span style={{ color: slide.accent }}>✓</span> {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="absolute top-4 right-4">
              <button
                onClick={() => setFullscreen(!fullscreen)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                {fullscreen ? "✕" : "⛶"}
              </button>
            </div>

            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl"
              style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              ‹
            </button>

            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl"
              style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              ›
            </button>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex gap-2 mb-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                background: i === current ? "#00C6A7" : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <a
            href="/#designs"
            className="px-8 py-3 rounded-full font-semibold text-base"
            style={{
              background: "linear-gradient(90deg, #00C6A7, #0EA5E9)",
              color: "#fff",
              boxShadow: "0 0 20px rgba(0,198,167,0.4)",
            }}
          >
            🎯 Try Live Demo
          </a>

          <a
            href="/#contact"
            className="px-8 py-3 rounded-full font-semibold text-base"
            style={{
              background: "transparent",
              color: "#00C6A7",
              border: "1px solid #00C6A7",
            }}
          >
            💬 Get Early Access
          </a>

          <a
            href="/#services"
            className="px-8 py-3 rounded-full font-semibold text-base"
            style={{
              background: "rgba(255,255,255,0.05)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            📋 View Pricing
          </a>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
          {[
            { icon: "🤖", label: "AI-Powered", desc: "GPT-driven responses" },
            { icon: "📱", label: "WhatsApp Native", desc: "Works where clients are" },
            { icon: "⚡", label: "Instant Setup", desc: "Live in 30 minutes" },
            { icon: "📊", label: "Full Analytics", desc: "Track every interaction" },
          ].map((f, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 p-4 rounded-xl text-center"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(0,198,167,0.15)",
              }}
            >
              <span className="text-2xl">{f.icon}</span>
              <span className="text-sm font-semibold text-white">{f.label}</span>
              <span className="text-xs text-slate-400">{f.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

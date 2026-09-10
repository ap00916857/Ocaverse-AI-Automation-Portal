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
    accent: "#10B981",
    icon: "🚀",
  },
];

export function NewArrival() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
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
      <Navbar />

      <div className="w-full max-w-5xl mx-auto px-6 pt-32 pb-16 flex flex-col items-center text-center">
        {/* Back Button */}
        <div className="w-full flex justify-start mb-6">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
            style={{
              background: "rgba(0,198,167,0.15)",
              border: "1px solid rgba(0,198,167,0.3)",
              color: "#00C6A7",
              textDecoration: "none",
            }}
          >
            ← Back to Home
          </a>
        </div>

        {/* Badge */}
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
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

        <p className="text-lg text-slate-300 max-w-2xl mb-2">
          Your AI-powered sales agent that never sleeps — captures, qualifies, and follows up with every lead automatically.
        </p>
        <p className="text-sm text-slate-500 mb-10">
          Built for Real Estate · Medical · Legal · Restaurant · Agency
        </p>

        {/* Slider Section */}
        <div
          className="w-full"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className={`relative w-full rounded-2xl overflow-hidden mb-8 ${fullscreen ? "fixed inset-0 z-50 rounded-none" : ""}`}
            style={{
              minHeight: "450px",
              border: "1px solid rgba(0,198,167,0.3)",
              boxShadow: "0 0 40px rgba(0,198,167,0.15)",
            }}
          >
            {/* Background YouTube Video */}
            <iframe
              src="https://www.youtube.com/embed/m6f9HBKB2Ls?autoplay=1&mute=1&loop=1&playlist=m6f9HBKB2Ls&controls=0&showinfo=0&rel=0&modestbranding=1"
              className="absolute inset-0 w-full h-full object-cover scale-125"
              style={{ zIndex: 1, border: "none", pointerEvents: "none" }}
              allow="autoplay; fullscreen"
              allowFullScreen
            />

            {/* Dark Transparent Overlay for Text Visibility */}
            <div
              className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center px-16 py-8"
              style={{ backdropFilter: "blur(2px)", zIndex: 2 }}
            >
              <div className="flex flex-col gap-3 text-center items-center">
                <span className="text-5xl">{slide.icon}</span>
                <h2 className="text-2xl md:text-4xl font-bold text-white drop-shadow-md">{slide.title}</h2>
                <p className="text-slate-200 text-base md:text-lg drop-shadow">{slide.subtitle}</p>
                <ul className="flex flex-col gap-1 mt-2">
                  {slide.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-100 drop-shadow">
                      <span style={{ color: slide.accent }}>✓</span> {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Controls */}
              <button
                onClick={() => setFullscreen(!fullscreen)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                {fullscreen ? "✕" : "⛶"}
              </button>

              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl"
                style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                ‹
              </button>

              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl"
                style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* Indicators */}
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
                border: "none",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <a
            href="https://www.youtube.com/watch?v=m6f9HBKB2Ls"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full font-semibold text-base"
            style={{
              background: "linear-gradient(90deg, #00C6A7, #0EA5E9)",
              color: "#fff",
              boxShadow: "0 0 20px rgba(0,198,167,0.4)",
              textDecoration: "none",
            }}
          >
            ▶ Watch Demo Video
          </a>

          <a
            href="https://wa.me/918796363097?text=Hi%20OcaVerse!%20I%20want%20early%20access%20to%20Lead%20Generator%20Pro"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full font-semibold text-base"
            style={{
              background: "transparent",
              color: "#00C6A7",
              border: "1px solid #00C6A7",
              textDecoration: "none",
            }}
          >
            💬 Get Early Access
          </a>

          <button
            onClick={() => setShowPricing(!showPricing)}
            className="px-8 py-3 rounded-full font-semibold text-base"
            style={{
              background: "rgba(255,255,255,0.05)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.15)",
              cursor: "pointer",
            }}
          >
            📋 View Pricing
          </button>
        </div>

        {/* Pricing Section */}
        {showPricing && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Early Bird */}
            <div
              className="rounded-2xl p-6 text-left relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(0,198,167,0.2), rgba(0,198,167,0.05))",
                border: "2px solid #00C6A7",
                boxShadow: "0 0 30px rgba(0,198,167,0.2)",
              }}
            >
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                style={{ background: "#00C6A7", color: "#0c1021" }}
              >
                🔥 EARLY BIRD OFFER
              </span>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-bold text-white">₹10,000</span>
                <span className="text-slate-400 mb-1">/month</span>
              </div>
              <p className="text-slate-300 text-sm mb-4">Limited time offer — grab it before it's gone!</p>
              <ul className="flex flex-col gap-2 mb-6">
                {["Up to 2000 leads/month", "All tab access included", "WhatsApp AI Agent", "Full Analytics Dashboard", "Priority Support"].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-200">
                    <span style={{ color: "#00C6A7" }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/918796363097?text=Hi%20OcaVerse!%20I%20want%20the%20Early%20Bird%20offer%20for%20Lead%20Generator%20Pro"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 rounded-full font-semibold text-sm"
                style={{ background: "#00C6A7", color: "#0c1021", textDecoration: "none" }}
              >
                Grab Early Bird →
              </a>
            </div>

            {/* Standard */}
            <div
              className="rounded-2xl p-6 text-left"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
              >
                STANDARD PLAN
              </span>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-bold text-white">₹15,000</span>
                <span className="text-slate-400 mb-1">/month</span>
              </div>
              <p className="text-slate-300 text-sm mb-4">Full access for growing businesses.</p>
              <ul className="flex flex-col gap-2 mb-6">
                {["Up to 2000 leads/month", "All tab access included", "WhatsApp AI Agent", "Full Analytics Dashboard", "Standard Support"].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-200">
                    <span style={{ color: "#7C3AED" }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/918796363097?text=Hi%20OcaVerse!%20I%20want%20the%20Standard%20Plan%20for%20Lead%20Generator%20Pro"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 rounded-full font-semibold text-sm"
                style={{ background: "rgba(124,58,237,0.2)", color: "#fff", border: "1px solid #7C3AED", textDecoration: "none" }}
              >
                Get Started →
              </a>
            </div>
          </div>
        )}

        {/* Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {[
            { icon: "🤖", label: "AI-Powered", desc: "GPT-driven responses" },
            { icon: "📱", label: "WhatsApp Native", desc: "Works where clients are" },
            { icon: "⚡", label: "Instant Setup", desc: "Live in 30 minutes" },
            { icon: "📊", label: "Full Analytics", desc: "Track every interaction" },
          ].map((f, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 p-4 rounded-xl text-center"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,198,167,0.15)" }}
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

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
      className="relative min-h-screen w-full"
      style={{ background: "linear-gradient(135deg, #0c1021 0%, #0d2233 60%, #0a1a2e 100%)" }}
    >
      <Navbar />

      {/* Back Button - absolute so it only shows on this page */}
      <a
        href="/"
        style={{
          position: "absolute",
          top: "96px",
          left: "24px",
          zIndex: 40,
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 16px",
          borderRadius: "9999px",
          fontSize: "14px",
          fontWeight: 500,
          background: "rgba(0,198,167,0.15)",
          border: "1px solid rgba(0,198,167,0.3)",
          color: "#00C6A7",
          textDecoration: "none",
        }}
      >
        ← Back to Home
      </a>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "128px",
          paddingBottom: "32px",
          paddingLeft: "16px",
          paddingRight: "16px",
          textAlign: "center",
        }}
      >
        {/* Badge */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            borderRadius: "9999px",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.05em",
            marginBottom: "24px",
            background: "linear-gradient(90deg, #00C6A7 0%, #7C3AED 100%)",
            color: "#fff",
            boxShadow: "0 0 20px rgba(0,198,167,0.4)",
          }}
        >
          🚀 JUST LAUNCHED
        </span>

        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            marginBottom: "16px",
            lineHeight: 1.2,
            background: "linear-gradient(90deg, #00C6A7 0%, #7C3AED 50%, #0EA5E9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Lead Generator Pro
        </h1>

        <p style={{ fontSize: "18px", color: "#CBD5E1", maxWidth: "640px", marginBottom: "8px" }}>
          Your AI-powered sales agent that never sleeps — captures, qualifies, and follows up with every lead automatically.
        </p>
        <p style={{ fontSize: "13px", color: "#64748B", marginBottom: "40px" }}>
          Built for Real Estate · Medical · Legal · Restaurant · Agency
        </p>

        {/* Slider - centered with auto margins */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            position: fullscreen ? "fixed" : "relative",
            inset: fullscreen ? 0 : "auto",
            zIndex: fullscreen ? 50 : "auto",
            width: fullscreen ? "100%" : "100%",
            maxWidth: fullscreen ? "none" : "800px",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: fullscreen ? 0 : "16px",
            overflow: "hidden",
            marginBottom: "32px",
            minHeight: "360px",
            border: "1px solid rgba(0,198,167,0.3)",
            boxShadow: "0 0 40px rgba(0,198,167,0.15)",
          }}
        >
          <video
            src="/new-arrival-demo.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 1,
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "32px",
              backdropFilter: "blur(4px)",
              background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
            }}
            className={`bg-gradient-to-br ${slide.bg}`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", textAlign: "left" }}>
              <span style={{ fontSize: "48px" }}>{slide.icon}</span>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, color: "white" }}>{slide.title}</h2>
              <p style={{ color: "#CBD5E1", fontSize: "16px" }}>{slide.subtitle}</p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "8px" }}>
                {slide.highlights.map((h, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#E2E8F0" }}>
                    <span style={{ color: slide.accent }}>✓</span> {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Fullscreen */}
            <button
              onClick={() => setFullscreen(!fullscreen)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "14px",
                background: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.2)",
                cursor: "pointer",
              }}
            >
              {fullscreen ? "✕" : "⛶"}
            </button>

            {/* Prev */}
            <button
              onClick={prev}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "20px",
                background: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.2)",
                cursor: "pointer",
              }}
            >‹</button>

            {/* Next */}
            <button
              onClick={next}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "20px",
                background: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.2)",
                cursor: "pointer",
              }}
            >›</button>
          </div>
        </div>

        {/* Indicators */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "40px" }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                borderRadius: "9999px",
                background: i === current ? "#00C6A7" : "rgba(255,255,255,0.2)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center", marginBottom: "64px" }}>
          <a href="/#designs" style={{ padding: "12px 32px", borderRadius: "9999px", fontWeight: 600, fontSize: "15px", background: "linear-gradient(90deg, #00C6A7, #0EA5E9)", color: "#fff", boxShadow: "0 0 20px rgba(0,198,167,0.4)", textDecoration: "none" }}>
            🎯 Try Live Demo
          </a>
          <a href="/#contact" style={{ padding: "12px 32px", borderRadius: "9999px", fontWeight: 600, fontSize: "15px", background: "transparent", color: "#00C6A7", border: "1px solid #00C6A7", textDecoration: "none" }}>
            💬 Get Early Access
          </a>
          <a href="/#services" style={{ padding: "12px 32px", borderRadius: "9999px", fontWeight: 600, fontSize: "15px", background: "rgba(255,255,255,0.05)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", textDecoration: "none" }}>
            📋 View Pricing
          </a>
        </div>

        {/* Feature grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px", width: "100%", maxWidth: "800px", margin: "0 auto" }}>
          {[
            { icon: "🤖", label: "AI-Powered", desc: "GPT-driven responses" },
            { icon: "📱", label: "WhatsApp Native", desc: "Works where clients are" },
            { icon: "⚡", label: "Instant Setup", desc: "Live in 30 minutes" },
            { icon: "📊", label: "Full Analytics", desc: "Track every interaction" },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                padding: "16px",
                borderRadius: "12px",
                textAlign: "center",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(0,198,167,0.15)",
              }}
            >
              <span style={{ fontSize: "24px" }}>{f.icon}</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "white" }}>{f.label}</span>
              <span style={{ fontSize: "12px", color: "#94A3B8" }}>{f.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

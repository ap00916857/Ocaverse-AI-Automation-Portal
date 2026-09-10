import { useState } from "react";
import { Navbar } from "@/components/Navbar";

export function NewArrival() {
  const [fullscreen, setFullscreen] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

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

        {/* Video Container */}
        <div className="w-full mb-10">
          <div
            className={`relative w-full rounded-2xl overflow-hidden aspect-video ${
              fullscreen ? "fixed inset-0 z-50 rounded-none h-screen w-screen" : ""
            }`}
            style={{
              border: "1px solid rgba(0,198,167,0.3)",
              boxShadow: "0 0 40px rgba(0,198,167,0.15)",
              background: "#000",
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/m6f9HBKB2Ls?autoplay=1&mute=1&loop=1&playlist=m6f9HBKB2Ls&controls=1&rel=0&modestbranding=1"
              className="w-full h-full"
              style={{ border: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            <button
              onClick={() => setFullscreen(!fullscreen)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center text-white text-sm"
              style={{
                background: "rgba(0,0,0,0.6)",
                border: "1px solid rgba(255,255,255,0.2)",
                cursor: "pointer",
              }}
              title={fullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {fullscreen ? "✕" : "⛶"}
            </button>
          </div>
        </div>

        {/* Fixed CTA Buttons - Direct WhatsApp / Modal Triggers (No Hash Anchors) */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <a
            href="https://wa.me/918796363097?text=Hi%20OcaVerse!%20I%20want%20to%20try%20the%20live%20demo%20for%20Lead%20Generator%20Pro"
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
            ▶ Try Live Demo
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

        {/* Inline Pricing Section Toggle */}
        {showPricing && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
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

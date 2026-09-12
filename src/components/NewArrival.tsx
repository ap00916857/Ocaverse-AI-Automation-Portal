import { useState, useRef, useEffect } from "react";
import { Play, Maximize2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export type NewArrivalItem = {
  id: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  badge?: string | null;
  image_url?: string | null;
  video_url?: string | null;
  category?: string | null;
  features?: string[] | null;
  early_bird_price?: string | null;
  standard_price?: string | null;
  is_active?: boolean;
};

const DEFAULT_NEW_ARRIVAL: NewArrivalItem = {
  id: "lead-gen-pro",
  title: "Lead Generator Pro",
  subtitle: "Your AI-powered sales agent that never sleeps — captures, qualifies, and follows up with every lead automatically.",
  description: "Built for Real Estate · Medical · Legal · Restaurant · Agency",
  badge: "JUST LAUNCHED",
  image_url: "/lead-gen-preview.png",
  video_url: "https://www.youtube-nocookie.com/embed/m6f9HBKB2Ls",
  features: [
    "Up to 2000 leads/month",
    "All tab access included",
    "WhatsApp AI Agent",
    "Full Analytics Dashboard",
    "Priority Support"
  ],
  early_bird_price: "?10,000",
  standard_price: "?15,000",
  is_active: true
};

export function NewArrival() {
  const [item, setItem] = useState<NewArrivalItem>(DEFAULT_NEW_ARRIVAL);
  const [fullscreen, setFullscreen] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchActiveShowcase = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from("new_arrivals_items")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: false })
          .limit(1);

        if (!error && data && data.length > 0) {
          setItem(data[0] as NewArrivalItem);
        }
      } catch (err) {
        console.warn("Could not load dynamic new arrival, using default:", err);
      }
    };
    fetchActiveShowcase();
  }, []);

  const warmUpPlayer = () => {
    if (typeof document !== "undefined" && !document.getElementById("yt-preconnect-warm")) {
      const link = document.createElement("link");
      link.id = "yt-preconnect-warm";
      link.rel = "preconnect";
      link.href = "https://www.youtube-nocookie.com";
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    }
  };

  const handleStartDemo = () => {
    warmUpPlayer();
    setIsPlaying(true);
    // Smooth scroll down or up to the main video container
    videoContainerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const formatTitle = (raw: string) => {
    const words = raw.trim().split(" ");
    if (words.length <= 1) {
      return { main: raw, highlight: "" };
    }
    const highlight = words.pop() || "";
    return { main: words.join(" "), highlight };
  };

  const titleParts = formatTitle(item.title || "Lead Generator Pro");

  const getEmbedSrc = (raw?: string | null) => {
    if (!raw) return "https://www.youtube-nocookie.com/embed/m6f9HBKB2Ls";
    let url = raw;
    if (url.includes("watch?v=")) {
      url = url.replace("watch?v=", "embed/");
    } else if (url.includes("youtu.be/")) {
      url = url.replace("youtu.be/", "www.youtube-nocookie.com/embed/");
    }
    if (!url.includes("youtube-nocookie.com") && url.includes("youtube.com/embed/")) {
      url = url.replace("youtube.com/embed/", "youtube-nocookie.com/embed/");
    }
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}autoplay=1&enablejsapi=1&controls=1&rel=0&modestbranding=1&playsinline=1&origin=${encodeURIComponent(origin)}`;
  };

  const featuresList = item.features && item.features.length > 0 ? item.features : DEFAULT_NEW_ARRIVAL.features!;

  return (
    <div
      className="min-h-screen w-full bg-gradient-mesh"
      style={{ backgroundColor: "hsl(var(--background))" }}
    >
      <div className="w-full max-w-5xl mx-auto px-6 pt-4 md:pt-6 pb-16 flex flex-col items-center text-center relative">

        {/* Badge - Darkened container, high contrast text, refined subtle glow */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 bg-slate-900/80 border border-cyan-500/40 backdrop-blur-md shadow-[0_0_12px_rgba(6,182,212,0.25)] text-cyan-300"
        >
          <span className="text-sm leading-none">??</span>
          <span className="font-semibold text-white tracking-wider drop-shadow-sm">
            {item.badge || "JUST LAUNCHED"}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          <span className="text-cyan-400">{titleParts.main}</span>{" "}
          <span className="text-white">{titleParts.highlight}</span>
        </h1>

        <p className="text-lg text-slate-300 max-w-2xl mb-2">
          {item.subtitle || DEFAULT_NEW_ARRIVAL.subtitle}
        </p>
        <p className="text-sm text-slate-500 mb-10">
          {item.description || DEFAULT_NEW_ARRIVAL.description}
        </p>

        {/* Clear YouTube Video Container with High-Res Thumbnail Overlay */}
        <div ref={videoContainerRef} className="w-full mb-10 scroll-mt-24">
          <div
            className={`relative w-full rounded-2xl overflow-hidden aspect-video transition-all duration-300 isolate transform-gpu ${
              fullscreen ? "fixed inset-0 z-50 rounded-none h-screen w-screen" : ""
            }`}
            style={{
              border: "1px solid rgba(0,198,167,0.3)",
              boxShadow: "0 0 40px rgba(0,198,167,0.15)",
              background: "#050b14",
            }}
          >
            {isPlaying ? (
              <iframe
                src={getEmbedSrc(item.video_url)}
                width="100%"
                height="100%"
                className="w-full h-full"
                style={{ border: "none" }}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title={`${item.title} Demo Video`}
              />
            ) : (
              /* Thumbnail & Centered Play Icon Overlay */
              <div
                onClick={handleStartDemo}
                onMouseEnter={warmUpPlayer}
                onFocus={warmUpPlayer}
                className="relative w-full h-full cursor-pointer group overflow-hidden select-none bg-[#070b1a]"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleStartDemo()}
                aria-label={`Play ${item.title} Demo Video`}
              >
                {/* High-Resolution Software Thumbnail - Fits perfectly to container */}
                <img
                  src={item.image_url || "/lead-gen-preview.png"}
                  alt={`${item.title} Demo Preview`}
                  width={1280}
                  height={720}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Ambient Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-all duration-300" />

                {/* Prominent Centered Play Icon Overlay */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3">
                  <div className="relative flex items-center justify-center">
                    {/* Outer Pulsing Glow Ring */}
                    <div className="absolute w-24 h-24 md:w-28 md:h-28 rounded-full bg-cyan-400/30 animate-ping opacity-75 pointer-events-none" />
                    
                    {/* Centered Play Button */}
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-[0_0_35px_rgba(6,182,212,0.7)] group-hover:scale-110 group-active:scale-95 transition-transform duration-300 border border-white/20">
                      <Play className="w-8 h-8 md:w-10 md:h-10 fill-current translate-x-0.5" />
                    </div>
                  </div>

                  {/* Play Action Label */}
                  <span className="px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold text-white bg-slate-900/85 border border-cyan-500/40 backdrop-blur-md shadow-md tracking-wide group-hover:border-cyan-400 transition-colors">
                    Click to Watch Live Demo
                  </span>
                </div>
              </div>
            )}

            {/* Custom Fullscreen Button */}
            {isPlaying && (
              <button
                onClick={() => setFullscreen(!fullscreen)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center text-white text-sm transition-all hover:bg-black/80"
                style={{
                  background: "rgba(0,0,0,0.6)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  cursor: "pointer",
                }}
                title={fullscreen ? "Exit Fullscreen" : "Fullscreen"}
                aria-label={fullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {fullscreen ? <X className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {/* Try Live Demo - Triggers Smooth Scroll & Inlined Video Autoplay */}
          <button
            type="button"
            onClick={handleStartDemo}
            onMouseEnter={warmUpPlayer}
            onFocus={warmUpPlayer}
            className="px-8 py-3 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-2"
            style={{
              background: "linear-gradient(90deg, #00C6A7, #0EA5E9)",
              color: "#fff",
              boxShadow: "0 0 20px rgba(0,198,167,0.4)",
              border: "none",
            }}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Try Live Demo</span>
          </button>

          {/* Get Early Access - WhatsApp Direct Link */}
          <a
            href={`https://wa.me/918796363097?text=Hi%20OcaVerse!%20I%20want%20early%20access%20to%20${encodeURIComponent(item.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "transparent",
              color: "#00C6A7",
              border: "1px solid #00C6A7",
              textDecoration: "none",
            }}
          >
            ?? Get Early Access
          </a>

          {/* View Pricing - Toggle */}
          <button
            type="button"
            onClick={() => setShowPricing(!showPricing)}
            className="px-8 py-3 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "rgba(255,255,255,0.05)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.15)",
              cursor: "pointer",
            }}
          >
            ?? View Pricing
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
                ?? EARLY BIRD OFFER
              </span>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-bold text-white">{item.early_bird_price || "?10,000"}</span>
                <span className="text-slate-400 mb-1">/month</span>
              </div>
              <p className="text-slate-300 text-sm mb-4">Limited time offer — grab it before it's gone!</p>
              <ul className="flex flex-col gap-2 mb-6">
                {featuresList.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-200">
                    <span style={{ color: "#00C6A7" }}>?</span> {f}
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/918796363097?text=Hi%20OcaVerse!%20I%20want%20the%20Early%20Bird%20offer%20for%20${encodeURIComponent(item.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 rounded-full font-semibold text-sm"
                style={{ background: "#00C6A7", color: "#0c1021", textDecoration: "none" }}
              >
                Grab Early Bird ?
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
                <span className="text-4xl font-bold text-white">{item.standard_price || "?15,000"}</span>
                <span className="text-slate-400 mb-1">/month</span>
              </div>
              <p className="text-slate-300 text-sm mb-4">Full access for growing businesses.</p>
              <ul className="flex flex-col gap-2 mb-6">
                {featuresList.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-200">
                    <span style={{ color: "#7C3AED" }}>?</span> {f}
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/918796363097?text=Hi%20OcaVerse!%20I%20want%20the%20Standard%20Plan%20for%20${encodeURIComponent(item.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 rounded-full font-semibold text-sm"
                style={{ background: "rgba(124,58,237,0.2)", color: "#fff", border: "1px solid #7C3AED", textDecoration: "none" }}
              >
                Get Started ?
              </a>
            </div>
          </div>
        )}

        {/* Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {[
            { icon: "??", label: "AI-Powered", desc: "GPT-driven responses" },
            { icon: "??", label: "WhatsApp Native", desc: "Works where clients are" },
            { icon: "?", label: "Instant Setup", desc: "Live in 30 minutes" },
            { icon: "??", label: "Full Analytics", desc: "Track every interaction" },
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

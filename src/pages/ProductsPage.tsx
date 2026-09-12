import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FontSwitcher } from "@/components/FontSwitcher";
import { Play, ExternalLink, ArrowRight, Sparkles, Check, Layers, X } from "lucide-react";
import { getYouTubeEmbedUrl, getYouTubeWatchUrl } from "@/lib/video";

export type ToolItem = {
  id: string;
  title: string;
  description: string;
  image_url?: string | null;
  video_url?: string | null;
  category: string;
  badge?: string | null;
  features?: string[] | null;
  demo_url?: string | null;
  price?: string | null;
  created_at?: string;
};

// Fallback presets in case database tables are initializing
const DEFAULT_TOOLS: ToolItem[] = [
  {
    id: "tool-1",
    title: "Lead Generator Pro",
    category: "AI Sales Agent",
    badge: "HOT ??",
    description: "Your 24/7 AI-powered sales agent that captures, qualifies, and follows up with high-intent leads automatically.",
    image_url: "/lead-gen-preview.png",
    video_url: "https://www.youtube-nocookie.com/embed/m6f9HBKB2Ls",
    features: [
      "Up to 2,000 leads/month capture",
      "Instant WhatsApp & Email qualification",
      "Automated calendar booking",
      "Real-time analytics dashboard"
    ],
    demo_url: "/new-arrival",
    price: "From ?10,000/mo"
  },
  {
    id: "tool-2",
    title: "WhatsApp AI Booking Assistant",
    category: "AI Automation",
    badge: "POPULAR",
    description: "Conversational WhatsApp assistant that handles FAQs, checks calendar availability, and registers appointments with zero latency.",
    image_url: "/assets/customer-doctor-B1VMvH-1.jpg",
    video_url: "",
    features: [
      "24/7 Instant response automation",
      "Google Calendar & CRM sync",
      "Automated reminder dispatch",
      "Multi-language conversational support"
    ],
    demo_url: "https://wa.me/918796363097?text=Hi%20OcaVerse!%20Show%20me%20the%20WhatsApp%20Bot%20Demo",
    price: "?8,000/mo"
  },
  {
    id: "tool-3",
    title: "Instant Website Style Configurator",
    category: "Web Tools",
    badge: "FEATURED",
    description: "Interactive 3-step dynamic builder letting businesses choose industry, select color aesthetic, and visualize complete digital layouts.",
    image_url: "/assets/portfolio-1-BNCrqpuF.jpg",
    video_url: "",
    features: [
      "Real-time 3D style preview",
      "Pre-configured industry frameworks",
      "One-click estimated scope calculation",
      "Direct project briefing handoff"
    ],
    demo_url: "/designs",
    price: "Free Access"
  },
  {
    id: "tool-4",
    title: "Smart Omni-Channel Lead Pipeline",
    category: "Lead Gen",
    badge: "PRO",
    description: "Centralized lead management dashboard aggregating contact inquiries, chatbot conversations, and campaign metrics in real time.",
    image_url: "/assets/demo-saas-BAFdEG5a.jpg",
    video_url: "",
    features: [
      "Real-time ingestion from web and chat",
      "Temperature scoring (Hot / Warm / Cold)",
      "Instant CSV export & webhook dispatch",
      "Multi-admin status management"
    ],
    demo_url: "/admin/login",
    price: "Included with Suite"
  }
];

export default function ProductsPage() {
  const [tools, setTools] = useState<ToolItem[]>(DEFAULT_TOOLS);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const loadTools = async () => {
    setLoading(true);
    try {
      const { data, error } = await (supabase as any)
        .from("tools_items")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Supabase tools_items not reachable yet, using default items:", error.message);
        setTools(DEFAULT_TOOLS);
      } else if (data && data.length > 0) {
        setTools(data as ToolItem[]);
      } else {
        setTools(DEFAULT_TOOLS);
      }
    } catch (err) {
      console.warn("Error fetching tools:", err);
      setTools(DEFAULT_TOOLS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTools();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    if (activeVideo) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeVideo]);

  const categories = ["All", ...Array.from(new Set(tools.map((t) => t.category).filter(Boolean)))];

  const filtered = selectedCategory === "All"
    ? tools
    : tools.filter((t) => t.category === selectedCategory);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#070b19] text-white">
      <AnimatedBackground />
      <Navbar />

      <main className="pt-28 md:pt-36 pb-20 container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Header Section with Two-Tone Typography */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 bg-slate-900/80 border border-cyan-500/40 backdrop-blur-md shadow-[0_0_12px_rgba(6,182,212,0.25)] text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold text-white tracking-wider">
              AI-POWERED ECOSYSTEM
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight">
            <span className="text-white">Our </span>
            <span className="text-cyan-400">Products & Tools</span>
          </h1>

          <p className="text-base md:text-lg text-slate-300 leading-relaxed">
            Explore our specialized collection of intelligent automation agents, lead capture engines, and custom digital frameworks built to supercharge your business.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-cyan-500 text-slate-950 font-semibold shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  : "bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filtered.map((tool) => (
            <div
              key={tool.id}
              className="rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-xl overflow-hidden hover:border-cyan-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col group"
            >
              {/* Media Preview Container */}
              <div className="relative w-full aspect-video bg-slate-950 overflow-hidden border-b border-white/10">
                {tool.image_url ? (
                  <img
                    src={tool.image_url}
                    alt={tool.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950">
                    <Layers className="w-12 h-12 text-cyan-500/30" />
                  </div>
                )}

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {tool.badge && (
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-cyan-500/90 text-slate-950 shadow-md">
                      {tool.badge}
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full text-[11px] font-medium tracking-wide bg-slate-950/80 border border-white/10 text-slate-300 backdrop-blur-sm">
                    {tool.category}
                  </span>
                </div>

                {/* Video Play Trigger if video_url exists */}
                {tool.video_url && (
                  <button
                    onClick={() => setActiveVideo(tool.video_url || null)}
                    className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-cyan-500/90 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                    title="Watch Video Preview"
                    aria-label={`Watch preview for ${tool.title}`}
                  >
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  </button>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {tool.title}
                    </h3>
                    {tool.price && (
                      <span className="text-sm font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full whitespace-nowrap">
                        {tool.price}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Features List */}
                  {tool.features && tool.features.length > 0 && (
                    <div className="space-y-2 mb-6">
                      {tool.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs md:text-sm text-slate-300">
                          <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action CTA Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5 mt-auto">
                  {tool.demo_url ? (
                    tool.demo_url.startsWith("http") ? (
                      <a
                        href={tool.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-4 rounded-xl text-xs md:text-sm font-semibold text-center bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors inline-flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                      >
                        <span>Try Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <Link
                        to={tool.demo_url}
                        className="flex-1 py-2.5 px-4 rounded-xl text-xs md:text-sm font-semibold text-center bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors inline-flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                      >
                        <span>Explore Tool</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )
                  ) : null}

                  <Link
                    to="/contact"
                    className="py-2.5 px-4 rounded-xl text-xs md:text-sm font-semibold text-center bg-slate-800 hover:bg-slate-700 text-white border border-white/10 transition-colors"
                  >
                    Inquire
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Tools CTA Box */}
        <div className="rounded-3xl p-8 md:p-12 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 text-center max-w-4xl mx-auto relative overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.15)]">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
              Need a Custom Tool or Automated Pipeline?
            </h2>
            <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto mb-6 leading-relaxed">
              We design and train bespoke AI chatbots, custom scrapers, lead nurturing pipelines, and enterprise automation engines built specifically for your business workflow.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:opacity-95 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-105"
              >
                Schedule Architecture Call ?
              </Link>
              <a
                href="https://wa.me/918796363097?text=Hi%20OcaVerse!%20I%20need%20a%20custom%20AI%20tool%20built"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-full font-semibold text-sm border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/10 transition-all hover:scale-105"
              >
                ?? Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Video Modal Player */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.3)] bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Action Bar */}
            <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
              <a
                href={getYouTubeWatchUrl(activeVideo)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-slate-900/80 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 transition-colors shadow-sm"
                title="Open video directly on YouTube"
              >
                <span>Open on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-white/20 transition-colors"
                aria-label="Close video"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <iframe
              src={getYouTubeEmbedUrl(activeVideo, true)}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title="Tool Demo Video"
            />
          </div>
        </div>
      )}

      <Footer />
      <FontSwitcher />
    </div>
  );
}

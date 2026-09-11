import { Link } from "react-router-dom";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navbar } from "@/components/Navbar";
import { Advantage } from "@/components/Advantage";
import { Footer } from "@/components/Footer";
import { FontSwitcher } from "@/components/FontSwitcher";

export default function AdvantagePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />

      <main className="pt-28 md:pt-32">
        {/* Page Breadcrumb & Header */}
        <div className="max-w-5xl mx-auto px-6 text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 mb-4 backdrop-blur-md">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span className="text-slate-500">/</span>
            <span className="text-white font-semibold">Advantage</span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
            style={{
              background: "linear-gradient(90deg, #00C6A7 0%, #7C3AED 50%, #0EA5E9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            The OcaVerse Advantage
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Discover why leading businesses and high-growth founders partner with OcaVerse to automate operations and outperform competitors.
          </p>
        </div>

        {/* Detailed Advantage Component */}
        <Advantage />
      </main>

      <Footer />
      <FontSwitcher />
    </div>
  );
}

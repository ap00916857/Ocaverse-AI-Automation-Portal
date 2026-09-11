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

      <main className="pt-28 md:pt-36">
        {/* Page Header */}
        <div className="max-w-5xl mx-auto px-6 text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            <span className="text-white">The</span>{" "}
            <span className="text-cyan-400">OcaVerse</span>{" "}
            <span className="text-white">Advantage</span>
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

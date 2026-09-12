import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navbar } from "@/components/Navbar";
import { DemoShowcase } from "@/components/DemoShowcase";
import { Footer } from "@/components/Footer";
import { FontSwitcher } from "@/components/FontSwitcher";

export default function DesignsPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />

      <main className="pt-28 md:pt-36 pb-16">
        {/* Page Header */}
        <div className="max-w-5xl mx-auto px-6 text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            <span className="text-cyan-400">Curated Styles</span>{" "}
            <span className="text-white">& Design Frameworks</span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Explore our signature aesthetics, industry layouts, and high-performance digital frameworks engineered for modern enterprises.
          </p>
        </div>

        {/* Style Showcase */}
        <DemoShowcase />
      </main>

      <Footer />
      <FontSwitcher />
    </div>
  );
}

import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navbar } from "@/components/Navbar";
import { DemoShowcase } from "@/components/DemoShowcase";
import { BuildYourWebsite } from "@/components/BuildYourWebsite";
import { Footer } from "@/components/Footer";
import { FontSwitcher } from "@/components/FontSwitcher";

export default function DesignsPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />

      <main className="pt-28 md:pt-36">
        {/* Page Header */}
        <div className="max-w-5xl mx-auto px-6 text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            <span className="text-cyan-400">Curated Styles</span>{" "}
            <span className="text-white">& Website Builder</span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Choose your signature aesthetic or configure your custom website requirements step-by-step.
          </p>
        </div>

        {/* Style Showcase & 3-Step Interactive Builder */}
        <DemoShowcase />
        <BuildYourWebsite />
      </main>

      <Footer />
      <FontSwitcher />
    </div>
  );
}

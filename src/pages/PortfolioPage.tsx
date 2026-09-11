import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navbar } from "@/components/Navbar";
import { Portfolio } from "@/components/Portfolio";
import { Footer } from "@/components/Footer";
import { FontSwitcher } from "@/components/FontSwitcher";

export default function PortfolioPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />

      <main className="pt-28 md:pt-36">
        {/* Page Header */}
        <div className="max-w-5xl mx-auto px-6 text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            <span className="text-cyan-400">Client Work</span>{" "}
            <span className="text-white">& Case Studies</span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            A showcase of transformative digital platforms, custom automation tools, and web applications delivered for our clients.
          </p>
        </div>

        {/* Detailed Portfolio Component */}
        <Portfolio />
      </main>

      <Footer />
      <FontSwitcher />
    </div>
  );
}

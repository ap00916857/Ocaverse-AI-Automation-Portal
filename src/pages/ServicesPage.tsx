import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navbar } from "@/components/Navbar";
import { Services } from "@/components/Services";
import { Footer } from "@/components/Footer";
import { FontSwitcher } from "@/components/FontSwitcher";

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />

      <main className="pt-28 md:pt-36">
        {/* Page Header */}
        <div className="max-w-5xl mx-auto px-6 text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            <span className="text-cyan-400">Digital & Automation</span>{" "}
            <span className="text-white">Services</span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Explore our specialized capabilities designed to scale your brand with cutting-edge engineering and automated intelligence.
          </p>
        </div>

        {/* Detailed Services Component */}
        <Services />
      </main>

      <Footer />
      <FontSwitcher />
    </div>
  );
}

import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FontSwitcher } from "@/components/FontSwitcher";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />

      <main className="pt-28 md:pt-36">
        {/* Page Header */}
        <div className="max-w-5xl mx-auto px-6 text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            <span className="text-cyan-400">Start Your</span>{" "}
            <span className="text-white">Project</span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Ready to automate your workflows or launch your next-gen web platform? Reach out directly and let's build something extraordinary.
          </p>
        </div>

        {/* Detailed Contact Component */}
        <Contact />
      </main>

      <Footer />
      <FontSwitcher />
    </div>
  );
}

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

      <main className="pt-24 md:pt-28">
        {/* Page Header */}
        <div className="max-w-5xl mx-auto px-6 text-center mb-6">
          <h1
            className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
            style={{
              background: "linear-gradient(90deg, #00C6A7 0%, #7C3AED 50%, #0EA5E9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Start Your Project
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

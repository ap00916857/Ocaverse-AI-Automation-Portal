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

      <main className="pt-24 md:pt-32">
        <Portfolio showFullHeader={true} />
      </main>

      <Footer />
      <FontSwitcher />
    </div>
  );
}

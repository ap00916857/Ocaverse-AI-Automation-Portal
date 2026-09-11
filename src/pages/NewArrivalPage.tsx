import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navbar } from "@/components/Navbar";
import { NewArrival } from "@/components/NewArrival";
import { Footer } from "@/components/Footer";
import { FontSwitcher } from "@/components/FontSwitcher";

export default function NewArrivalPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <main className="pt-28 md:pt-36">
        <NewArrival />
      </main>
      <Footer />
      <FontSwitcher />
    </div>
  );
}

import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navbar } from "@/components/Navbar";
import { FontSwitcher } from "@/components/FontSwitcher";
import { Hero } from "@/components/Hero";
import NewArrival from "@/components/NewArrival";
import { Services } from "@/components/Services";
import { DemoShowcase } from "@/components/DemoShowcase";
import { BuildYourWebsite } from "@/components/BuildYourWebsite";
import { Advantage } from "@/components/Advantage";
import { Portfolio } from "@/components/Portfolio";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <main>
        <Hero />
        <NewArrival />
        <Services />
        <DemoShowcase />
        <BuildYourWebsite />
        <Advantage />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <FontSwitcher />
    </div>
  );
};

export default Index;

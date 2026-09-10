import { HomeView } from "./components/views/HomeView";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ServicesView } from "./components/views/ServicesView";
import { DesignsView } from "./components/views/DesignsView";
import { AdvantageView } from "./components/views/AdvantageView";
import { PortfolioView } from "./components/views/PortfolioView";
import { ContactView } from "./components/views/ContactView";
import { NewArrival } from "@/components/NewArrival";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Dynamic View Area (No scrolling jumps) */}
      <main className="pt-24 px-6 max-w-6xl mx-auto">
        {activeTab === "home" && <HomeView setActiveTab={setActiveTab} />}
        {activeTab === "new-arrival" && <NewArrival />}
        {activeTab === "services" && <ServicesView />}
        {activeTab === "designs" && <DesignsView />}
        {activeTab === "advantage" && <AdvantageView />}
        {activeTab === "portfolio" && <PortfolioView />}
        {activeTab === "contact" && <ContactView />}
      </main>
    </div>
  );
}

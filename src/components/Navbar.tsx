import { NavbarProps } from "@/types";

interface NavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Navbar({ activeTab, setActiveTab }: NavProps) {
  const links = [
    { id: "new-arrival", label: "New Arrival", isNew: true },
    { id: "services", label: "Services" },
    { id: "designs", label: "Designs" },
    { id: "advantage", label: "Advantage" },
    { id: "portfolio", label: "Portfolio" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div 
          onClick={() => setActiveTab("home")} 
          className="text-xl font-bold text-white cursor-pointer"
        >
          OcaVerse
        </div>

        <div className="flex items-center gap-2 md:gap-6">
          {links.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`relative px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? "text-white bg-slate-800 border border-teal-500/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {link.label}
                {link.isNew && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-teal-500 text-slate-950 rounded-full font-bold">
                    NEW
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

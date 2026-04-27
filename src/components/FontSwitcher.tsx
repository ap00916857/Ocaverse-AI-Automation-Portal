import { useEffect, useState } from "react";
import { Type, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fonts = [
  { id: "modern", label: "Modern", desc: "Space Grotesk + Inter", style: { fontFamily: '"Space Grotesk", sans-serif' } },
  { id: "elegant", label: "Elegant", desc: "Playfair + Manrope", style: { fontFamily: '"Playfair Display", serif' } },
  { id: "bold", label: "Bold", desc: "Bebas Neue + DM Sans", style: { fontFamily: '"Bebas Neue", sans-serif', letterSpacing: "0.05em" } },
  { id: "futuristic", label: "Futuristic", desc: "Sora + Outfit", style: { fontFamily: '"Sora", sans-serif' } },
];

const STORAGE_KEY = "vougesty-font";

export const FontSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("modern");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) || "modern";
    setActive(saved);
    document.documentElement.setAttribute("data-font", saved);
  }, []);

  const apply = (id: string) => {
    setActive(id);
    document.documentElement.setAttribute("data-font", id);
    localStorage.setItem(STORAGE_KEY, id);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-72 glass-strong rounded-2xl p-4 shadow-elegant border border-white/10"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold">Choose Font Style</div>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
            <div className="space-y-2">
              {fonts.map((f) => (
                <button
                  key={f.id}
                  onClick={() => apply(f.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition border ${
                    active === f.id
                      ? "border-primary/60 bg-primary/10"
                      : "border-white/5 hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  <div>
                    <div className="text-base font-semibold leading-tight" style={f.style}>
                      {f.label}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{f.desc}</div>
                  </div>
                  {active === f.id && <Check className="h-4 w-4 text-primary" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        aria-label="Change font"
        className="h-12 w-12 grid place-items-center rounded-full glass-strong border border-white/15 shadow-elegant hover:scale-105 transition"
      >
        <Type className="h-5 w-5 text-primary" />
      </button>
    </div>
  );
};

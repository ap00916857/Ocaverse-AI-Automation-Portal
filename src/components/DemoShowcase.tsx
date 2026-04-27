import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import demoSaas from "@/assets/demo-saas.jpg";
import demoEcommerce from "@/assets/demo-ecommerce.jpg";
import demoPortfolio from "@/assets/demo-portfolio.jpg";
import demoCorporate from "@/assets/demo-corporate.jpg";
import demoStartup from "@/assets/demo-startup.jpg";
import demoAgency from "@/assets/demo-agency.jpg";

const designs = [
  { id: "saas", title: "SaaS Dashboard", desc: "Data-rich, conversion-tuned product surfaces.", img: demoSaas, tag: "App" },
  { id: "ecom", title: "E-commerce Store", desc: "Beautiful storefronts that sell on every device.", img: demoEcommerce, tag: "Commerce" },
  { id: "portfolio", title: "Portfolio Site", desc: "Editorial layouts to showcase your craft.", img: demoPortfolio, tag: "Creative" },
  { id: "corporate", title: "Corporate Website", desc: "Trust-building presence for established brands.", img: demoCorporate, tag: "Business" },
  { id: "startup", title: "Startup Landing Page", desc: "Bold, vibrant pages built to launch fast.", img: demoStartup, tag: "Launch" },
  { id: "agency", title: "Agency Website", desc: "Award-worthy designs that win pitches.", img: demoAgency, tag: "Agency" },
];

export const DemoShowcase = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [preview, setPreview] = useState<typeof designs[number] | null>(null);

  return (
    <section id="designs" className="py-12 md:py-16 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-8"
        >
          <span className="inline-block glass rounded-full px-4 py-1 text-xs font-medium mb-3">Demo website designs</span>
          <h2 className="text-2xl md:text-4xl mb-3 font-normal font-sans text-primary-glow">
            Choose your <span className="text-gradient">website style</span>
          </h2>
          <p className="text-sm md:text-base text-primary-glow font-sans font-normal">
            Browse curated starting points — each one fully customizable to your brand.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {designs.map((d, i) => {
            const isSelected = selected === d.id;
            return (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className={`group relative rounded-3xl overflow-hidden glass-strong transition-all duration-300 ${
                  isSelected ? "ring-2 ring-primary shadow-glow" : ""
                }`}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 z-20 h-9 w-9 rounded-full bg-gradient-primary grid place-items-center shadow-glow"
                  >
                    <Check className="h-5 w-5 text-primary-foreground" />
                  </motion.div>
                )}

                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={d.img}
                    alt={d.title}
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Hover overlay buttons */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <Button variant="glass" size="sm" onClick={() => setPreview(d)}>
                      <Eye className="h-4 w-4" /> Preview
                    </Button>
                    <Button variant="hero" size="sm" onClick={() => setSelected(isSelected ? null : d.id)}>
                      {isSelected ? "Selected" : "Select Design"}
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="font-normal font-sans text-primary-glow text-base">{d.title}</h3>
                    <span className="text-[10px] uppercase tracking-wider glass rounded-full px-2.5 py-1 text-primary-glow">{d.tag}</span>
                  </div>
                  <p className="text-sm text-primary-glow font-sans font-normal">{d.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 text-center"
          >
            <p className="text-sm text-muted-foreground mb-3">
              Great pick! Let's bring{" "}
              <span className="text-foreground font-semibold">{designs.find(d => d.id === selected)?.title}</span>{" "}
              to life.
            </p>
            <Button variant="hero" size="lg" asChild>
              <a href="#contact">Continue with this design</a>
            </Button>
          </motion.div>
        )}
      </div>

      {/* Preview modal */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-3xl max-w-4xl w-full overflow-hidden shadow-elegant"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div>
                  <h3 className="font-semibold">{preview.title}</h3>
                  <p className="text-xs text-muted-foreground">{preview.desc}</p>
                </div>
                <button onClick={() => setPreview(null)} className="h-9 w-9 rounded-full glass grid place-items-center hover:bg-white/10 transition" aria-label="Close">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-4">
                <img src={preview.img} alt={preview.title} className="w-full rounded-2xl" />
              </div>
              <div className="p-4 border-t border-white/10 flex justify-end gap-3">
                <Button variant="glass" onClick={() => setPreview(null)}>Close</Button>
                <Button
                  variant="hero"
                  onClick={() => {
                    setSelected(preview.id);
                    setPreview(null);
                  }}
                >
                  <Check className="h-4 w-4" /> Select this design
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Stethoscope, Building2, Compass, ShoppingBag, Scale, UtensilsCrossed } from "lucide-react";
import doctor from "@/assets/customer-doctor.jpg";
import realestate from "@/assets/customer-realestate.jpg";
import architect from "@/assets/customer-architect.jpg";
import retail from "@/assets/customer-retail.jpg";
import lawyer from "@/assets/customer-lawyer.jpg";
import restaurant from "@/assets/customer-restaurant.jpg";

const industries = [
  {
    title: "Healthcare & Doctors",
    tag: "Medical",
    desc: "Patient-friendly websites with online booking, services and trust-building design.",
    image: doctor,
    Icon: Stethoscope,
  },
  {
    title: "Real Estate Brokers",
    tag: "Real Estate",
    desc: "Stunning property listings, lead capture and virtual-tour ready experiences.",
    image: realestate,
    Icon: Building2,
  },
  {
    title: "Architects & Studios",
    tag: "Architecture",
    desc: "Portfolio-driven sites that showcase projects with cinematic visuals.",
    image: architect,
    Icon: Compass,
  },
  {
    title: "Retail Shops & Boutiques",
    tag: "Retail",
    desc: "Sleek storefronts, online catalogs and seamless checkout flows.",
    image: retail,
    Icon: ShoppingBag,
  },
  {
    title: "Lawyers & Consultants",
    tag: "Legal",
    desc: "Professional, authoritative presence with clear practice areas and inquiry forms.",
    image: lawyer,
    Icon: Scale,
  },
  {
    title: "Restaurants & Hospitality",
    tag: "Hospitality",
    desc: "Mouth-watering menus, reservations and brand-rich storytelling.",
    image: restaurant,
    Icon: UtensilsCrossed,
  },
];

export const IndustryShowcase = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % industries.length), []);
  const prev = () => setIndex((i) => (i - 1 + industries.length) % industries.length);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [paused, next]);

  const current = industries[index];
  const Icon = current.Icon;

  return (
    <section id="industries" className="py-20 md:py-28 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Industries we serve
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Built for <span className="text-gradient">your industry</span>
          </h2>
          <p className="text-muted-foreground">
            From clinics to boutiques — we craft websites tailored to how your customers actually buy.
          </p>
        </motion.div>

        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative overflow-hidden rounded-3xl glass-strong border border-white/10 shadow-elegant">
            <div className="grid md:grid-cols-2 min-h-[420px] md:min-h-[480px]">
              {/* Image side */}
              <div className="relative overflow-hidden h-64 md:h-auto">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current.image}
                    src={current.image}
                    alt={current.title}
                    width={1280}
                    height={800}
                    loading="lazy"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background/90 via-background/20 to-transparent" />
              </div>

              {/* Content side */}
              <div className="relative p-8 md:p-12 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs font-medium mb-5 w-fit">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                      {current.tag}
                    </div>
                    <h3 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
                      {current.title}
                    </h3>
                    <p className="text-muted-foreground text-base md:text-lg mb-6">
                      {current.desc}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="font-display text-3xl text-gradient font-bold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>/ {String(industries.length).padStart(2, "0")}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <div className="flex items-center gap-3 mt-8">
                  <button
                    onClick={prev}
                    aria-label="Previous"
                    className="h-11 w-11 grid place-items-center rounded-full glass hover:bg-white/10 transition"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next"
                    className="h-11 w-11 grid place-items-center rounded-full glass hover:bg-white/10 transition"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-3">
            {industries.map((it, i) => {
              const ItIcon = it.Icon;
              const active = i === index;
              return (
                <button
                  key={it.title}
                  onClick={() => setIndex(i)}
                  className={`relative group overflow-hidden rounded-xl border transition-all ${
                    active
                      ? "border-primary/60 shadow-glow scale-[1.03]"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <img
                    src={it.image}
                    alt={it.title}
                    width={400}
                    height={250}
                    loading="lazy"
                    className="h-20 md:h-24 w-full object-cover transition group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 transition ${active ? "bg-primary/20" : "bg-background/50 group-hover:bg-background/30"}`} />
                  <div className="absolute bottom-1 left-1 right-1 flex items-center gap-1 text-[10px] md:text-xs font-medium">
                    <ItIcon className="h-3 w-3 text-primary" />
                    <span className="truncate">{it.tag}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Play, Stethoscope, Building2, Compass, ShoppingBag, Scale, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import doctor from "@/assets/customer-doctor.jpg";
import realestate from "@/assets/customer-realestate.jpg";
import architect from "@/assets/customer-architect.jpg";
import retail from "@/assets/customer-retail.jpg";
import lawyer from "@/assets/customer-lawyer.jpg";
import restaurant from "@/assets/customer-restaurant.jpg";

const heroSlides = [
  { title: "Healthcare & Doctors", tag: "Medical", image: doctor, Icon: Stethoscope },
  { title: "Real Estate Brokers", tag: "Real Estate", image: realestate, Icon: Building2 },
  { title: "Architects & Studios", tag: "Architecture", image: architect, Icon: Compass },
  { title: "Retail Shops & Boutiques", tag: "Retail", image: retail, Icon: ShoppingBag },
  { title: "Lawyers & Consultants", tag: "Legal", image: lawyer, Icon: Scale },
  { title: "Restaurants & Hospitality", tag: "Hospitality", image: restaurant, Icon: UtensilsCrossed },
];

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium mb-6"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary-glow" />
              <span>Premium digital solutions for ambitious brands</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-6">
              Crafting websites that{" "}
              <span className="text-gradient">move people</span>{" "}
              & grow business.
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
              Vougesty Solution designs and engineers premium digital experiences —
              from sleek SaaS platforms to commerce, portfolios and bespoke agency sites.
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Button variant="hero" size="lg" asChild>
                <a href="#contact">
                  Start Your Project <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button variant="glass" size="lg" asChild>
                <a href="#designs">
                  <Play className="h-4 w-4" /> Explore Designs
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              {[
                { v: "120+", l: "Projects" },
                { v: "98%", l: "Satisfaction" },
                { v: "8 yrs", l: "Experience" },
              ].map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="glass rounded-2xl p-4 text-center lg:text-left"
                >
                  <div className="text-2xl font-bold font-display text-gradient">{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — auto-rotating industry slides */}
          <HeroSlides />
        </div>
      </div>
    </section>
  );
};

const HeroSlides = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const current = heroSlides[index];
  const Icon = current.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full" />

      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative aspect-[4/3] w-full mx-auto rounded-3xl overflow-hidden glass-strong border border-white/10 shadow-elegant"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={current.image}
            src={current.image}
            alt={current.title}
            width={1280}
            height={800}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

        {/* Caption */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="absolute left-5 right-5 bottom-5"
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs font-medium mb-2">
              <Icon className="h-3.5 w-3.5 text-primary" />
              {current.tag}
            </div>
            <div className="text-lg sm:text-xl font-bold leading-tight">
              {current.title}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-primary" : "w-1.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

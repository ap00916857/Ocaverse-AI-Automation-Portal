import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-illustration.png";

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

          {/* RIGHT — animated illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-primary opacity-30 blur-3xl rounded-full" />
              <img
                src={heroImage}
                alt="Vougesty dashboard illustration"
                width={1024}
                height={1024}
                className="relative w-full max-w-lg mx-auto drop-shadow-2xl"
              />
            </motion.div>

            {/* Floating glass cards */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 -left-2 md:left-6 glass-strong rounded-2xl px-4 py-3 shadow-elegant"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-primary grid place-items-center">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Conversion</div>
                  <div className="text-sm font-semibold">+184% growth</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-4 -right-2 md:right-2 glass-strong rounded-2xl px-4 py-3 shadow-elegant"
            >
              <div className="text-xs text-muted-foreground">Live now</div>
              <div className="text-sm font-semibold flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                12 projects building
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

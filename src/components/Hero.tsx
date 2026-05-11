import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ArrowRight, Sparkles, Play, Stethoscope, Building2, Compass, ShoppingBag, Scale, UtensilsCrossed, LayoutDashboard, Smartphone, Zap } from "lucide-react";
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

const typedWords = ["Web Apps", "Mobile Apps", "Automation Tools"];

const useTypewriter = (words: string[], typeSpeed = 90, deleteSpeed = 45, pause = 1400) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setText((t) =>
          deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
        );
      }, deleting ? deleteSpeed : typeSpeed);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pause]);

  return text;
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export const Hero = () => {
  const typed = useTypewriter(typedWords);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax for background elements
  const { scrollY } = useScroll();
  const yBg1 = useTransform(scrollY, [0, 600], [0, 120]);
  const yBg2 = useTransform(scrollY, [0, 600], [0, -80]);
  const yBg3 = useTransform(scrollY, [0, 600], [0, 60]);

  return (
    <section ref={sectionRef} className="relative pt-24 pb-10 md:pt-28 md:pb-14 overflow-hidden">
      {/* Animated gradient background + parallax orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "linear-gradient(120deg, hsl(188 90% 60% / 0.18), hsl(200 70% 50% / 0.10), hsl(175 80% 55% / 0.18), hsl(188 90% 60% / 0.18))",
            backgroundSize: "300% 300%",
          }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          style={{ y: yBg1 }}
          className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-primary/25 blur-[120px]"
        />
        <motion.div
          style={{ y: yBg2 }}
          className="absolute top-20 -right-24 h-[480px] w-[480px] rounded-full bg-accent/20 blur-[140px]"
        />
        <motion.div
          style={{ y: yBg3 }}
          className="absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-secondary/20 blur-[120px]"
        />
      </div>

      <div className="container relative">
        <motion.div
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          {/* LEFT */}
          <div className="text-center lg:text-left lg:mt-8 xl:mt-12 lg:ml-4 xl:ml-8">
            <motion.div
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium mb-4"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary-glow" />
              <span>Premium digital solutions for ambitious brands</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl lg:text-5xl xl:text-6xl leading-[1.05] mb-4 font-normal font-sans text-primary-glow"
            >
              We build{" "}
              <span className="text-gradient inline-block min-h-[1.1em]">
                {typed}
                <motion.span
                  aria-hidden
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block w-[3px] h-[0.9em] align-middle ml-1 bg-primary-glow"
                />
              </span>
              <br />
              that move people & grow business.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-sm md:text-base max-w-xl mx-auto lg:mx-0 mb-6 text-primary-glow/90"
            >
              OcaVerse designs and engineers premium digital experiences —
              from sleek SaaS platforms to commerce, portfolios and bespoke agency sites.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3 justify-center lg:justify-start">
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
            </motion.div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0">
              {[
                { v: "120+", l: "Projects" },
                { v: "98%", l: "Satisfaction" },
                { v: "8 yrs", l: "Experience" },
              ].map((s, i) => (
                <motion.div
                  key={s.l}
                  variants={fadeUp}
                  custom={4 + i}
                  className="glass rounded-2xl p-3 text-center lg:text-left"
                >
                  <div className="text-xl font-bold font-display text-gradient">{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT — slides + floating UI mockups */}
          <HeroSlides />
        </motion.div>
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
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full" />

      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative aspect-[16/10] w-full mx-auto rounded-3xl overflow-hidden glass-strong border border-white/10 shadow-elegant"
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

        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />

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

      {/* Floating UI mockups */}
      <motion.div
        initial={{ opacity: 0, x: -30, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="hidden sm:block absolute -left-4 md:-left-8 top-10 z-10"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="glass-strong rounded-2xl p-3 w-44 border border-white/10 shadow-elegant"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-primary flex items-center justify-center">
              <LayoutDashboard className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground">Revenue</div>
              <div className="text-sm font-bold text-primary-glow">+24.8%</div>
            </div>
          </div>
          <div className="flex items-end gap-1 h-10">
            {[40, 65, 50, 80, 60, 95, 75].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-gradient-primary rounded-sm"
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 1.2 + i * 0.08, duration: 0.6 }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="hidden sm:block absolute -right-3 md:-right-6 bottom-12 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="glass-strong rounded-2xl p-3 w-40 border border-white/10 shadow-elegant"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="h-7 w-7 rounded-lg bg-accent/20 flex items-center justify-center">
              <Smartphone className="h-3.5 w-3.5 text-accent" />
            </div>
            <div className="text-xs font-semibold text-primary-glow">Mobile App</div>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "78%" }}
                transition={{ delay: 1.4, duration: 1 }}
                className="h-full bg-gradient-primary"
              />
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "55%" }}
                transition={{ delay: 1.5, duration: 1 }}
                className="h-full bg-gradient-primary"
              />
            </div>
            <div className="text-[10px] text-muted-foreground pt-1">Build · Ship · Scale</div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="hidden md:flex absolute -bottom-4 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="glass-strong rounded-full px-4 py-2 border border-white/10 shadow-elegant flex items-center gap-2"
        >
          <Zap className="h-3.5 w-3.5 text-primary-glow" />
          <span className="text-xs font-medium text-primary-glow">Automation Live</span>
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

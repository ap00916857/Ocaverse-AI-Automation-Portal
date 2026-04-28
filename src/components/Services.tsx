import { motion } from "framer-motion";
import { Code2, Palette, Smartphone, ShoppingBag, Search, Rocket } from "lucide-react";
import { TiltCard } from "@/components/TiltCard";

const services = [
  { icon: Code2, title: "Web Development", desc: "Hand-crafted, performant sites built with modern frameworks." },
  { icon: Palette, title: "UI / UX Design", desc: "Brand-aligned interfaces that delight and convert." },
  { icon: ShoppingBag, title: "E-commerce", desc: "Conversion-focused storefronts with seamless checkouts." },
  { icon: Smartphone, title: "Mobile-First", desc: "Responsive across every device, pixel perfect." },
  { icon: Search, title: "SEO & Performance", desc: "Lighthouse-loved sites that rank and load fast." },
  { icon: Rocket, title: "Launch & Support", desc: "Deploy, monitor and grow — we're with you long after launch." },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export const Services = () => {
  return (
    <section id="services" className="py-12 md:py-16 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-8"
        >
          <span className="inline-block glass rounded-full px-4 py-1 text-xs font-medium mb-3">What we do</span>
          <h2 className="text-2xl md:text-4xl mb-3 font-normal font-sans text-primary-glow">
            Services tailored to your <span className="text-gradient">growth</span>
          </h2>
          <p className="text-sm md:text-base text-primary-glow font-sans font-normal">
            From strategy to launch, we deliver every layer of the digital stack.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 perspective-1000">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
            >
              <TiltCard
                intensity={5}
                lift={6}
                className="glass-strong rounded-3xl p-5 group cursor-pointer relative overflow-hidden h-full transition-shadow duration-300 hover:shadow-elegant"
              >
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
                <div className="relative">
                  <div className="h-10 w-10 rounded-2xl bg-gradient-primary grid place-items-center shadow-glow mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[6deg] group-hover:shadow-[0_0_24px_-4px_hsl(var(--primary)/0.7)]">
                    <s.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-normal font-sans text-primary-glow mb-1 transition-colors duration-300 group-hover:text-primary">{s.title}</h3>
                  <p className="text-sm text-primary-glow font-sans font-normal leading-relaxed">{s.desc}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

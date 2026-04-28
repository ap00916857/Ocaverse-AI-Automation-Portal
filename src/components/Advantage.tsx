import { motion } from "framer-motion";
import { ShieldCheck, Zap, Users, TrendingUp } from "lucide-react";
import { TiltCard } from "@/components/TiltCard";

const items = [
  { icon: Zap, title: "Lightning Fast", desc: "Optimized for performance with sub-second load times." },
  { icon: ShieldCheck, title: "Secure by Design", desc: "Industry-standard security baked into every layer." },
  { icon: Users, title: "Dedicated Team", desc: "A senior squad assigned to your project end-to-end." },
  { icon: TrendingUp, title: "Built to Scale", desc: "Architected for the traffic you have — and the traffic you want." },
];

export const Advantage = () => {
  return (
    <section id="advantage" className="py-12 md:py-16 relative">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block glass rounded-full px-4 py-1 text-xs font-medium mb-3">The Vougesty Advantage</span>
            <h2 className="text-2xl md:text-4xl mb-4 leading-tight font-normal font-sans text-primary-glow">
              We don't just build sites — we build{" "}
              <span className="text-gradient">competitive advantage</span>.
            </h2>
            <p className="text-sm md:text-base mb-5 text-primary-glow font-sans font-normal">
              Every pixel, interaction and line of code is engineered with one goal:
              to make your brand impossible to ignore.
            </p>
            <div className="glass-strong rounded-3xl p-5 border-l-4 border-primary">
              <p className="italic text-primary-glow font-sans font-normal text-sm">
                "Vougesty redefined what we thought was possible online. Conversions doubled in the first month."
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-primary" />
                <div>
                  <div className="text-sm font-normal font-sans text-primary-glow">Amelia Rhodes</div>
                  <div className="text-xs text-primary-glow font-sans">CMO, Northwind Labs</div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-3 perspective-1000">
            {items.map((it, i) => (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={i % 2 === 1 ? "sm:translate-y-6" : ""}
              >
                <TiltCard
                  intensity={5}
                  lift={6}
                  className="glass-strong rounded-3xl p-4 group cursor-pointer h-full transition-shadow duration-300 hover:shadow-elegant"
                >
                  <div className="h-10 w-10 rounded-2xl bg-gradient-primary grid place-items-center shadow-glow mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[6deg] group-hover:shadow-[0_0_24px_-4px_hsl(var(--primary)/0.7)]">
                    <it.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-normal font-sans text-primary-glow mb-1 transition-colors duration-300 group-hover:text-primary">{it.title}</h3>
                  <p className="text-sm text-primary-glow font-sans font-normal">{it.desc}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

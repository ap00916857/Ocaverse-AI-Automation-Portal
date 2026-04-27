import { motion } from "framer-motion";
import { ShieldCheck, Zap, Users, TrendingUp } from "lucide-react";

const items = [
  { icon: Zap, title: "Lightning Fast", desc: "Optimized for performance with sub-second load times." },
  { icon: ShieldCheck, title: "Secure by Design", desc: "Industry-standard security baked into every layer." },
  { icon: Users, title: "Dedicated Team", desc: "A senior squad assigned to your project end-to-end." },
  { icon: TrendingUp, title: "Built to Scale", desc: "Architected for the traffic you have — and the traffic you want." },
];

export const Advantage = () => {
  return (
    <section id="advantage" className="py-24 md:py-32 relative">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block glass rounded-full px-4 py-1 text-xs font-medium mb-5">The Vougesty Advantage</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              We don't just build sites — we build{" "}
              <span className="text-gradient">competitive advantage</span>.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-8">
              Every pixel, interaction and line of code is engineered with one goal:
              to make your brand impossible to ignore.
            </p>
            <div className="glass-strong rounded-3xl p-6 border-l-4 border-primary">
              <p className="italic text-foreground/90">
                "Vougesty redefined what we thought was possible online. Conversions doubled in the first month."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-primary" />
                <div>
                  <div className="text-sm font-semibold">Amelia Rhodes</div>
                  <div className="text-xs text-muted-foreground">CMO, Northwind Labs</div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {items.map((it, i) => (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className={`glass-strong rounded-3xl p-6 ${i % 2 === 1 ? "sm:translate-y-8" : ""}`}
              >
                <div className="h-11 w-11 rounded-2xl bg-gradient-primary grid place-items-center shadow-glow mb-4">
                  <it.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-1.5">{it.title}</h3>
                <p className="text-sm text-muted-foreground">{it.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

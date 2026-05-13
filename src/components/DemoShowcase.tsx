import { motion } from "framer-motion";
import { LayoutGrid, Rocket, Building2, ExternalLink } from "lucide-react";

const styles = [
  {
    id: "clean",
    title: "Clean & Professional",
    desc: "Minimal layout, fast load, great for services & SaaS",
    tag: "Most popular",
    icon: LayoutGrid,
    href: "https://www.awwwards.com/websites/clean/",
  },
  {
    id: "bold",
    title: "Bold & Creative",
    desc: "Vibrant, eye-catching design for startups & agencies",
    tag: "Creative",
    icon: Rocket,
    href: "https://www.awwwards.com/websites/bold/",
  },
  {
    id: "corporate",
    title: "Corporate & Trust",
    desc: "Serious, credible presence for established businesses",
    tag: "Business",
    icon: Building2,
    href: "https://www.awwwards.com/websites/corporate/",
  },
];

export const DemoShowcase = () => {
  return (
    <section id="designs" className="py-12 md:py-16 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-8"
        >
          <h2 className="text-2xl md:text-4xl mb-3 font-normal font-sans text-primary-glow">
            Choose your <span className="text-gradient">website style</span>
          </h2>
          <p className="text-sm md:text-base text-primary-glow font-sans font-normal">
            Pick a starting point — fully customised to your brand.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {styles.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl p-6 glass-strong transition-all duration-300 hover:ring-2 hover:ring-primary hover:shadow-glow flex flex-col"
              >
                <div className="h-12 w-12 rounded-2xl bg-gradient-primary grid place-items-center mb-5 shadow-glow">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>

                <h3 className="text-lg font-normal font-sans text-primary-glow mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-primary-glow font-sans font-normal mb-5 flex-1">
                  {s.desc}
                </p>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] uppercase tracking-wider glass rounded-full px-3 py-1 text-primary-glow">
                    {s.tag}
                  </span>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-gradient font-medium hover:opacity-80 transition"
                  >
                    View examples <ExternalLink className="h-3.5 w-3.5 text-primary" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

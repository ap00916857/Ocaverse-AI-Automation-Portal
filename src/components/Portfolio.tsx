import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/demo-saas.jpg";

const projects = [
  { img: p1, title: "Rilanek Banking", category: "Fintech · Mobile" },
  { img: p2, title: "Wanderly Travel", category: "Travel · Web" },
  { img: p3, title: "Maison Restaurant", category: "Hospitality · Web" },
  { img: p4, title: "Lumen Analytics", category: "SaaS · Dashboard" },
];

export const Portfolio = () => {
  return (
    <section id="portfolio" className="py-12 md:py-16 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
        >
          <div className="max-w-xl">
            <span className="inline-block glass rounded-full px-4 py-1 text-xs font-medium mb-3">Selected work</span>
            <h2 className="text-2xl md:text-4xl font-normal font-sans text-primary-glow">
              Recent <span className="text-gradient">case studies</span>
            </h2>
          </div>
          <p className="text-primary-glow font-sans font-normal text-sm md:text-base md:text-right max-w-sm">
            A glimpse at the brands we've helped re-imagine, redesign, and relaunch.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl overflow-hidden glass-strong block transition-all duration-300 hover:shadow-elegant hover:border-white/25"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-500" />

              <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="text-xs uppercase tracking-widest text-primary-glow mb-1 font-sans">{p.category}</div>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl md:text-2xl font-normal font-sans text-primary-glow transition-colors duration-300 group-hover:text-primary">{p.title}</h3>
                    <span className="h-10 w-10 rounded-full glass-strong grid place-items-center transition-all duration-300 group-hover:bg-gradient-primary group-hover:scale-110 group-hover:rotate-45 group-hover:shadow-[0_0_24px_-4px_hsl(var(--primary)/0.7)]">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

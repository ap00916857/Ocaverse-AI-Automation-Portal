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
    <section id="portfolio" className="py-24 md:py-32 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div className="max-w-xl">
            <span className="inline-block glass rounded-full px-4 py-1 text-xs font-medium mb-5">Selected work</span>
            <h2 className="text-3xl md:text-5xl font-bold">
              Recent <span className="text-gradient">case studies</span>
            </h2>
          </div>
          <p className="text-muted-foreground md:text-right max-w-sm">
            A glimpse at the brands we've helped re-imagine, redesign, and relaunch.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl overflow-hidden glass-strong block"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-500" />

              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <motion.div
                  initial={false}
                  className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                >
                  <div className="text-xs uppercase tracking-widest text-primary-glow mb-2">{p.category}</div>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-2xl md:text-3xl font-bold">{p.title}</h3>
                    <span className="h-10 w-10 rounded-full glass-strong grid place-items-center group-hover:bg-gradient-primary group-hover:scale-110 transition-all">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

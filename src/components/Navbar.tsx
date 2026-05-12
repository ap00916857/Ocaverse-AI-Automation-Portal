import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/ocaverse-icon.png";

const links = [
  { label: "Services", href: "#services" },
  { label: "Designs", href: "#designs" },
  { label: "Advantage", href: "#advantage" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 30));
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container">
        <div className={`glass-strong rounded-full px-5 py-3 flex items-center justify-between transition-all ${scrolled ? "shadow-elegant" : ""}`}>
          <a href="#" aria-label="OcaVerse — Own Complete Automation" className="flex items-center pl-2">
  <img
    src={logo}
    alt="OcaVerse logo"
    className="h-[52px] md:h-[60px] w-auto object-contain select-none"
    draggable={false}
  />
</a>

          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button variant="hero" size="sm" asChild>
              <a href="#contact">Get Started</a>
            </Button>
          </div>

          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-2 glass-strong rounded-2xl p-4 flex flex-col gap-3"
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm py-2 text-muted-foreground hover:text-foreground">
                {l.label}
              </a>
            ))}
            <Button variant="hero" size="sm" asChild className="mt-2">
              <a href="#contact" onClick={() => setOpen(false)}>Get Started</a>
            </Button>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

import { Github, Twitter, Linkedin, Instagram } from "lucide-react";
import logo from "@/assets/ocaverse-icon.png";

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-12 mt-12 relative">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <a href="#" aria-label="OcaVerse — Own Complete Automation" className="inline-flex items-center mb-3">
              <img
                src={logo}
                alt="OcaVerse logo"
                className="h-10 md:h-12 w-auto object-contain select-none"
                draggable={false}
              />
            </a>
            <p className="text-sm text-muted-foreground max-w-sm">
              Premium digital solutions for ambitious brands. Designed in-house, built to last.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-foreground transition">Services</a></li>
              <li><a href="#designs" className="hover:text-foreground transition">Designs</a></li>
              <li><a href="#portfolio" className="hover:text-foreground transition">Portfolio</a></li>
              <li><a href="#contact" className="hover:text-foreground transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Connect</h4>
            <div className="flex gap-2">
              {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="h-9 w-9 grid place-items-center rounded-full glass hover:bg-white/10 transition" aria-label="social">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} OcaVerse — Own Complete Automation. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

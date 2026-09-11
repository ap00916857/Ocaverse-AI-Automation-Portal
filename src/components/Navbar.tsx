import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import logo from "@/assets/ocaverse-logo.png";

const links = [
  { label: "Home", href: "/" },
  { label: "New Arrival", href: "/new-arrival", isNew: true },
  { label: "Services", href: "/services" },
  { label: "Designs", href: "/designs" },
  { label: "Advantage", href: "/advantage" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Normalize path to handle trailing slashes reliably
  const currentPath = location.pathname.replace(/\/$/, "") || "/";
  const isActive = (path: string) => {
    const targetPath = path.replace(/\/$/, "") || "/";
    if (targetPath === "/") return currentPath === "/";
    return currentPath === targetPath || currentPath.startsWith(targetPath + "/");
  };

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 30));
  }, [scrollY]);

  return (
    <>
      <style>{`
        @keyframes newArrivalPulse {
          0%, 100% {
            background-position: 0% 50%;
            filter: drop-shadow(0 0 5px rgba(0,198,167,0.55));
            opacity: 0.78;
          }
          50% {
            background-position: 100% 50%;
            filter: drop-shadow(0 0 13px rgba(14,165,233,0.95));
            opacity: 1;
          }
        }
        @keyframes dotPing {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2.5); opacity: 0; }
        }
        .new-arrival-link {
          background: linear-gradient(90deg, #00C6A7, #7C3AED, #0EA5E9, #00C6A7);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: newArrivalPulse 1.8s ease-in-out infinite;
          font-weight: 700;
          position: relative;
          padding-right: 12px;
        }
        .new-arrival-dot {
          position: absolute;
          top: -3px;
          right: 0px;
          width: 7px;
          height: 7px;
          background: #00C6A7;
          border-radius: 50%;
        }
        .new-arrival-dot::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #00C6A7;
          animation: dotPing 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>

      <motion.header
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="container">
          <div className={`glass-strong rounded-full px-5 py-3 flex items-center justify-between gap-4 transition-all ${scrolled ? "shadow-elegant" : ""}`}>
            <Link to="/" aria-label="OcaVerse — Own Complete Automation" className="flex shrink-0 items-center pl-2">
              <img
                src={logo}
                alt="OcaVerse logo"
                className="h-[56px] md:h-[72px] w-auto object-contain select-none"
                draggable={false}
              />
            </Link>

            <nav className="hidden flex-none items-center gap-5 text-sm lg:flex lg:gap-7">
              {links.map((l) => {
                const active = isActive(l.href);
                if (l.isNew) {
                  return (
                    <Link
                      key={l.href}
                      to={l.href}
                      className={`new-arrival-link relative inline-flex flex-none items-center whitespace-nowrap transition-all py-1 ${
                        active
                          ? "font-bold text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]"
                          : ""
                      }`}
                    >
                      {l.label}
                      <span className="new-arrival-dot" />
                      {active && (
                        <span className="absolute -bottom-1 left-0 right-3 h-[2px] bg-gradient-to-r from-cyan-400 to-teal-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] rounded-full" />
                      )}
                    </Link>
                  );
                }
                return (
                  <Link
                    key={l.href}
                    to={l.href}
                    className={`relative inline-flex flex-none whitespace-nowrap transition-all duration-200 py-1 ${
                      active
                        ? "text-cyan-400 font-semibold drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {l.label}
                    {active && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_rgba(34,211,238,0.8)] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden shrink-0 lg:block">
              <Link to="/contact" className={buttonVariants({ variant: "hero", size: "sm" })}>
                Get Started
              </Link>
            </div>

            <button className="p-2 lg:hidden text-slate-200 hover:text-white" onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 flex flex-col gap-2 rounded-2xl glass-strong p-4 lg:hidden border border-white/10"
            >
              {links.map((l) => {
                const active = isActive(l.href);
                if (l.isNew) {
                  return (
                    <Link
                      key={l.href}
                      to={l.href}
                      onClick={() => setOpen(false)}
                      className={`new-arrival-link text-sm py-2 px-3 rounded-xl transition-all ${
                        active
                          ? "bg-cyan-950/70 text-cyan-400 font-bold border border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.25)]"
                          : "hover:bg-white/5"
                      }`}
                    >
                      {l.label}
                      <span className="new-arrival-dot" />
                    </Link>
                  );
                }
                return (
                  <Link
                    key={l.href}
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className={`text-sm py-2 px-3 rounded-xl transition-all ${
                      active
                        ? "text-cyan-400 font-bold bg-cyan-950/70 border border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.25)]"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className={buttonVariants({ variant: "hero", size: "sm", className: "mt-2" })}
              >
                Get Started
              </Link>
            </motion.div>
          )}
        </div>
      </motion.header>
    </>
  );
};

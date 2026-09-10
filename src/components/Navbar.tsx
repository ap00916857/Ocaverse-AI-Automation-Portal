import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import logo from "@/assets/ocaverse-logo.png";

const links = [
	{ label: "New Arrival", href: "/new-arrival", isNew: true },
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
						<a href="#" aria-label="OcaVerse — Own Complete Automation" className="flex shrink-0 items-center pl-2">
              <img
                src={logo}
                alt="OcaVerse logo"
                className="h-[56px] md:h-[72px] w-auto object-contain select-none"
                draggable={false}
              />
            </a>

			<nav className="hidden flex-none items-center gap-5 text-sm text-muted-foreground lg:flex lg:gap-7">
							{links.map((l) => l.isNew ? (
								<a key={l.href} href={l.href} className="new-arrival-link inline-flex flex-none whitespace-nowrap">{l.label}<span className="new-arrival-dot" /></a>
							) : (
								<a key={l.href} href={l.href} className="inline-flex flex-none whitespace-nowrap transition-colors hover:text-foreground">{l.label}</a>
							))}
            </nav>

			<div className="hidden shrink-0 lg:block">
							<a href="#contact" className={buttonVariants({ variant: "hero", size: "sm" })}>
								Get Started
							</a>
            </div>

			<button className="p-2 lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
			  className="mt-2 flex flex-col gap-3 rounded-2xl glass-strong p-4 lg:hidden"
            >
							{links.map((l) => l.isNew ? (
								<a key={l.href} href={l.href} onClick={() => setOpen(false)} className="new-arrival-link text-sm py-2">{l.label}<span className="new-arrival-dot" /></a>
							) : (
								<a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm py-2 text-muted-foreground hover:text-foreground">{l.label}</a>
							))}
							<a
								href="#contact"
								onClick={() => setOpen(false)}
								className={buttonVariants({ variant: "hero", size: "sm", className: "mt-2" })}
							>
								Get Started
							</a>
            </motion.div>
          )}
        </div>
      </motion.header>
    </>
  );
};

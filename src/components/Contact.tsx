import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const COOLDOWN_MS = 30_000;
const COOLDOWN_KEY = "contact:lastSubmit";

export const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; details?: string }>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const last = Number(localStorage.getItem(COOLDOWN_KEY) || 0);
    const remaining = COOLDOWN_MS - (Date.now() - last);
    if (remaining > 0) {
      toast.error(`Please wait ${Math.ceil(remaining / 1000)}s before submitting again.`);
      return;
    }

    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const projectType = String(fd.get("projectType") || "").trim();
    const details = String(fd.get("details") || "").trim();

    const next: typeof errors = {};
    if (!name) next.name = "Name is required.";
    if (!email) next.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Please enter a valid email.";
    if (!details) next.details = "Message is required.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const message = projectType ? `[${projectType}] ${details}` : details;

    setSubmitting(true);
    const { error } = await (supabase as any).from("contacts").insert({ name, email, phone: phone || null, message });
    setSubmitting(false);

    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }

    localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
    form.reset();
    setErrors({});
    toast.success("Your inquiry has been submitted successfully.");
  };

  return (
    <section id="contact" className="py-12 md:py-16 relative">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block glass rounded-full px-4 py-1 text-xs font-medium mb-3">Let's talk</span>
            <h2 className="text-2xl md:text-4xl mb-3 font-normal font-sans text-primary-glow">
              Ready to build something{" "}
              <span className="text-gradient">remarkable</span>?
            </h2>
            <p className="text-sm md:text-base mb-5 max-w-md text-primary-glow font-sans font-normal">
              Tell us about your project. We'll respond within 24 hours with a tailored plan.
            </p>

            <div className="space-y-3">
              {[
                { icon: Mail, label: "hello@vougesty.com" },
                { icon: Phone, label: "+1 (555) 081-9920" },
                { icon: MapPin, label: "Remote · Worldwide" },
              ].map((c) => (
                <div key={c.label} className="group flex items-center gap-3 text-sm cursor-pointer transition-transform duration-300 hover:translate-x-1">
                  <span className="h-9 w-9 rounded-2xl bg-gradient-primary grid place-items-center shadow-glow transition-all duration-300 group-hover:scale-110 group-hover:rotate-[6deg] group-hover:shadow-[0_0_24px_-4px_hsl(var(--primary)/0.7)]">
                    <c.icon className="h-4 w-4 text-primary-foreground" />
                  </span>
                  <span className="text-primary-glow font-sans font-normal transition-colors duration-300 group-hover:text-primary">{c.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={onSubmit}
            className="glass-strong rounded-3xl p-5 md:p-6 space-y-3 shadow-elegant"
          >
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-primary-glow font-sans mb-1 block">Name</label>
                <Input name="name" maxLength={100} placeholder="Your name" aria-invalid={!!errors.name} className="bg-background/40 border-white/10 h-10 transition-all duration-300 focus:border-primary/60 focus:shadow-[0_0_18px_-6px_hsl(var(--primary)/0.6)]" />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="text-xs text-primary-glow font-sans mb-1 block">Email</label>
                <Input name="email" type="email" maxLength={255} placeholder="you@brand.com" aria-invalid={!!errors.email} className="bg-background/40 border-white/10 h-10 transition-all duration-300 focus:border-primary/60 focus:shadow-[0_0_18px_-6px_hsl(var(--primary)/0.6)]" />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
            </div>
            <div>
              <label className="text-xs text-primary-glow font-sans mb-1 block">Mobile number</label>
              <Input name="phone" type="tel" inputMode="tel" maxLength={20} pattern="[0-9+\-()\s]{7,20}" placeholder="+1 555 123 4567" className="bg-background/40 border-white/10 h-10 transition-all duration-300 focus:border-primary/60 focus:shadow-[0_0_18px_-6px_hsl(var(--primary)/0.6)]" />
            </div>
            <div>
              <label className="text-xs text-primary-glow font-sans mb-1 block">Project type</label>
              <Input name="projectType" maxLength={100} placeholder="e.g. SaaS Dashboard, E-commerce..." className="bg-background/40 border-white/10 h-10 transition-all duration-300 focus:border-primary/60 focus:shadow-[0_0_18px_-6px_hsl(var(--primary)/0.6)]" />
            </div>
            <div>
              <label className="text-xs text-primary-glow font-sans mb-1 block">Project details</label>
              <Textarea name="details" rows={4} maxLength={1800} placeholder="Tell us about your goals, timeline and budget..." aria-invalid={!!errors.details} className="bg-background/40 border-white/10 resize-none transition-all duration-300 focus:border-primary/60 focus:shadow-[0_0_18px_-6px_hsl(var(--primary)/0.6)]" />
              {errors.details && <p className="text-xs text-destructive mt-1">{errors.details}</p>}
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting}>
              {submitting ? "Sending..." : <>Send Message <Send className="h-4 w-4" /></>}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

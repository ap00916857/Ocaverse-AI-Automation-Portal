import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  Building2,
  ShoppingBag,
  UtensilsCrossed,
  Scale,
  Compass,
  LogIn,
  CreditCard,
  LayoutDashboard,
  Bell,
  MessagesSquare,
  Search,
  Sparkles,
  Minimize2,
  Palette,
  Zap,
  Check,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Option = { id: string; label: string; Icon: typeof Stethoscope; desc?: string };

const businessTypes: Option[] = [
  { id: "healthcare", label: "Healthcare", Icon: Stethoscope, desc: "Clinics & doctors" },
  { id: "realestate", label: "Real Estate", Icon: Building2, desc: "Brokers & agencies" },
  { id: "retail", label: "Retail / Shop", Icon: ShoppingBag, desc: "Stores & boutiques" },
  { id: "restaurant", label: "Restaurant", Icon: UtensilsCrossed, desc: "Food & hospitality" },
  { id: "legal", label: "Legal", Icon: Scale, desc: "Lawyers & consultants" },
  { id: "studio", label: "Studio / Agency", Icon: Compass, desc: "Architects & creatives" },
];

const features: Option[] = [
  { id: "login", label: "User Login", Icon: LogIn },
  { id: "payment", label: "Payments", Icon: CreditCard },
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { id: "notifications", label: "Notifications", Icon: Bell },
  { id: "chat", label: "Live Chat", Icon: MessagesSquare },
  { id: "seo", label: "SEO Tools", Icon: Search },
];

const styles: Option[] = [
  { id: "modern", label: "Modern", Icon: Sparkles, desc: "Bold & vibrant" },
  { id: "minimal", label: "Minimal", Icon: Minimize2, desc: "Clean & focused" },
  { id: "premium", label: "Premium", Icon: Palette, desc: "Editorial & luxe" },
  { id: "playful", label: "Playful", Icon: Zap, desc: "Energetic & fun" },
];

const steps = [
  { key: "business", title: "Business Type", subtitle: "What kind of website are we building?" },
  { key: "features", title: "Features", subtitle: "Pick everything you need (multi-select)." },
  { key: "style", title: "Design Style", subtitle: "Set the visual direction." },
] as const;

export const BuildYourWebsite = () => {
  const [step, setStep] = useState(0);
  const [business, setBusiness] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [style, setStyle] = useState<string | null>(null);

  const toggleFeature = (id: string) =>
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );

  const canNext =
    (step === 0 && !!business) ||
    (step === 1 && selectedFeatures.length > 0) ||
    (step === 2 && !!style);

  const reset = () => {
    setStep(0);
    setBusiness(null);
    setSelectedFeatures([]);
    setStyle(null);
  };

  const submit = () => {
    toast.success("Build request sent! We'll send a tailored proposal within 24 hours.");
  };

  const businessLabel = businessTypes.find((b) => b.id === business)?.label;
  const styleLabel = styles.find((s) => s.id === style)?.label;
  const featureLabels = features.filter((f) => selectedFeatures.includes(f.id));

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <section id="build" className="py-12 md:py-16 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-8"
        >
          <span className="inline-block glass rounded-full px-4 py-1 text-xs font-medium mb-3">
            Interactive builder
          </span>
          <h2 className="text-2xl md:text-4xl mb-3 font-normal font-sans text-primary-glow">
            Build Your <span className="text-gradient">Website</span>
          </h2>
          <p className="text-sm md:text-base text-primary-glow font-sans font-normal">
            Three quick steps. We'll turn your selections into a tailored proposal.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
          {/* Stepper card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-5 md:p-7 shadow-elegant"
          >
            {/* Progress */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                {steps.map((s, i) => (
                  <button
                    key={s.key}
                    onClick={() => {
                      // allow going back, or forward only if previous filled
                      if (i <= step) setStep(i);
                    }}
                    className={`flex items-center gap-2 transition-all duration-300 ${
                      i <= step ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    <span
                      className={`h-7 w-7 rounded-full grid place-items-center text-xs font-semibold transition-all duration-300 ${
                        i < step
                          ? "bg-gradient-primary text-primary-foreground shadow-glow"
                          : i === step
                          ? "bg-primary text-primary-foreground shadow-glow scale-110"
                          : "glass text-primary-glow"
                      }`}
                    >
                      {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                    </span>
                    <span className="hidden sm:inline text-xs text-primary-glow font-sans">
                      {s.title}
                    </span>
                  </button>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                Step {step + 1} / {steps.length}
              </span>
            </div>

            <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden mb-6">
              <motion.div
                className="h-full bg-gradient-primary"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>

            {/* Step header */}
            <div className="mb-5">
              <h3 className="text-lg md:text-xl font-normal font-sans text-primary-glow">
                {steps[step].title}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                {steps[step].subtitle}
              </p>
            </div>

            {/* Step content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={steps[step].key}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {businessTypes.map((b) => (
                      <SelectableCard
                        key={b.id}
                        option={b}
                        selected={business === b.id}
                        onClick={() => setBusiness(b.id)}
                      />
                    ))}
                  </div>
                )}

                {step === 1 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {features.map((f) => (
                      <SelectableCard
                        key={f.id}
                        option={f}
                        selected={selectedFeatures.includes(f.id)}
                        onClick={() => toggleFeature(f.id)}
                        multi
                      />
                    ))}
                  </div>
                )}

                {step === 2 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {styles.map((s) => (
                      <SelectableCard
                        key={s.id}
                        option={s}
                        selected={style === s.id}
                        onClick={() => setStyle(s.id)}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Nav */}
            <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/10">
              <Button
                variant="glass"
                size="sm"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>

              <button
                onClick={reset}
                className="text-xs text-muted-foreground hover:text-primary-glow inline-flex items-center gap-1.5 transition-colors duration-300"
              >
                <RotateCcw className="h-3 w-3" /> Reset
              </button>

              {step < steps.length - 1 ? (
                <Button
                  variant="hero"
                  size="sm"
                  onClick={() => canNext && setStep((s) => s + 1)}
                  disabled={!canNext}
                >
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="hero" size="sm" onClick={submit} disabled={!canNext}>
                  <Send className="h-4 w-4" /> Submit
                </Button>
              )}
            </div>
          </motion.div>

          {/* Live summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="glass-strong rounded-3xl p-5 md:p-6 shadow-elegant lg:sticky lg:top-24"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="h-8 w-8 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </span>
              <div>
                <h4 className="text-sm font-normal font-sans text-primary-glow">Your Build</h4>
                <p className="text-[11px] text-muted-foreground">Updates as you choose</p>
              </div>
            </div>

            <div className="space-y-4">
              <SummaryRow label="Business">
                {businessLabel ? (
                  <Chip>{businessLabel}</Chip>
                ) : (
                  <Empty>Not selected</Empty>
                )}
              </SummaryRow>

              <SummaryRow label={`Features${featureLabels.length ? ` (${featureLabels.length})` : ""}`}>
                {featureLabels.length ? (
                  <div className="flex flex-wrap gap-1.5">
                    <AnimatePresence>
                      {featureLabels.map((f) => (
                        <motion.div
                          key={f.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Chip>
                            <f.Icon className="h-3 w-3" />
                            {f.label}
                          </Chip>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Empty>None yet</Empty>
                )}
              </SummaryRow>

              <SummaryRow label="Style">
                {styleLabel ? <Chip>{styleLabel}</Chip> : <Empty>Not selected</Empty>}
              </SummaryRow>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Estimated scope</span>
                <span className="text-primary-glow font-semibold">
                  {estimateScope(selectedFeatures.length)}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const estimateScope = (n: number) => {
  if (n === 0) return "—";
  if (n <= 2) return "Starter · 2–3 wks";
  if (n <= 4) return "Standard · 4–6 wks";
  return "Pro · 6–8 wks";
};

const SelectableCard = ({
  option,
  selected,
  onClick,
  multi,
}: {
  option: Option;
  selected: boolean;
  onClick: () => void;
  multi?: boolean;
}) => {
  const { Icon, label, desc } = option;
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`group relative text-left rounded-2xl p-3 sm:p-4 border transition-all duration-300 overflow-hidden ${
        selected
          ? "border-primary bg-primary/10 shadow-[0_0_24px_-6px_hsl(var(--primary)/0.6)]"
          : "border-white/10 glass hover:border-white/25 hover:bg-white/5"
      }`}
    >
      {selected && (
        <motion.span
          layoutId={multi ? undefined : `selected-${label}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 h-5 w-5 rounded-full bg-gradient-primary grid place-items-center shadow-glow"
        >
          <Check className="h-3 w-3 text-primary-foreground" />
        </motion.span>
      )}
      <div
        className={`h-9 w-9 rounded-xl grid place-items-center mb-2 transition-all duration-300 ${
          selected
            ? "bg-gradient-primary shadow-glow"
            : "bg-white/5 group-hover:bg-gradient-primary group-hover:shadow-glow"
        }`}
      >
        <Icon
          className={`h-4 w-4 transition-all duration-300 ${
            selected ? "text-primary-foreground" : "text-primary-glow group-hover:text-primary-foreground group-hover:rotate-[6deg]"
          }`}
        />
      </div>
      <div className="text-sm font-normal font-sans text-primary-glow leading-tight">
        {label}
      </div>
      {desc && (
        <div className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{desc}</div>
      )}
    </motion.button>
  );
};

const SummaryRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
      {label}
    </div>
    {children}
  </div>
);

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1.5 glass rounded-full px-2.5 py-1 text-xs text-primary-glow font-sans">
    {children}
  </span>
);

const Empty = ({ children }: { children: React.ReactNode }) => (
  <span className="text-xs text-muted-foreground italic">{children}</span>
);

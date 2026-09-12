import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Layers,
  X,
  MessageSquare,
  Award,
  Zap,
  Star,
} from "lucide-react";

import customerDoctor from "@/assets/customer-doctor.jpg";
import customerRealestate from "@/assets/customer-realestate.jpg";
import demoSaas from "@/assets/demo-saas.jpg";
import customerLawyer from "@/assets/customer-lawyer.jpg";
import customerRetail from "@/assets/customer-retail.jpg";
import customerRestaurant from "@/assets/customer-restaurant.jpg";

export interface CaseStudy {
  id: string;
  title: string;
  tagline: string;
  client: string;
  category: string;
  badge: string;
  metrics: { label: string; value: string }[];
  problem: string;
  solution: string;
  results: string[];
  techStack: string[];
  img: string;
  accentColor: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "pedicare-clinic",
    title: "PediCare Clinic Management & EMR",
    tagline: "Autonomous pediatric clinic scheduling, digital prescriptions & WhatsApp patient retention",
    client: "Metro Pediatric Network (12 Clinics)",
    category: "HealthTech",
    badge: "CLINIC ACCELERATOR",
    metrics: [
      { label: "Patient Throughput", value: "+340%" },
      { label: "Missed Appointments", value: "Zero No-Shows" },
      { label: "Doctor Admin Time", value: "14h Saved/Wk" },
    ],
    problem: "Front-desk bottlenecks, 22% average patient no-shows, and fragmented paper prescriptions caused severe daily delays.",
    solution: "End-to-end cloud EMR portal with automated WhatsApp reminder cadences, bilingual patient intake bots, and instant digital prescription generation.",
    results: [
      "No-show rate dropped from 22% to under 1.8% in first 45 days",
      "Over 4,800 appointments booked autonomously via WhatsApp bot",
      "Saved clinical staff 14+ hours every week in routine calls"
    ],
    techStack: ["Next.js", "Meta Cloud API", "FastAPI", "PostgreSQL", "HIPAA Vault"],
    img: customerDoctor,
    accentColor: "from-cyan-500 to-blue-600",
  },
  {
    id: "lead-radar",
    title: "Omni-Channel AI Lead Radar",
    tagline: "24/7 algorithmic qualification, CRM enrichment & instant sales pipeline routing",
    client: "Apex Prime Real Estate & Commercial Advisory",
    category: "Sales & CRM",
    badge: "PIPELINE ENGINE",
    metrics: [
      { label: "Verified Pipeline", value: "₹4.2 Cr" },
      { label: "Lead Conversion", value: "4.8x Uplift" },
      { label: "Response Speed", value: "< 45s SLA" },
    ],
    problem: "Inbound property inquiries had a 4-hour delay, resulting in 60% of high-intent leads going cold or choosing competing brokerages.",
    solution: "High-speed automated lead radar scraping, scoring, and WhatsApp engagement engine that instantly qualifies buyer budgets and schedules agent callbacks within 45 seconds.",
    results: [
      "₹4.2 Cr in attributable deal pipeline closed within 90 days",
      "4.8x conversion increase compared to traditional manual follow-ups",
      "100% round-robin agent distribution without lead leakage"
    ],
    techStack: ["Gemini 2.5", "Supabase", "Webhook Dispatch", "Tailwind CSS", "Twilio API"],
    img: customerRealestate,
    accentColor: "from-emerald-500 to-teal-600",
  },
  {
    id: "omni-whatsapp-bot",
    title: "Omni-Bot: Conversational WhatsApp Assistant",
    tagline: "Natural-language AI booking bot with calendar sync & instant payment collection",
    client: "MedSpa Collective & Premium Wellness Centers",
    category: "AI Chat & Booking",
    badge: "24/7 AI AGENT",
    metrics: [
      { label: "Self-Service Bookings", value: "88% Ratio" },
      { label: "Weekend Appointments", value: "+160% Bump" },
      { label: "First-Month Added ROI", value: "₹18.5 Lakh" },
    ],
    problem: "High abandonment rate for appointments after 7 PM and over weekends when reception staff was offline.",
    solution: "Context-aware conversational AI assistant that operates 24/7 on WhatsApp, handles FAQs, checks live therapist availability, and confirms bookings with automated reminders.",
    results: [
      "88% of standard bookings now handled completely without human intervention",
      "Captured ₹18.5 Lakh in previously lost after-hours appointment revenue",
      "Customer satisfaction rating achieved 4.9/5 across 1,200+ chats"
    ],
    techStack: ["Meta Cloud API", "LangChain", "Stripe API", "Google Calendar Sync", "Edge CDN"],
    img: demoSaas,
    accentColor: "from-purple-500 to-indigo-600",
  },
  {
    id: "lexilaw-ai",
    title: "LexiLaw: AI Document Intelligence",
    tagline: "Contract due-diligence, clause extraction & automated client onboarding vault",
    client: "Vanguard Corporate Legal Consultants",
    category: "LegalTech",
    badge: "ENTERPRISE INTELLIGENCE",
    metrics: [
      { label: "Due Diligence Time", value: "75% Faster" },
      { label: "Clause Extraction", value: "99.2% Accuracy" },
      { label: "Monthly Time Saved", value: "160+ Hours" },
    ],
    problem: "Associates spent hundreds of billable hours manually reviewing 80+ page commercial lease agreements and M&A disclosures.",
    solution: "Private enterprise LLM pipeline that extracts key indemnity liabilities, highlights non-standard clauses, and compiles instant executive briefing memos.",
    results: [
      "Contract turnaround cut from 4 business days to under 3 hours",
      "160+ associate hours saved per month, reallocated to high-value client advisory",
      "Zero compliance omissions across 340+ processed enterprise contracts"
    ],
    techStack: ["Python", "Gemini Pro Vision", "Postgres Vector", "Next.js", "AES-256 Vault"],
    img: customerLawyer,
    accentColor: "from-amber-500 to-orange-600",
  },
  {
    id: "aura-luxe",
    title: "Aura Luxe: 3D Immersive Brand Platform",
    tagline: "Interactive 3D WebGL product customizer with edge-rendered headless commerce",
    client: "Aura Haute Horlogerie & D2C Luxury",
    category: "Next-Gen Commerce",
    badge: "FLAGSHIP EXPERIENCE",
    metrics: [
      { label: "Avg Session Duration", value: "+220% Lift" },
      { label: "Checkout Conversion", value: "64% Increase" },
      { label: "Global LCP Speed", value: "0.6s Edge" },
    ],
    problem: "Standard flat e-commerce storefront failed to convey luxury craftsmanship, resulting in high bounce rates for high-ticket items.",
    solution: "Ultra-fast WebGL 3D configurator allowing clients to inspect materials, customize dials, and experience real-time ray-traced lighting on any mobile device.",
    results: [
      "Average user engagement time surged from 1m 15s to 4m 02s",
      "Cart checkout conversion increased by 64% in the first quarter",
      "Featured across design awards for benchmark performance"
    ],
    techStack: ["Three.js", "WebGL", "Tailwind CSS", "Shopify Storefront API", "Vercel Edge"],
    img: customerRetail,
    accentColor: "from-rose-500 to-pink-600",
  },
  {
    id: "urbandine-iq",
    title: "UrbanDine: Table & Order Intelligence",
    tagline: "Dynamic QR menu ordering, kitchen queue balancer & automated loyalty retention",
    client: "Urban Plate Hospitality Group (8 Outlets)",
    category: "Hospitality",
    badge: "SMART HOSPITALITY",
    metrics: [
      { label: "Order Volume", value: "+38% Growth" },
      { label: "Table Turnover", value: "22m Faster" },
      { label: "Repeat Customers", value: "3.2x Uplift" },
    ],
    problem: "Peak dining rush hours caused order bottlenecks, order errors, and lost re-order opportunities for drinks and desserts.",
    solution: "Sub-second QR digital ordering system synced directly to kitchen display systems (KDS) with personalized WhatsApp re-engagement offers for diners.",
    results: [
      "Table turnover speed increased by 22 minutes during peak hours",
      "Average check size grew by 24% due to automated upselling suggestions",
      "Generated ₹6.5 Lakh in automated repeat visits via WhatsApp loyalty vouchers"
    ],
    techStack: ["React 18", "Supabase Realtime", "WhatsApp Business API", "Node.js", "PWA"],
    img: customerRestaurant,
    accentColor: "from-cyan-500 to-emerald-600",
  },
];

export const ACCELERATOR_STATS = [
  { label: "Pipeline & Revenue Enabled", value: "₹25Cr+", icon: TrendingUp },
  { label: "Enterprise Automations Deployed", value: "45+", icon: Zap },
  { label: "Autonomous Workflow Uptime", value: "99.8%", icon: ShieldCheck },
  { label: "Avg Time-to-Deployment", value: "< 3 Wks", icon: Clock },
];

export const TESTIMONIALS = [
  {
    quote: "OcaVerse completely modernized our pediatric practice. We moved from chaotic paper charts and missed calls to a streamlined WhatsApp booking system that handles 90% of requests automatically. Our no-show rate plummeted to near zero.",
    author: "Dr. Arvind Swaminathan",
    role: "Founding Director",
    company: "Metro Pediatric Network",
    metric: "+340% Throughput",
    avatar: "AS",
  },
  {
    quote: "The AI Lead Radar engine is pure magic. It connects with prospects within 45 seconds of their inquiry and qualifies their budget before handing off to our senior brokers. It has closed over ₹4.2 Cr in verified deals for us.",
    author: "Vikramaditya Mehta",
    role: "Managing Partner",
    company: "Apex Prime Real Estate",
    metric: "₹4.2 Cr Pipeline",
    avatar: "VM",
  },
  {
    quote: "Our front desk was constantly overwhelmed by appointment inquiries and cancellations. OcaVerse's WhatsApp agent handles 88% of requests autonomously 24/7. It paid for itself in less than two weeks.",
    author: "Ritika Sharma",
    role: "Head of Operations",
    company: "MedSpa Collective",
    metric: "88% Autonomous",
    avatar: "RS",
  },
  {
    quote: "Speed, elegance, and enterprise-grade reliability. The table reservation engine and automated loyalty system added a 38% increase in order volume across all 8 of our restaurant outlets.",
    author: "Ananya Sen",
    role: "Chief Operating Officer",
    company: "Urban Plate Hospitality",
    metric: "+38% Volume",
    avatar: "AS",
  },
];

export const Portfolio = ({ showFullHeader = false }: { showFullHeader?: boolean }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveStudy(null);
    };
    if (activeStudy) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeStudy]);

  const categories = ["All", "HealthTech", "Sales & CRM", "AI Chat & Booking", "LegalTech", "Next-Gen Commerce", "Hospitality"];

  const filteredStudies = selectedCategory === "All"
    ? CASE_STUDIES
    : CASE_STUDIES.filter((s) => s.category === selectedCategory);

  return (
    <section id="portfolio" className="py-12 md:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 bg-slate-900/90 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)] text-cyan-300">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span className="tracking-wide">STARTUP ACCELERATOR PORTFOLIO</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            High-Impact <span className="text-cyan-400">Ventures & Case Studies</span>
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Real enterprise automation, proprietary AI agents, and bespoke digital platforms engineered to scale conversion, operations, and revenue.
          </p>
        </motion.div>

        {/* Accelerator Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14"
        >
          {ACCELERATOR_STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl p-5 bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 backdrop-blur-md shadow-card flex items-center gap-4 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105"
                  : "bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filteredStudies.map((study, idx) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="group rounded-3xl overflow-hidden bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 backdrop-blur-md transition-all duration-300 flex flex-col shadow-card hover:shadow-elegant hover:-translate-y-1.5"
            >
              {/* Image & Overlay */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={study.img}
                  alt={study.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-950/85 text-cyan-300 border border-cyan-400/40 backdrop-blur-md">
                    {study.badge}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-black/60 text-slate-300 border border-slate-800 backdrop-blur-md">
                    {study.category}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="text-xs text-cyan-400 font-semibold mb-1">
                  {study.client}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {study.title}
                </h3>
                <p className="text-sm text-slate-300 line-clamp-2 mb-5 leading-relaxed">
                  {study.tagline}
                </p>

                {/* Key Metrics Highlight Grid */}
                <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-slate-950/60 border border-slate-800 mb-5">
                  {study.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="text-center">
                      <div className="text-xs sm:text-sm font-extrabold text-cyan-400 truncate">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate font-medium">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {study.techStack.slice(0, 3).map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                  {study.techStack.length > 3 && (
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-900/60 text-slate-400">
                      +{study.techStack.length - 3}
                    </span>
                  )}
                </div>

                {/* Card Footer Action */}
                <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setActiveStudy(study)}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>View Architecture & Results</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`https://wa.me/918796363097?text=Hi%20OcaVerse!%20I%20am%20interested%20in%20a%20solution%20like%20${encodeURIComponent(study.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-slate-900 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 flex items-center justify-center border border-slate-800 transition-colors"
                    title="Inquire on WhatsApp"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Startup Accelerator Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              FOUNDER & EXECUTIVE ENDORSEMENTS
            </span>
            <h3 className="text-2xl md:text-4xl font-extrabold text-white">
              Trusted by High-Velocity Operators
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((test, idx) => (
              <div
                key={idx}
                className="rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 backdrop-blur-md relative flex flex-col justify-between shadow-card"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      {test.metric}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-slate-300 italic leading-relaxed mb-6">
                    "{test.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950 font-extrabold flex items-center justify-center text-sm shadow-md">
                    {test.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{test.author}</h4>
                    <p className="text-xs text-slate-400">
                      {test.role}, <span className="text-cyan-400">{test.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* High-Converting Final CTA Strip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 md:p-12 bg-slate-900/80 border border-slate-800 text-center relative overflow-hidden shadow-card backdrop-blur-md"
        >
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              <Zap className="w-3 h-3" />
              ACCELERATE YOUR ROADMAP
            </span>
            <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Ready to Build Your Custom AI Engine or Platform?
            </h3>
            <p className="text-sm md:text-base text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed">
              We design, test, and deploy customized automation software and high-converting web experiences in under 3 weeks.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:opacity-95 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all hover:scale-105"
              >
                Schedule Architecture Call →
              </Link>
              <a
                href="https://wa.me/918796363097?text=Hi%20OcaVerse!%20I%20want%20to%20build%20a%20custom%20software%20solution"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full font-semibold text-sm border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/10 transition-all hover:scale-105"
              >
                💬 Chat with Lead Architect
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {activeStudy && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setActiveStudy(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-3xl bg-slate-950 border border-slate-800 shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden text-white my-8"
            >
              {/* Modal Header */}
              <div className="relative p-6 sm:p-8 bg-gradient-to-r from-slate-900 to-slate-950 border-b border-slate-800">
                <button
                  onClick={() => setActiveStudy(null)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center border border-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                    {activeStudy.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {activeStudy.category} • {activeStudy.client}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  {activeStudy.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                  {activeStudy.tagline}
                </p>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
                {/* 3 Big Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  {activeStudy.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center"
                    >
                      <div className="text-lg sm:text-2xl font-black text-cyan-400">
                        {m.value}
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Problem & Solution */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/20">
                    <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">
                      The Operational Bottleneck
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {activeStudy.problem}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                      The OcaVerse Solution
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {activeStudy.solution}
                    </p>
                  </div>
                </div>

                {/* Key Outcomes */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Quantified Results & Outcomes
                  </h4>
                  <ul className="space-y-2">
                    {activeStudy.results.map((res, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                    Production Architecture Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeStudy.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-slate-900/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-slate-400">
                  Ready to deploy a similar architecture for your organization?
                </span>
                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/918796363097?text=Hi%20OcaVerse!%20Let's%20discuss%20building%20a%20solution%20like%20${encodeURIComponent(activeStudy.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-full text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors flex items-center gap-1.5 shadow-md"
                  >
                    <span>Discuss on WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setActiveStudy(null)}
                    className="px-4 py-2 rounded-full text-xs font-medium bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

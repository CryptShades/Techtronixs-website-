import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Sparkles, Zap, Globe, ChevronRight,
  Shield, Cloud, TrendingUp, Users, Award,
  Star, CheckCircle2, BookOpen, Calendar, Brain, ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import ServiceCard from "@/components/ServiceCard";
import MainLayout from "@/layouts/MainLayout";
import PageMeta from "@/components/PageMeta";
import { useCountUp } from "@/hooks/useCountUp";
import products from "@/data/products.json";
import services from "@/data/services.json";

/* ── Animation variants ───────────────────────────────── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.4, 0.25, 1] as [number,number,number,number] },
  },
};
const gridStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const gridItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as [number,number,number,number] } },
};

/* ── Data ─────────────────────────────────────────────── */
const techPartners = [
  { name: "Cisco",     style: "text-blue-600  dark:text-blue-400"    },
  { name: "Microsoft", style: "text-sky-600   dark:text-sky-400"     },
  { name: "HPE",       style: "text-green-600 dark:text-green-400"   },
  { name: "Dell",      style: "text-foreground"                       },
  { name: "VMware",    style: "text-orange-600 dark:text-orange-400" },
  { name: "NetApp",    style: "text-blue-500  dark:text-blue-300"    },
];

const features = [
  { icon: Brain,  title: "Expert-Led Assessment",      desc: "360° IT evaluation by experienced professionals — we assess your full landscape before recommending anything. No assumptions, no vendor bias." },
  { icon: Users,  title: "Dedicated Technical Teams",  desc: "Skilled technical experts assigned to every engagement. You get real specialists, not junior consultants or subcontractors passed off as seniors." },
  { icon: Shield, title: "Strong Governance",          desc: "High compliance and quality control standards embedded into every solution — aligning your IT operations with industry and regulatory requirements." },
  { icon: Zap,    title: "Flexible Engagement Models", desc: "Tailored models based on your business needs — from fully outsourced managed services to co-managed augmentation of your existing team." },
  { icon: Globe,  title: "Reliable 24×7 Support",      desc: "Always-on service desk with PAN India operations. We resolve incidents fast — day, night, or weekend — under defined SLA commitments." },
];

const testimonials = [
  {
    name: "Rajesh Sharma",
    role: "IT Director",
    company: "Nexus Manufacturing Ltd.",
    quote: "Techtronix transformed our on-premise chaos into a structured hybrid environment. Our system downtime dropped to near zero within three months of engagement. Exceptional team.",
    metric: "99.9% uptime achieved",
    stars: 5,
  },
  {
    name: "Priya Mehta",
    role: "CTO",
    company: "FinBridge Financial Services",
    quote: "Their cybersecurity team identified 14 critical vulnerabilities our previous vendor had missed. The remediation was fast and thorough — our compliance audit passed without a single finding.",
    metric: "14 vulnerabilities resolved",
    stars: 5,
  },
  {
    name: "Arjun Kapoor",
    role: "VP – Infrastructure",
    company: "LogiPath Supply Chain",
    quote: "We migrated 300+ users and 40TB of data to the cloud in under six weeks with zero data loss. The Techtronix team managed every detail, from planning to post-go-live support.",
    metric: "40TB migrated, 0 data loss",
    stars: 5,
  },
];

const caseStudies = [
  {
    client: "Nexus Manufacturing",
    industry: "Manufacturing",
    result: "99.9% infrastructure uptime",
    detail: "Hybrid IT redesign consolidating 6 legacy servers into a high-availability virtualised cluster with automated failover.",
    color: "from-sky-400/15 to-primary/10",
  },
  {
    client: "FinBridge Financial",
    industry: "BFSI",
    result: "ISO 27001 compliance achieved",
    detail: "End-to-end cybersecurity overhaul — VAPT, SIEM deployment, and 24×7 SOC coverage for a 500-user financial services firm.",
    color: "from-violet-400/15 to-primary/10",
  },
  {
    client: "LogiPath Supply Chain",
    industry: "Logistics",
    result: "300 users migrated in 6 weeks",
    detail: "Full cloud migration to Microsoft Azure with zero downtime, modern collaboration stack, and managed support post-launch.",
    color: "from-emerald-400/15 to-primary/10",
  },
];

const insights = [
  {
    tag: "Cloud",
    title: "Why Indian Enterprises Are Moving to Hybrid Cloud in 2025",
    read: "5 min read",
    color: "bg-sky-400/10 text-sky-700 dark:text-sky-300",
  },
  {
    tag: "Cybersecurity",
    title: "The Hidden Vulnerabilities in Your On-Premise Network",
    read: "6 min read",
    color: "bg-violet-400/10 text-violet-700 dark:text-violet-300",
  },
  {
    tag: "Managed Services",
    title: "How a 24×7 IT Service Desk Cuts Support Costs by 40%",
    read: "4 min read",
    color: "bg-emerald-400/10 text-emerald-700 dark:text-emerald-300",
  },
];

const homeFaqs = [
  {
    q: "What is Techtronix Solutions?",
    a: "Techtronix Solutions is an IT infrastructure and managed services company headquartered in New Delhi, India. We deliver end-to-end IT services — cloud, cybersecurity, hybrid IT, data center, and 24×7 managed support — for enterprises across PAN India.",
  },
  {
    q: "Where does Techtronix operate?",
    a: "Techtronix is headquartered in Uttam Nagar, New Delhi, with sales and support presence across major metros including Mumbai, Bengaluru, Hyderabad, and Chennai — providing full PAN India IT support coverage.",
  },
  {
    q: "What makes Techtronix different from other IT companies?",
    a: "Techtronix offers a single point of accountability across the full IT lifecycle — from assessment and deployment to ongoing managed services. We combine multi-OEM certifications, dedicated technical teams, 24×7 support, and transparent governance to deliver measurable business outcomes.",
  },
  {
    q: "How quickly can Techtronix respond to IT incidents?",
    a: "Our 24×7 Managed IT Service Desk provides SLA-backed incident response — typically within 15 minutes for critical issues. We operate round-the-clock, including weekends and public holidays, across all supported client environments.",
  },
  {
    q: "Does Techtronix provide cybersecurity services?",
    a: "Yes. Techtronix provides comprehensive cybersecurity services including Vulnerability Assessment & Penetration Testing (VAPT), SIEM deployment, firewall management, compliance advisory, and 24×7 Security Operations Centre (SOC) monitoring.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": homeFaqs.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a },
  })),
};

const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://techtronixsolutions.com/#organization",
  "name": "Techtronix Solutions",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "3",
    "bestRating": "5",
    "worstRating": "1",
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Rajesh Sharma" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "Techtronix transformed our on-premise chaos into a structured hybrid environment. Our system downtime dropped to near zero within three months of engagement. Exceptional team.",
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Priya Mehta" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "Their cybersecurity team identified 14 critical vulnerabilities our previous vendor had missed. The remediation was fast and thorough — our compliance audit passed without a single finding.",
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Arjun Kapoor" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "We migrated 300+ users and 40TB of data to the cloud in under six weeks with zero data loss. The Techtronix team managed every detail, from planning to post-go-live support.",
    },
  ],
};

/* ── Stat counter card ────────────────────────────────── */
interface StatCardProps {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
}
const StatCard = ({ target, prefix = "", suffix = "", label, sublabel, icon: Icon }: StatCardProps) => {
  const { count, ref } = useCountUp(target);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center group">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <p className="text-4xl md:text-5xl font-display font-bold gradient-text mb-1 tabular-nums">
        {prefix}{count}{suffix}
      </p>
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>
    </div>
  );
};

/* ── Page ─────────────────────────────────────────────── */
const Landing = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroY       = useTransform(scrollYProgress, [0, 1],    ["0%", "18%"]);

  return (
    <MainLayout>
      <PageMeta
        title="IT Infrastructure & Managed Services Company in India | Techtronix Solutions"
        description="Techtronix Solutions delivers cloud, cybersecurity, hybrid IT, and managed services with PAN India support. Scalable, secure, and enterprise-ready IT solutions."
        canonical="/"
        ogImage="https://techtronixsolutions.com/og-home.png"
        keywords="IT infrastructure company India, managed IT services Delhi, cloud solutions India, cybersecurity services PAN India, hybrid IT solutions, 24x7 IT support India"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }} />

      {/* ── Hero ──────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="blob blob-xl absolute top-1/4 -left-40 w-[580px] h-[580px] rounded-full bg-primary/12 blur-[110px] animate-float dark:bg-primary/8" />
          <div className="blob blob-lg absolute bottom-1/4 -right-36 w-[480px] h-[480px] rounded-full bg-accent/18 blur-[90px] animate-float-alt dark:bg-accent/10" />
          <div className="blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] rounded-full bg-primary/4 blur-[130px]" />
        </motion.div>

        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.055]"
          style={{ backgroundImage: "radial-gradient(circle, hsl(15 35% 23%) 1px, transparent 1px)", backgroundSize: "48px 48px" }}
        />

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative w-full container mx-auto px-4 py-28 md:py-44">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — copy */}
            <motion.div variants={stagger} initial="hidden" animate="show">
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 text-sm font-medium text-foreground mb-8 backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
                  PAN India IT Solutions & Support
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-5xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight text-foreground leading-[1.05] mb-6"
              >
                Transforming Businesses with{" "}
                <span className="gradient-text">Smart IT</span>
                {" "}Infrastructure
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
                We design, deploy, and manage scalable IT ecosystems that enhance performance, security, and business growth in a digital-first world.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start gap-4">
                <Button asChild className="rounded-2xl px-8 h-13 text-base font-semibold gradient-peach border-0 text-secondary-foreground hover:opacity-90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
                  <Link to="/contact">Get a Free Consultation <ArrowRight className="h-4 w-4 ml-2" /></Link>
                </Button>
                <Button asChild variant="outline" className="rounded-2xl px-8 h-13 text-base font-semibold hover:-translate-y-0.5 transition-transform">
                  <Link to="/services">Explore Our Solutions <ChevronRight className="h-4 w-4 ml-1" /></Link>
                </Button>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
                {[
                  { icon: Shield, label: "Multi-Vendor Certified" },
                  { icon: Zap,    label: "24×7 Service Desk" },
                  { icon: Globe,  label: "PAN India Support" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                    <span className="hidden sm:inline text-xs">{label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — dashboard mockup */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0,  scale: 1 }}
              transition={{ duration: 0.85, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              className="hidden lg:block"
            >
              <div className="relative rounded-3xl border border-border bg-card card-elevated p-6 overflow-hidden">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                    <div className="w-3 h-3 rounded-full bg-green-400/70" />
                  </div>
                  <div className="h-5 w-36 rounded-md bg-muted animate-shimmer" />
                  <div className="flex gap-1.5">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-6 w-6 rounded-lg bg-muted" />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Uptime SLA",       val: "99.99%" },
                    { label: "Tickets Resolved", val: "1,240"  },
                    { label: "Threat Blocks",    val: "8,600"  },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl bg-muted/60 p-3">
                      <p className="text-[10px] text-muted-foreground mb-1">{s.label}</p>
                      <p className="text-base font-bold font-display gradient-text">{s.val}</p>
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">↑ This Month</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl bg-muted/40 p-4 mb-4">
                  <p className="text-[10px] text-muted-foreground mb-3">Infrastructure Health (Last 30 Days)</p>
                  <div className="flex items-end gap-1.5 h-16">
                    {[70, 82, 75, 90, 78, 95, 88, 92, 85, 96, 91, 98].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 0.6 + i * 0.04, duration: 0.4, ease: "easeOut" }}
                        style={{ height: `${h}%`, background: `hsl(var(--primary) / ${0.3 + (h / 100) * 0.5})` } as React.CSSProperties}
                        className="flex-1 rounded-sm origin-bottom"
                      />
                    ))}
                  </div>
                </div>

                {["Patch deployed to 240 endpoints — 0 failures", "Firewall rules updated — threat surface reduced", "Daily backup verified — all 14 jobs successful"].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-border/40 last:border-0">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                    <span className="text-[11px] text-muted-foreground">{t}</span>
                    <span className="ml-auto text-[10px] text-muted-foreground/60">{i + 1}m ago</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-border mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* ── Technology Partners ────────────────────────── */}
      <section className="py-14 border-y border-border/60 bg-muted/20 overflow-hidden">
        <div className="container mx-auto px-4 mb-7">
          <p className="text-center text-xs text-muted-foreground uppercase tracking-[0.2em] font-semibold">
            Technology Partners
          </p>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex">
            <div className="flex gap-14 items-center animate-marquee flex-shrink-0">
              {[...techPartners, ...techPartners].map((p, i) => (
                <span key={i} className={`text-lg md:text-xl font-display font-black whitespace-nowrap opacity-40 hover:opacity-70 transition-opacity ${p.style}`}>
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────── */}
      <section className="py-28 md:py-36">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Why Techtronix"
            title="The IT Partner Built Around Your Outcomes"
            subtitle="We don't just install technology. We become an accountable extension of your team — with the expertise, governance, and commitment to make your IT investment pay off."
          />
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
            variants={gridStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {features.map((f) => (
              <motion.div key={f.title} variants={gridItem}>
                <div className="group relative rounded-2xl border border-border bg-card card-elevated p-7 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/8 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 border border-primary/15">
                    <f.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <AnimatedSection className="text-center mt-10">
            <p className="text-sm text-muted-foreground">
              Want the full picture?{" "}
              <Link to="/services" className="text-primary font-semibold hover:underline underline-offset-4">
                Explore all our services →
              </Link>
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-muted/25 border-y border-border/60">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto">
            <StatCard target={50}  suffix="+"  label="Enterprise Clients"    sublabel="and growing across PAN India"     icon={Users}      />
            <StatCard target={99}  suffix="%"  label="SLA Adherence Rate"    sublabel="committed service levels"         icon={TrendingUp} />
            <StatCard target={10}  suffix="+"  label="OEM Partnerships"      sublabel="multi-vendor certified expertise" icon={Award}      />
            <StatCard target={24}  suffix="/7" label="Support Desk Coverage" sublabel="always-on incident response"      icon={Globe}      />
          </div>
        </div>
      </section>

      {/* ── Services Preview ──────────────────────────── */}
      <section className="py-28 md:py-36">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="What We Do"
            title="Comprehensive IT Services, End to End"
            subtitle="From digital workplace transformation to managed cloud and security operations — one trusted partner covering your entire IT lifecycle."
          />
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={gridStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {services.slice(0, 3).map((s) => (
              <motion.div key={s.id} variants={gridItem}>
                <ServiceCard {...s} />
              </motion.div>
            ))}
          </motion.div>
          <AnimatedSection className="text-center mt-10">
            <Button asChild variant="outline" className="rounded-2xl px-6 h-11 hover:-translate-y-0.5 transition-transform">
              <Link to="/services">View All Services <ArrowRight className="h-4 w-4 ml-2" /></Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Case Studies ──────────────────────────────── */}
      <section className="py-28 md:py-36 bg-muted/25 border-y border-border/60">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Case Studies"
            title="Outcomes Our Clients Measure"
            subtitle="Real results from real engagements — we let the numbers speak."
          />
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={gridStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {caseStudies.map((c) => (
              <motion.div key={c.client} variants={gridItem}>
                <div className={`group relative rounded-2xl border border-border bg-gradient-to-br ${c.color} bg-card card-elevated p-7 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/8 transition-all duration-300 h-full`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{c.industry}</span>
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-primary/10 text-secondary font-semibold border border-primary/20">{c.result}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">{c.client}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.detail}</p>
                  <div className="mt-5 pt-4 border-t border-border/50">
                    <Link to="/contact" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline underline-offset-4">
                      Start a similar project <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Products Highlight ────────────────────────── */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="blob blob-xl absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/8 blur-[110px] pointer-events-none animate-pulse-glow" />
        <div className="container mx-auto px-4 relative">
          <SectionHeading
            label="Products"
            title="Enterprise-Grade IT Products"
            subtitle="Sourced from the world's leading OEMs — servers, storage, networking, and backup solutions built for enterprise scale."
          />
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={gridStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {products.slice(0, 3).map((p) => (
              <motion.div key={p.id} variants={gridItem}>
                <ProductCard {...p} />
              </motion.div>
            ))}
          </motion.div>
          <AnimatedSection className="text-center mt-10">
            <Button asChild variant="outline" className="rounded-2xl px-6 h-11 hover:-translate-y-0.5 transition-transform">
              <Link to="/products">Browse All Products <ArrowRight className="h-4 w-4 ml-2" /></Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────── */}
      <section className="py-28 md:py-36 bg-muted/25 border-y border-border/60">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Client Testimonials"
            title="What Our Clients Say"
            subtitle="Feedback from IT leaders and business heads who rely on Techtronix every day."
          />
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={gridStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={gridItem}>
                <div className="rounded-2xl border border-border bg-card card-elevated p-8 h-full flex flex-col justify-between hover:border-primary/30 hover:shadow-xl hover:shadow-primary/6 transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-1">
                        {Array.from({ length: t.stars }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                        {t.metric}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm italic">&ldquo;{t.quote}&rdquo;</p>
                  </div>
                  <div className="flex items-center gap-3 mt-6 pt-5 border-t border-border/60">
                    <div className="w-10 h-10 rounded-full gradient-peach flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-secondary-foreground">{t.name.split(" ").map(n => n[0]).join("")}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Insights / Blog scaffold ──────────────────── */}
      <section className="py-28 md:py-36">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Insights"
            title="IT Perspectives from Our Experts"
            subtitle="Practical thinking on infrastructure, security, and IT operations from the Techtronix team."
          />
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={gridStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {insights.map((a) => (
              <motion.div key={a.title} variants={gridItem}>
                <div className="group rounded-2xl border border-border bg-card card-elevated p-7 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/8 transition-all duration-300 h-full flex flex-col">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg w-fit mb-4 ${a.color}`}>{a.tag}</span>
                  <h3 className="font-display font-semibold text-foreground leading-snug mb-auto group-hover:text-primary transition-colors duration-200">
                    {a.title}
                  </h3>
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <BookOpen className="h-3.5 w-3.5" />
                      {a.read}
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-muted/25 border-y border-border/60">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="FAQ"
            title="Common Questions Answered"
            subtitle="Everything you need to know about Techtronix Solutions and how we work."
          />
          <div className="max-w-3xl mx-auto space-y-3">
            {homeFaqs.map((faq, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.04}>
                <div className="rounded-2xl border border-border bg-card card-elevated overflow-hidden hover:border-primary/30 transition-colors duration-300">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset outline-none"
                    aria-expanded={openFaq === idx}
                  >
                    <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-200 pr-4 text-sm leading-relaxed">
                      {faq.q}
                    </h3>
                    <motion.div
                      animate={{ rotate: openFaq === idx ? 180 : 0 }}
                      transition={{ duration: 0.28, ease: [0.25, 0.4, 0.25, 1] as [number,number,number,number] }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === idx && (
                      <motion.div
                        key="faq-body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.25, 0.4, 0.25, 1] as [number,number,number,number] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 pt-4 text-sm text-muted-foreground leading-relaxed border-t border-border/60">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4">
        <div className="container mx-auto">
          <AnimatedSection>
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 cta-gradient opacity-90" />
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-3xl animate-pulse-glow pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-secondary/15 blur-3xl animate-pulse-glow pointer-events-none" style={{ animationDelay: "2s" }} />
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{ backgroundImage: "radial-gradient(circle, hsl(15 35% 23%) 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }}
              />
              <div className="relative px-10 py-20 md:px-20 md:py-28 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 border border-secondary/20 text-sm font-semibold text-secondary-foreground mb-6">
                    <Calendar className="h-3.5 w-3.5" />
                    Free IT consultation — no obligation
                  </span>
                  <h2 className="text-4xl md:text-6xl font-display font-bold text-secondary-foreground mb-5">
                    Ready to Scale Your{" "}
                    <span className="underline decoration-secondary/40 underline-offset-4">IT Infrastructure?</span>
                  </h2>
                  <p className="text-secondary-foreground/75 text-lg max-w-xl mx-auto mb-10">
                    Talk to our experts and build a future-ready IT ecosystem tailored to your business needs and growth goals.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button asChild className="rounded-2xl px-8 h-13 text-base font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90 border-0 shadow-xl">
                      <Link to="/contact">Talk to Our Experts <ArrowRight className="h-4 w-4 ml-2" /></Link>
                    </Button>
                    <Button asChild variant="outline" className="rounded-2xl px-8 h-13 text-base font-semibold border-secondary/30 text-secondary-foreground bg-transparent hover:bg-secondary/10">
                      <Link to="/services">View Our Services</Link>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </MainLayout>
  );
};

export default Landing;

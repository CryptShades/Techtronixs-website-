import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, CheckCircle2, ArrowRight,
  Search, Map, Zap, Rocket,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import MainLayout from "@/layouts/MainLayout";
import PageMeta from "@/components/PageMeta";
import FAQAccordion from "@/components/shared/FAQAccordion";
import servicesData from "@/data/services.json";
import faqsData from "@/data/faqs.json";

const processSteps = [
  { step: "01", icon: Search, title: "Discovery",  desc: "We deep-dive into your business, existing systems, and technical constraints to understand the full landscape — no assumptions." },
  { step: "02", icon: Map,    title: "Strategy",   desc: "We design a tailored delivery roadmap with clear milestones, tech choices justified in plain English, and honest timeline estimates." },
  { step: "03", icon: Zap,    title: "Execution",  desc: "Our engineers work in weekly sprints with daily standups. You see working software every cycle — never a 6-week black box." },
  { step: "04", icon: Rocket, title: "Delivery",   desc: "We launch into production with you. Post-launch, we monitor performance and remain on-call for the critical first 30 days." },
];

/* ── Schema ───────────────────────────────────────────── */
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Techtronix Solutions IT Services",
  "url": "https://techtronixsolutions.com/services",
  "description": "End-to-end IT services by Techtronix Solutions — cloud, cybersecurity, hybrid IT, data center, and 24×7 managed IT support across PAN India.",
  "itemListElement": servicesData.map((s, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "item": {
      "@type": "Service",
      "name": s.title,
      "description": s.description,
      "provider": { "@type": "Organization", "name": "Techtronix Solutions", "url": "https://techtronixsolutions.com" },
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home",       "item": "https://techtronixsolutions.com/" },
    { "@type": "ListItem", "position": 2, "name": "IT Services", "item": "https://techtronixsolutions.com/services" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqsData.services.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a },
  })),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How Techtronix Delivers IT Services in India",
  "description": "Techtronix Solutions follows a structured 4-step delivery process for all IT services — from Discovery through Strategy, Execution, and final Delivery with post-launch support.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Discovery",
      "text": "We deep-dive into your business, existing systems, and technical constraints to understand the full landscape — no assumptions.",
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Strategy",
      "text": "We design a tailored delivery roadmap with clear milestones, tech choices justified in plain English, and honest timeline estimates.",
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Execution",
      "text": "Our engineers work in weekly sprints with daily standups. You see working results every cycle — never a 6-week black box.",
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Delivery",
      "text": "We launch into production with you. Post-launch, we monitor performance and remain on-call for the critical first 30 days.",
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "IT Services in India — Cloud, Cybersecurity & Managed IT | Techtronix Solutions",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".speakable"],
  },
  "url": "https://techtronixsolutions.com/services",
};

/* ── Animations ───────────────────────────────────────── */
const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];
const gridStagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const gridItem = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } } };

const Services = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <MainLayout>
      <PageMeta
        title="IT Services in India — Cloud, Cybersecurity & Managed IT | Techtronix Solutions"
        description="Comprehensive IT services for Indian enterprises — cloud solutions, cybersecurity, hybrid IT infrastructure, data center services, and 24×7 managed IT support across PAN India."
        canonical="/services"
        ogImage="https://techtronixsolutions.com/og-services.png"
        keywords="managed IT services India, cloud solutions Delhi, cybersecurity services India, hybrid IT infrastructure Delhi NCR, data center services New Delhi, IT support PAN India"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative py-28 md:py-40 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob blob-xl absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-[95px] animate-float-alt dark:bg-primary/6" />
          <div className="blob blob-lg absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-accent/14 blur-[75px] animate-float dark:bg-accent/8" />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 text-sm font-medium text-foreground mb-8"
          >
            <Zap className="h-3.5 w-3.5 text-primary" />
            {servicesData.length} specialist IT service areas
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tight text-foreground mb-6"
          >
            Enterprise IT Services{" "}
            <span className="gradient-text">in India</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed speakable"
          >
            Techtronix Solutions is a New Delhi-based IT services company delivering end-to-end cloud, cybersecurity, hybrid IT infrastructure, data center, and 24×7 managed IT support — for enterprises across PAN India, from a single accountable team.
          </motion.p>
        </div>
      </section>

      {/* ── Services Grid ─────────────────────────────── */}
      <section className="pb-28">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={gridStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {servicesData.map(s => (
              <motion.div key={s.id} variants={gridItem}>
                <ServiceCard {...s} />
              </motion.div>
            ))}
          </motion.div>

          <AnimatedSection className="text-center mt-10">
            <p className="text-sm text-muted-foreground">
              Need something custom?{" "}
              <Link to="/products" className="text-primary font-semibold hover:underline underline-offset-4">
                Browse our ready-made products →
              </Link>
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Expandable Details ────────────────────────── */}
      <section className="py-28 md:py-36 bg-muted/25 border-y border-border/60">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Deep Dive"
            title="Service Details"
            subtitle="Expand any service to see exactly what we deliver, how we work, and what outcomes to expect."
          />
          <div className="max-w-3xl mx-auto space-y-3">
            {servicesData.map((s, idx) => (
              <AnimatedSection key={s.id} delay={idx * 0.04}>
                <div className="rounded-2xl border border-border bg-card card-elevated overflow-hidden hover:border-primary/30 transition-colors duration-300">
                  <button
                    onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                    className="w-full flex items-center justify-between p-6 text-left group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset outline-none"
                    aria-expanded={expanded === s.id}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-primary/60 font-display tracking-widest w-7 flex-shrink-0">
                        0{s.id}
                      </span>
                      <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                        {s.title}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: expanded === s.id ? 180 : 0 }}
                      transition={{ duration: 0.28, ease }}
                      className="flex-shrink-0 ml-4"
                    >
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {expanded === s.id && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 border-t border-border/60 pt-5">
                          <p className="text-muted-foreground text-sm mb-6 leading-relaxed speakable">{s.description}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                <div className="w-4 h-1.5 rounded gradient-peach flex-shrink-0" />
                                Key Features
                              </h4>
                              <ul className="space-y-2.5">
                                {s.features.map(f => (
                                  <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                    {f}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                <div className="w-4 h-1.5 rounded bg-secondary/30 flex-shrink-0" />
                                Our Process
                              </h4>
                              <ol className="space-y-2.5">
                                {s.process.map((p, i) => (
                                  <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                                    <span className="w-5 h-5 rounded-full bg-primary/15 text-secondary text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                                      {i + 1}
                                    </span>
                                    {p}
                                  </li>
                                ))}
                              </ol>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process / HowTo ───────────────────────────── */}
      <section className="py-28 md:py-36">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="How We Work"
            title="Our Proven Delivery Process"
            subtitle="A structured methodology that eliminates guesswork and consistently delivers on time and on spec."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {processSteps.map((s, i) => (
              <AnimatedSection key={s.step} delay={i * 0.1}>
                <div className="relative text-center group">
                  {i < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-9 left-[calc(50%+32px)] right-[calc(-50%+32px)] h-px bg-gradient-to-r from-border/80 to-transparent z-0" />
                  )}
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl gradient-peach mx-auto flex items-center justify-center mb-5 shadow-md shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 group-hover:-translate-y-1 transition-all duration-300">
                      <s.icon className="h-7 w-7 text-secondary-foreground" />
                    </div>
                    <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 translate-x-6 text-[10px] font-black text-secondary/50 font-display tracking-widest">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-16">
            <Button asChild className="rounded-2xl px-8 h-12 font-semibold gradient-peach border-0 text-secondary-foreground hover:opacity-90 shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-transform">
              <Link to="/contact">
                Start a Project <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-muted/25 border-t border-border/60">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="FAQ"
            title="Frequently Asked Questions"
            subtitle="Quick answers about our IT services, support model, and how we work."
          />
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={faqsData.services} />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Services;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Users, Shield, Zap, Globe, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import ServiceCard from "@/components/ServiceCard";
import MainLayout from "@/layouts/MainLayout";
import PageMeta from "@/components/PageMeta";
import FAQAccordion from "@/components/shared/FAQAccordion";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import InsightsSection from "@/components/sections/InsightsSection";
import CTABanner from "@/components/sections/CTABanner";
import products from "@/data/products.json";
import services from "@/data/services.json";
import featuresData from "@/data/features.json";
import partnersData from "@/data/partners.json";
import faqsData from "@/data/faqs.json";

/* ── Schema ───────────────────────────────────────────── */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqsData.home.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a },
  })),
};

const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://techtronixsolutions.com/#business",
  "name": "Techtronix Solutions",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 5,
    "reviewCount": 3,
    "bestRating": 5,
    "worstRating": 1,
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Rajesh Sharma" },
      "datePublished": "2025-01-15",
      "reviewRating": { "@type": "Rating", "ratingValue": 5, "bestRating": 5, "worstRating": 1 },
      "reviewBody": "Techtronix transformed our on-premise chaos into a structured hybrid environment. Our system downtime dropped to near zero within three months of engagement. Exceptional team.",
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Priya Mehta" },
      "datePublished": "2025-02-10",
      "reviewRating": { "@type": "Rating", "ratingValue": 5, "bestRating": 5, "worstRating": 1 },
      "reviewBody": "Their cybersecurity team identified 14 critical vulnerabilities our previous vendor had missed. The remediation was fast and thorough — our compliance audit passed without a single finding.",
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Arjun Kapoor" },
      "datePublished": "2025-03-05",
      "reviewRating": { "@type": "Rating", "ratingValue": 5, "bestRating": 5, "worstRating": 1 },
      "reviewBody": "We migrated 300+ users and 40TB of data to the cloud in under six weeks with zero data loss. The Techtronix team managed every detail, from planning to post-go-live support.",
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "IT Infrastructure & Managed Services Company in India | Techtronix Solutions",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".speakable"],
  },
  "url": "https://techtronixsolutions.com/",
};

/* ── Icon map for features ────────────────────────────── */
const iconMap: Record<string, React.ElementType> = { Brain, Users, Shield, Zap, Globe };
const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];
const gridStagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const gridItem = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } };

/* ── Page ─────────────────────────────────────────────── */
const Landing = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      {/* ── Hero ──────────────────────────────────────── */}
      <HeroSection />

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
              {[...partnersData, ...partnersData].map((p, i) => (
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
            {featuresData.map((f) => {
              const Icon = iconMap[f.icon] ?? Shield;
              return (
                <motion.div key={f.title} variants={gridItem}>
                  <div className="group relative rounded-2xl border border-border bg-card card-elevated p-7 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/8 transition-all duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 border border-primary/15">
                      <Icon className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
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
      <StatsSection />

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
      <CaseStudiesSection />

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
      <TestimonialsSection />

      {/* ── Insights / Blog scaffold ──────────────────── */}
      <InsightsSection />

      {/* ── FAQ ───────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-muted/25 border-y border-border/60">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="FAQ"
            title="Common Questions Answered"
            subtitle="Everything you need to know about Techtronix Solutions and how we work."
          />
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={faqsData.home} />
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────── */}
      <CTABanner />
    </MainLayout>
  );
};

export default Landing;

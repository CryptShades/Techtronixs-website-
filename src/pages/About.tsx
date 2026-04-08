import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, ArrowRight, Sparkles, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import FAQAccordion from "@/components/shared/FAQAccordion";
import MainLayout from "@/layouts/MainLayout";
import PageMeta from "@/components/PageMeta";
import aboutData from "@/data/about.json";
import faqsData from "@/data/faqs.json";
import { gridStagger, gridItem, ease } from "@/lib/animation";

/* ── Icon map for values ──────────────────────────────── */
const valueIcons: Record<string, React.ElementType> = { Target, Eye, Heart };

/* ── Schema ───────────────────────────────────────────── */
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home",                      "item": "https://techtronixsolutions.com/" },
    { "@type": "ListItem", "position": 2, "name": "About Techtronix Solutions", "item": "https://techtronixsolutions.com/about" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqsData.about.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a },
  })),
};

/* ── Page ─────────────────────────────────────────────── */
const About = () => (
  <MainLayout>
    <PageMeta
      title="About Techtronix Solutions — IT Company in New Delhi, India"
      description="Techtronix Solutions is a New Delhi-based IT infrastructure and managed services company. Learn about our mission, team, and commitment to PAN India IT excellence. Get a free consultation."
      canonical="/about"
      ogImage="https://techtronixsolutions.com/og-about.png"
      keywords="about Techtronix Solutions, IT company New Delhi, managed IT services India, IT infrastructure company Delhi NCR"
    />

    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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
          <Users className="h-3.5 w-3.5 text-primary" />
          PAN India IT Partner · Founded 2024
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-bold tracking-tight text-foreground mb-6"
        >
          About <span className="gradient-text">Techtronix Solutions</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
        >
          Driving innovation, efficiency, and growth through cutting-edge IT solutions. Founded in October 2024, Techtronix Solutions was built to create meaningful impact through technology — helping businesses modernize, optimize, and scale their IT ecosystems.
        </motion.p>
      </div>
    </section>

    {/* ── Story + Stats ─────────────────────────────── */}
    <section className="py-20 md:py-28 bg-muted/25 border-y border-border/60">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <span className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary/50" />
              <span className="text-sm font-semibold tracking-widest uppercase text-primary font-display">Our Story</span>
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 leading-tight">
              Born from a belief that every business deserves great IT
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              Too many Indian enterprises struggle with fragmented IT — multiple vendors, unclear accountability, and support that disappears after installation. Techtronix was founded to change that. We built a company where deep technical expertise, honest communication, and end-to-end accountability come standard.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Headquartered in New Delhi, with a sales and support presence spanning PAN India, we operate in dedicated squads — each aligned to your specific environment, industry, and business objectives. From the first assessment call to year-two managed operations, you work with the same team.
            </p>
            <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline underline-offset-4">
              See how we deliver <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="rounded-3xl bg-card card-elevated border border-border p-8 md:p-12">
              <div className="grid grid-cols-2 gap-8">
                {[
                  { num: "PAN India", label: "Support Coverage"       },
                  { num: "24×7",      label: "Service Desk"           },
                  { num: "100%",      label: "Resource Availability"  },
                  { num: "Multi-OEM", label: "Vendor Certified"       },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.45 }}
                  >
                    <p className="text-3xl md:text-4xl font-display font-bold gradient-text">{s.num}</p>
                    <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* ── Mission / Vision / Motto ───────────────────── */}
    <section className="py-28 md:py-36">
      <div className="container mx-auto px-4">
        <SectionHeading label="Purpose" title="Mission, Vision & Motto" />
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={gridStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {aboutData.values.map((item) => {
            const Icon = valueIcons[item.icon] ?? Target;
            return (
              <motion.div key={item.title} variants={gridItem}>
                <div className="group rounded-2xl border border-border bg-card card-elevated p-8 h-full hover:border-primary/40 hover:shadow-xl hover:shadow-primary/6 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 border border-primary/15 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>

    {/* ── Success DNA ───────────────────────────────── */}
    <section className="py-28 md:py-36 bg-muted/25 border-y border-border/60">
      <div className="container mx-auto px-4">
        <SectionHeading
          label="Our DNA"
          title="What Makes Us Different"
          subtitle="The principles that guide every engagement, every decision, and every client interaction."
        />
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto"
          variants={gridStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {aboutData.successDNA.map((d) => (
            <motion.div key={d.title} variants={gridItem}>
              <div className="group rounded-2xl border border-border bg-card card-elevated p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/6 transition-all duration-300 h-full">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/25 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-sm mb-1">{d.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* ── Team ──────────────────────────────────────── */}
    <section className="py-28 md:py-36">
      <div className="container mx-auto px-4">
        <SectionHeading
          label="Leadership"
          title="Built by Practitioners"
          subtitle="Our leadership team brings deep, hands-on expertise in enterprise IT delivery — not just consulting theory."
        />
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-5"
          variants={gridStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {aboutData.team.map((m) => (
            <motion.div key={m.name} variants={gridItem}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.28, ease }}
                className="group rounded-2xl border border-border bg-card card-elevated p-6 text-center hover:border-primary/40 hover:shadow-xl hover:shadow-primary/6 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${m.color} mx-auto mb-4 flex items-center justify-center border border-primary/15 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-lg font-bold text-secondary-foreground font-display">
                    {m.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground text-sm">{m.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{m.role}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* ── Timeline ──────────────────────────────────── */}
    <section className="py-28 md:py-36 bg-muted/25 border-y border-border/60">
      <div className="container mx-auto px-4">
        <SectionHeading
          label="Our Journey"
          title="From Day One to PAN India"
          subtitle="How Techtronix went from founding to a full-service IT partner in under a year."
        />
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent md:-translate-x-px" />
            {aboutData.timeline.map((t, i) => (
              <AnimatedSection key={t.year} delay={i * 0.08}>
                <div className={`relative flex items-start mb-12 pl-14 md:pl-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="absolute left-3.5 md:left-1/2 w-3.5 h-3.5 rounded-full bg-primary border-2 border-background shadow-md shadow-primary/30 md:-translate-x-[7px] mt-1.5 z-10 flex-shrink-0" />
                  <div className={`md:w-1/2 ${i % 2 === 0 ? "md:text-right md:pr-14" : "md:pl-14"}`}>
                    <span className="inline-flex items-center text-xs font-bold text-primary font-display tracking-widest bg-primary/10 px-3 py-1 rounded-full mb-2">
                      {t.year}
                    </span>
                    <h3 className="text-base font-display font-semibold text-foreground">{t.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ── About FAQ ─────────────────────────────────── */}
    <section className="py-28 md:py-36 bg-muted/25 border-t border-border/60">
      <div className="container mx-auto px-4">
        <SectionHeading
          label="FAQ"
          title="Questions About Techtronix"
          subtitle="Common questions about who we are, where we operate, and how we work."
        />
        <div className="max-w-3xl mx-auto">
          <FAQAccordion faqs={faqsData.about} />
        </div>
      </div>
    </section>

    {/* ── Closing CTA ───────────────────────────────── */}
    <section className="py-20 md:py-28 px-4">
      <div className="container mx-auto">
        <AnimatedSection>
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 cta-gradient opacity-90" />
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/10 blur-3xl animate-pulse-glow pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-secondary/15 blur-3xl animate-pulse-glow pointer-events-none" style={{ animationDelay: "2s" }} />
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle, hsl(15 35% 23%) 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }} />
            <div className="relative px-10 py-16 md:px-20 md:py-24 text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 border border-secondary/20 text-sm font-semibold text-secondary-foreground mb-5">
                <Sparkles className="h-3.5 w-3.5" />
                Let's build your future-ready IT infrastructure
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-secondary-foreground mb-4">
                Let's Start a Conversation
              </h2>
              <p className="text-secondary-foreground/75 text-lg max-w-lg mx-auto mb-8">
                No sales pitch. Just a focused conversation about your IT challenges and how we can solve them.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild className="rounded-2xl px-8 h-12 text-base font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90 border-0 shadow-xl">
                  <Link to="/contact">
                    <Calendar className="h-4 w-4 mr-2" />
                    Get a Free Consultation
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-2xl px-8 h-12 text-base font-semibold border-secondary/30 text-secondary-foreground bg-transparent hover:bg-secondary/10">
                  <Link to="/services">Explore Our Services <ArrowRight className="h-4 w-4 ml-2" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </MainLayout>
);

export default About;

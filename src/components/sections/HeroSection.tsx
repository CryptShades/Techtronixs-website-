import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Globe, ChevronRight, Shield, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CertificationBadge from "@/components/CertificationBadge";
import contentData from "@/data/content.json";

const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

const iconComponents: Record<string, React.ElementType> = { Shield, Zap, Globe };

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroY       = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const { hero, dashboard } = contentData;

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background blobs */}
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
                {hero.badge}
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

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl speakable">
              {hero.subheadline}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start gap-4">
              <Button asChild className="rounded-2xl px-8 h-13 text-base font-semibold gradient-peach border-0 text-secondary-foreground hover:opacity-90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
                <Link to="/contact">{hero.ctaPrimary} <ArrowRight className="h-4 w-4 ml-2" /></Link>
              </Button>
              <Button asChild variant="outline" className="rounded-2xl px-8 h-13 text-base font-semibold hover:-translate-y-0.5 transition-transform">
                <Link to="/services">{hero.ctaSecondary} <ChevronRight className="h-4 w-4 ml-1" /></Link>
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              {hero.trustBadges.map(({ icon, label }) => {
                const Icon = iconComponents[icon] ?? Shield;
                return (
                  <div key={label} className="flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                    <span className="hidden sm:inline text-xs">{label}</span>
                  </div>
                );
              })}
            </motion.div>

            {/* ISO Certification Badges */}
            <motion.div variants={fadeUp} className="mt-5 flex items-center gap-2.5 flex-wrap">
              <span className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-muted-foreground/50 select-none mr-0.5">Certified</span>
              <div className="w-px h-3.5 bg-border/50 flex-shrink-0" />
              <CertificationBadge variant="quality" label="ISO 9001:2015 Certified" shortLabel="ISO 9001" tooltip="Quality Management System — certified to ISO 9001:2015 standards" delay={0.55} />
              <CertificationBadge variant="security" label="ISO/IEC 27001:2022 Certified" shortLabel="ISO 27001" tooltip="Information Security Management — certified to ISO/IEC 27001:2022 standards" delay={0.65} />
            </motion.div>
          </motion.div>

          {/* Right — dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.4, ease }}
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
                {dashboard.metrics.map((s) => (
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
                  {dashboard.chartBars.map((h, i) => (
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

              {dashboard.activityLog.map((t, i) => (
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

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}>
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-border mx-auto" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

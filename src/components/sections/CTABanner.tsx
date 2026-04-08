import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";

const CTABanner = () => (
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
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
);

export default CTABanner;

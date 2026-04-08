import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export interface FAQ {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
  initialOpen?: number | null;
}

const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];

const FAQAccordion = ({ faqs, initialOpen = null }: FAQAccordionProps) => {
  const [openIdx, setOpenIdx] = useState<number | null>(initialOpen);

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => (
        <AnimatedSection key={idx} delay={idx * 0.04}>
          <div className="rounded-2xl border border-border bg-card card-elevated overflow-hidden hover:border-primary/30 transition-colors duration-300">
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full flex items-center justify-between p-6 text-left group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset outline-none"
              aria-expanded={openIdx === idx}
            >
              <span className="font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-200 pr-4 text-sm leading-relaxed">
                {faq.q}
              </span>
              <motion.div
                animate={{ rotate: openIdx === idx ? 180 : 0 }}
                transition={{ duration: 0.28, ease }}
                className="flex-shrink-0"
              >
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {openIdx === idx && (
                <motion.div
                  key="faq-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
};

export default FAQAccordion;

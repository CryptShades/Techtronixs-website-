import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import insightsData from "@/data/insights.json";

const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];
const gridStagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const gridItem = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } };

const InsightsSection = () => (
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
        {insightsData.map((a) => (
          <motion.div key={a.title} variants={gridItem}>
            <Link to={`/blog/${a.slug}`} className="group rounded-2xl border border-border bg-card card-elevated p-7 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/8 transition-all duration-300 h-full flex flex-col block">
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
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default InsightsSection;

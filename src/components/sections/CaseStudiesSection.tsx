import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import CaseStudyCard from "@/components/shared/CaseStudyCard";
import caseStudiesData from "@/data/case-studies.json";

const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];
const gridStagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const gridItem = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } };

const CaseStudiesSection = () => (
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
        {caseStudiesData.map((c) => (
          <motion.div key={c.client} variants={gridItem}>
            <CaseStudyCard study={c} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default CaseStudiesSection;

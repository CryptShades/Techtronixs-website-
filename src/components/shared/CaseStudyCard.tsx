import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface CaseStudy {
  client: string;
  industry: string;
  result: string;
  detail: string;
  color: string;
}

interface CaseStudyCardProps {
  study: CaseStudy;
}

const CaseStudyCard = ({ study: c }: CaseStudyCardProps) => (
  <div className={`group relative rounded-2xl border border-border bg-gradient-to-br ${c.color} bg-card card-elevated p-7 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/8 transition-all duration-300 h-full`}>
    <div className="flex items-center justify-between mb-4">
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{c.industry}</span>
      <span className="text-xs px-2.5 py-1 rounded-lg bg-primary/10 text-secondary font-semibold border border-primary/20">{c.result}</span>
    </div>
    <h3 className="text-xl font-display font-bold text-foreground mb-2">{c.client}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{c.detail}</p>
    <div className="mt-5 pt-4 border-t border-border/50">
      <Link
        to="/contact"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline underline-offset-4"
      >
        Start a similar project <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  </div>
);

export default CaseStudyCard;

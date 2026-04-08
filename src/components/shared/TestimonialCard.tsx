import { Star } from "lucide-react";

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  metric: string;
  stars: number;
  datePublished?: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial: t }: TestimonialCardProps) => {
  const initials = t.name.split(" ").map(n => n[0]).join("");

  return (
    <div className="rounded-2xl border border-border bg-card card-elevated p-8 h-full flex flex-col justify-between hover:border-primary/30 hover:shadow-xl hover:shadow-primary/6 transition-all duration-300">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1" aria-label={`${t.stars} out of 5 stars`}>
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
        <div
          className="w-10 h-10 rounded-full gradient-peach flex items-center justify-center flex-shrink-0"
          aria-hidden="true"
        >
          <span className="text-sm font-bold text-secondary-foreground">{initials}</span>
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm">{t.name}</p>
          <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

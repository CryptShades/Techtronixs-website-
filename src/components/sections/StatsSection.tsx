import { Users, TrendingUp, Award, Globe } from "lucide-react";
import StatCard from "@/components/shared/StatCard";
import contentData from "@/data/content.json";

const iconComponents: Record<string, React.ElementType> = { Users, TrendingUp, Award, Globe };

const StatsSection = () => (
  <section className="py-20 md:py-28 bg-muted/25 border-y border-border/60">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto">
        {contentData.stats.map((s) => {
          const Icon = iconComponents[s.icon] ?? Users;
          return (
            <StatCard
              key={s.label}
              target={s.target}
              suffix={s.suffix}
              label={s.label}
              sublabel={s.sublabel}
              icon={Icon}
            />
          );
        })}
      </div>
    </div>
  </section>
);

export default StatsSection;

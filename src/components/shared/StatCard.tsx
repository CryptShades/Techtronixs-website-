import { useCountUp } from "@/hooks/useCountUp";

interface StatCardProps {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
}

const StatCard = ({ target, prefix = "", suffix = "", label, sublabel, icon: Icon }: StatCardProps) => {
  const { count, ref } = useCountUp(target);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center group">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <p className="text-4xl md:text-5xl font-display font-bold gradient-text mb-1 tabular-nums">
        {prefix}{count}{suffix}
      </p>
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>
    </div>
  );
};

export default StatCard;

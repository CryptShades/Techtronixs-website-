import { motion } from "framer-motion";
import { Code2, CheckCircle2 } from "lucide-react";
import { iconMap } from "@/lib/icon-map";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

const ServiceCard = ({ title, description, icon, features }: ServiceCardProps) => {
  const Icon = iconMap[icon] ?? Code2;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.32, ease: [0.25, 0.4, 0.25, 1] }}
      className="group relative rounded-2xl border border-border bg-card card-elevated p-6 md:p-8 overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500 blur-2xl" />

      <div className="relative">
        <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-6 group-hover:bg-primary/25 group-hover:scale-110 transition-all duration-300 border border-primary/20">
          <Icon className="h-6 w-6 text-secondary" />
        </div>

        <h3 className="text-xl font-display font-semibold text-foreground mb-2.5">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">{description}</p>

        <ul className="space-y-2.5">
          {features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ServiceCard;

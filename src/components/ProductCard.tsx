import { motion } from "framer-motion";
import { ArrowUpRight, Server, HardDrive, ArchiveRestore, Network, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  title: string;
  brand: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  link: string;
}

const categoryGradients: Record<string, string> = {
  "Servers & Infrastructure": "from-sky-400/20    to-primary/20",
  "Storage Solutions":        "from-violet-400/20 to-primary/20",
  "Backup & Tape Solutions":  "from-amber-400/20  to-primary/20",
  "Networking Devices":       "from-emerald-400/20 to-primary/20",
};

const categoryIcons: Record<string, LucideIcon> = {
  "Servers & Infrastructure": Server,
  "Storage Solutions":        HardDrive,
  "Backup & Tape Solutions":  ArchiveRestore,
  "Networking Devices":       Network,
};

const ProductCard = ({ title, brand, description, image, tags, category, link }: ProductCardProps) => {
  const grad = categoryGradients[category] ?? "from-primary/20 to-accent/20";
  const Icon = categoryIcons[category] ?? Server;

  // Only render a real image if the path is not a generic placeholder
  const hasRealImage = image && !image.includes("placeholder");

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.32, ease: [0.25, 0.4, 0.25, 1] }}
      className="group relative rounded-2xl border border-border bg-card card-elevated overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${grad} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative p-6 md:p-8 flex flex-col min-h-[220px]">
        <div className="flex items-start justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center border border-primary/20 shadow-sm overflow-hidden">
            {hasRealImage ? (
              <img
                src={image}
                alt={`${brand} logo`}
                loading="lazy"
                className="w-8 h-8 object-contain"
              />
            ) : (
              <Icon className="w-5 h-5 text-secondary" strokeWidth={1.75} />
            )}
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-muted text-muted-foreground">{category}</span>
        </div>

        <h3 className="text-xl font-display font-semibold text-foreground mb-2.5">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed flex-1">{description}</p>

        <div className="flex items-center justify-between mt-6 pt-5 border-t border-border/60">
          <div className="flex gap-1.5 flex-wrap">
            {tags.map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-primary/10 text-secondary font-medium border border-primary/20">
                {tag}
              </span>
            ))}
          </div>
          <Link
            to={link}
            aria-label={`View ${title}`}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110 flex-shrink-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none"
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

import { motion } from "framer-motion";
import { BadgeCheck, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

interface CertificationBadgeProps {
  /** Full label shown on desktop */
  label: string;
  /** Abbreviated label shown on mobile */
  shortLabel: string;
  /** Tooltip body text */
  tooltip: string;
  /** Badge variant determines icon */
  variant: "quality" | "security";
  /** Stagger delay for entrance animation */
  delay?: number;
}

const CertificationBadge = ({
  label,
  shortLabel,
  tooltip,
  variant,
  delay = 0,
}: CertificationBadgeProps) => {
  const Icon = variant === "security" ? ShieldCheck : BadgeCheck;

  return (
    <div className="relative group">
      {/* ── Tooltip ─────────────────────────────────── */}
      <div
        role="tooltip"
        className="
          absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5
          px-3 py-2 rounded-xl
          bg-foreground/95 text-background
          text-[11px] font-medium leading-snug
          whitespace-nowrap max-w-[220px] text-center
          opacity-0 group-hover:opacity-100
          pointer-events-none
          transition-opacity duration-200
          z-50 shadow-xl shadow-black/20
          backdrop-blur-sm
        "
      >
        {tooltip}
        {/* Downward arrow */}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-foreground/95" />
      </div>

      {/* ── Badge pill ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: -4 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        transition={{
          duration: 0.45,
          delay,
          ease: [0.25, 0.4, 0.25, 1],
        }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.18, ease: "easeOut" },
        }}
      >
        <Link
          to="/about"
          aria-label={`${label} — ${tooltip}`}
          className="
            flex items-center gap-1.5
            pl-2 pr-3 py-1
            rounded-full
            bg-card dark:bg-card
            border border-border/70 dark:border-border/50
            shadow-sm shadow-black/5
            hover:shadow-md hover:shadow-primary/15
            hover:border-primary/40 hover:bg-primary/5 dark:hover:bg-primary/10
            transition-all duration-200
            cursor-pointer
            focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1
            outline-none
          "
        >
          {/* Icon bubble */}
          <span className="flex items-center justify-center w-4 h-4 rounded-full bg-primary/12 flex-shrink-0">
            <Icon className="h-2.5 w-2.5 text-primary" />
          </span>

          {/* Label — desktop */}
          <span className="hidden sm:block text-[10.5px] font-semibold text-foreground/75 tracking-wide">
            {label}
          </span>

          {/* Label — mobile (short) */}
          <span className="sm:hidden text-[10px] font-semibold text-foreground/75">
            {shortLabel}
          </span>
        </Link>
      </motion.div>
    </div>
  );
};

export default CertificationBadge;

import AnimatedSection from "./AnimatedSection";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

const SectionHeading = ({ label, title, subtitle, center = true }: SectionHeadingProps) => {
  return (
    <AnimatedSection className={`mb-16 ${center ? "text-center" : ""}`}>
      {label && (
        <div className={`flex items-center gap-3 mb-4 ${center ? "justify-center" : ""}`}>
          <div className="h-px w-8 bg-primary/50" />
          <span className="text-sm font-semibold tracking-widest uppercase text-primary font-display">
            {label}
          </span>
          <div className="h-px w-8 bg-primary/50" />
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display tracking-tight text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-lg text-muted-foreground leading-relaxed ${center ? "max-w-2xl mx-auto" : "max-w-2xl"}`}>
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  );
};

export default SectionHeading;

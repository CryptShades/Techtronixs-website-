import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail, Server, ArrowUpRight, MapPin, Phone } from "lucide-react";
import config from "@/data/site.config.json";
import navConfig from "@/data/nav.config.json";

const Footer = () => {
  return (
    <footer className="relative border-t border-border overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-muted/40 pointer-events-none" />

      <div className="relative container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          {/* Brand column */}
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <img src="/website-logo.png" alt="Techtronix Solutions" className="w-8 h-8 rounded-full shadow" />
              {/* <div className="w-8 h-8 rounded-xl gradient-peach flex items-center justify-center">
                <Server className="h-4 w-4 text-secondary-foreground" />
              </div> */}
              <span className="font-display font-bold text-xl tracking-tight text-foreground">
                {config.shortBrand}<span className="gradient-text"> Solutions</span>
              </span>
            </Link>

            <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Connecting Technology, Empowering Futures. End-to-end IT services delivered across PAN India.
            </p>

            {/* Contact details */}
            <div className="mt-6 space-y-2.5">
              <a
                href={`mailto:${config.email}`}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors group w-fit"
              >
                <Mail className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                {config.email}
              </a>
              <a
                href={`tel:${config.phones[0].replace(/-/g, "")}`}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors group w-fit"
              >
                <Phone className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                {config.phones[0]} / {config.phones[1]}
              </a>
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
                <span>{config.address.display}</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-7">
              {[
                { Icon: Github,   label: "GitHub",   href: config.social.github   },
                { Icon: Twitter,  label: "Twitter",  href: config.social.twitter  },
                { Icon: Linkedin, label: "LinkedIn", href: config.social.linkedin },
                { Icon: Mail,     label: "Email",    href: `mailto:${config.email}` },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-foreground transition-all duration-200 hover:scale-110"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-10">
            {navConfig.footer.map((section) => (
              <div key={section.title}>
                <h4 className="font-display font-semibold text-foreground mb-5 text-sm uppercase tracking-widest">
                  {section.title}
                </h4>
                <ul className="space-y-3.5">
                  {section.links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        to={href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group w-fit"
                      >
                        {label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} <span className="text-foreground font-medium">{config.brand}</span>. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((t) => (
              <a
                key={t}
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

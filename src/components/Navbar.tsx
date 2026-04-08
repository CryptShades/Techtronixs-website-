import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import CertificationBadge from "@/components/CertificationBadge";

const navLinks = [
  { to: "/",         label: "Home"     },
  { to: "/about",    label: "About"    },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/contact",  label: "Contact"  },
];

const Navbar = () => {
  const [open,      setOpen]     = useState(false);
  const [scrolled,  setScrolled] = useState(false);
  const [dark,      setDark]     = useState(() => localStorage.getItem("theme") === "dark");
  const location = useLocation();
  const onContact = location.pathname === "/contact";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-lg shadow-primary/5 border-b border-border/40" : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none rounded-xl p-1"
          aria-label="Techtronix Solutions home"
        >
          <img src="/website-logo.png" alt="Techtronix Solutions" className="w-8 h-8 rounded-full shadow" />
          {/* <div className="w-8 h-8 rounded-xl gradient-peach flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <Server className="h-4 w-4 text-secondary-foreground" />
          </div> */}
          <span className="font-display font-bold text-xl tracking-tight text-foreground">
            Techtronix<span className="gradient-text"> Solutions</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5" role="list">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              role="listitem"
              className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none ${
                location.pathname === l.to
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {location.pathname === l.to && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-primary/15 rounded-xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{l.label}</span>
            </Link>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDark(!dark)}
            className="rounded-xl h-9 w-9 text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary outline-none"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={dark ? "sun" : "moon"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0,   opacity: 1 }}
                exit={{   rotate: 90,   opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </motion.div>
            </AnimatePresence>
          </Button>

          {/* CTA — visually muted when already on /contact */}
          {onContact ? (
            <span className="hidden md:flex items-center rounded-xl h-9 px-5 text-sm font-semibold bg-primary/10 text-primary border border-primary/25 cursor-default select-none">
              You're here ✓
            </span>
          ) : (
            <Button
              asChild
              className="hidden md:flex rounded-xl h-9 px-5 text-sm font-semibold gradient-peach border-0 text-secondary-foreground hover:opacity-90 shadow-sm focus-visible:ring-2 focus-visible:ring-primary outline-none"
            >
              <Link to="/contact">Get a Free Consultation</Link>
            </Button>
          )}

          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-xl h-9 w-9 focus-visible:ring-2 focus-visible:ring-primary outline-none"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={open ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0,   opacity: 1 }}
                exit={{   rotate: 90,   opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </AnimatePresence>
          </Button>
        </div>
      </div>

      {/* ── Certification Trust Strip ─────────────────── */}
      <motion.div
        animate={{
          height:  scrolled ? 0   : "auto",
          opacity: scrolled ? 0   : 1,
        }}
        transition={{ duration: 0.38, ease: [0.25, 0.4, 0.25, 1] }}
        style={{ overflow: "hidden" }}
        aria-label="Certifications"
      >
        <div className="border-t border-border/30 bg-background/80 backdrop-blur-sm dark:bg-background/60">
          <div className="container mx-auto px-4 h-9 flex items-center justify-center gap-3">
            {/* Micro label */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="hidden md:block text-[9.5px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/50 select-none"
            >
              Trusted &amp; Certified
            </motion.span>

            {/* Divider */}
            <div className="hidden md:block w-px h-3.5 bg-border/40" />

            {/* Badges */}
            <CertificationBadge
              variant="quality"
              label="ISO 9001:2015 Certified"
              shortLabel="ISO 9001"
              tooltip="Quality Management System — certified to ISO 9001:2015 standards"
              delay={0.9}
            />

            {/* Separator dot */}
            <span className="w-1 h-1 rounded-full bg-border/60 flex-shrink-0" aria-hidden="true" />

            <CertificationBadge
              variant="security"
              label="ISO/IEC 27001:2022 Certified"
              shortLabel="ISO 27001"
              tooltip="Information Security Management — certified to ISO/IEC 27001:2022 standards"
              delay={1.0}
            />
          </div>
        </div>
      </motion.div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{   opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.4, 0.25, 1] }}
            className="md:hidden glass border-t border-border/40 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045, duration: 0.25 }}
                >
                  <Link
                    to={l.to}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none ${
                      location.pathname === l.to
                        ? "bg-primary/15 text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.045, duration: 0.25 }}
                className="mt-2"
              >
                {onContact ? (
                  <div className="w-full text-center rounded-xl py-3 bg-primary/10 text-primary text-sm font-semibold border border-primary/25">
                    You're already here ✓
                  </div>
                ) : (
                  <Button asChild className="w-full rounded-xl gradient-peach border-0 text-secondary-foreground font-semibold hover:opacity-90">
                    <Link to="/contact">Get a Free Consultation</Link>
                  </Button>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

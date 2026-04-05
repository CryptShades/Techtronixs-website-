import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Sparkles, ArrowRight, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import ProductCard from "@/components/ProductCard";
import MainLayout from "@/layouts/MainLayout";
import PageMeta from "@/components/PageMeta";
import products from "@/data/products.json";

const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

const gridStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const gridItem = {
  hidden: { opacity: 0, scale: 0.96, y: 18 },
  show:   { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.38, ease: [0.25, 0.4, 0.25, 1] as [number,number,number,number] } },
};

// Schema.org Product JSON-LD
const productSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Techtronix Solutions Enterprise IT Products",
  "description": "Enterprise IT hardware products by Techtronix Solutions — servers, storage systems, backup appliances, and networking devices from leading OEMs.",
  "itemListElement": products.map((p, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "item": {
      "@type": "Product",
      "name": p.title,
      "description": p.description,
      "category": p.category,
      "brand": { "@type": "Brand", "name": p.title.split(" ")[0] },
      "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "seller": { "@type": "Organization", "name": "Techtronix Solutions" } },
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://techtronixsolutions.com/" },
    { "@type": "ListItem", "position": 2, "name": "Enterprise IT Products", "item": "https://techtronixsolutions.com/products" },
  ],
};

const Products = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? products : products.filter(p => p.category === active);

  return (
    <MainLayout>
      <PageMeta
        title="IT Infrastructure Products — Servers, Storage & Networking | Techtronix"
        description="Explore enterprise IT products including servers, storage systems, backup appliances, and networking devices from Techtronix Solutions. Multi-vendor expertise and full deployment support."
        canonical="/products"
        ogImage="https://techtronixsolutions.com/og-products.png"
        keywords="enterprise servers India, storage solutions Delhi, networking devices India, HPE servers, Dell PowerEdge, NetApp storage, Cisco networking"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative py-28 md:py-40 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob blob-xl absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-[95px] animate-float dark:bg-primary/6" />
          <div className="blob blob-lg absolute bottom-0 -right-24 w-80 h-80 rounded-full bg-accent/14 blur-[75px] animate-float-alt dark:bg-accent/8" />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 text-sm font-medium text-foreground mb-8"
          >
            <Package className="h-3.5 w-3.5 text-primary" />
            {products.length} enterprise-grade products
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tight text-foreground mb-6"
          >
            Enterprise <span className="gradient-text">IT Products</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Enterprise-grade IT infrastructure products designed for performance, scalability, and reliability. Servers, storage, backup systems, and networking — all backed by multi-vendor expertise and deployment services.
          </motion.p>
        </div>
      </section>

      {/* ── Filter + Grid ─────────────────────────────── */}
      <section className="pb-28">
        <div className="container mx-auto px-4">
          {/* Category filter */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mb-5"
            role="group"
            aria-label="Filter products by category"
          >
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none ${
                  active === c
                    ? "text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
                aria-pressed={active === c}
              >
                {active === c && (
                  <motion.div
                    layoutId="active-filter"
                    className="absolute inset-0 gradient-peach rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{c}</span>
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-muted-foreground text-center mb-10"
            >
              Showing <span className="text-foreground font-semibold">{filtered.length}</span>{" "}
              {active === "All" ? "products" : `products in ${active}`}
            </motion.p>
          </AnimatePresence>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={active}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={gridStagger}
              initial="hidden"
              animate="show"
            >
              {filtered.map(p => (
                <motion.div key={p.id} variants={gridItem} layout>
                  <ProductCard {...p} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Sparkles className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No products in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Custom-build CTA ──────────────────────────── */}
      <section className="py-20 md:py-24 bg-muted/25 border-t border-border/60">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="rounded-2xl border border-border bg-card card-elevated p-10 md:p-14 text-center max-w-3xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6 border border-primary/15">
                <Wrench className="h-7 w-7 text-secondary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
                Need a product not listed here?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
                We work with 10+ OEM brands and can source, procure, and deploy the right technology for your specific environment. Tell us your requirement and we'll come back with a solution.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild className="rounded-2xl px-8 h-12 font-semibold gradient-peach border-0 text-secondary-foreground hover:opacity-90 shadow-md shadow-primary/20">
                  <Link to="/contact">
                    Get a Product Quote <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-2xl px-8 h-12 font-semibold">
                  <Link to="/services">See Our Services</Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </MainLayout>
  );
};

export default Products;

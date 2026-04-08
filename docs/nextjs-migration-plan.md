# Next.js 14 App Router Migration Plan

## Overview

Migrating from Vite + React SPA to Next.js 14 App Router eliminates the core SEO/AEO gap: Googlebot and AI crawlers currently receive `<div id="root"></div>` on first fetch. After migration, all pages render server-side HTML.

---

## Target Folder Structure

```
app/
├── layout.tsx              # Root layout — Navbar, Footer, ThemeProvider
├── page.tsx                # / (Landing)
├── about/page.tsx
├── services/page.tsx
├── products/page.tsx
├── contact/page.tsx
├── blog/
│   └── [slug]/page.tsx     # Dynamic blog post pages
├── not-found.tsx
└── globals.css

components/
├── shared/                 # StatCard, FAQAccordion, TestimonialCard, CaseStudyCard
├── sections/               # HeroSection (client), StatsSection (client), etc.
├── ui/                     # shadcn/ui primitives (client where needed)
├── Navbar.tsx              # Add "use client" for scroll/dark mode state
├── Footer.tsx              # Server component (static)
└── CertificationBadge.tsx  # Server or client depending on animation needs

data/                       # All JSON files — imported directly in server components
lib/
└── utils.ts                # cn(), shared utilities
```

---

## Server vs Client Component Split

### Server Components (no `"use client"`)
- `app/layout.tsx` — root shell
- `app/page.tsx`, `app/about/page.tsx`, `app/services/page.tsx`, `app/products/page.tsx`
- `components/Footer.tsx`
- `components/shared/CaseStudyCard.tsx`
- `components/shared/TestimonialCard.tsx`
- All JSON data imports (read at build time)

### Client Components (require `"use client"`)
- `components/Navbar.tsx` — scroll state, dark mode toggle
- `components/sections/HeroSection.tsx` — Framer Motion animations, useScroll
- `components/sections/StatsSection.tsx` — useCountUp hook
- `components/shared/FAQAccordion.tsx` — useState for open/close
- `app/contact/page.tsx` or its form child — React Hook Form, useToast
- `components/CertificationBadge.tsx` — Framer Motion whileHover

### Strategy
Wrap animated/interactive children in their own `"use client"` components. Keep page-level components server-side to emit HTML for crawlers.

---

## generateMetadata Strategy

Replace `react-helmet-async` PageMeta with Next.js `generateMetadata()` exported from each `page.tsx`:

```typescript
// app/services/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT Services in India — Cloud, Cybersecurity & Managed IT | Techtronix Solutions",
  description: "Comprehensive IT services for Indian enterprises...",
  alternates: { canonical: "https://techtronixsolutions.com/services" },
  openGraph: {
    title: "...",
    description: "...",
    url: "https://techtronixsolutions.com/services",
    images: [{ url: "https://techtronixsolutions.com/og-services.png" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@TechtronixSol",
    title: "...",
    description: "...",
    images: ["https://techtronixsolutions.com/og-services.png"],
  },
};
```

For dynamic blog pages, use `generateMetadata` with params:

```typescript
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = insightsData.find(p => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://techtronixsolutions.com/blog/${post.slug}` },
  };
}
```

---

## JSON-LD Migration Pattern

Move JSON-LD schemas out of JSX and into server-rendered `<script>` tags in the page component:

```typescript
// app/services/page.tsx (server component)
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", ... };

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <ServicesContent />  {/* client component for animations */}
    </>
  );
}
```

This ensures schemas are in the initial HTML response — visible to crawlers before JS executes.

---

## Static Generation for Blog Posts

```typescript
// app/blog/[slug]/page.tsx
import insightsData from "@/data/insights.json";

export function generateStaticParams() {
  return insightsData.map(post => ({ slug: post.slug }));
}
```

All blog routes are pre-rendered at build time — zero server cost, maximum crawl speed.

---

## Migration Steps

1. `npx create-next-app@latest techtronix-next --typescript --tailwind --app --src-dir`
2. Copy `/src/data/` and `/src/components/` directories
3. Convert pages to App Router `page.tsx` files with `generateMetadata`
4. Add `"use client"` to interactive components (Navbar, FAQAccordion, HeroSection, StatsSection, Contact form)
5. Move JSON-LD schemas to server component `<script>` tags
6. Replace `react-helmet-async` with `generateMetadata` — delete PageMeta component
7. Replace `react-router-dom` with `next/link` and `next/navigation`
8. Replace `framer-motion` page transitions (AnimatePresence/motion.div) with Next.js page transitions via layout
9. Configure `next.config.ts` with image domains, headers (CSP, HSTS)
10. Verify build: `next build` — check for "use client" boundary errors
11. Deploy to Vercel — enable Edge Network, ISR for blog posts

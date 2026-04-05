

## IT Company Premium Website — Implementation Plan

### Design System
- **Colors**: Peach (#F5B7A1) primary, Deep Brown (#4E342E) secondary, Cream (#FFF8F0) background
- **Typography**: Inter + Poppins via Google Fonts
- **Style**: Apple-minimal with glassmorphism, soft shadows, rounded-2xl corners, peach→brown gradients

### Architecture

**Layouts & Wrappers**
- `MainLayout` — sticky navbar (blur backdrop) + footer, wraps all pages
- `AnimatedSection` — Framer Motion scroll-reveal wrapper (fade+slide up on viewport entry)
- Page transitions via `AnimatePresence` with fade+slide

**Shared Components**
- `Navbar` — sticky, glass blur, mobile hamburger with animated menu
- `Footer` — links, social icons, company info
- `ProductCard` / `ServiceCard` — hover lift+scale via Framer Motion
- `SectionHeading` — reusable title+subtitle block
- `DarkModeToggle` — theme switcher in navbar

**Data Layer**
- `src/data/products.json` — 6 sample products with categories (AI Tools, SaaS, Cloud)
- `src/data/services.json` — 6 sample services with icons, features, process steps

### Pages (all lazy-loaded)

1. **Landing** — Animated hero with headline + peach gradient CTA, trusted logos strip, 3 service preview cards, product highlights, testimonial carousel, CTA banner
2. **About** — Company story section, mission/vision cards, team grid (avatar cards), animated vertical timeline
3. **Products** — Category filter tabs, product card grid from JSON, "View Details" CTA per card
4. **Services** — Service cards with Lucide icons from JSON, expandable accordion details, numbered process/step section
5. **Contact** — Form (name, email, message) with validation + toast, map placeholder, company details + social links

### Animations (Framer Motion)
- Page enter/exit transitions
- Scroll-triggered reveals on all sections
- Card hover: scale + shadow lift
- Button micro-interactions (scale on tap)
- Hero staggered text entrance
- Timeline items animate in sequence

### Extras
- Dark mode toggle (class-based with localStorage persistence)
- Smooth scroll behavior
- Loading spinner on initial mount
- Fully responsive mobile-first design


import { lazy, Suspense, Component, ReactNode } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Landing  = lazy(() => import("./pages/Landing"));
const About    = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/Products"));
const Services = lazy(() => import("./pages/Services"));
const Contact  = lazy(() => import("./pages/Contact"));
const BlogPost = lazy(() => import("./pages/blog/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));

/* ── Error Boundary ───────────────────────────────────── */
interface ErrorBoundaryState { hasError: boolean; message: string }

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, message: "" };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 p-8 text-center">
          <p className="text-lg font-semibold text-foreground">Something went wrong</p>
          <p className="text-sm text-muted-foreground max-w-sm">{this.state.message}</p>
          <button
            onClick={() => { this.setState({ hasError: false, message: "" }); window.location.reload(); }}
            className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ── Loader ───────────────────────────────────────────── */
const Loader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
    <div className="relative">
      <div className="w-14 h-14 rounded-full border-2 border-muted" />
      <div className="absolute inset-0 w-14 h-14 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
    <p className="text-sm text-muted-foreground font-medium animate-pulse">Loading…</p>
  </div>
);

const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];
const pageVariants = {
  initial: { opacity: 0, y: 14 },
  enter:   { opacity: 1, y: 0,  transition: { duration: 0.4,  ease } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.22, ease } },
};

/* ── AppShell ─────────────────────────────────────────── */
const AppShell = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip-to-main for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-xl focus:bg-primary focus:text-primary-foreground focus:text-sm focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Navbar />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          id="main-content"
          className="flex-1 flex flex-col"
        >
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <Routes location={location}>
                <Route path="/"           element={<Landing />} />
                <Route path="/about"      element={<About />} />
                <Route path="/products"   element={<Products />} />
                <Route path="/services"   element={<Services />} />
                <Route path="/contact"    element={<Contact />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="*"           element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </motion.div>
      </AnimatePresence>

      <Footer />
    </div>
  );
};

/* ── App ──────────────────────────────────────────────── */
const App = () => (
  <BrowserRouter>
    <Toaster />
    <AppShell />
  </BrowserRouter>
);

export default App;

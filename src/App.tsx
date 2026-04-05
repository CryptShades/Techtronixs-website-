import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";

const Index    = lazy(() => import("./pages/Index"));
const About    = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/Products"));
const Services = lazy(() => import("./pages/Services"));
const Contact  = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const Loader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
    <div className="relative">
      <div className="w-14 h-14 rounded-full border-2 border-muted" />
      <div className="absolute inset-0 w-14 h-14 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
    <p className="text-sm text-muted-foreground font-medium animate-pulse">Loading…</p>
  </div>
);

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  enter:   { opacity: 1, y: 0,  transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.22, ease: [0.25, 0.4, 0.25, 1] } },
};

// Navbar + Footer live here — outside AnimatePresence — so they never flicker.
const AppShell = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip-to-main — visible only on keyboard focus for screen readers */}
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
          <Suspense fallback={<Loader />}>
            <Routes location={location}>
              <Route path="/"         element={<Index />} />
              <Route path="/about"    element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact"  element={<Contact />} />
              <Route path="*"         element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>

      <Footer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <CursorGlow />
        <AppShell />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

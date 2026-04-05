import { ReactNode } from "react";

// Navbar and Footer are rendered persistently in AppShell (App.tsx).
// MainLayout is now purely a semantic page-content wrapper with top-padding
// that accounts for the fixed navbar height.
const MainLayout = ({ children }: { children: ReactNode }) => (
  <main className="flex-1 pt-16 md:pt-20">
    {children}
  </main>
);

export default MainLayout;

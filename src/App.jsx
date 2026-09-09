import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingBottomBar } from './components/FloatingBottomBar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { LuxuryAmbientLayer } from './components/LuxuryAmbientLayer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CustomCursorFollower } from './components/CustomCursorFollower';

// Direct import for instantaneous landing page
import { Home } from './pages/Home';

// Lazy loaded routes for lightning-fast initial load & buttery 60fps performance
const Plots = lazy(() => import('./pages/Plots').then(m => ({ default: m.Plots })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Insights = lazy(() => import('./pages/Insights').then(m => ({ default: m.Insights })));
const BuyerGuide = lazy(() => import('./pages/BuyerGuide').then(m => ({ default: m.BuyerGuide })));
const Media = lazy(() => import('./pages/Media').then(m => ({ default: m.Media })));
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));
const BlogDetails = lazy(() => import('./pages/BlogDetails').then(m => ({ default: m.BlogDetails })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Legal = lazy(() => import('./pages/Legal').then(m => ({ default: m.Legal })));
const WealthCalculator = lazy(() => import('./pages/WealthCalculator').then(m => ({ default: m.WealthCalculator })));
const RegistryProcess = lazy(() => import('./pages/RegistryProcess').then(m => ({ default: m.RegistryProcess })));
const FAQ = lazy(() => import('./pages/FAQ').then(m => ({ default: m.FAQ })));
const BookVisit = lazy(() => import('./pages/BookVisit').then(m => ({ default: m.BookVisit })));
const CRM = lazy(() => import('./pages/CRM').then(m => ({ default: m.CRM })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

import { LuxuryRouteLoader } from './components/LuxuryRouteLoader';
import { Preloader } from './components/Preloader';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-theme-base text-theme-primary transition-colors duration-300 relative">
      <Preloader />
      <CustomCursorFollower />
      <LuxuryAmbientLayer />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 pb-16 lg:pb-0">
        <ErrorBoundary>
          <Suspense fallback={<LuxuryRouteLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/plots" element={<Plots />} />
              <Route path="/about" element={<About />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/buyer-guide" element={<BuyerGuide />} />
              <Route path="/registry-process" element={<RegistryProcess />} />
              <Route path="/calculator" element={<WealthCalculator />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/book-visit" element={<BookVisit />} />
              <Route path="/media" element={<Media />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/crm" element={<CRM />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <FloatingBottomBar />
      <MobileBottomNav />
    </div>
  );
};

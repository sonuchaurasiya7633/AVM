import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingBottomBar } from './components/FloatingBottomBar';
import { LuxuryAmbientLayer } from './components/LuxuryAmbientLayer';

import { Home } from './pages/Home';
import { Plots } from './pages/Plots';
import { About } from './pages/About';
import { Insights } from './pages/Insights';
import { BuyerGuide } from './pages/BuyerGuide';
import { Media } from './pages/Media';
import { Blog } from './pages/Blog';
import { BlogDetails } from './pages/BlogDetails';
import { Contact } from './pages/Contact';
import { Legal } from './pages/Legal';
import { WealthCalculator } from './pages/WealthCalculator';
import { RegistryProcess } from './pages/RegistryProcess';
import { FAQ } from './pages/FAQ';
import { BookVisit } from './pages/BookVisit';
import { NotFound } from './pages/NotFound';

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
      <LuxuryAmbientLayer />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
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
          <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingBottomBar />
    </div>
  );
};

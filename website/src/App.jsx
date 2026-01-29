import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import Header from './layouts/Header';
import Footer from './layouts/Footer';

// Contexts
import { ContactProvider } from './contexts/ContactContext';
import { LenisProvider } from './contexts/LenisContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

// Components
import Preloader from './components/Preloader';
import TimelineNav from './components/TimelineNav';
import ContactModal from './components/ContactModal';
import CustomCursor from './components/CustomCursor';
import CartDrawer from './components/CartDrawer';


// Sections
import HeroSection from './sections/Home/HeroSection';
import CertificationsStrip from './sections/About/CertificationsStrip';
import LegacySection from './sections/About/LegacySection';
import DifferenceSection from './sections/Home/DifferenceSection';
import GradesSection from './sections/Products/GradesSection';
import ProductsSection from './sections/Products/ProductsSection';
import PackagingSection from './sections/Products/PackagingSection';
import NationwideSection from './sections/Global/NationwideSection';
import IndustriesSection from './sections/Global/IndustriesSection';
import IndianPresenceSection from './sections/Global/IndianPresenceSection';
import GlobalReachSection from './sections/Global/GlobalReachSection';
import QualitySection from './sections/About/QualitySection';
import ChefRecipesSection from './sections/Resources/ChefRecipesSection';
import RecipesSection from './sections/Resources/RecipesSection';
import HealthSection from './sections/Resources/HealthSection';
import BlogSection from './sections/Resources/BlogSection';
import TestimonialsSection from './sections/Home/TestimonialsSection';
import GetInTouchSection from './sections/Contact/GetInTouchSection';
import FAQSection from './sections/Resources/FAQSection';

// Styles
import './index.css';

// Landing Page Component
const LandingPage = () => {
  return (
    <main>
      <HeroSection />
      <CertificationsStrip />
      <LegacySection />
      <DifferenceSection />
      <GradesSection />
      <ProductsSection />
      <PackagingSection />
      <NationwideSection />
      <IndustriesSection />
      <IndianPresenceSection />
      <GlobalReachSection />
      <QualitySection />
      <ChefRecipesSection />
      <RecipesSection />
      <HealthSection />
      <BlogSection />
      <TestimonialsSection />
      <GetInTouchSection />
      <FAQSection />
    </main>
  );
};

// App Wrapper - Lenis is now provided via LenisProvider
const AppContent = () => {
  return (
    <>
      <Header />
      <TimelineNav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<LandingPage />} />
        <Route path="/products" element={<LandingPage />} />
        <Route path="/export" element={<LandingPage />} />
        <Route path="/knowledge" element={<LandingPage />} />
        <Route path="/contact" element={<LandingPage />} />
      </Routes>
      <Footer />
      <ContactModal />
      <CustomCursor />
    </>
  );
};

// Main App
function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  // Mark content as ready after initial render
  React.useEffect(() => {
    // Small delay to ensure content has rendered
    const timer = setTimeout(() => setContentReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AuthProvider>
        <ContactProvider>
          <CartProvider>
            <LenisProvider>
              {/* Content always renders - loads in background */}
              <div
                className="app loaded"
                style={{
                  opacity: showPreloader ? 0 : 1,
                  transition: 'opacity 0.8s ease-out',
                  visibility: showPreloader ? 'hidden' : 'visible',
                }}
              >
                <AppContent />
              </div>

              {/* Video preloader on top - waits for content to be ready */}
              {showPreloader && (
                <Preloader
                  contentReady={contentReady}
                  onComplete={() => setShowPreloader(false)}
                />
              )}

              <CartDrawer />
            </LenisProvider>
          </CartProvider>
        </ContactProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

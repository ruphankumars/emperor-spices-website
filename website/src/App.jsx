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
import HeroSection from './sections/HeroSection';
import CertificationsStrip from './sections/CertificationsStrip';
import LegacySection from './sections/LegacySection';
import DifferenceSection from './sections/DifferenceSection';
import GradesSection from './sections/GradesSection';
import ProductsSection from './sections/ProductsSection';
import PackagingSection from './sections/PackagingSection';
import NationwideSection from './sections/NationwideSection';
import IndustriesSection from './sections/IndustriesSection';
import IndianPresenceSection from './sections/IndianPresenceSection';
import GlobalReachSection from './sections/GlobalReachSection';
import QualitySection from './sections/QualitySection';
import ChefRecipesSection from './sections/ChefRecipesSection';
import RecipesSection from './sections/RecipesSection';
import HealthSection from './sections/HealthSection';
import BlogSection from './sections/BlogSection';
import TestimonialsSection from './sections/TestimonialsSection';
import GetInTouchSection from './sections/GetInTouchSection';
import FAQSection from './sections/FAQSection';

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
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <AuthProvider>
        <ContactProvider>
          <CartProvider>
            <LenisProvider>
              {loading && <Preloader onComplete={() => setLoading(false)} />}
              <div className={`app ${loading ? 'loading' : 'loaded'}`}>
                <AppContent />
              </div>
              <CartDrawer />
            </LenisProvider>
          </CartProvider>
        </ContactProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

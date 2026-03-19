import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import { ExitPopup } from './components/ExitPopup';
import { SEOHead } from './components/SEOHead';
import { StructuredData } from './components/StructuredData';
import { CookieConsent } from './components/CookieConsent';
import { StickyMobileCTA, WhatsAppButton } from './components/StickyMobileCTA';
import { SocialProof } from './components/SocialProof';
import { PushPrompt } from './components/PushPrompt';
import { useVisitorTracking } from './hooks/useVisitorTracking';

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then(m => ({ default: m.ProductsPage })));
const PhilosophyPage = lazy(() => import('./pages/PhilosophyPage').then(m => ({ default: m.PhilosophyPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const WorkPage = lazy(() => import('./pages/WorkPage').then(m => ({ default: m.WorkPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const RetailerOSPage = lazy(() => import('./pages/RetailerOSPage').then(m => ({ default: m.RetailerOSPage })));
const RealEstateCRMPage = lazy(() => import('./pages/RealEstateCRMPage').then(m => ({ default: m.RealEstateCRMPage })));
const VisitorManagementPage = lazy(() => import('./pages/VisitorManagementPage').then(m => ({ default: m.VisitorManagementPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(m => ({ default: m.BlogPostPage })));
const VancouverPage = lazy(() => import('./pages/VancouverPage').then(m => ({ default: m.VancouverPage })));
const ROICalculatorPage = lazy(() => import('./pages/ROICalculatorPage').then(m => ({ default: m.ROICalculatorPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })));

function AppContent() {
  // Visitor tracking (runs inside Router for access to useLocation)
  useVisitorTracking();

  return (
    <>
      <ScrollToTop />
      <SEOHead />
      <StructuredData />
      <div className="min-h-screen bg-stone-50 text-stone-800 selection:bg-bronze-500 selection:text-white scroll-smooth font-sans">
        <Navbar />
        <ExitPopup />
        <PushPrompt />
        <SocialProof />
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/philosophy" element={<PhilosophyPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/products/retaileros" element={<RetailerOSPage />} />
            <Route path="/products/real-estate-crm" element={<RealEstateCRMPage />} />
            <Route path="/products/visitor-management" element={<VisitorManagementPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/tools/roi-calculator" element={<ROICalculatorPage />} />
            <Route path="/vancouver" element={<VancouverPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <WhatsAppButton />
        <StickyMobileCTA />
        <CookieConsent />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Suspense fallback={<div className="min-h-screen bg-stone-950" />}><AdminPage /></Suspense>} />
        <Route path="*" element={<AppContent />} />
      </Routes>
    </Router>
  );
}

export default App;

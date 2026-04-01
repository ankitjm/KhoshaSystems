import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
const RetailerOSvsIQmetrixPage = lazy(() => import('./pages/RetailerOSvsIQmetrixPage').then(m => ({ default: m.RetailerOSvsIQmetrixPage })));
const CRMvsSellDoPage = lazy(() => import('./pages/CRMvsSellDoPage').then(m => ({ default: m.CRMvsSellDoPage })));
const VMSvsEnvoyPage = lazy(() => import('./pages/VMSvsEnvoyPage').then(m => ({ default: m.VMSvsEnvoyPage })));
const RetailerOSvsShopifyPage = lazy(() => import('./pages/RetailerOSvsShopifyPage').then(m => ({ default: m.RetailerOSvsShopifyPage })));
const RetailerOSvsLightspeedPage = lazy(() => import('./pages/RetailerOSvsLightspeedPage').then(m => ({ default: m.RetailerOSvsLightspeedPage })));
const RetailerOSvsSquarePage = lazy(() => import('./pages/RetailerOSvsSquarePage').then(m => ({ default: m.RetailerOSvsSquarePage })));
const FashionRetailPage = lazy(() => import('./pages/FashionRetailPage').then(m => ({ default: m.FashionRetailPage })));
const GroceryRetailPage = lazy(() => import('./pages/GroceryRetailPage').then(m => ({ default: m.GroceryRetailPage })));
const ElectronicsRetailPage = lazy(() => import('./pages/ElectronicsRetailPage').then(m => ({ default: m.ElectronicsRetailPage })));
const SuccessStoriesPage = lazy(() => import('./pages/SuccessStoriesPage').then(m => ({ default: m.SuccessStoriesPage })));
const KnowledgeBasePage = lazy(() => import('./pages/KnowledgeBasePage').then(m => ({ default: m.KnowledgeBasePage })));
const PricingPage = lazy(() => import('./pages/PricingPage').then(m => ({ default: m.PricingPage })));
const UseCasesPage = lazy(() => import('./pages/UseCasesPage').then(m => ({ default: m.UseCasesPage })));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage').then(m => ({ default: m.FeaturesPage })));
const GettingStartedPage = lazy(() => import('./pages/GettingStartedPage').then(m => ({ default: m.GettingStartedPage })));
const OpenClawInstallationPage = lazy(() => import('./pages/OpenClawInstallationPage').then(m => ({ default: m.OpenClawInstallationPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

function AppContent() {
  // Visitor tracking (runs inside Router for access to useLocation)
  useVisitorTracking();

  return (
    <>
      <ScrollToTop />
      <SEOHead />
      <StructuredData />
      <div className="min-h-screen bg-stone-50 text-stone-800 selection:bg-bronze-500 selection:text-white scroll-smooth font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:bg-bronze-600 focus:text-white focus:rounded focus:text-sm focus:font-medium focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Navbar />
        <ExitPopup />
        <PushPrompt />
        <SocialProof />
        <main id="main-content">
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
              <Route path="/compare/retaileros-vs-iqmetrix" element={<RetailerOSvsIQmetrixPage />} />
              <Route path="/compare/real-estate-crm-vs-selldo" element={<CRMvsSellDoPage />} />
              <Route path="/compare/vms-vs-envoy" element={<VMSvsEnvoyPage />} />
              <Route path="/compare/retaileros-vs-shopify" element={<RetailerOSvsShopifyPage />} />
              <Route path="/compare/retaileros-vs-lightspeed" element={<RetailerOSvsLightspeedPage />} />
              <Route path="/compare/retaileros-vs-square" element={<RetailerOSvsSquarePage />} />
              <Route path="/solutions/fashion-retail" element={<FashionRetailPage />} />
              <Route path="/solutions/grocery" element={<GroceryRetailPage />} />
              <Route path="/solutions/electronics" element={<ElectronicsRetailPage />} />
              <Route path="/tools/roi-calculator" element={<ROICalculatorPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/use-cases" element={<UseCasesPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/getting-started" element={<GettingStartedPage />} />
              <Route path="/success-stories" element={<SuccessStoriesPage />} />
              <Route path="/help" element={<KnowledgeBasePage />} />
              <Route path="/services/openclaw-installation" element={<OpenClawInstallationPage />} />
              <Route path="/vancouver" element={<VancouverPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
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

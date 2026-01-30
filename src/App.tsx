import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { Features } from './components/Features';
import { Integrations } from './components/Integrations';
import { HowItWorks } from './components/HowItWorks';
import { Security } from './components/Security';
import { Testimonials } from './components/Testimonials';
import { EarlyAccess } from './components/EarlyAccess';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { Aurora } from './components/Aurora';
import { UseCases } from './components/UseCases';
import { DesignPartner } from './pages/DesignPartner';
import { CheckoutSuccess } from './pages/CheckoutSuccess';
import { CheckoutCancel } from './pages/CheckoutCancel';
import { Upgrade } from './pages/Upgrade';
import { Billing } from './pages/Billing';
import { ExitSurvey } from './pages/ExitSurvey';

function HomePage() {
  return (
    <div className="min-h-screen relative noise-overlay">
      <div className="absolute top-0 left-0 w-full h-screen -z-20 opacity-60 overflow-hidden pointer-events-none">
        <Aurora
          colorStops={['#4E00FF', '#517fdc', '#7b00ff']}
          amplitude={0.7}
          blend={0.7}
          speed={0.9}
        />
      </div>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Features />
        <UseCases />
        <Integrations />
        <HowItWorks />
        <Security />
        <Testimonials /> {/* Renders nothing until testimonials array has items */}
        <EarlyAccess />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/design-partner" element={<DesignPartner />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/cancel" element={<CheckoutCancel />} />
        <Route path="/upgrade" element={<Upgrade />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/exit-survey" element={<ExitSurvey />} />
      </Routes>
    </BrowserRouter>
  );
}

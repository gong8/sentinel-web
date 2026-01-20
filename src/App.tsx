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

export default function App() {
  return (
    <div className="min-h-screen relative">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Features />
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

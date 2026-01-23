import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { EmailSignup } from './EmailSignup';

function useInView() {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}

export function CTA() {
  const { ref, isInView } = useInView();

  return (
    <section
      className="py-32 relative overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Background glow with noise */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-brand-500/15 via-brand-500/10 to-brand-500/15 blur-3xl -z-10 rounded-full noise-gradient" />

      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="absolute inset-0 bg-grid-fade opacity-25" />

      {/* Floating capsule decoration - balanced positioning */}
      <div className="absolute top-[15%] left-[8%] opacity-[0.04] rotate-[-15deg] animate-float-slow">
        <img src="/logo.png" alt="" className="w-14 h-14 object-contain" />
      </div>
      <div className="absolute top-[20%] right-[10%] opacity-[0.035] rotate-[20deg] animate-float-medium">
        <img src="/logo.png" alt="" className="w-16 h-16 object-contain" />
      </div>
      <div className="absolute bottom-[25%] left-[12%] opacity-[0.03] rotate-[25deg] animate-float-fast">
        <img src="/logo.png" alt="" className="w-10 h-10 object-contain" />
      </div>
      <div className="absolute bottom-[20%] right-[8%] opacity-[0.035] rotate-[-20deg] animate-float-slow">
        <img src="/logo.png" alt="" className="w-12 h-12 object-contain" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Take control of your{' '}
            <span className="text-gradient">AI agents</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Join our design partner program and help shape the future of AI agent governance.
          </p>

          <div
            className={`mt-12 transition-all duration-700 delay-200 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Link to="/design-partner">
              <Button size="lg" className="text-base px-10 py-6">
                Become a Design Partner
              </Button>
            </Link>
          </div>

          <div
            className={`mt-20 pt-12 border-t border-border/20 transition-all duration-700 delay-300 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-sm text-muted-foreground mb-6">
              Or get notified when we launch publicly:
            </p>
            <EmailSignup />
          </div>

          {/* Trust indicators */}
          <div
            className={`mt-16 flex flex-wrap justify-center gap-6 text-xs font-mono text-muted-foreground/60 transition-all duration-700 delay-400 ${
              isInView ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              DENY-First Security
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Complete Audit Trail
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Self-Hosted Deployment
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

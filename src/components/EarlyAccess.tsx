import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from './ui/card';
import { Rocket, Building2, Users, Zap, Check } from 'lucide-react';
import { Button } from './ui/button';

const benefits = [
  {
    icon: Zap,
    title: 'Direct Access',
    description: 'Work directly with the founding team. Shape the product roadmap.',
  },
  {
    icon: Building2,
    title: 'Enterprise Features',
    description: 'Priority access to SSO, custom integrations, and compliance features.',
  },
  {
    icon: Users,
    title: 'White-Glove Onboarding',
    description: 'Dedicated implementation support to get you deployed in days.',
  },
];

const idealFor = [
  'AI-forward companies deploying MCP or A2A agents',
  'Teams with SOC 2, HIPAA, or EU AI Act compliance needs',
  'Platform engineering teams building agent infrastructure',
  'Security teams responsible for AI governance',
];

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
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}

export function EarlyAccess() {
  const { ref, isInView } = useInView();

  return (
    <section
      id="early-access"
      className="py-28 relative overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-brand-500/8 to-transparent blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-brand-500/6 to-transparent blur-3xl -z-10" />

      {/* Dot pattern */}
      <div className="absolute inset-0 bg-dots opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div
          className={`mx-auto max-w-2xl text-center mb-16 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-xs mb-6">
            <Rocket className="h-3 w-3 text-brand-400" />
            <span className="font-mono text-brand-400 uppercase tracking-wider">Early Access</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Join our{' '}
            <span className="text-gradient">founding customers</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            We're working with a small group of design partners to build the authorisation
            layer that enterprises actually need. Get in early and shape the product.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={benefit.title}
                className={`group p-6 bg-card/40 backdrop-blur-sm border-border/40 hover:border-brand-500/30 hover:bg-card/60 transition-all duration-500 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/20">
                  <Icon className="h-5 w-5 text-brand-400" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Ideal for section */}
        <div
          className={`mx-auto max-w-2xl p-6 rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm transition-all duration-700 delay-500 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h3 className="text-sm font-semibold mb-4 text-center">Ideal for teams who are:</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {idealFor.map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to="/design-partner">
              <Button size="lg">
                Apply for Early Access
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

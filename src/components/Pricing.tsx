import { useEffect, useRef, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Check, Sparkles } from 'lucide-react';
import { TiltCard } from './TiltCard';

const tiers = [
  {
    name: 'Free',
    description: 'Get started with AI agent governance. No credit card required.',
    price: 'Free',
    priceDetail: 'forever',
    features: [
      'Up to 3 users',
      '3 MCP servers',
      'DENY-first policy engine',
      'Complete audit logging',
      '7-day log retention',
      'Community support',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Team',
    description: 'For teams deploying agents in production with compliance needs.',
    price: 'TBD',
    priceDetail: 'per month',
    features: [
      'Up to 10 users',
      '10 MCP servers',
      'A2A agent support',
      'Approval workflows',
      'Webhook alerts',
      '90-day log retention',
      'Priority support',
    ],
    cta: 'Join Waitlist',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    description: 'For organisations with advanced security and compliance requirements.',
    price: 'Custom',
    priceDetail: 'contact us',
    features: [
      'Unlimited users',
      'Unlimited servers',
      'SSO (SAML/OIDC)',
      'Self-hosted deployment',
      '1-year+ log retention',
      'SLA guarantee',
      'Dedicated support',
      'Custom integrations',
    ],
    cta: 'Talk to Us',
    highlighted: false,
  },
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

export function Pricing() {
  const { ref, isInView } = useInView();

  return (
    <section
      id="pricing"
      className="py-28 relative overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Background accents with noise */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-brand-500/8 to-transparent blur-3xl -z-10 noise-gradient" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-brand-500/6 to-transparent blur-3xl -z-10 noise-gradient" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="absolute inset-0 bg-grid-small opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div
          className={`mx-auto max-w-2xl text-center mb-16 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/40 bg-card/30 text-xs mb-6">
            <Sparkles className="h-3 w-3 text-brand-400" />
            <span className="font-mono text-muted-foreground uppercase tracking-wider">Pricing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Start free, <span className="text-gradient">scale when ready</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Get started with our free tier. Upgrade as your agent infrastructure grows.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <TiltCard
              key={tier.name}
              tiltAmount={6}
              glareEnabled={true}
              className={`transition-all duration-500 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
            <Card
              className={`relative p-6 backdrop-blur-md h-full ${
                tier.highlighted
                  ? 'bg-white/8 border-brand-500/40 shadow-lg shadow-brand-500/10'
                  : 'bg-white/5 border-white/10 hover:border-brand-500/30'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="mb-6 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-display font-semibold mb-2">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </div>
                {tier.highlighted && (
                  <span className="shrink-0 inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-brand-500 text-white rounded-full">
                    Popular
                  </span>
                )}
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display font-bold">{tier.price}</span>
                  <span className="text-sm text-muted-foreground">{tier.priceDetail}</span>
                </div>
              </div>

              <Button
                className={`w-full mb-6 ${
                  tier.highlighted
                    ? ''
                    : 'bg-card border border-border/50 text-foreground hover:bg-card/80 hover:border-brand-500/30'
                }`}
                variant={tier.highlighted ? 'default' : 'outline'}
              >
                {tier.cta}
              </Button>

              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
            </TiltCard>
          ))}
        </div>

        <p
          className={`text-center mt-12 text-sm text-muted-foreground transition-all duration-700 delay-500 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          All plans include encrypted credentials, DENY-first policies, and complete audit logging.
        </p>
      </div>
    </section>
  );
}

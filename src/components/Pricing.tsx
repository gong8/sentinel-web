import { useEffect, useRef, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Check, Sparkles, Loader2 } from 'lucide-react';
import { TiltCard } from './TiltCard';
import {
  pricingTiers,
  pricingUIText,
  getTierAction,
  type PricingTier,
  type BillingPeriod,
} from '../config/pricing.config';

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

function PricingButton({
  tier,
  billingPeriod,
  className,
}: {
  tier: PricingTier;
  billingPeriod: BillingPeriod;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const action = getTierAction(tier, billingPeriod);
      action();
    } finally {
      // Only reset if we haven't navigated away
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      className={`w-full mb-6 ${className} ${
        tier.highlighted
          ? ''
          : 'bg-card border border-border/50 text-foreground hover:bg-card/80 hover:border-brand-500/30'
      }`}
      variant={tier.highlighted ? 'default' : 'outline'}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        tier.cta
      )}
    </Button>
  );
}

function BillingToggle({
  billingPeriod,
  onChange,
}: {
  billingPeriod: BillingPeriod;
  onChange: (period: BillingPeriod) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-3 mb-12">
      <button
        onClick={() => onChange('monthly')}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
          billingPeriod === 'monthly'
            ? 'bg-brand-500 text-white'
            : 'bg-card/50 text-muted-foreground hover:text-foreground'
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => onChange('yearly')}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
          billingPeriod === 'yearly'
            ? 'bg-brand-500 text-white'
            : 'bg-card/50 text-muted-foreground hover:text-foreground'
        }`}
      >
        Yearly
        <span className={`text-xs px-1.5 py-0.5 rounded ${
          billingPeriod === 'yearly'
            ? 'bg-white/20'
            : 'bg-brand-500/20 text-brand-400'
        }`}>
          Save 17%
        </span>
      </button>
    </div>
  );
}

export function Pricing() {
  const { ref, isInView } = useInView();
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');

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
            <span className="font-mono text-muted-foreground uppercase tracking-wider">
              {pricingUIText.sectionBadge}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {pricingUIText.headline}{' '}
            <span className="text-gradient">{pricingUIText.headlineHighlight}</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            {pricingUIText.subheadline}
          </p>
        </div>

        <BillingToggle billingPeriod={billingPeriod} onChange={setBillingPeriod} />

        <div className="grid gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <TiltCard
              key={tier.id}
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
                    <span className="text-4xl font-display font-bold">
                      {billingPeriod === 'yearly' && tier.priceYearly ? tier.priceYearly : tier.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {billingPeriod === 'yearly' && tier.priceDetailYearly ? tier.priceDetailYearly : tier.priceDetail}
                    </span>
                  </div>
                  {tier.priceSubtext && (
                    <p className="text-xs text-muted-foreground mt-1">{tier.priceSubtext}</p>
                  )}
                </div>

                <PricingButton tier={tier} billingPeriod={billingPeriod} />

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
          {pricingUIText.footer}
        </p>
      </div>
    </section>
  );
}

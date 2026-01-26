import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Check, ArrowLeft, Loader2, Sparkles, Building2 } from 'lucide-react';
import {
  pricingTiers,
  getTierAction,
  contactConfig,
  type PricingTier,
  type BillingPeriod,
} from '../config/pricing.config';

function BillingToggle({
  billingPeriod,
  onChange,
}: {
  billingPeriod: BillingPeriod;
  onChange: (period: BillingPeriod) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
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
        <span
          className={`text-xs px-1.5 py-0.5 rounded ${
            billingPeriod === 'yearly' ? 'bg-white/20' : 'bg-brand-500/20 text-brand-400'
          }`}
        >
          Save 17%
        </span>
      </button>
    </div>
  );
}

function PricingCard({
  tier,
  billingPeriod,
  isSelected,
  onSelect,
}: {
  tier: PricingTier;
  billingPeriod: BillingPeriod;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const action = getTierAction(tier, billingPeriod);
      action();
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  return (
    <Card
      className={`relative p-6 backdrop-blur-md cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'bg-brand-500/10 border-brand-500/50 shadow-lg shadow-brand-500/10'
          : tier.highlighted
            ? 'bg-white/8 border-brand-500/30 hover:border-brand-500/50'
            : 'bg-white/5 border-white/10 hover:border-brand-500/30'
      }`}
      onClick={onSelect}
    >
      {tier.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider bg-brand-500 text-white rounded-full">
          Popular
        </span>
      )}

      <div className="mb-4">
        <h3 className="text-lg font-display font-semibold mb-1">{tier.name}</h3>
        <p className="text-sm text-muted-foreground">{tier.description}</p>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-display font-bold">
            {billingPeriod === 'yearly' && tier.priceYearly ? tier.priceYearly : tier.price}
          </span>
          <span className="text-sm text-muted-foreground">
            {billingPeriod === 'yearly' && tier.priceDetailYearly
              ? tier.priceDetailYearly
              : tier.priceDetail}
          </span>
        </div>
        {tier.priceSubtext && (
          <p className="text-xs text-muted-foreground mt-1">{tier.priceSubtext}</p>
        )}
      </div>

      <Button
        onClick={(e) => {
          e.stopPropagation();
          handleSelect();
        }}
        disabled={isLoading}
        className={`w-full mb-4 ${
          isSelected || tier.highlighted
            ? ''
            : 'bg-card border border-border/50 text-foreground hover:bg-card/80 hover:border-brand-500/30'
        }`}
        variant={isSelected || tier.highlighted ? 'default' : 'outline'}
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

      <ul className="space-y-2">
        {tier.features.slice(0, 5).map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <Check className="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
        {tier.features.length > 5 && (
          <li className="text-xs text-muted-foreground pl-6">
            +{tier.features.length - 5} more features
          </li>
        )}
      </ul>
    </Card>
  );
}

export function Upgrade() {
  const [searchParams] = useSearchParams();
  const planParam = searchParams.get('plan');
  const periodParam = searchParams.get('period') as BillingPeriod | null;

  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>(
    periodParam === 'yearly' ? 'yearly' : 'monthly'
  );
  const [selectedPlan, setSelectedPlan] = useState<string>(planParam || 'team');

  // Auto-redirect if plan parameter is provided
  useEffect(() => {
    if (planParam && periodParam) {
      const tier = pricingTiers.find((t) => t.id === planParam);
      if (tier && tier.ctaType === 'stripe') {
        const action = getTierAction(tier, periodParam === 'yearly' ? 'yearly' : 'monthly');
        action();
      }
    }
  }, [planParam, periodParam]);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-brand-500/10 to-transparent blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-brand-500/8 to-transparent blur-3xl -z-10" />

      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/40 bg-card/30 text-xs mb-4">
              <Sparkles className="h-3 w-3 text-brand-400" />
              <span className="font-mono text-muted-foreground uppercase tracking-wider">
                Upgrade
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Choose your <span className="text-gradient">plan</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Upgrade to unlock advanced policies, approval workflows, and priority support for your
              team.
            </p>
          </div>
        </div>

        {/* Billing Toggle */}
        <BillingToggle billingPeriod={billingPeriod} onChange={setBillingPeriod} />

        {/* Pricing Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {pricingTiers.map((tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              billingPeriod={billingPeriod}
              isSelected={selectedPlan === tier.id}
              onSelect={() => setSelectedPlan(tier.id)}
            />
          ))}
        </div>

        {/* Enterprise CTA */}
        <Card className="p-6 bg-white/5 border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-brand-500/10">
                <Building2 className="w-6 h-6 text-brand-400" />
              </div>
              <div>
                <h3 className="font-semibold">Need a custom solution?</h3>
                <p className="text-sm text-muted-foreground">
                  Get SSO, self-hosted deployment, custom SLAs, and dedicated support.
                </p>
              </div>
            </div>
            <a
              href={`mailto:${contactConfig.salesEmail}?subject=Enterprise%20Inquiry`}
              className="shrink-0 px-6 py-2 text-sm font-semibold rounded-xl border border-border/50 bg-transparent text-foreground hover:bg-brand-500/10 hover:border-brand-500/30 transition-all"
            >
              Contact Sales
            </a>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center mt-8 text-sm text-muted-foreground">
          Already a subscriber?{' '}
          <Link to="/billing" className="text-brand-400 hover:text-brand-300">
            Manage your billing
          </Link>
        </p>
      </div>
    </div>
  );
}

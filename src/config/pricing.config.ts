/**
 * SENTINEL Pricing & Plans Configuration
 *
 * Edit this file to change pricing, features, and Stripe settings.
 * All pricing-related components will automatically use these values.
 */

// =============================================================================
// STRIPE CONFIGURATION
// =============================================================================

export const stripeConfig = {
  /**
   * Stripe Payment Link URLs
   * Create in Stripe Dashboard: https://dashboard.stripe.com/payment-links
   *
   * For production, replace with live payment links:
   * monthly: 'https://buy.stripe.com/live_XXXXXX',
   * yearly: 'https://buy.stripe.com/live_YYYYYY',
   */
  paymentLinks: {
    monthly: 'https://buy.stripe.com/test_eVqdRbdvB1TT0M0flK83C02',
    yearly: 'https://buy.stripe.com/test_cNi6oJfDJ6a9cuIb5u83C03',
  },

  /**
   * Stripe Customer Portal link for managing subscriptions
   * Create in Stripe Dashboard: https://dashboard.stripe.com/settings/billing/portal
   *
   * For production, replace with your portal link:
   * customerPortalLink: 'https://billing.stripe.com/p/login/YOUR_PORTAL_ID',
   */
  customerPortalLink: 'https://billing.stripe.com/p/login/test_00g3dW2jOfLF5Zy5kk',
};

// =============================================================================
// CONTACT & LINKS
// =============================================================================

export const contactConfig = {
  salesEmail: 'hello@sentinel.dev',
  supportEmail: 'hello@sentinel.dev',
  githubReleasesUrl: 'https://github.com/gong8/sentinel/releases',
  docsUrl: 'https://docs.sentinel.london',
};

// =============================================================================
// PRICING TIERS
// =============================================================================

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  priceYearly?: string;
  priceDetail: string;
  priceDetailYearly?: string;
  priceSubtext?: string;
  features: string[];
  cta: string;
  ctaType: 'github' | 'stripe' | 'email';
  highlighted: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Get started with AI agent governance. No credit card required.',
    price: 'Free',
    priceDetail: 'forever',
    features: [
      'Up to 3 users',
      '3 MCP servers',
      'Basic DENY policies',
      'Complete audit logging',
      '7-day log retention',
      'Community support',
    ],
    cta: 'Get Started',
    ctaType: 'github',
    highlighted: false,
  },
  {
    id: 'team',
    name: 'Team',
    description: 'For teams deploying agents in production with compliance needs.',
    price: '$15',
    priceYearly: '$150',
    priceDetail: 'per seat/month',
    priceDetailYearly: 'per seat/year',
    priceSubtext: '3 seat minimum • Save 17% yearly',
    features: [
      'Per-seat pricing',
      '10 MCP servers',
      'All policy types',
      'A2A agent support',
      'Approval workflows',
      'Webhook alerts',
      '90-day log retention',
      'Priority support',
    ],
    cta: 'Start Team Plan',
    ctaType: 'stripe',
    highlighted: true,
  },
  {
    id: 'enterprise',
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
    cta: 'Talk to Sales',
    ctaType: 'email',
    highlighted: false,
  },
];

// =============================================================================
// FEATURE COMPARISON (for detailed comparison tables)
// =============================================================================

export interface FeatureComparison {
  category: string;
  features: {
    name: string;
    free: string | boolean;
    team: string | boolean;
    enterprise: string | boolean;
  }[];
}

export const featureComparison: FeatureComparison[] = [
  {
    category: 'Core',
    features: [
      { name: 'MCP Proxy', free: true, team: true, enterprise: true },
      { name: 'Audit Logging', free: '7 days', team: '90 days', enterprise: '1 year+' },
      { name: 'Max Users', free: '3', team: 'Per seat', enterprise: 'Unlimited' },
      { name: 'Max MCP Servers', free: '3', team: '10', enterprise: 'Unlimited' },
    ],
  },
  {
    category: 'Policies',
    features: [
      { name: 'Basic DENY Policies', free: true, team: true, enterprise: true },
      { name: 'All Policy Types', free: false, team: true, enterprise: true },
      { name: 'Approval Workflows', free: false, team: true, enterprise: true },
    ],
  },
  {
    category: 'Integrations',
    features: [
      { name: 'Webhook Alerts', free: false, team: true, enterprise: true },
      { name: 'A2A Agent Support', free: false, team: true, enterprise: true },
      { name: 'SSO (SAML/OIDC)', free: false, team: false, enterprise: true },
      { name: 'Custom Integrations', free: false, team: false, enterprise: true },
    ],
  },
  {
    category: 'Support',
    features: [
      { name: 'Community Support', free: true, team: true, enterprise: true },
      { name: 'Priority Support', free: false, team: true, enterprise: true },
      { name: 'Dedicated Support', free: false, team: false, enterprise: true },
      { name: 'SLA Guarantee', free: false, team: false, enterprise: true },
    ],
  },
];

// =============================================================================
// LIMITS (matches license server configuration)
// =============================================================================

export const tierLimits = {
  free: {
    maxUsers: 3,
    maxMcpServers: 3,
    logRetentionDays: 7,
  },
  team: {
    maxUsers: null, // Per-seat, no hard limit
    maxMcpServers: 10,
    logRetentionDays: 90,
  },
  enterprise: {
    maxUsers: null, // Unlimited
    maxMcpServers: null, // Unlimited
    logRetentionDays: 365,
  },
};

// =============================================================================
// UI TEXT
// =============================================================================

export const pricingUIText = {
  sectionBadge: 'Pricing',
  headline: 'Start free,',
  headlineHighlight: 'scale when ready',
  subheadline: 'Get started with our free tier. Upgrade as your agent infrastructure grows.',
  footer: 'All plans include encrypted credentials, DENY-first policies, and complete audit logging.',
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export type BillingPeriod = 'monthly' | 'yearly';

/**
 * Get the CTA action function for a tier
 */
export function getTierAction(tier: PricingTier, billingPeriod: BillingPeriod = 'monthly'): () => void {
  switch (tier.ctaType) {
    case 'github':
      return () => {
        window.location.href = contactConfig.githubReleasesUrl;
      };
    case 'stripe':
      return () => {
        window.location.href = stripeConfig.paymentLinks[billingPeriod];
      };
    case 'email':
      return () => {
        window.location.href = `mailto:${contactConfig.salesEmail}?subject=Enterprise%20Inquiry`;
      };
  }
}

/**
 * Get a tier by ID
 */
export function getTierById(id: string): PricingTier | undefined {
  return pricingTiers.find((tier) => tier.id === id);
}

import { Link } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  CreditCard,
  ArrowLeft,
  ExternalLink,
  Settings,
  FileText,
  HelpCircle,
  Building2,
} from 'lucide-react';
import { stripeConfig, contactConfig } from '../config/pricing.config';

export function Billing() {
  const handleManageBilling = () => {
    window.location.href = stripeConfig.customerPortalLink;
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-brand-500/10 to-transparent blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-brand-500/8 to-transparent blur-3xl -z-10" />

      <div className="mx-auto max-w-2xl px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 rounded-lg bg-brand-500/10">
              <CreditCard className="w-6 h-6 text-brand-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Billing</h1>
              <p className="text-muted-foreground">Manage your subscription and payment details</p>
            </div>
          </div>
        </div>

        {/* Main Action Card */}
        <Card className="p-6 bg-white/8 border-brand-500/30 mb-6">
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2">Stripe Customer Portal</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Access the Stripe Customer Portal to manage your subscription, update payment methods,
              view invoices, and cancel your plan.
            </p>
            <Button onClick={handleManageBilling} className="w-full sm:w-auto">
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Billing Portal
            </Button>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 sm:grid-cols-2 mb-8">
          <Card className="p-4 bg-white/5 border-white/10 hover:border-brand-500/30 transition-colors">
            <div className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm mb-1">Update Payment Method</h3>
                <p className="text-xs text-muted-foreground">
                  Change your credit card or payment details through the billing portal.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white/5 border-white/10 hover:border-brand-500/30 transition-colors">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm mb-1">View Invoices</h3>
                <p className="text-xs text-muted-foreground">
                  Download past invoices and receipts for your records.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Info Cards */}
        <div className="space-y-4">
          {/* Upgrade Info */}
          <Card className="p-4 bg-white/5 border-white/10">
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm mb-1">Upgrade to Enterprise</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Need unlimited users, SSO, or custom integrations? Contact our sales team for
                  enterprise options.
                </p>
                <a
                  href={`mailto:${contactConfig.salesEmail}?subject=Enterprise%20Upgrade`}
                  className="text-xs text-brand-400 hover:text-brand-300 inline-flex items-center gap-1"
                >
                  Contact Sales
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </Card>

          {/* Help */}
          <Card className="p-4 bg-white/5 border-white/10">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm mb-1">Need Help?</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Having trouble with billing or your subscription? Our support team is here to
                  help.
                </p>
                <a
                  href={`mailto:${contactConfig.supportEmail}?subject=Billing%20Support`}
                  className="text-xs text-brand-400 hover:text-brand-300 inline-flex items-center gap-1"
                >
                  Contact Support
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer Links */}
        <div className="mt-8 pt-6 border-t border-border/30 flex flex-wrap justify-center gap-6 text-sm">
          <Link to="/upgrade" className="text-muted-foreground hover:text-foreground">
            View Plans
          </Link>
          <a
            href={contactConfig.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            Documentation
          </a>
          <a
            href={`mailto:${contactConfig.supportEmail}`}
            className="text-muted-foreground hover:text-foreground"
          >
            Support
          </a>
        </div>
      </div>
    </div>
  );
}

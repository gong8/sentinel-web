import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Download, Mail, ArrowRight, CreditCard } from 'lucide-react';
import { Card } from '../components/ui/card';
import { contactConfig } from '../config/pricing.config';

export function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Optional: Track conversion or send analytics
    if (sessionId) {
      console.log('Checkout completed, session:', sessionId);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-brand-500/10 to-transparent blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-green-500/10 to-transparent blur-3xl -z-10" />

      <Card className="max-w-lg w-full p-8 text-center bg-card/50 backdrop-blur-md border-border/50">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Welcome to SENTINEL Team!</h1>
          <p className="text-muted-foreground">
            Your subscription is now active. Check your email for your license key.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3 text-left p-4 rounded-lg bg-muted/50">
            <Mail className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">License Key Sent</p>
              <p className="text-xs text-muted-foreground">
                We've sent your license key to your email. Check your inbox (and spam folder).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-left p-4 rounded-lg bg-muted/50">
            <Download className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">Download SENTINEL</p>
              <p className="text-xs text-muted-foreground">
                Get the latest release from GitHub and configure your license key.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-left p-4 rounded-lg bg-muted/50">
            <CreditCard className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">Manage Your Subscription</p>
              <p className="text-xs text-muted-foreground">
                Update payment methods, view invoices, or modify your plan anytime.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <a
            href={contactConfig.githubReleasesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full h-11 px-6 py-2 rounded-xl text-sm font-semibold bg-brand-500 text-white border border-brand-400/20 shadow-[0_2px_8px_-2px_rgba(78,0,255,0.4)] hover:bg-brand-400 hover:shadow-[0_4px_16px_-4px_rgba(78,0,255,0.5)] hover:-translate-y-px transition-all duration-200"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Latest Release
          </a>

          <a
            href={contactConfig.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full h-11 px-6 py-2 rounded-xl text-sm font-semibold border border-border/50 bg-transparent text-foreground hover:bg-brand-500/10 hover:border-brand-500/30 hover:text-brand-300 transition-all duration-200"
          >
            View Documentation
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>

          <Link
            to="/billing"
            className="flex items-center justify-center w-full h-11 px-6 py-2 rounded-xl text-sm font-semibold border border-border/50 bg-transparent text-foreground hover:bg-brand-500/10 hover:border-brand-500/30 hover:text-brand-300 transition-all duration-200"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Manage Billing
          </Link>

          <Link
            to="/"
            className="inline-block text-sm text-muted-foreground hover:text-foreground mt-4"
          >
            Return to homepage
          </Link>
        </div>
      </Card>
    </div>
  );
}

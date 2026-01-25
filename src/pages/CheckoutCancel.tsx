import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft, HelpCircle } from 'lucide-react';
import { Card } from '../components/ui/card';
import { contactConfig } from '../config/pricing.config';

export function CheckoutCancel() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-brand-500/10 to-transparent blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-orange-500/10 to-transparent blur-3xl -z-10" />

      <Card className="max-w-lg w-full p-8 text-center bg-card/50 backdrop-blur-md border-border/50">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/10 mb-4">
            <XCircle className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Checkout Cancelled</h1>
          <p className="text-muted-foreground">
            No worries! Your payment was not processed. You can try again when you're ready.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="p-4 rounded-lg bg-muted/50 text-left">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Still interested?</strong> You can start with our
              free tier to explore SENTINEL's features, then upgrade when you're ready.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            to="/#pricing"
            className="flex items-center justify-center w-full h-11 px-6 py-2 rounded-xl text-sm font-semibold bg-brand-500 text-white border border-brand-400/20 shadow-[0_2px_8px_-2px_rgba(78,0,255,0.4)] hover:bg-brand-400 hover:shadow-[0_4px_16px_-4px_rgba(78,0,255,0.5)] hover:-translate-y-px transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Pricing
          </Link>

          <a
            href={contactConfig.githubReleasesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full h-11 px-6 py-2 rounded-xl text-sm font-semibold border border-border/50 bg-transparent text-foreground hover:bg-brand-500/10 hover:border-brand-500/30 hover:text-brand-300 transition-all duration-200"
          >
            Try Free Tier
          </a>

          <div className="pt-4 border-t border-border/50 mt-4">
            <a
              href={`mailto:${contactConfig.supportEmail}?subject=Checkout%20Question`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <HelpCircle className="w-4 h-4" />
              Have questions? Contact us
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}

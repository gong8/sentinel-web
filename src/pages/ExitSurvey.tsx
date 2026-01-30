import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MessageSquare, CheckCircle, ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui/card';
import { supabase } from '../lib/supabase';

const REASONS = [
  { value: 'too_expensive', label: 'Too expensive for my needs' },
  { value: 'missing_features', label: 'Missing features I needed' },
  { value: 'switched_competitor', label: 'Switched to a competitor' },
  { value: 'no_longer_need', label: 'No longer need this type of product' },
  { value: 'technical_issues', label: 'Technical issues / bugs' },
  { value: 'poor_support', label: 'Poor customer support' },
  { value: 'other', label: 'Other' },
];

const WOULD_RETURN_OPTIONS = [
  { value: 'yes', label: 'Yes, definitely' },
  { value: 'maybe', label: 'Maybe' },
  { value: 'no', label: 'No' },
];

export function ExitSurvey() {
  const [searchParams] = useSearchParams();
  const emailFromUrl = searchParams.get('email') || '';

  const [reason, setReason] = useState('');
  const [feedback, setFeedback] = useState('');
  const [wouldReturn, setWouldReturn] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!reason) {
      setError('Please select a reason for leaving.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: submitError } = await supabase.from('exit_surveys').insert({
        email: emailFromUrl,
        reason,
        feedback: feedback || null,
        would_return: wouldReturn || null,
      });

      if (submitError) throw submitError;

      setIsSubmitted(true);
    } catch (err) {
      console.error('Survey submission error:', err);
      setError('Failed to submit survey. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-brand-500/10 to-transparent blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-green-500/10 to-transparent blur-3xl -z-10" />

        <Card className="max-w-lg w-full p-8 text-center bg-card/50 backdrop-blur-md border-border/50">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Thank you for your feedback</h1>
          <p className="text-muted-foreground mb-6">
            Your input helps us improve SENTINEL for everyone. We appreciate you taking the time to share your thoughts.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-2 rounded-xl text-sm font-semibold border border-border/50 bg-transparent text-foreground hover:bg-brand-500/10 hover:border-brand-500/30 hover:text-brand-300 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to homepage
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-brand-500/10 to-transparent blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-amber-500/10 to-transparent blur-3xl -z-10" />

      <Card className="max-w-lg w-full p-8 bg-card/50 backdrop-blur-md border-border/50">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-500/10 mb-4">
            <MessageSquare className="w-8 h-8 text-brand-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2">We're sorry to see you go</h1>
          <p className="text-muted-foreground">
            Your feedback helps us improve. Would you take 2 minutes to tell us why you're leaving?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Reason for leaving */}
          <div>
            <label className="block text-sm font-medium mb-3">
              What's the primary reason you're leaving? <span className="text-red-400">*</span>
            </label>
            <div className="space-y-2">
              {REASONS.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    reason === option.value
                      ? 'border-brand-500 bg-brand-500/10'
                      : 'border-border/50 hover:border-border hover:bg-muted/30'
                  }`}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={option.value}
                    checked={reason === option.value}
                    onChange={(e) => setReason(e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                      reason === option.value ? 'border-brand-500' : 'border-muted-foreground'
                    }`}
                  >
                    {reason === option.value && (
                      <div className="w-2 h-2 rounded-full bg-brand-500" />
                    )}
                  </div>
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Optional feedback */}
          <div>
            <label className="block text-sm font-medium mb-2">
              What could we have done better?
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share any additional thoughts..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 resize-none transition-all duration-200"
            />
          </div>

          {/* Would return */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Would you consider returning in the future?
            </label>
            <div className="flex gap-2">
              {WOULD_RETURN_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setWouldReturn(option.value)}
                  className={`flex-1 px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                    wouldReturn === option.value
                      ? 'border-brand-500 bg-brand-500/10 text-brand-300'
                      : 'border-border/50 hover:border-border hover:bg-muted/30'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 px-6 py-2 rounded-xl text-sm font-semibold bg-brand-500 text-white border border-brand-400/20 shadow-[0_2px_8px_-2px_rgba(78,0,255,0.4)] hover:bg-brand-400 hover:shadow-[0_4px_16px_-4px_rgba(78,0,255,0.5)] hover:-translate-y-px transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>

          <Link
            to="/"
            className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip and return to homepage
          </Link>
        </form>
      </Card>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft, Send, CheckCircle, Building2, Users, Cpu, Shield, Loader2, AlertCircle } from 'lucide-react';

function useInView(delay = 0) {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInView(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return { ref, isInView };
}

export function DesignPartner() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    agentCount: '',
    useCase: '',
  });

  // Staggered animations
  const { isInView: headerVisible } = useInView(100);
  const { isInView: titleVisible } = useInView(200);
  const { isInView: descVisible } = useInView(300);
  const { isInView: benefitsVisible } = useInView(400);
  const { isInView: formVisible } = useInView(350);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/partner-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        {/* Background accents */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-brand-500/10 via-brand-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-md w-full text-center animate-fade-in-up">
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-display font-bold mb-4">Application Received</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your interest in becoming a Sentinel design partner.
            We'll review your application and get back to you within 2-3 business days.
          </p>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background accents */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-brand-500/12 via-brand-500/5 to-transparent blur-3xl -z-10 pointer-events-none noise-gradient" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-brand-500/8 to-transparent blur-3xl -z-10 pointer-events-none" />

      {/* Grid background */}
      <div className="fixed inset-0 bg-grid-fade opacity-30 pointer-events-none -z-10" />

      {/* Header */}
      <header
        className={`border-b border-border/30 bg-background/80 backdrop-blur-xl sticky top-0 z-50 transition-all duration-700 ${
          headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm">Back to Home</span>
          </Link>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Design Partner Programme</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Info */}
          <div>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-xs mb-6 transition-all duration-700 ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Shield className="h-3 w-3 text-brand-400" />
              <span className="font-mono text-brand-400 uppercase tracking-wider">Limited Spots</span>
            </div>

            <h1
              className={`text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight mb-6 transition-all duration-700 delay-75 ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Become a{' '}
              <span className="text-gradient">Design Partner</span>
            </h1>

            <p
              className={`text-lg text-muted-foreground mb-10 leading-relaxed transition-all duration-700 delay-100 ${
                descVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Join our exclusive design partner programme and help shape the future of AI agent governance.
              Get early access, direct influence on the product roadmap, and dedicated support.
            </p>

            {/* Benefits */}
            <div
              className={`space-y-4 transition-all duration-700 delay-150 ${
                benefitsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground font-mono">What You Get</h3>
              <div className="grid gap-4">
                {[
                  { icon: Cpu, title: 'Early Access', description: 'Be among the first to use Sentinel before public launch', delay: 0 },
                  { icon: Users, title: 'Direct Input', description: 'Weekly calls with our team to shape features and roadmap', delay: 50 },
                  { icon: Building2, title: 'Dedicated Support', description: 'Priority support channel with our engineering team', delay: 100 },
                  { icon: Shield, title: 'Founding Pricing', description: 'Lock in special pricing as a founding partner', delay: 150 },
                ].map((benefit) => (
                  <BenefitCard
                    key={benefit.title}
                    icon={benefit.icon}
                    title={benefit.title}
                    description={benefit.description}
                    visible={benefitsVisible}
                    delay={benefit.delay}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div
            className={`transition-all duration-700 delay-200 ${
              formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-card/50 border border-border/50 rounded-2xl p-8 backdrop-blur-sm shadow-xl shadow-black/5">
              <h2 className="text-xl font-display font-semibold mb-6">Apply to Join</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className="transition-all duration-200 focus:scale-[1.01]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Work Email <span className="text-red-400">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className="transition-all duration-200 focus:scale-[1.01]"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Company <span className="text-red-400">*</span>
                    </label>
                    <Input
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Corp"
                      className="transition-all duration-200 focus:scale-[1.01]"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium mb-2">
                      Your Role <span className="text-red-400">*</span>
                    </label>
                    <Input
                      id="role"
                      name="role"
                      required
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="Head of Engineering"
                      className="transition-all duration-200 focus:scale-[1.01]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="agentCount" className="block text-sm font-medium mb-2">
                    How many AI agents are you running? <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="agentCount"
                    name="agentCount"
                    required
                    value={formData.agentCount}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all duration-200"
                  >
                    <option value="">Select an option</option>
                    <option value="1-5">1-5 agents</option>
                    <option value="6-20">6-20 agents</option>
                    <option value="21-50">21-50 agents</option>
                    <option value="50+">50+ agents</option>
                    <option value="planning">Planning to deploy</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="useCase" className="block text-sm font-medium mb-2">
                    Tell us about your use case
                  </label>
                  <textarea
                    id="useCase"
                    name="useCase"
                    value={formData.useCase}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 resize-none transition-all duration-200"
                    placeholder="What tools are your agents connecting to? What governance challenges are you facing?"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <Button type="submit" className="w-full group" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-0.5" />
                      Submit Application
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting, you agree to our Privacy Policy and Terms of Service.
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function BenefitCard({
  icon: Icon,
  title,
  description,
  visible,
  delay
}: {
  icon: typeof Cpu;
  title: string;
  description: string;
  visible: boolean;
  delay: number;
}) {
  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-xl border border-border/40 bg-card/30 hover:bg-card/50 hover:border-brand-500/20 transition-all duration-500 ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="shrink-0 w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
        <Icon className="w-5 h-5 text-brand-400" />
      </div>
      <div>
        <h4 className="font-display font-medium mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

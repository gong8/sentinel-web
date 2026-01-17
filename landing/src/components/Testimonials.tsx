import { useEffect, useRef, useState } from 'react';
import { Card } from './ui/card';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      "SENTINEL gave us the confidence to deploy AI agents in production. The granular policy control and audit logging are exactly what our compliance team needed.",
    author: 'Sarah Chen',
    role: 'VP of Engineering',
    company: 'TechCorp',
    avatar: 'SC',
  },
  {
    quote:
      "We went from zero visibility into agent tool usage to complete audit trails overnight. The DENY-first approach aligns perfectly with our security posture.",
    author: 'Michael Torres',
    role: 'Head of Security',
    company: 'FinanceAI',
    avatar: 'MT',
  },
  {
    quote:
      "The A2A protocol support is a game-changer. Managing agent-to-agent communication through one control plane simplified our architecture significantly.",
    author: 'Emily Watson',
    role: 'CTO',
    company: 'AgentOps',
    avatar: 'EW',
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

export function Testimonials() {
  const { ref, isInView } = useInView();

  return (
    <section
      id="testimonials"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/40 bg-card/30 text-xs mb-6">
            <Quote className="h-3 w-3 text-brand-400" />
            <span className="text-muted-foreground">What people say</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Trusted by <span className="text-gradient">security teams</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            See what engineering and security leaders are saying about SENTINEL.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.author}
              className={`group p-6 bg-card/40 backdrop-blur-sm border-border/40 hover:border-brand-500/30 hover:bg-card/60 transition-all duration-500 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Quote icon */}
              <div className="mb-4">
                <Quote className="h-8 w-8 text-brand-500/30" />
              </div>

              {/* Quote text */}
              <blockquote className="text-sm text-muted-foreground leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-500/20 to-brand-500/10 flex items-center justify-center text-sm font-semibold text-brand-400">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium">{testimonial.author}</div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Social proof stats */}
        <div
          className={`mt-16 flex flex-wrap justify-center gap-8 md:gap-16 transition-all duration-700 delay-500 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-gradient">50+</div>
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mt-1">
              Companies
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gradient">1M+</div>
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mt-1">
              Tool Calls Secured
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gradient">99.9%</div>
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mt-1">
              Uptime
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

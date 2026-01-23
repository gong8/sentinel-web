import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, ShieldX, FileX, Clock, Ban } from 'lucide-react';

const problems = [
  {
    icon: ShieldX,
    title: 'Overprivileged by Default',
    description: 'AI agents inherit full user permissions. Your intern\'s Claude has access to production databases.',
  },
  {
    icon: FileX,
    title: 'No Audit Trail',
    description: 'Tool calls aren\'t logged with context. When something goes wrong, you can\'t trace what happened.',
  },
  {
    icon: Clock,
    title: 'No Approval Workflows',
    description: 'Sensitive operations execute immediately. No human oversight before critical actions.',
  },
  {
    icon: Ban,
    title: 'No Kill Switch',
    description: 'No mechanism to revoke agent access in real-time. Once deployed, agents run unchecked.',
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
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}

export function Problem() {
  const { ref: sectionRef, isInView } = useInView();

  return (
    <section
      id="problem"
      className="py-28 relative overflow-hidden"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      {/* Background accents with noise */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-red-500/5 to-transparent blur-3xl -z-10 noise-gradient" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-red-500/5 to-transparent blur-3xl -z-10 noise-gradient" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-small opacity-20" />
      <div className="absolute inset-0 bg-dots opacity-10" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div
          className={`mx-auto max-w-3xl text-center mb-16 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-xs mb-6">
            <AlertTriangle className="h-3 w-3 text-red-400" />
            <span className="font-mono text-red-400 uppercase tracking-wider">The Problem</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            AI agents are a{' '}
            <span className="text-red-400">governance nightmare</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Enterprises are connecting AI agents to GitHub, databases, Slack, and payment systems.
            But there's no governance layer. No visibility. No control.
          </p>
        </div>

        {/* Problem cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.title}
                className={`group p-6 rounded-xl border border-red-500/20 bg-red-500/5 hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-500 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20">
                  <Icon className="h-5 w-5 text-red-400" />
                </div>
                <h3 className="text-sm font-semibold mb-2 text-red-300">
                  {problem.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Compliance callout */}
        <div
          className={`mt-12 p-6 rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm transition-all duration-700 delay-500 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm text-muted-foreground">
                <span className="font-mono font-semibold text-red-400">SOC 2</span>,{' '}
                <span className="font-mono font-semibold text-red-400">HIPAA</span>, and{' '}
                <span className="font-mono font-semibold text-red-400">EU AI Act</span>{' '}
                requirements cannot be met without agent governance.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

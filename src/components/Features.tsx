import { useEffect, useRef, useState } from 'react';
import { Shield, FileText, Key, Server, UserCheck, BarChart, Users } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const features = [
  {
    icon: Shield,
    title: 'Granular Policy Control',
    description:
      'DENY-first evaluation with wildcard support. Target users, roles, or agents.',
    badge: 'DENY-first',
    code: 'effect: "DENY"',
  },
  {
    icon: FileText,
    title: 'Complete Audit Trail',
    description:
      'Every tool invocation logged with full context, parameters, and policy snapshots.',
    badge: 'Compliant',
    code: 'audit.log()',
  },
  {
    icon: Key,
    title: 'Seamless Authentication',
    description:
      'OAuth 2.1 with PKCE for secure MCP server auth. User and org-level credentials.',
    badge: 'RFC 9728',
    code: 'oauth.pkce()',
  },
  {
    icon: Server,
    title: 'MCP + A2A Unified',
    description:
      'Connect MCP servers and A2A agents through one control plane. Auto-discover tools.',
    badge: 'Multi-Protocol',
    code: 'mcp + a2a',
  },
  {
    icon: Users,
    title: 'Agent-to-Agent Control',
    description:
      'Manage peer-to-peer agent collaboration with A2A protocol. Verify agent identity.',
    badge: 'A2A Ready',
    code: 'a2a.verify()',
  },
  {
    icon: UserCheck,
    title: 'Just-In-Time Access',
    description:
      'Users request access to tools they need. Admins approve or deny in real-time.',
    badge: 'Coming Soon',
    code: 'jit.request()',
  },
  {
    icon: BarChart,
    title: 'Usage Analytics',
    description:
      'Track tool usage patterns, identify top users and agents, find peak usage hours.',
    code: 'analytics.*',
  },
];

function useInView(options = {}) {
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
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px', ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}

export function Features() {
  const { ref: sectionRef, isInView: sectionInView } = useInView();
  const { ref: gridRef, isInView: gridInView } = useInView();

  return (
    <section
      id="features"
      className="py-28 relative overflow-hidden"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      {/* Background texture */}
      <div className="absolute inset-0 bg-dots opacity-30" />

      {/* Background accent */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-gradient-to-r from-brand-500/8 to-transparent blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-brand-500/8 to-transparent blur-3xl -z-10" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div
          className={`mx-auto max-w-2xl text-center mb-20 transition-all duration-700 ${
            sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/40 bg-card/30 text-xs mb-6">
            <span className="font-mono text-brand-400">7</span>
            <span className="text-muted-foreground">Core Features</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Everything you need to{' '}
            <span className="text-gradient">secure AI agents</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            SENTINEL provides a complete control plane for managing AI agents with tool access.
          </p>
        </div>

        <div
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          ref={gridRef as React.RefObject<HTMLDivElement>}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const delay = index * 100;

            return (
              <Card
                key={feature.title}
                className={`group p-6 bg-card/40 backdrop-blur-sm border-border/40 hover:border-brand-500/30 hover:bg-card/60 transition-all duration-500 ${
                  gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                {/* Icon with gradient background and hover animation */}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/20 to-brand-500/10 group-hover:from-brand-500/30 group-hover:to-brand-500/20 transition-all duration-300">
                  <Icon className="h-6 w-6 text-brand-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:text-brand-300" />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-lg font-semibold group-hover:text-brand-300 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Code snippet & Badge row */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/30">
                  <code className="text-[10px] font-mono text-brand-400/70 bg-brand-500/5 px-2 py-1 rounded">
                    {feature.code}
                  </code>
                  {feature.badge && (
                    <Badge
                      variant="secondary"
                      className="text-[10px] bg-brand-500/10 text-brand-300 border-brand-500/20"
                    >
                      {feature.badge}
                    </Badge>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

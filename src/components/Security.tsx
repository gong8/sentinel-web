import { useEffect, useRef, useState } from 'react';
import { Badge } from './ui/badge';
import { Shield, Lock, Eye, FileCheck, Users, Trash2, Code, Key } from 'lucide-react';

const securityFeatures = [
  { label: 'AES-256-GCM Encryption', icon: Lock },
  { label: 'OAuth 2.1 + PKCE', icon: Key },
  { label: 'DENY-first Evaluation', icon: Shield },
  { label: 'Organization Scoped', icon: Users },
  { label: 'Policy Snapshots', icon: FileCheck },
  { label: 'Admin Action Logs', icon: Eye },
  { label: 'Soft Delete & Recovery', icon: Trash2 },
  { label: 'Type-Safe Codebase', icon: Code },
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

export function Security() {
  const { ref: sectionRef, isInView } = useInView();

  return (
    <section
      id="security"
      className="py-28 relative overflow-hidden"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      {/* Background accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-t from-brand-500/10 via-brand-500/5 to-transparent blur-3xl -z-10" />

      {/* Grid texture */}
      <div className="absolute inset-0 bg-grid-small opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div
          className={`mx-auto max-w-2xl text-center mb-16 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/40 bg-card/30 text-xs mb-6">
            <Shield className="h-3 w-3 text-brand-400" />
            <span className="text-muted-foreground">Security First</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Enterprise-Grade{' '}
            <span className="text-gradient">Security</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Built from the ground up with security best practices. Every layer is designed for
            compliance and auditability.
          </p>
        </div>

        <div
          className={`flex flex-wrap justify-center gap-3 max-w-4xl mx-auto transition-all duration-700 delay-200 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Badge
                key={feature.label}
                variant="outline"
                className="group text-sm px-4 py-2.5 bg-card/30 backdrop-blur-sm border-border/40 hover:border-brand-500/40 hover:bg-brand-500/10 transition-all cursor-default flex items-center gap-2"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <Icon className="h-3.5 w-3.5 text-brand-400 group-hover:text-brand-300 transition-colors" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                  {feature.label}
                </span>
              </Badge>
            );
          })}
        </div>

        {/* Security visual */}
        <div
          className={`mt-16 mx-auto max-w-2xl transition-all duration-700 delay-400 ${
            isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="relative p-8 rounded-2xl border border-border/30 bg-card/20 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent rounded-2xl" />

            <div className="relative grid grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-display font-bold text-gradient">256</div>
                <div className="text-xs font-mono text-muted-foreground">bit encryption</div>
              </div>
              <div className="space-y-2 border-x border-border/30 px-4">
                <div className="text-3xl font-display font-bold text-gradient">100%</div>
                <div className="text-xs font-mono text-muted-foreground">audit coverage</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-display font-bold text-gradient">0</div>
                <div className="text-xs font-mono text-muted-foreground">trust by default</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

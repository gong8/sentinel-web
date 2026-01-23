import { CardSwap, Card } from './CardSwap';
import { Shield, Cog, FileCheck, Rocket } from 'lucide-react';

const useCases = [
  {
    icon: Shield,
    title: 'Security Teams',
    description: 'Control exactly what AI agents can access. Set DENY-first policies and get alerts when sensitive tools are invoked.',
    stat: '100%',
    statLabel: 'visibility',
  },
  {
    icon: Cog,
    title: 'Platform Engineers',
    description: 'Build secure agent infrastructure with a unified proxy for MCP and A2A protocols. One control plane for all agents.',
    stat: '1',
    statLabel: 'proxy',
  },
  {
    icon: FileCheck,
    title: 'Compliance Teams',
    description: 'Meet SOC 2, HIPAA, and EU AI Act requirements with complete audit trails and policy snapshots.',
    stat: '100%',
    statLabel: 'audit coverage',
  },
  {
    icon: Rocket,
    title: 'Engineering Leaders',
    description: 'Deploy AI agents to production with confidence. Approval workflows ensure humans stay in the loop for critical operations.',
    stat: '0',
    statLabel: 'unchecked actions',
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="py-28 relative">
      {/* Background accents with noise */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-brand-500/5 via-brand-500/10 to-brand-500/5 blur-3xl -z-10 rounded-full noise-gradient" />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-small opacity-15 -z-10" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/40 bg-card/30 text-xs mb-6">
              <span className="font-mono text-muted-foreground uppercase tracking-wider">Use Cases</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Who uses <span className="text-gradient">Sentinel</span>?
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              From security teams locking down agent permissions to engineering leaders
              deploying AI at scale — Sentinel gives every team the controls they need.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {useCases.map((useCase) => (
                <div key={useCase.title} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <useCase.icon className="h-4 w-4 text-brand-400" />
                  <span>{useCase.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card swap */}
          <div className="flex justify-center items-end min-h-[350px] pb-8 overflow-visible">
            <CardSwap
              width={340}
              height={200}
              cardDistance={40}
              verticalDistance={45}
              delay={3000}
              pauseOnHover={true}
            >
              {useCases.map((useCase) => (
                <Card
                  key={useCase.title}
                  className="border-white/15 bg-card/95 p-5 flex flex-col shadow-xl shadow-black/20"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-10 w-10 rounded-lg bg-brand-500/20 flex items-center justify-center">
                      <useCase.icon className="h-5 w-5 text-brand-400" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-brand-400">{useCase.stat}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{useCase.statLabel}</div>
                    </div>
                  </div>
                  <h3 className="text-base font-display font-semibold mb-2">{useCase.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                    {useCase.description}
                  </p>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
}

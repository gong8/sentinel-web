import { Button } from './ui/button';
import { ConstellationBackground, MouseSpotlight } from './ParticleBackground';

export function Hero() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Constellation background */}
      <div className="absolute inset-0 -z-5">
        <ConstellationBackground />
      </div>

      {/* Mouse-following spotlight */}
      <MouseSpotlight />

      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-brand-500/15 via-brand-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-60 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-brand-500/10 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Badge */}
        <div className="flex justify-center mb-8 animate-page-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 bg-card/30 backdrop-blur-sm text-xs">
            <span className="font-mono text-brand-400">Self-Hosted</span>
            <span className="text-muted-foreground">Authorisation Layer for AI Agents</span>
          </div>
        </div>

        {/* Text Content */}
        <div className="mx-auto max-w-4xl text-center animate-page-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
            Your AI agents have{' '}
            <span className="text-gradient">too much access</span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Sentinel is a proxy layer between your AI agents and their tools.
            Every tool call is evaluated against your policies, logged for compliance,
            and can require approval before execution.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
            <Button size="lg">
              Become a Design Partner
            </Button>
            <a
              href="#problem"
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>See the problem we solve</span>
              <span className="inline-block transition-transform group-hover:translate-y-0.5">
                &darr;
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

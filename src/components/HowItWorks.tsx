import { useEffect, useRef, useState, useMemo } from 'react';
import { Bot, Shield, Server, Users, Check, Activity, Lock } from 'lucide-react';
import { Card } from './ui/card';

function SyntaxHighlightedJSON({ code }: { code: string }) {
  const highlighted = useMemo(() => {
    // Simple JSON syntax highlighting
    return code
      .split('\n')
      .map((line, lineIndex) => {
        const parts: React.ReactNode[] = [];
        let remaining = line;
        let keyIndex = 0;

        // Match patterns and highlight
        while (remaining.length > 0) {
          // Match JSON key
          const keyMatch = remaining.match(/^(\s*)("[\w]+")(:)/);
          if (keyMatch) {
            parts.push(<span key={`ws-${lineIndex}-${keyIndex}`}>{keyMatch[1]}</span>);
            parts.push(
              <span key={`key-${lineIndex}-${keyIndex}`} className="text-brand-400">
                {keyMatch[2]}
              </span>
            );
            parts.push(
              <span key={`colon-${lineIndex}-${keyIndex}`} className="text-muted-foreground">
                {keyMatch[3]}
              </span>
            );
            remaining = remaining.slice(keyMatch[0].length);
            keyIndex++;
            continue;
          }

          // Match string value
          const stringMatch = remaining.match(/^(\s*)("(?:[^"\\]|\\.)*")(,?)/);
          if (stringMatch) {
            parts.push(<span key={`ws2-${lineIndex}-${keyIndex}`}>{stringMatch[1]}</span>);
            parts.push(
              <span key={`str-${lineIndex}-${keyIndex}`} className="text-emerald-400">
                {stringMatch[2]}
              </span>
            );
            parts.push(
              <span key={`comma-${lineIndex}-${keyIndex}`} className="text-muted-foreground">
                {stringMatch[3]}
              </span>
            );
            remaining = remaining.slice(stringMatch[0].length);
            keyIndex++;
            continue;
          }

          // Match brackets and braces
          const bracketMatch = remaining.match(/^([\[\]{}])/);
          if (bracketMatch) {
            parts.push(
              <span key={`bracket-${lineIndex}-${keyIndex}`} className="text-muted-foreground">
                {bracketMatch[1]}
              </span>
            );
            remaining = remaining.slice(1);
            keyIndex++;
            continue;
          }

          // Default: take one character
          parts.push(
            <span key={`char-${lineIndex}-${keyIndex}`} className="text-foreground">
              {remaining[0]}
            </span>
          );
          remaining = remaining.slice(1);
          keyIndex++;
        }

        return (
          <span key={`line-${lineIndex}`}>
            {parts}
            {lineIndex < code.split('\n').length - 1 && '\n'}
          </span>
        );
      });
  }, [code]);

  return <code>{highlighted}</code>;
}

const steps = [
  {
    number: '1',
    title: 'Connect Tools & Agents',
    description:
      'Add MCP servers and A2A agents. SENTINEL auto-discovers tools and verifies agent cards.',
    icon: Server,
    code: 'sentinel.connect()',
  },
  {
    number: '2',
    title: 'Define Policies',
    description:
      'Create granular access rules. Target users, roles, or agents. Use wildcards for flexibility.',
    icon: Shield,
    code: 'policy.create()',
  },
  {
    number: '3',
    title: 'Deploy with Confidence',
    description: 'Route requests through SENTINEL. Every call is evaluated, logged, and tracked.',
    icon: Bot,
    code: 'sentinel.deploy()',
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

export function HowItWorks() {
  const { ref: sectionRef, isInView: sectionInView } = useInView();
  const { ref: stepsRef, isInView: stepsInView } = useInView();

  return (
    <section
      id="how-it-works"
      className="py-28 relative bg-gradient-to-b from-transparent via-brand-500/[0.02] to-transparent overflow-hidden"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-brand-500/8 to-transparent blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-brand-500/5 to-transparent blur-3xl -z-10" />

      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-small opacity-15" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div
          className={`mx-auto max-w-2xl text-center mb-20 transition-all duration-700 ${
            sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/40 bg-card/30 text-xs mb-6">
            <span className="font-mono text-brand-400">3</span>
            <span className="text-muted-foreground">Simple Steps</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            How <span className="text-gradient">SENTINEL</span> Works
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            A unified control plane that sits between your agents and their capabilities.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="mb-20">
          <ArchitectureDiagram />
        </div>

        {/* Steps */}
        <div
          className="grid gap-6 md:grid-cols-3"
          ref={stepsRef as React.RefObject<HTMLDivElement>}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={step.number}
                className={`group p-6 bg-card/40 backdrop-blur-sm border-border/40 hover:border-brand-500/30 hover:bg-card/60 transition-all duration-500 ${
                  stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500/20 to-brand-500/10 text-brand-400 font-display font-bold text-lg group-hover:from-brand-500/30 group-hover:to-brand-500/20 transition-all">
                    {step.number}
                  </div>
                  <Icon className="h-5 w-5 text-muted-foreground group-hover:text-brand-400 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-brand-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {step.description}
                </p>
                <code className="text-[10px] font-mono text-brand-400/70 bg-brand-500/5 px-2 py-1 rounded">
                  {step.code}
                </code>
              </Card>
            );
          })}
        </div>

        {/* Code Examples */}
        <div className="mt-16">
          <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2">
            <Card className="overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
                <span className="text-xs text-muted-foreground font-mono">mcp-policy.json</span>
              </div>
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <SyntaxHighlightedJSON
                  code={`{
  "matchers": ["role:Engineer"],
  "toolPatterns": ["github.com::*"],
  "effect": "ALLOW"
}`}
                />
              </pre>
            </Card>
            <Card className="overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
                <span className="text-xs text-muted-foreground font-mono">a2a-policy.json</span>
              </div>
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <SyntaxHighlightedJSON
                  code={`{
  "matchers": ["agent:CodeReviewBot"],
  "toolPatterns": ["a2a-agent:geo-*"],
  "effect": "ALLOW"
}`}
                />
              </pre>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArchitectureDiagram() {
  return (
    <div className="relative mx-auto max-w-5xl">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 blur-3xl -z-10 scale-110" />

      {/* Main diagram container */}
      <div className="relative rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-6 md:p-8 overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Desktop Layout - 3 column with connectors */}
        <div className="hidden md:block relative">
          {/* Column headers */}
          <div className="grid grid-cols-3 gap-8 mb-6">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold text-center">
              Request Sources
            </div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold text-center">
              Control Plane
            </div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold text-center">
              Protected Resources
            </div>
          </div>

          {/* Main content row */}
          <div className="grid grid-cols-3 gap-8 items-center">
            {/* Left: Sources */}
            <div className="space-y-4">
              <SourceNode
                icon={Bot}
                label="AI Agents"
                sublabel="Claude, GPT, Custom"
                examples={['Code Assistant', 'Support Bot', 'Data Analyst']}
              />
              <SourceNode
                icon={Users}
                label="Human Users"
                sublabel="Via Agent Interfaces"
                examples={['Engineers', 'Analysts', 'Operators']}
              />
            </div>

            {/* Center: SENTINEL with connectors */}
            <div className="relative flex justify-center">
              {/* Left connector lines */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-8 flex flex-col justify-center gap-4">
                <ConnectorLine direction="right" delay={0} />
                <ConnectorLine direction="right" delay={0.3} />
              </div>

              {/* SENTINEL core */}
              <div className="relative group">
                {/* Outer glow ring */}
                <div className="absolute -inset-4 rounded-3xl bg-primary/20 blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Pulsing ring animation */}
                <div className="absolute -inset-2 rounded-2xl border border-primary/30 animate-pulse" />

                {/* Main capsule box */}
                <div className="relative rounded-2xl border-2 border-primary/50 bg-gradient-to-b from-card via-card to-card/80 px-8 py-6 shadow-2xl shadow-primary/20">
                  {/* Sentinel shield icon with glow */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/30 blur-lg rounded-full" />
                      <div className="relative p-3 rounded-xl bg-primary/10 border border-primary/20">
                        <Shield className="w-8 h-8 text-primary drop-shadow-[0_0_8px_rgba(78,0,255,0.6)]" />
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-xl font-bold tracking-tight">SENTINEL</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">Control Plane</div>
                    </div>

                    {/* Status indicators */}
                    <div className="flex items-center gap-3 mt-2">
                      <StatusPill icon={Check} label="Evaluate" color="emerald" />
                      <StatusPill icon={Activity} label="Log" color="blue" />
                      <StatusPill icon={Lock} label="Enforce" color="amber" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right connector lines */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-8 flex flex-col justify-center gap-4">
                <ConnectorLine direction="right" delay={0.6} />
                <ConnectorLine direction="right" delay={0.9} />
              </div>
            </div>

            {/* Right: Destinations */}
            <div className="space-y-4">
              <DestinationNode
                icon={Server}
                label="MCP Servers"
                sublabel="Tool Providers"
                protocol="MCP"
                items={['GitHub', 'Slack', 'AWS', 'Databases']}
              />
              <DestinationNode
                icon={Bot}
                label="Remote Agents"
                sublabel="Agent-to-Agent"
                protocol="A2A"
                items={['GeoRoute', 'Billing', 'Analytics']}
              />
            </div>
          </div>
        </div>

        {/* Mobile Layout - Vertical stack */}
        <div className="md:hidden space-y-6">
          {/* Sources */}
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold text-center mb-4">
              Request Sources
            </div>
            <div className="space-y-3">
              <SourceNode
                icon={Bot}
                label="AI Agents"
                sublabel="Claude, GPT, Custom"
                examples={['Code Assistant', 'Support Bot', 'Data Analyst']}
              />
              <SourceNode
                icon={Users}
                label="Human Users"
                sublabel="Via Agent Interfaces"
                examples={['Engineers', 'Analysts', 'Operators']}
              />
            </div>
          </div>

          {/* Mobile connector */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-1">
              <div className="w-0.5 h-6 bg-gradient-to-b from-border via-primary/50 to-primary rounded-full" />
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <div className="w-0.5 h-6 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
            </div>
          </div>

          {/* SENTINEL */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 rounded-3xl bg-primary/20 blur-xl opacity-60" />
              <div className="absolute -inset-2 rounded-2xl border border-primary/30 animate-pulse" />
              <div className="relative rounded-2xl border-2 border-primary/50 bg-gradient-to-b from-card via-card to-card/80 px-6 py-5 shadow-2xl shadow-primary/20">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/30 blur-lg rounded-full" />
                    <div className="relative p-2 rounded-xl bg-primary/10 border border-primary/20">
                      <Shield className="w-6 h-6 text-primary drop-shadow-[0_0_8px_rgba(78,0,255,0.6)]" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold tracking-tight">SENTINEL</div>
                    <div className="text-[10px] text-muted-foreground">Control Plane</div>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <StatusPill icon={Check} label="Evaluate" color="emerald" />
                    <StatusPill icon={Activity} label="Log" color="blue" />
                    <StatusPill icon={Lock} label="Enforce" color="amber" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile connector */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-1">
              <div className="w-0.5 h-6 bg-gradient-to-b from-primary via-primary/50 to-border rounded-full" />
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <div className="w-0.5 h-6 bg-gradient-to-b from-primary/50 to-border rounded-full" />
            </div>
          </div>

          {/* Destinations */}
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold text-center mb-4">
              Protected Resources
            </div>
            <div className="space-y-3">
              <DestinationNode
                icon={Server}
                label="MCP Servers"
                sublabel="Tool Providers"
                protocol="MCP"
                items={['GitHub', 'Slack', 'AWS', 'Databases']}
              />
              <DestinationNode
                icon={Bot}
                label="Remote Agents"
                sublabel="Agent-to-Agent"
                protocol="A2A"
                items={['GeoRoute', 'Billing', 'Analytics']}
              />
            </div>
          </div>
        </div>

        {/* Policy decision flow indicator */}
        <div className="mt-8 pt-6 border-t border-border/30">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-xs">
            <FlowStep number="1" label="Request received" />
            <FlowArrow />
            <FlowStep number="2" label="Policy evaluated" />
            <FlowArrow />
            <FlowStep number="3" label="Decision made" />
            <FlowArrow />
            <FlowStep number="4" label="Action logged" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SourceNode({
  icon: Icon,
  label,
  sublabel,
  examples,
}: {
  icon: typeof Bot;
  label: string;
  sublabel: string;
  examples: string[];
}) {
  return (
    <div className="group relative rounded-xl border border-border/60 bg-card/50 p-4 transition-all hover:border-border hover:bg-card/70">
      <div className="flex items-start gap-3">
        <div className="rounded-lg border border-border/80 bg-muted/30 p-2.5 group-hover:bg-muted/50 transition-colors">
          <Icon className="h-5 w-5 text-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm">{label}</div>
          <div className="text-[10px] text-muted-foreground">{sublabel}</div>
          <div className="flex flex-wrap gap-1 mt-2">
            {examples.map((ex) => (
              <span
                key={ex}
                className="inline-block px-1.5 py-0.5 rounded text-[9px] bg-muted/40 text-muted-foreground"
              >
                {ex}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DestinationNode({
  icon: Icon,
  label,
  sublabel,
  protocol,
  items,
}: {
  icon: typeof Server;
  label: string;
  sublabel: string;
  protocol: string;
  items: string[];
}) {
  return (
    <div className="group relative rounded-xl border border-border/60 bg-card/50 p-4 transition-all hover:border-border hover:bg-card/70">
      {/* Protocol badge */}
      <div className="absolute -top-2 right-3">
        <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-semibold bg-primary/10 text-primary border border-primary/20">
          {protocol}
        </span>
      </div>

      <div className="flex items-start gap-3">
        <div className="rounded-lg border border-border/80 bg-muted/30 p-2.5 group-hover:bg-muted/50 transition-colors">
          <Icon className="h-5 w-5 text-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm">{label}</div>
          <div className="text-[10px] text-muted-foreground">{sublabel}</div>
          <div className="flex flex-wrap gap-1 mt-2">
            {items.map((item) => (
              <span
                key={item}
                className="inline-block px-1.5 py-0.5 rounded text-[9px] bg-muted/40 text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusPill({
  icon: Icon,
  label,
  color,
}: {
  icon: typeof Check;
  label: string;
  color: 'emerald' | 'blue' | 'amber';
}) {
  const colorClasses = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  };

  return (
    <div
      className={`flex items-center gap-1 px-2 py-1 rounded-full border text-[9px] font-medium ${colorClasses[color]}`}
    >
      <Icon className="h-2.5 w-2.5" />
      {label}
    </div>
  );
}

function ConnectorLine({ direction, delay }: { direction: 'right' | 'left'; delay: number }) {
  return (
    <div className="relative h-0.5 w-full">
      {/* Base line with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-border/50 via-primary/30 to-border/50 rounded-full" />

      {/* Animated dot with glow trail */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.6) 50%, transparent 100%)',
          boxShadow: '0 0 8px hsl(var(--primary) / 0.6), 0 0 12px hsl(var(--primary) / 0.3)',
          animation:
            direction === 'right'
              ? `connectorDotRight 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite`
              : `connectorDotLeft 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
          animationDelay: `${delay}s`,
        }}
      />

      <style>{`
        @keyframes connectorDotRight {
          0% {
            left: -4px;
            opacity: 0;
            transform: translateY(-50%) scale(0.6);
          }
          10% {
            opacity: 0.6;
            transform: translateY(-50%) scale(0.9);
          }
          50% {
            opacity: 1;
            transform: translateY(-50%) scale(1);
          }
          90% {
            opacity: 0.6;
            transform: translateY(-50%) scale(0.9);
          }
          100% {
            left: calc(100% - 6px);
            opacity: 0;
            transform: translateY(-50%) scale(0.6);
          }
        }
        @keyframes connectorDotLeft {
          0% {
            right: -4px;
            opacity: 0;
            transform: translateY(-50%) scale(0.6);
          }
          10% {
            opacity: 0.6;
            transform: translateY(-50%) scale(0.9);
          }
          50% {
            opacity: 1;
            transform: translateY(-50%) scale(1);
          }
          90% {
            opacity: 0.6;
            transform: translateY(-50%) scale(0.9);
          }
          100% {
            right: calc(100% - 6px);
            opacity: 0;
            transform: translateY(-50%) scale(0.6);
          }
        }
      `}</style>
    </div>
  );
}

function FlowStep({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold">
        {number}
      </div>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="hidden sm:block text-muted-foreground/50">
      <svg className="h-3 w-6" viewBox="0 0 24 12" fill="none">
        <path
          d="M0 6h20m0 0l-4-4m4 4l-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

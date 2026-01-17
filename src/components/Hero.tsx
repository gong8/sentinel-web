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
            <span className="font-mono text-brand-400">MCP + A2A</span>
            <span className="text-muted-foreground">Unified Control Plane</span>
          </div>
        </div>

        {/* Text Content */}
        <div className="mx-auto max-w-4xl text-center animate-page-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
            The Control Plane for{' '}
            <span className="text-gradient">AI Agents</span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Unified authorization for{' '}
            <span className="font-mono text-brand-300/80 bg-brand-500/10 px-1.5 py-0.5 rounded">MCP</span>
            {' '}tools and{' '}
            <span className="font-mono text-brand-300/80 bg-brand-500/10 px-1.5 py-0.5 rounded">A2A</span>
            {' '}agent-to-agent calls. Define policies, audit everything.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
            <Button size="lg">
              Request a Demo
            </Button>
            <a
              href="#how-it-works"
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>See how it works</span>
              <span className="inline-block transition-transform group-hover:translate-y-0.5">
                &darr;
              </span>
            </a>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-24 relative animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-t from-brand-500/15 via-brand-500/5 to-transparent blur-3xl -z-10" />

          {/* Preview container */}
          <div className="relative mx-auto max-w-5xl rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm shadow-2xl shadow-brand-500/10 overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-muted/20">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/60" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <div className="h-3 w-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 mx-4">
                <div className="h-6 w-72 rounded-md bg-muted/40 mx-auto flex items-center justify-center px-3">
                  <span className="text-xs text-muted-foreground font-mono">
                    app.sentinel.dev/admin/dashboard
                  </span>
                </div>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="aspect-[16/10] bg-background/80 p-4">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardMockup() {
  return (
    <div className="h-full flex gap-4">
      {/* Sidebar */}
      <div className="w-48 bg-card/60 rounded-xl border border-border/40 p-3 hidden sm:block">
        <div className="space-y-2">
          <div className="h-4 w-20 text-[10px] flex items-center px-2 text-brand-400 font-mono">
            SENTINEL
          </div>
          <div className="h-9 w-full bg-brand-500/20 rounded-lg flex items-center px-3 text-xs text-foreground font-medium">
            Dashboard
          </div>
          {['Users', 'Policies', 'MCP Servers', 'Audit Log'].map((item) => (
            <div
              key={item}
              className="h-9 w-full bg-muted/20 rounded-lg flex items-center px-3 text-xs text-muted-foreground"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 space-y-4">
        {/* Header */}
        <div className="h-11 bg-card/60 rounded-xl border border-border/40 flex items-center px-4">
          <span className="text-sm font-medium">Dashboard</span>
          <span className="ml-auto text-xs font-mono text-muted-foreground bg-muted/30 px-2 py-1 rounded">
            org_acme
          </span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="Users" value="8" subtitle="Active" />
          <StatCard label="Policies" value="12" subtitle="5 DENY" accent />
          <StatCard label="MCP Servers" value="5" subtitle="23 tools" />
          <StatCard label="A2A Agents" value="4" subtitle="Verified" />
        </div>

        {/* Audit log preview */}
        <div className="flex-1 bg-card/60 rounded-xl border border-border/40 p-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground">Recent Activity</span>
            <span className="text-[10px] font-mono text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded">
              LIVE
            </span>
          </div>
          <div className="space-y-2">
            <AuditEntry tool="GitHub::createPR" user="sarah.chen" status="allowed" time="2m" />
            <AuditEntry tool="GitHub::pushCode" user="james.wilson" status="denied" time="5m" />
            <AuditEntry tool="Slack::sendMessage" user="david.kim" status="allowed" time="8m" />
            <AuditEntry tool="a2a::GeoRouteAgent" user="CodeReviewBot" status="allowed" time="12m" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  subtitle,
  accent,
}: {
  label: string;
  value: string;
  subtitle: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`bg-card/60 rounded-xl border p-3 ${accent ? 'border-brand-500/30 bg-brand-500/5' : 'border-border/40'}`}
    >
      <div className="text-[10px] text-muted-foreground mb-1 font-mono uppercase tracking-wider">
        {label}
      </div>
      <div className={`text-2xl font-display font-bold ${accent ? 'text-brand-400' : ''}`}>
        {value}
      </div>
      <div className="text-[10px] text-muted-foreground">{subtitle}</div>
    </div>
  );
}

function AuditEntry({
  tool,
  user,
  status,
  time,
}: {
  tool: string;
  user: string;
  status: 'allowed' | 'denied';
  time: string;
}) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors">
      <div className="h-7 w-7 rounded-lg bg-muted/30 flex items-center justify-center text-[9px] font-mono text-muted-foreground">
        {tool.split('::')[0].slice(0, 2).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-mono font-medium truncate">{tool}</div>
        <div className="text-[10px] text-muted-foreground truncate">
          {user} &middot; {time} ago
        </div>
      </div>
      <div
        className={`h-5 px-2 rounded text-[9px] font-mono font-semibold flex items-center ${
          status === 'allowed'
            ? 'bg-emerald-500/15 text-emerald-400'
            : 'bg-red-500/15 text-red-400'
        }`}
      >
        {status === 'allowed' ? 'ALLOW' : 'DENY'}
      </div>
    </div>
  );
}

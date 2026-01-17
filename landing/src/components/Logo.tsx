import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withGlow?: boolean;
}

export function Logo({ className, size = 'md', withGlow = false }: LogoProps) {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
    xl: 'w-16 h-16',
  };

  return (
    <div className={cn('relative', withGlow && 'drop-shadow-[0_0_12px_rgba(78,0,255,0.5)]')}>
      <img
        src="/logo.png"
        alt="Sentinel"
        className={cn(sizes[size], 'object-contain', className)}
      />
    </div>
  );
}

// Decorative floating capsules for bottom sections of the page
export function FloatingCapsules({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {/* Bottom area left - medium */}
      <div className="absolute bottom-[35%] left-[6%] w-14 h-14 opacity-[0.04] rotate-[-15deg] animate-float-slow">
        <img src="/logo.png" alt="" className="w-full h-full object-contain" />
      </div>

      {/* Bottom area right - large */}
      <div className="absolute bottom-[40%] right-[8%] w-16 h-16 opacity-[0.035] rotate-[20deg] animate-float-medium">
        <img src="/logo.png" alt="" className="w-full h-full object-contain" />
      </div>

      {/* Lower left - small */}
      <div className="absolute bottom-[15%] left-[12%] w-10 h-10 opacity-[0.03] rotate-[25deg] animate-float-fast">
        <img src="/logo.png" alt="" className="w-full h-full object-contain" />
      </div>

      {/* Lower right - medium */}
      <div className="absolute bottom-[20%] right-[15%] w-12 h-12 opacity-[0.035] rotate-[-20deg] animate-float-slow">
        <img src="/logo.png" alt="" className="w-full h-full object-contain" />
      </div>
    </div>
  );
}

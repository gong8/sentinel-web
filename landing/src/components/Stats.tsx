import { useEffect, useRef, useState, useCallback } from 'react';

const stats = [
  { value: 2639, label: 'Tests Passing', suffix: '+', prefix: '' },
  { value: 100, label: 'Phase 0 Complete', suffix: '%', prefix: '' },
  { value: 21, label: 'Admin Pages', suffix: '', prefix: '' },
  { value: 17, label: 'Database Models', suffix: '', prefix: '' },
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
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}

function useAnimatedCounter(end: number, isInView: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);

      if (currentCount !== countRef.current) {
        countRef.current = currentCount;
        setCount(currentCount);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    },
    [end, duration]
  );

  useEffect(() => {
    if (isInView) {
      requestAnimationFrame(animate);
    }
  }, [isInView, animate]);

  return count;
}

function AnimatedStat({
  value,
  label,
  suffix,
  prefix,
  isInView,
  delay,
}: {
  value: number;
  label: string;
  suffix: string;
  prefix: string;
  isInView: boolean;
  delay: number;
}) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const count = useAnimatedCounter(value, shouldAnimate, 2000);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShouldAnimate(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  const formattedCount = count.toLocaleString();

  return (
    <div
      className={`text-center transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-gradient">
        {prefix}
        {formattedCount}
        <span className="text-brand-400">{suffix}</span>
      </div>
      <div className="mt-3 text-sm font-mono text-muted-foreground uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

export function Stats() {
  const { ref, isInView } = useInView();

  return (
    <section
      className="py-20 border-y border-border/20 relative overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-500/[0.03] via-transparent to-brand-500/[0.03]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              prefix={stat.prefix}
              isInView={isInView}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

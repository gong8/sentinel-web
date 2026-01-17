import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-semibold tracking-[0.06em] transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-gradient-to-r from-brand-500/20 to-brand-400/20 text-brand-300',
        secondary: 'border-brand-500/20 bg-brand-500/10 text-brand-300',
        outline: 'border-border/50 text-muted-foreground hover:border-brand-500/30 hover:text-foreground',
        destructive: 'border-destructive/30 bg-destructive/10 text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

const Badge = ({ className, variant, ...props }: BadgeProps) => (
  <div className={cn(badgeVariants({ variant }), className)} {...props} />
);

export { Badge, badgeVariants };

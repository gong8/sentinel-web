import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold tracking-wide cursor-pointer transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background',
  {
    variants: {
      variant: {
        default:
          'bg-brand-500 text-white border border-brand-400/20 shadow-[0_2px_8px_-2px_rgba(78,0,255,0.4)] hover:bg-brand-400 hover:shadow-[0_4px_16px_-4px_rgba(78,0,255,0.5)] hover:-translate-y-px active:translate-y-0 active:bg-brand-500 active:shadow-[0_2px_8px_-2px_rgba(78,0,255,0.4)]',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border/50',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-border/50 bg-transparent text-foreground hover:bg-brand-500/10 hover:border-brand-500/30 hover:text-brand-300',
        ghost:
          'bg-transparent hover:bg-muted/50',
        link:
          'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 rounded-lg px-4 text-xs',
        lg: 'h-13 rounded-xl px-10 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = 'button', children, ...props }, ref) => (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  ),
);
Button.displayName = 'Button';

export { Button, buttonVariants };

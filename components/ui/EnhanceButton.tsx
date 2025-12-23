'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Sparkles, Loader2 } from 'lucide-react';

interface EnhanceButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children?: React.ReactNode;
}

export const EnhanceButton = forwardRef<HTMLButtonElement, EnhanceButtonProps>(
  ({ className, isLoading = false, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Base styles
          'relative group inline-flex items-center justify-center gap-2',
          'px-6 py-3 md:px-8 md:py-4',
          'rounded-xl md:rounded-2xl',
          'text-base md:text-lg font-semibold',
          // Gradient background
          'bg-gradient-to-r from-[var(--magic-glow)] via-[var(--accent)] to-[var(--magic-glow-secondary)]',
          'text-white',
          // Shadow
          'shadow-lg shadow-[var(--magic-glow)]/25',
          'hover:shadow-xl hover:shadow-[var(--magic-glow)]/40',
          // Hover scale
          'hover:scale-[1.02] active:scale-[0.98]',
          // Transitions
          'transition-all duration-300 ease-out',
          // Disabled state
          'disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100',
          className
        )}
        {...props}
      >
        {/* Glow effect on hover */}
        <div 
          className="absolute -inset-1 bg-gradient-to-r from-[var(--magic-glow)] via-[var(--accent)] to-[var(--magic-glow-secondary)] 
                     rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-60 
                     blur-lg transition-opacity duration-300"
          aria-hidden="true"
        />
        
        {/* Button content */}
        <span className="relative flex items-center gap-2">
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5" />
          )}
          <span>{children || 'Enhance'}</span>
        </span>
      </button>
    );
  }
);

EnhanceButton.displayName = 'EnhanceButton';

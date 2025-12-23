'use client';

import { useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  maxLength?: number;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function PromptInput({
  value,
  onChange,
  placeholder = 'Describe your idea...',
  disabled = false,
  className,
  maxLength = 2000,
  onFocus,
  onBlur,
}: PromptInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';
    // Set height to scrollHeight, with min and max constraints
    const newHeight = Math.min(Math.max(textarea.scrollHeight, 120), 300);
    textarea.style.height = `${newHeight}px`;
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={cn('relative w-full group', className)}>
      {/* Glow effect background */}
      <div 
        className="absolute -inset-0.5 bg-gradient-to-r from-[var(--magic-glow)] via-[var(--magic-glow-secondary)] to-[var(--magic-glow)] 
                   rounded-2xl opacity-0 group-hover:opacity-50 group-focus-within:opacity-75 
                   blur-xl transition-all duration-500 ease-out"
        aria-hidden="true"
      />
      
      {/* Main textarea container */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          rows={3}
          className={cn(
            // Base styles
            'w-full resize-none rounded-2xl px-5 py-4',
            'text-base md:text-lg leading-relaxed',
            // Colors
            'bg-[var(--card)] text-foreground',
            'placeholder:text-muted-foreground/60',
            // Border
            'border border-[var(--border)]',
            'focus:border-[var(--magic-glow)]',
            // Focus ring
            'focus:outline-none focus:ring-2 focus:ring-[var(--magic-glow)]/30',
            // Transitions
            'transition-all duration-300 ease-out',
            // Disabled state
            'disabled:cursor-not-allowed disabled:opacity-50',
            // Scrollbar styling
            'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[var(--muted)]'
          )}
          style={{
            minHeight: '120px',
            maxHeight: '300px',
          }}
        />
        
        {/* Character count */}
        {maxLength && (
          <div 
            className={cn(
              'absolute bottom-3 right-4 text-xs',
              'text-muted-foreground/50 transition-colors duration-200',
              value.length > maxLength * 0.9 && 'text-orange-400',
              value.length >= maxLength && 'text-destructive'
            )}
          >
            {value.length}/{maxLength}
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, X, Wand2 } from 'lucide-react';

export interface ProductTypeOption {
  id: string;
  label: string;
  icon?: string;
}

const DEFAULT_OPTIONS: ProductTypeOption[] = [
  { id: 'portfolio', label: 'Portfolio website', icon: '🎨' },
  { id: 'ecommerce', label: 'E-commerce store', icon: '🛒' },
  { id: 'startup', label: 'Startup landing page', icon: '🚀' },
  { id: 'improve', label: 'Improve my idea', icon: '✨' },
  { id: 'clearer', label: 'Make this clearer', icon: '💡' },
];

interface ProductTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options?: ProductTypeOption[];
  disabled?: boolean;
  className?: string;
}

export function ProductTypeSelector({
  value,
  onChange,
  options = DEFAULT_OPTIONS,
  disabled = false,
  className,
}: ProductTypeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find((opt) => opt.id === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSelect = (optionId: string) => {
    onChange(optionId);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <div ref={containerRef} className={cn('relative inline-flex', className)}>
      {/* Selected badge with remove button */}
      {selectedOption ? (
        <div
          className={cn(
            'inline-flex items-center gap-2',
            'px-3 py-1.5',
            'rounded-full',
            'text-sm font-medium',
            'bg-gradient-to-r from-[var(--magic-glow)]/20 to-[var(--magic-glow-secondary)]/20',
            'border border-[var(--magic-glow)]/50',
            'text-foreground',
          )}
        >
          {selectedOption.icon && <span>{selectedOption.icon}</span>}
          <span>{selectedOption.label}</span>
          <button
            type="button"
            onClick={handleClear}
            disabled={disabled}
            className={cn(
              'ml-1 p-0.5 rounded-full',
              'hover:bg-[var(--magic-glow)]/30',
              'transition-colors duration-150',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
            aria-label="Remove selection"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        /* Trigger button when nothing selected */
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            'inline-flex items-center gap-2',
            'px-3 py-1.5',
            'rounded-full',
            'text-sm font-medium',
            'bg-[var(--secondary)]/50',
            'border border-[var(--border)]',
            'text-muted-foreground',
            'hover:bg-[var(--secondary)]',
            'hover:border-[var(--magic-glow)]/30',
            'hover:text-foreground',
            'transition-all duration-200 ease-out',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            isOpen && 'border-[var(--magic-glow)]/50 bg-[var(--secondary)]'
          )}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <Wand2 className="w-4 h-4" />
          <span>Helper</span>
          <ChevronDown 
            className={cn(
              'w-3.5 h-3.5 transition-transform duration-200',
              isOpen && 'rotate-180'
            )} 
          />
        </button>
      )}

      {/* Dropdown menu */}
      <div
        className={cn(
          'absolute z-50 left-0 bottom-full mb-2',
          'min-w-[220px]',
          'bg-[var(--card)] border border-[var(--border)] rounded-xl',
          'shadow-xl shadow-black/30',
          'overflow-hidden',
          // Animation
          'transition-all duration-200 ease-out origin-bottom',
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
        )}
        role="listbox"
      >
        {/* Header */}
        <div className="px-3 py-2 border-b border-[var(--border)]">
          <span className="text-xs text-muted-foreground font-medium">
            Choose a helper
          </span>
        </div>
        
        {/* Options */}
        <div className="py-1">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5',
                'text-left text-sm',
                'text-foreground',
                'transition-colors duration-150',
                'hover:bg-[var(--accent)]/20',
                value === option.id && 'bg-[var(--magic-glow)]/10 text-[var(--magic-glow)]'
              )}
              role="option"
              aria-selected={value === option.id}
            >
              {option.icon && <span className="text-base">{option.icon}</span>}
              <span className="font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

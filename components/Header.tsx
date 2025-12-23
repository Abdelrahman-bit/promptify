'use client';

import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'px-4 sm:px-6 lg:px-8 py-4',
        'bg-[var(--background)]/80 backdrop-blur-md',
        'border-b border-[var(--border)]/30',
        className
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Sparkles 
              className="w-6 h-6 text-[var(--magic-glow)] group-hover:scale-110 transition-transform" 
            />
            <div 
              className="absolute inset-0 bg-[var(--magic-glow)] blur-md opacity-30 group-hover:opacity-50 transition-opacity"
              aria-hidden="true"
            />
          </div>
          <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[var(--magic-glow)] to-[var(--magic-glow-secondary)] bg-clip-text text-transparent">
            Promptify
          </span>
        </a>

        {/* Optional: Add nav items here later */}
        <nav className="hidden sm:flex items-center gap-6">
          {/* Future nav items */}
        </nav>
      </div>
    </header>
  );
}

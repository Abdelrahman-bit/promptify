'use client';

import { cn } from '@/lib/utils';
import { Sparkles, Heart } from 'lucide-react';
import Link from 'next/link';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className={cn(
        'relative z-10',
        'px-4 sm:px-6 lg:px-8 py-4',
        'bg-[var(--background)]/80 backdrop-blur-md',
        'border-t border-[var(--border)]/30',
        className
      )}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <Sparkles className="w-5 h-5 text-[var(--magic-glow)]" />
          <span className="text-sm font-semibold bg-gradient-to-r from-[var(--magic-glow)] to-[var(--magic-glow-secondary)] bg-clip-text text-transparent">
            Promptify
          </span>
        </a>

        {/* Copyright */}
        <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
          © {currentYear} Promptify. Made with 
          <Heart className="w-3 h-3 text-[var(--magic-glow)] fill-current" />
          by <Link href="https://abdelrahman-dev-ten.vercel.app/" target="_blank" className="underline">Abdelrahman Mohamed</Link>
        </p>

        {/* Optional: Links */}
        <nav className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
          {/* Future footer links */}
        </nav>
      </div>
    </footer>
  );
}

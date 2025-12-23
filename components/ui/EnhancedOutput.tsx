'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';

interface EnhancedOutputProps {
  content: string;
  isStreaming?: boolean;
  className?: string;
}

export function EnhancedOutput({ content, isStreaming = false, className }: EnhancedOutputProps) {
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom while streaming
  useEffect(() => {
    if (isStreaming && contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [content, isStreaming]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!content && !isStreaming) return null;

  return (
    <div className={cn('relative group h-full', className)}>
      {/* Glow effect */}
      <div 
        className="absolute -inset-0.5 bg-gradient-to-r from-[var(--magic-glow)] to-[var(--magic-glow-secondary)] 
                   rounded-2xl opacity-30 blur-lg"
        aria-hidden="true"
      />
      
      {/* Content container */}
      <div className="relative rounded-2xl bg-[var(--card)] border border-[var(--magic-glow)]/30 overflow-hidden h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)]/50 bg-[var(--secondary)]/30 shrink-0">
          <span className="text-xs font-medium text-[var(--magic-glow)]">
            ✨ Enhanced Prompt
          </span>
          <button
            onClick={handleCopy}
            disabled={!content}
            className={cn(
              'inline-flex items-center gap-1.5 px-2 py-1 rounded-md',
              'text-xs font-medium',
              'transition-all duration-200',
              copied 
                ? 'bg-green-500/20 text-green-400'
                : 'bg-[var(--secondary)] text-muted-foreground hover:text-foreground hover:bg-[var(--accent)]/20',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        </div>
        
        {/* Content with markdown */}
        <div 
          ref={contentRef}
          className="p-4 flex-1 overflow-y-auto text-sm prose-magic max-h-[400px]"
        >
          {content ? (
            <ReactMarkdown>{content}</ReactMarkdown>
          ) : (
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="inline-block w-2 h-4 bg-[var(--magic-glow)] animate-pulse rounded-sm" />
              <span>Generating enhanced prompt...</span>
            </div>
          )}
          {isStreaming && content && (
            <span className="inline-block w-2 h-4 ml-1 bg-[var(--magic-glow)] animate-pulse rounded-sm" />
          )}
        </div>
      </div>
    </div>
  );
}

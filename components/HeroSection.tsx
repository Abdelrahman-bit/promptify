'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { readStreamableValue } from '@ai-sdk/rsc';
import { PromptInput } from '@/components/ui/PromptInput';
import { ProductTypeSelector } from '@/components/ui/ProductTypeSelector';
import { EnhanceButton } from '@/components/ui/EnhanceButton';
import { EnhancedOutput } from '@/components/ui/EnhancedOutput';
import { enhancePrompt } from '@/app/actions';
import { cn } from '@/lib/utils';

// Dynamically import Orb to avoid SSR issues with WebGL
const Orb = dynamic(() => import('@/components/ui/Orb'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-[var(--magic-dark)] to-[var(--background)]" />
  ),
});

// Dynamically import TextType to avoid SSR issues with GSAP
const TextType = dynamic(() => import('@/components/ui/TextType'), {
  ssr: false,
  loading: () => (
    <span className="bg-gradient-to-r from-[var(--magic-glow)] via-[var(--accent)] to-[var(--magic-glow-secondary)] 
                     bg-clip-text text-transparent">
      Perfect Prompts
    </span>
  ),
});

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const [promptText, setPromptText] = useState('');
  const [productType, setProductType] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [isOrbActive, setIsOrbActive] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleEnhance = useCallback(async () => {
    if (!promptText.trim()) return;
    
    // Activate the Orb animation and clear previous output
    setIsOrbActive(true);
    setIsEnhancing(true);
    setEnhancedPrompt('');

    try {
      const { output } = await enhancePrompt(promptText, productType);

      // Stream the response
      for await (const delta of readStreamableValue(output)) {
        if (delta) {
          setEnhancedPrompt((prev) => prev + delta);
        }
      }
    } catch (error) {
      console.error('Enhancement failed:', error);
      setEnhancedPrompt('Failed to enhance prompt. Please try again.');
    } finally {
      setIsEnhancing(false);
      // Keep orb active for a moment after completion
      setTimeout(() => setIsOrbActive(false), 1000);
    }
  }, [promptText, productType]);

  const isEnhanceDisabled = !promptText.trim() || isEnhancing;
  const showOutput = enhancedPrompt || isEnhancing;

  return (
    <section 
      className={cn(
        'relative w-full overflow-hidden flex-1',
        'flex items-center justify-center',
        className
      )}
    >
      {/* Orb Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{ width: '100%', height: '100%', position: 'absolute' }}
      >
        <Orb
          hue={270} // Purple hue
          hoverIntensity={0.5}
          rotateOnHover={true}
          forceHoverState={isOrbActive}
          backgroundColor="#0a0514" // Magic dark background
        />
      </div>

      {/* Gradient overlays for depth */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none
                   bg-gradient-to-t from-[var(--background)] via-transparent to-transparent
                   opacity-80"
        aria-hidden="true"
      />
      <div 
        className="absolute inset-0 z-[1] pointer-events-none
                   bg-gradient-to-b from-[var(--background)] via-transparent to-transparent
                   opacity-50"
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
          
          {/* Headline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-foreground">Transform Your Ideas Into</span>
              <br />
              <span className="bg-gradient-to-r from-[var(--magic-glow)] via-[var(--accent)] to-[var(--magic-glow-secondary)] 
                             bg-clip-text text-transparent">
                <TextType
                  text={["Perfect Prompts", "Clear Instructions", "AI-Ready Ideas"]}
                  typingSpeed={75}
                  pauseDuration={2000}
                  showCursor={true}
                  cursorCharacter="|"
                  cursorClassName="text-[var(--magic-glow)]"
                  loop={true}
                />
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Enter your idea and let our AI enhance it into a clear, detailed prompt 
              that any AI can understand and build.
            </p>
          </div>

          {/* Side-by-side layout on large screens, column on small */}
          <div className={cn(
            'w-full',
            showOutput ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'max-w-2xl'
          )}>
            {/* Input Card */}
            <div className="w-full">
              <div className="relative rounded-2xl bg-[var(--card)]/80 backdrop-blur-sm border border-[var(--border)] p-4 md:p-5 space-y-4 h-full">
                {/* Glow effect */}
                <div 
                  className="absolute -inset-0.5 bg-gradient-to-r from-[var(--magic-glow)] via-[var(--magic-glow-secondary)] to-[var(--magic-glow)] 
                             rounded-2xl opacity-0 group-hover:opacity-30 
                             blur-xl transition-all duration-500 -z-10"
                  aria-hidden="true"
                />

                {/* Prompt Input */}
                <PromptInput
                  value={promptText}
                  onChange={setPromptText}
                  placeholder="Describe your idea... e.g., 'A photography portfolio with modern, minimal design'"
                  disabled={isEnhancing}
                  onFocus={() => setIsOrbActive(true)}
                  onBlur={() => !isEnhancing && setIsOrbActive(false)}
                />

                {/* Bottom toolbar */}
                <div className="flex items-center justify-between gap-3 pt-2 border-t border-[var(--border)]/50">
                  {/* Left side - Helper dropdown */}
                  <ProductTypeSelector
                    value={productType}
                    onChange={setProductType}
                    disabled={isEnhancing}
                  />

                  {/* Right side - Enhance Button */}
                  <EnhanceButton
                    onClick={handleEnhance}
                    disabled={isEnhanceDisabled}
                    isLoading={isEnhancing}
                  >
                    {isEnhancing ? 'Enhancing...' : 'Enhance'}
                  </EnhanceButton>
                </div>
              </div>
            </div>

            {/* Enhanced Output - shows when content exists */}
            {showOutput && (
              <div className="w-full min-h-[300px] lg:min-h-0">
                <EnhancedOutput
                  content={enhancedPrompt}
                  isStreaming={isEnhancing}
                  className="h-full"
                />
              </div>
            )}
          </div>

          {/* Feature hints */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs sm:text-sm text-muted-foreground/70">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--magic-glow)]" />
              AI-Powered Enhancement
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              Clear & Detailed Output
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--magic-glow-secondary)]" />
              Ready to Copy & Paste
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

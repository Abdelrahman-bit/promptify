'use server';

import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from '@ai-sdk/rsc';

const SYSTEM_PROMPTS: Record<string, string> = {
  portfolio: `You are an expert prompt engineer specializing in portfolio website design prompts.
Transform the user's idea into a detailed, comprehensive prompt that an AI can use to build a stunning portfolio website.
Include specific details about:
- Visual design (colors, typography, layout)
- Sections (hero, about, projects, contact)
- Interactive elements and animations
- Responsive behavior
- Modern design patterns
Keep the enhanced prompt clear, actionable, and well-structured.`,

  ecommerce: `You are an expert prompt engineer specializing in e-commerce website prompts.
Transform the user's idea into a detailed, comprehensive prompt that an AI can use to build a functional e-commerce store.
Include specific details about:
- Product display and categories
- Shopping cart and checkout flow
- User authentication
- Payment integration considerations
- Search and filtering
- Mobile-first design
Keep the enhanced prompt clear, actionable, and well-structured.`,

  startup: `You are an expert prompt engineer specializing in startup landing page prompts.
Transform the user's idea into a detailed, comprehensive prompt that an AI can use to build a conversion-focused landing page.
Include specific details about:
- Hero section with clear value proposition
- Feature highlights
- Social proof and testimonials
- Call-to-action placement
- Lead capture forms
- Modern, professional aesthetics
Keep the enhanced prompt clear, actionable, and well-structured.`,

  improve: `You are an expert prompt engineer focused on improving ideas and adding clarity.
Take the user's rough idea and enhance it with:
- More specific details and requirements
- Clear structure and organization
- Technical considerations
- User experience aspects
- Potential edge cases
Transform vague concepts into detailed, actionable specifications.`,

  clearer: `You are an expert at simplifying and clarifying complex ideas.
Take the user's input and:
- Remove ambiguity
- Simplify complex concepts
- Add clear, specific language
- Structure the information logically
- Make it easy for any AI to understand and implement
Keep the essence but make it crystal clear.`,

  default: `You are an expert prompt engineer.
Transform the user's idea into a detailed, well-structured prompt that any AI can understand and implement.
Add clarity, specificity, and actionable details while preserving the user's original intent.
Make the enhanced prompt comprehensive yet easy to follow.`,
};

export async function enhancePrompt(input: string, helperType: string) {
  const stream = createStreamableValue('');

  const systemPrompt = SYSTEM_PROMPTS[helperType] || SYSTEM_PROMPTS.default;

  (async () => {
    try {
      const { textStream } = streamText({
        model: openai('gpt-4o-mini'),
        system: systemPrompt,
        prompt: `Please enhance this prompt:\n\n"${input}"\n\nProvide only the enhanced prompt, no explanations or preamble.`,
      });

      for await (const delta of textStream) {
        stream.update(delta);
      }

      stream.done();
    } catch (error) {
      console.error('Error enhancing prompt:', error);
      stream.error(error instanceof Error ? error : new Error('Failed to enhance prompt'));
    }
  })();

  return { output: stream.value };
}

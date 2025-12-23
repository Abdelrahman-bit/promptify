# ✨ Promptify

> Transform your rough ideas into clear, detailed prompts that any AI can understand and build.

![Promptify Banner](https://img.shields.io/badge/Promptify-AI%20Prompt%20Enhancement-8B5CF6?style=for-the-badge&logo=openai&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=flat-square&logo=openai&logoColor=white)

---

## 🚀 Features

- **AI-Powered Enhancement** — Uses OpenAI GPT-4o-mini to transform vague ideas into comprehensive prompts
- **Real-time Streaming** — Watch your enhanced prompt generate in real-time
- **Smart Helpers** — Choose from 5 specialized modes:
  - 🎨 Portfolio Website
  - 🛒 E-commerce Store
  - 🚀 Startup Landing Page
  - ✨ Improve My Idea
  - 💡 Make This Clearer
- **One-Click Copy** — Instantly copy the enhanced prompt to your clipboard
- **Responsive Design** — Side-by-side layout on desktop, stacked on mobile
- **Beautiful UI** — Dark theme with magic purple glow effects and smooth animations

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [AI SDK](https://sdk.vercel.ai/) | Streaming AI responses |
| [OpenAI](https://openai.com/) | GPT-4o-mini for prompt enhancement |
| [GSAP](https://gsap.com/) | Text typing animations |
| [OGL](https://github.com/oframe/ogl) | WebGL orb background effect |

---

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abdelrahman-bit/promptify.git
   cd promptify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   OPENAI_API_KEY=your-openai-api-key-here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🎯 Usage

1. **Enter your idea** — Type a rough description of what you want to build
2. **Select a helper** (optional) — Choose a specialized mode for better results
3. **Click Enhance** — Watch as AI transforms your idea into a detailed prompt
4. **Copy & Use** — Click the copy button and paste into your favorite AI tool

---

## 📁 Project Structure

```
promptify/
├── app/
│   ├── actions.ts        # Server actions for AI streaming
│   ├── globals.css       # Global styles + custom scrollbar
│   ├── layout.tsx        # Root layout with SEO metadata
│   └── page.tsx          # Home page
├── components/
│   ├── ui/
│   │   ├── EnhanceButton.tsx
│   │   ├── EnhancedOutput.tsx
│   │   ├── Orb.tsx              # WebGL background
│   │   ├── ProductTypeSelector.tsx
│   │   ├── PromptInput.tsx
│   │   └── TextType.tsx         # Typing animation
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── HeroSection.tsx
└── .env.local            # Environment variables (create this)
```

---

## 🎨 Customization

### Colors
The magic purple theme is defined in `app/globals.css`:
```css
--magic-glow: oklch(0.65 0.28 285);
--magic-glow-secondary: oklch(0.55 0.22 300);
--magic-dark: oklch(0.05 0.025 280);
```

### AI System Prompts
Customize the enhancement prompts in `app/actions.ts` under `SYSTEM_PROMPTS`.

---

## 📄 License

MIT © [Abdelrahman Mohamed](https://abdelrahman-dev-ten.vercel.app/)

---

<p align="center">
  Made with 💜 by <a href="https://abdelrahman-dev-ten.vercel.app/">Abdelrahman Mohamed</a>
</p>

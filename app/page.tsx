import { HeroSection } from '@/components/HeroSection';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="dark h-screen bg-background flex flex-col overflow-hidden">
      <Header />
      <HeroSection />
      <Footer />
    </main>
  );
}

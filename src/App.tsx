import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Problem } from './components/Problem/Problem';
import { Story } from './components/Story/Story';
import { Solution } from './components/Solution/Solution';
import { HowItWorks } from './components/HowItWorks/HowItWorks';
import { AISection } from './components/AISection/AISection';
import { Features } from './components/Features/Features';
import { Tracking } from './components/Tracking/Tracking';
import { Screenshots } from './components/Screenshots/Screenshots';
import { Versions } from './components/Versions/Versions';
import { Security } from './components/Security/Security';
import { Audience } from './components/Audience/Audience';
import { FAQ } from './components/FAQ/FAQ';
import { CTA } from './components/CTA/CTA';
import { Footer } from './components/Footer/Footer';
import { useScrollDepth } from './lib/useScrollDepth';

export default function App() {
  useScrollDepth();

  return (
    <>
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <Story />
        <Problem />
        <Solution />
        <HowItWorks />
        <AISection />
        <Features />
        <Tracking />
        <Screenshots />
        <Versions />
        <Security />
        <Audience />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

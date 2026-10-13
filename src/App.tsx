import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Highlights } from './components/Highlights/Highlights';
import { HowItWorks } from './components/HowItWorks/HowItWorks';
import { Assistant } from './components/Assistant/Assistant';
import { Family } from './components/Family/Family';
import { Accessibility } from './components/Accessibility/Accessibility';
import { Gallery } from './components/Gallery/Gallery';
import { Story } from './components/Story/Story';
import { Security } from './components/Security/Security';
import { FAQ } from './components/FAQ/FAQ';
import { FinalCTA } from './components/FinalCTA/FinalCTA';
import { Footer } from './components/Footer/Footer';
import { useScrollDepth } from './lib/useScrollDepth';
import { useRevealAll } from './lib/useReveal';

export default function App() {
  useScrollDepth();
  useRevealAll();

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Highlights />
        <HowItWorks />
        <Assistant />
        <Family />
        <Accessibility />
        <Gallery />
        <Story />
        <Security />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

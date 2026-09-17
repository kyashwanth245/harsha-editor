import CustomCursor from './components/CustomCursor.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Showreel from './components/Showreel.jsx';
import Work from './components/Work.jsx';
import Services from './components/Services.jsx';
import About from './components/About.jsx';
import WhyWorkWithMe from './components/WhyWorkWithMe.jsx';
import CTA from './components/CTA.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <a href="#home" className="skip-link">
        Skip to content
      </a>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Showreel />
        <Work />
        <Services />
        <About />
        <WhyWorkWithMe />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

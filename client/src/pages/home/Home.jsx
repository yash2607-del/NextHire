import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero.jsx';
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';
import Features from '../../components/Features.jsx';

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features/>
      <Contact />
      <Footer />
    </>
  );
}

export default Home;
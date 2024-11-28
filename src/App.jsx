import About from './sections/About.jsx';
import Footer from './sections/Footer.jsx';
import Navbar from './sections/Navbar.jsx';
import Contact from './sections/Contact.jsx';
import Projects from './sections/Projects.jsx';
import NewHero from './sections/NewHero.jsx';

const App = () => {
  return (
    <main className="max-w-7xl mx-auto relative">
      <Navbar />
      <NewHero />
      <About />
      <Projects />     
      <Contact />
      <Footer />
    </main>
  );
};

export default App;

import { useState } from 'react';
import { Github, Linkedin } from 'lucide-react';
import { navLinks } from '../constants/index.js';

const CustomLogo = () => (
  <img 
  src="assets/Favicon.png" 
  alt="Logo"
  className="w-6 h-6 object-contain"
/>
);

const NavItems = ({ onClick = () => {} }) => (
  <ul className="nav-ul">
    {navLinks.map((item) => (
      <li key={item.id} className="nav-li">
        <a href={item.href} className="nav-li_a" onClick={onClick}>
          {item.name}
        </a>
      </li>
    ))}
  </ul>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);        

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-4 mx-auto c-space">
          <nav className="hidden sm:block">
            <div className="bg-white/10 px-8 py-2 rounded-full">
              <NavItems />
            </div>
          </nav>
          <a 
            href="/" 
            className="absolute left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-colors hidden sm:block"
          >
            <CustomLogo />
          </a>
          <a 
            href="/" 
            className="text-white/80 hover:text-white transition-colors sm:hidden"
          >
            <CustomLogo />
          </a>

          <div className="hidden sm:flex items-center space-x-6">
            <a
              href="https://github.com/atomar1"
              className="text-white/80 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/anshtomar/"
              className="text-white/80 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={20} />
            </a>
          </div>

          <button
            onClick={toggleMenu}
            className="text-white/80 hover:text-white focus:outline-none sm:hidden flex"
            aria-label="Toggle menu"
          >
            <img 
              src={isOpen ? 'assets/close.svg' : 'assets/menu.svg'} 
              alt="toggle" 
              className="w-6 h-6" 
            />
          </button>
        </div>
      </div>

      <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <nav className="p-5">
          <NavItems onClick={closeMenu} />
          <div className="flex items-center justify-center space-x-6 mt-6">
            <a
              href="https://github.com/atomar1"
              className="text-white/80 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/anshtomar/"
              className="text-white/80 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
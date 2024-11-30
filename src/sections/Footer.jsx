const Footer = () => {
    return (
      <footer className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
        <div className="text-white-500 flex gap-2">
          <p>Crafted with Passion </p>
          <p>🤍</p>
        </div>
  
        <div className="flex gap-3 justify-center">
          <div className="social-icon flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
            <a href="https://github.com/atomar1" target="_blank" rel="noopener noreferrer">
              <img src="/3d-portfolio/public/assets/github.svg" alt="github" className="w-6 h-6 transition-colors duration-200 hover:fill-white" />
            </a>
          </div>
          <div className="social-icon flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
            <a href="https://www.linkedin.com/in/anshtomar/" target="_blank" rel="noopener noreferrer">
              <img src="/3d-portfolio/public/assets/linkedin.svg" alt="linkedin" className="w-6 h-6 transition-colors duration-200 hover:fill-white" />
            </a>
          </div>
        </div>
  
        <p className="text-white-500">© 2024 Ansh Tomar. All rights reserved.</p>
      </footer>
    );
  };
  
  export default Footer;
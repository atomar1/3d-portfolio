import { Leva } from 'leva';
import { Suspense, useMemo} from 'react';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { PerspectiveCamera } from '@react-three/drei';
//
import Cube from '../components/Cube.jsx';
import Rings from '../components/Rings.jsx';
import ReactLogo from '../components/ReactLogo.jsx';
import Button from '../components/Button.jsx';
import Target from '../components/Target.jsx'; 
import CanvasLoader from '../components/CanvasLoader.jsx';
import HeroCamera from '../components/HeroCamera.jsx'; 
import { calculateSizes } from '../constants/index.js'
import  HackerRoom  from '../components/HackerRoom.jsx';
//
const Hero = () => {
   // Use media queries to determine screen size
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const isWideScreen = useMediaQuery({ minWidth: 1440 });
  const isUltraWide = useMediaQuery({ minWidth: 1920 });

  const sizes = useMemo(() => 
    calculateSizes(isSmall, isMobile, isTablet), 
    [isSmall, isMobile, isTablet]
  );

  return (    <section className="relative min-h-screen w-full flex flex-col">
    {/* Content Container */}
    <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center lg:justify-between 
                    max-w-[2000px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
      {/* Left side content */}
      <div className="w-full lg:w-1/2 z-10 flex flex-col items-center lg:items-start 
                    sm:mt-36 mt-20 gap-3 lg:gap-6">
        <p className="sm:text-3xl text-xl font-medium text-white/95 font-montserrat 
                    lg:text-4xl xl:text-5xl">
          Hi, I am Ansh <span className="waving-hand">👋</span>
        </p>
        <p className="hero_tag text-gray_gradient lg:text-left lg:text-4xl xl:text-5xl">
          Building Full Stack Applications
        </p>
        
        {/* Move button up on larger screens */}
        <div className="hidden lg:block mt-8">
          <a href="#about" className="w-fit">
            <Button 
              name="Let's work together" 
              isBeam 
              containerClass="w-fit min-w-[250px] xl:min-w-[300px]" 
            />
          </a>
        </div>
      </div>

      {/* Right side - 3D Canvas */}
      <div className="w-full lg:w-1/2 h-full absolute lg:relative inset-0 lg:inset-auto">
        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}>
            <Leva hidden/>
            <PerspectiveCamera 
              makeDefault 
              position={[0, 0, isWideScreen ? 35 : 30]} 
            />

            <HeroCamera isMobile={isMobile}>
              <HackerRoom 
                scale={isWideScreen ? sizes.deskScale * 1.2 : sizes.deskScale} 
                position={sizes.deskPosition} 
                rotation={[0.1, -Math.PI, 0]} 
              />
            </HeroCamera>

            <group>
              <Target position={sizes.targetPosition} />
              <ReactLogo position={sizes.reactLogoPosition} />
              <Rings position={sizes.ringPosition} />
              <Cube position={sizes.cubePosition} />
            </group>

            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />
          </Suspense>
        </Canvas>
      </div>
    </div>

    {/* Bottom button - only visible on mobile/tablet */}
    <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space lg:hidden">
      <a href="#about" className="w-fit">
        <Button 
          name="Let's work together" 
          isBeam 
          containerClass="sm:w-fit w-full sm:min-w-96" 
        />
      </a>
    </div>
  </section>
  );
};

export default Hero; 
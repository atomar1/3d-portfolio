import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, MeshReflectorMaterial, BakeShadows } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
import { easing } from 'maath'
import { suspend } from 'suspend-react'
import { Instances, Computers } from '../components/Computers.jsx'
import { useMediaQuery } from 'react-responsive'
import { useMemo } from 'react'
import { calculateSizes } from '../constants/index.js'
import Button from '../components/Button.jsx'


const suzi = import('@pmndrs/assets/models/bunny.glb')

const Hero = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 })
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 })

  const sizes = useMemo(() => 
    calculateSizes(isSmall, isMobile, isTablet), 
    [isSmall, isMobile, isTablet]
  )

  return (
    <section className="relative h-screen w-full overflow-hidden" id="home">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 w-full h-full">
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [-1.5, 1, 5.5], fov: 45, near: 1, far: 20 }}
          eventSource={document.getElementById('root')}
          eventPrefix="client"
          className="w-full h-full"
        >
          <color attach="background" args={['black']} />
          <hemisphereLight intensity={0.15} groundColor="black" />
          <spotLight
            decay={0}
            position={[10, 20, 10]}
            angle={0.12}
            penumbra={1}
            intensity={1}
            castShadow
            shadow-mapSize={1024}
          />

          <group position={isMobile ? [0, -1, 0] : [1.8, -1, 0]}>
            <Instances>
              <Computers scale={isMobile ? 0.28 : 0.35} />
            </Instances>
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[50, 50]} />
              <MeshReflectorMaterial
                blur={[300, 30]}
                resolution={2048}
                mixBlur={1}
                mixStrength={180}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#202020"
                metalness={0.8}
              />
            </mesh>
            <Bun scale={isMobile ? 0.23 : 0.3} position={[0, 0.3, 0.5]} rotation={[0, -Math.PI * 0.85, 0]} />
            <pointLight distance={1.5} intensity={1} position={[-0.15, 0.7, 0]} color="orange" />
          </group>
          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={0} mipmapBlur luminanceSmoothing={0.0} intensity={5} />
            <DepthOfField target={[2, 0, 13]} focalLength={0.3} bokehScale={15} height={700} />
          </EffectComposer>
          <CameraRig />
          <BakeShadows />
        </Canvas>
      </div>

{/* Content Overlay - Large Screens */}
<div className="relative z-10 h-full hidden lg:block">
  <div className="max-w-[2000px] mx-auto w-full h-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
    <div className="h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between">
      {/* Left side content */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start sm:mt-36 mt-20 gap-3 lg:gap-6">
        <p className="sm:text-2xl text-xl font-medium text-white/95 font-montserrat lg:text-3xl xl:text-4xl">
          hey there, I am Ansh!
        </p>
        <p className="hero_tag text-gray_gradient lg:text-left lg:text-4xl xl:text-5xl">
          Full-stack dev & technology enthusiast
        </p>
        <div className="mt-8">
          <a href="#about" className="w-fit">
            <Button
              name="Collaborate with Me"
              isBeam
              containerClass="w-fit min-w-[250px] xl:min-w-[300px]"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

{/* Content Overlay - Mobile Screens */}
<div className="relative z-20 px-4 sm:px-6 lg:hidden pt-20"> {/* Added pt-20 to push content down */}
  <div className="max-w-[2000px] mx-auto w-full flex flex-col items-center gap-3 lg:gap-6">
    <p className="sm:text-2xl text-xl font-medium text-white/95 font-montserrat lg:text-3xl xl:text-4xl">
      hey there, I am Ansh!
    </p>
    <p className="hero_tag text-gray_gradient lg:text-left lg:text-4xl xl:text-5xl">
      Full-stack dev & technology enthusiast
    </p>
  </div>
</div>


{/* Mobile/Tablet button */}
<div className="absolute bottom-7 left-0 right-0 w-full lg:hidden">
  <div className="px-4 sm:px-6">
    <a href="#about" className="w-fit">
      <Button
        name="Collaborate with Me"
        isBeam
        containerClass="sm:w-fit w-full sm:min-w-96"
      />
    </a>
  </div>
</div>
    </section>
  )
}

function Bun(props) {
  const { nodes } = useGLTF(suspend(suzi).default)
  return (
    <mesh receiveShadow castShadow geometry={nodes.mesh.geometry} {...props}>
      <meshStandardMaterial color="#222" roughness={0.5} />
    </mesh>
  )
}

function CameraRig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [-1 + (state.pointer.x * state.viewport.width) / 3, (1 + state.pointer.y) / 2, 5.5],
      0.5,
      delta
    )
    state.camera.lookAt(0, 0, 0)
  })
}

export default Hero
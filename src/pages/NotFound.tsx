import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Home, ArrowLeft } from "lucide-react";
import * as THREE from "three";
import { Navigation } from "@/components/Navigation";

const Floating404: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[1.5, 0.4, 16, 100]} />
        <meshStandardMaterial
          color="#ff6b9d"
          wireframe
          transparent
          opacity={0.6}
          emissive="#ff6b9d"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.4, 16, 100]} />
        <meshStandardMaterial
          color="#4ecdc4"
          wireframe
          transparent
          opacity={0.6}
          emissive="#4ecdc4"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
};

const GlitchParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = React.useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};

const Scene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff6b9d" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.5}
        penumbra={1}
        intensity={0.5}
        color="#4ecdc4"
      />
      <GlitchParticles />
      <Floating404 />
    </>
  );
};

const NotFound: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full bg-black text-white antialiased relative overflow-hidden">
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-black bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:16px_16px]"></div>

      {/* Three.js Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-20 opacity-40">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ alpha: true, antialias: true }}
        >
          <Scene />
        </Canvas>
      </div>

      <Navigation />

      <main className="container mx-auto px-4 pt-32 pb-16 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-2xl">
          {/* 404 Text */}
          <h1 className="text-9xl md:text-[12rem] font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-300 to-gray-600 tracking-tighter animate-pulse">
            404
          </h1>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-400 mb-2">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <p className="text-sm text-gray-500 font-mono">
              {location.pathname}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg transition-all duration-300 group font-medium"
            >
              <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>Go Home</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-300 group font-medium"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span>Go Back</span>
            </button>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-gray-500 text-sm mb-4">Looking for something?</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/"
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-400 hover:text-white transition-all"
              >
                Projects
              </Link>
              <a
                href="https://github.com/compiling"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-400 hover:text-white transition-all"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;

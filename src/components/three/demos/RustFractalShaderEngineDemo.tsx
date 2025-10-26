import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const FractalSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shaderData = useMemo(() => {
    return {
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        // Mandelbrot-inspired fractal calculation
        vec3 mandelbrot(vec2 c, float time) {
          vec2 z = vec2(0.0);
          float iterations = 0.0;
          float maxIterations = 32.0;
          
          for (float i = 0.0; i < 32.0; i++) {
            if (dot(z, z) > 4.0) break;
            
            z = vec2(
              z.x * z.x - z.y * z.y + c.x,
              2.0 * z.x * z.y + c.y
            );
            
            iterations = i;
          }
          
          float t = iterations / maxIterations;
          
          // Color based on iterations with time animation
          vec3 color1 = vec3(0.96, 0.61, 0.07); // #f39c12
          vec3 color2 = vec3(0.95, 0.37, 0.09); // orange
          vec3 color3 = vec3(0.8, 0.2, 0.6);    // purple
          
          float blend = sin(t * 3.14159 + time) * 0.5 + 0.5;
          vec3 color = mix(color1, color2, t);
          color = mix(color, color3, blend);
          
          return color * (1.0 - t * 0.5);
        }
        
        void main() {
          float time = uTime * 0.3;
          
          // Create animated fractal coordinates
          vec2 uv = vUv * 2.0 - 1.0;
          uv *= 1.5;
          
          // Animate the fractal center
          vec2 center = vec2(
            cos(time * 0.5) * 0.3,
            sin(time * 0.7) * 0.3
          );
          
          uv += center;
          
          // Calculate fractal color
          vec3 color = mandelbrot(uv, time);
          
          // Add some glow effect
          float glow = 1.0 - length(vUv - 0.5) * 0.8;
          color += vec3(0.96, 0.61, 0.07) * glow * 0.2;
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={shaderData.vertexShader}
        fragmentShader={shaderData.fragmentShader}
        uniforms={{
          uTime: { value: 0 },
        }}
      />
    </mesh>
  );
};

const FractalParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 1000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Create spiral pattern
      const angle = (i / count) * Math.PI * 8;
      const radius = 3 + (i / count) * 2;
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (i / count - 0.5) * 5;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      // Color gradient
      const t = i / count;
      colors[i * 3] = 0.96;
      colors[i * 3 + 1] = 0.61 * (1 - t) + 0.37 * t;
      colors[i * 3 + 2] = 0.07 + t * 0.5;
    }

    return { positions, colors };
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
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const FractalWireframe: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime) * 0.1);
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.5, 0.3, 128, 32, 3, 5]} />
      <meshBasicMaterial
        color="#f39c12"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
};

const Scene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#f39c12" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#ff6b35" />
      
      <FractalSphere />
      <FractalParticles />
      <FractalWireframe />
    </>
  );
};

export const RustFractalShaderEngineDemo: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        maxDistance={12}
        minDistance={4}
      />
    </Canvas>
  );
};

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface ProceduralMeshProps {
  color: string;
  position: [number, number, number];
  complexity: number;
}

const ProceduralMesh: React.FC<ProceduralMeshProps> = ({ color, position, complexity }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  const initialPositions = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(1, complexity);
    return geometry.attributes.position.array.slice();
  }, [complexity]);

  useFrame((state) => {
    if (meshRef.current && geometryRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;

      const positions = geometryRef.current.attributes.position.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        const x = initialPositions[i];
        const y = initialPositions[i + 1];
        const z = initialPositions[i + 2];

        const distance = Math.sqrt(x * x + y * y + z * z);
        const wave = Math.sin(distance * 3 - time * 2) * 0.1;

        positions[i] = x * (1 + wave);
        positions[i + 1] = y * (1 + wave);
        positions[i + 2] = z * (1 + wave);
      }

      geometryRef.current.attributes.position.needsUpdate = true;
      geometryRef.current.computeVertexNormals();
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry ref={geometryRef} args={[1, complexity]} />
      <meshStandardMaterial
        color={color}
        wireframe={false}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

const WireframeOverlay: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[1.5, 0]} />
      <meshBasicMaterial
        color="#ff6b35"
        wireframe
        transparent
        opacity={0.2}
      />
    </mesh>
  );
};

const FloatingCubes: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const cubes = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 3;
      return {
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * 0.5,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        rotationSpeed: 0.5 + Math.random() * 0.5,
        scale: 0.2 + Math.random() * 0.1,
      };
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <mesh key={i} position={cube.position} scale={cube.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#ff6b35"
            transparent
            opacity={0.6}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
};

const ParticleSystem: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 2 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
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
        size={0.03}
        color="#ff8c42"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const Scene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#ff6b35" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#ff6b35"
      />

      <ParticleSystem />
      <FloatingCubes />
      <ProceduralMesh color="#ff6b35" position={[0, 0, 0]} complexity={2} />
      <WireframeOverlay position={[0, 0, 0]} />
    </>
  );
};

export const NuweRustDemo: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        maxDistance={10}
        minDistance={3}
      />
    </Canvas>
  );
};

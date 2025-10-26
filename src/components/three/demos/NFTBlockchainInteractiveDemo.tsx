import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const BlockchainCube: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color="#e67e22"
        wireframe={false}
        metalness={0.9}
        roughness={0.1}
        emissive="#e67e22"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

const BlockNodes: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const blocks = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 3.5;
      return {
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * 0.5,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        delay: i * 0.1,
      };
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;

      groupRef.current.children.forEach((child, i) => {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + blocks[i].delay) * 0.15;
        child.scale.setScalar(scale);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {blocks.map((block, i) => (
        <mesh key={i} position={block.position}>
          <octahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial
            color="#e67e22"
            emissive="#e67e22"
            emissiveIntensity={0.4}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

const DataLines: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    const lineData = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 3.5;
      const start = [
        Math.cos(angle) * radius,
        Math.sin(angle) * 0.5,
        Math.sin(angle) * radius,
      ];
      const nextAngle = ((i + 1) / 6) * Math.PI * 2;
      const end = [
        Math.cos(nextAngle) * radius,
        Math.sin(nextAngle) * 0.5,
        Math.sin(nextAngle) * radius,
      ];
      lineData.push({ start, end });
    }
    return lineData;
  }, []);

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => {
        const points = [
          new THREE.Vector3(...line.start),
          new THREE.Vector3(...line.end),
        ];

        return (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={points.length}
                array={
                  new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))
                }
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#e67e22"
              transparent
              opacity={0.4}
              linewidth={2}
            />
          </line>
        );
      })}
    </group>
  );
};

const CryptoParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Distributed around a sphere
      const radius = 2 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Orange gradient
      colors[i * 3] = 0.9;
      colors[i * 3 + 1] = 0.49 + Math.random() * 0.2;
      colors[i * 3 + 2] = 0.13 + Math.random() * 0.15;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
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
        size={0.04}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const NFTFrame: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      const scale = 1 + Math.sin(state.clock.elapsedTime) * 0.05;
      meshRef.current.scale.set(scale, scale, 1);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -3]}>
      <planeGeometry args={[3, 3]} />
      <meshStandardMaterial
        color="#e67e22"
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
      <pointLight position={[5, 5, 5]} intensity={1} color="#e67e22" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#d35400" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#e67e22"
      />

      <BlockchainCube />
      <BlockNodes />
      <DataLines />
      <CryptoParticles />
      <NFTFrame />
    </>
  );
};

export const NFTBlockchainInteractiveDemo: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
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

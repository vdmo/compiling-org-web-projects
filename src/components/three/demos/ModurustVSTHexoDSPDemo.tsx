import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const ModularRack: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  const modules = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        ((i % 4) - 1.5) * 1.2,
        Math.floor(i / 4) * 1.5 - 0.75,
        0,
      ] as [number, number, number],
      color: i % 2 === 0 ? "#9b59b6" : "#8e44ad",
    }));
  }, []);

  return (
    <group ref={groupRef}>
      {modules.map((module, i) => (
        <mesh key={i} position={module.position}>
          <boxGeometry args={[1, 1.2, 0.3]} />
          <meshStandardMaterial
            color={module.color}
            metalness={0.9}
            roughness={0.1}
            emissive={module.color}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

const SignalWaves: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const waves = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => {
      const points = [];
      for (let j = 0; j <= 50; j++) {
        points.push(new THREE.Vector3((j / 50) * 5 - 2.5, 0, 0));
      }
      return {
        points,
        yOffset: (i - 2) * 0.8,
        zOffset: (i - 2) * 0.5,
        speed: 1 + i * 0.3,
        color: new THREE.Color().setHSL(0.75 + i * 0.05, 0.7, 0.6),
      };
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((line, i) => {
        const positions = (line as THREE.Line).geometry.attributes.position;
        const wave = waves[i];
        for (let j = 0; j <= 50; j++) {
          const y =
            Math.sin(j * 0.4 + state.clock.elapsedTime * wave.speed) * 0.3 +
            wave.yOffset;
          positions.setY(j, y);
        }
        positions.needsUpdate = true;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {waves.map((wave, i) => (
        <line key={i} position={[0, 0, wave.zOffset - 2]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={wave.points.length}
              array={
                new Float32Array(wave.points.flatMap((p) => [p.x, p.y, p.z]))
              }
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={wave.color} linewidth={2} />
        </line>
      ))}
    </group>
  );
};

const RotatingKnobs: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const knobs = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 3;
      return {
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * 0.5,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        rotationSpeed: 0.5 + Math.random() * 1,
      };
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.children.forEach((mesh, i) => {
        (mesh as THREE.Mesh).rotation.z =
          state.clock.elapsedTime * knobs[i].rotationSpeed;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {knobs.map((knob, i) => (
        <mesh key={i} position={knob.position}>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
          <meshStandardMaterial
            color="#9b59b6"
            metalness={1}
            roughness={0.2}
            emissive="#9b59b6"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

const PatchCables: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 4;
      const radius = 2 + Math.sin(t * Math.PI * 2) * 0.5;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (t - 0.5) * 3;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.2;
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
        color="#9b59b6"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const Scene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#9b59b6" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#8e44ad" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#bb99ff"
      />

      <ModularRack />
      <SignalWaves />
      <RotatingKnobs />
      <PatchCables />
    </>
  );
};

export const ModurustVSTHexoDSPDemo: React.FC = () => {
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

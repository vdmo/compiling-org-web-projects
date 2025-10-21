import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface StageLightProps {
  position: [number, number, number];
  color: string;
  targetPosition: [number, number, number];
}

const StageLight: React.FC<StageLightProps> = ({ position, color, targetPosition }) => {
  const lightRef = useRef<THREE.SpotLight>(null);
  const beamRef = useRef<THREE.Mesh>(null);

  const beamGeometry = useMemo(() => new THREE.ConeGeometry(0.5, 5, 8, 1, true), []);
  const beamMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
      }),
    [color],
  );

  useFrame((state) => {
    if (lightRef.current && beamRef.current) {
      const time = state.clock.elapsedTime;
      lightRef.current.intensity = 2 + Math.sin(time * 2) * 0.5;
      beamRef.current.material.opacity = 0.2 + Math.sin(time * 2) * 0.1;
    }
  });

  return (
    <group position={position}>
      <spotLight
        ref={lightRef}
        color={color}
        intensity={2}
        angle={0.4}
        penumbra={0.5}
        distance={20}
        castShadow
      />
      <mesh
        ref={beamRef}
        geometry={beamGeometry}
        material={beamMaterial}
        rotation={[Math.PI, 0, 0]}
      />
    </group>
  );
};

const CrowdParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const crowdCount = 500;
    const positions = new Float32Array(crowdCount * 3);
    const colors = new Float32Array(crowdCount * 3);

    for (let i = 0; i < crowdCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 4;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = -2 + Math.random() * 0.5;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const color = new THREE.Color();
      color.setHSL(Math.random(), 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    return { geometry: geo, material: mat };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      const colors = pointsRef.current.geometry.attributes.color.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime * 3 + i) * 0.01;

        const colorBrightness = 0.5 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.5;
        colors[i] *= colorBrightness;
        colors[i + 1] *= colorBrightness;
        colors[i + 2] *= colorBrightness;
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
};

const Stage: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => new THREE.BoxGeometry(8, 0.2, 6), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1a1a1a",
        metalness: 0.8,
        roughness: 0.2,
      }),
    [],
  );

  return <mesh ref={meshRef} position={[0, -2, 0]} geometry={geometry} material={material} />;
};

const PerformerSpot: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => new THREE.CylinderGeometry(0.4, 0.4, 2, 16), []);
  const ringGeometry = useMemo(() => new THREE.TorusGeometry(0.6, 0.1, 8, 32), []);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffffd2",
        emissive: "#ffffd2",
        emissiveIntensity: 0.8,
        metalness: 0.5,
        roughness: 0.3,
      }),
    [],
  );

  const ringMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffffd2",
        transparent: true,
        opacity: 0.5,
        emissive: "#ffffd2",
        emissiveIntensity: 0.5,
      }),
    [],
  );

  useFrame((state) => {
    if (meshRef.current && ringRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.set(1, scale, 1);
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;

      ringRef.current.rotation.x = Math.PI / 2;
      ringRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.2);
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      <mesh ref={meshRef} geometry={geometry} material={material} />
      <mesh ref={ringRef} position={[0, 1.2, 0]} geometry={ringGeometry} material={ringMaterial} />
    </group>
  );
};

const LaserGrid: React.FC = () => {
  const linesRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const positions: number[] = [];
    const gridSize = 10;
    const spacing = 1;
    const offset = (gridSize * spacing) / 2;

    for (let i = 0; i <= gridSize; i++) {
      positions.push(
        -offset,
        3,
        i * spacing - offset,
        offset,
        3,
        i * spacing - offset,
      );
      positions.push(
        i * spacing - offset,
        3,
        -offset,
        i * spacing - offset,
        3,
        offset,
      );
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#ffffd2",
        transparent: true,
        opacity: 0.2,
      }),
    [],
  );

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return <lineSegments ref={linesRef} geometry={geometry} material={material} />;
};

const MusicBars: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const bars = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      position: [
        i * 0.5 - 4,
        -1,
        -4,
      ] as [number, number, number],
      index: i,
    }));
  }, []);

  const geometry = useMemo(() => new THREE.BoxGeometry(0.3, 1, 0.3), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const height = 1 + Math.sin(state.clock.elapsedTime * 3 + i * 0.5) * 0.8;
        child.scale.set(1, height, 1);
        child.position.y = -1 + height / 2;

        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        const colorValue = height / 2;
        mat.color.setHSL(colorValue * 0.3 + 0.5, 1, 0.5);
        mat.emissive.setHSL(colorValue * 0.3 + 0.5, 1, 0.3);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {bars.map((bar, i) => {
        const material = new THREE.MeshStandardMaterial({
          color: "#ffffd2",
          emissive: "#ffffd2",
          emissiveIntensity: 0.5,
          metalness: 0.8,
          roughness: 0.2,
        });

        return (
          <mesh key={i} position={bar.position} geometry={geometry} material={material} />
        );
      })}
    </group>
  );
};

const EnergyWaves: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const waves = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      radius: 2 + i * 2,
      delay: i * 0.5,
    }));
  }, []);

  const geometry = useMemo(() => new THREE.TorusGeometry(1, 0.05, 8, 64), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const wave = waves[i];
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + wave.delay) * 0.5;
        child.scale.setScalar(wave.radius * scale);

        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.5 - (scale - 0.5) * 0.3;
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
      {waves.map((_, i) => {
        const material = new THREE.MeshBasicMaterial({
          color: "#ffffd2",
          transparent: true,
          opacity: 0.5,
          side: THREE.DoubleSide,
        });

        return <mesh key={i} geometry={geometry} material={material} />;
      })}
    </group>
  );
};

const Scene: React.FC = () => {
  const stageLights = useMemo(
    () => [
      {
        position: [-4, 4, 4] as [number, number, number],
        color: "#ff6b9d",
        targetPosition: [0, 0, 0] as [number, number, number],
      },
      {
        position: [4, 4, 4] as [number, number, number],
        color: "#4ecdc4",
        targetPosition: [0, 0, 0] as [number, number, number],
      },
      {
        position: [0, 5, -4] as [number, number, number],
        color: "#ffffd2",
        targetPosition: [0, 0, 0] as [number, number, number],
      },
      {
        position: [-3, 4, -2] as [number, number, number],
        color: "#95e1d3",
        targetPosition: [0, 0, 0] as [number, number, number],
      },
      {
        position: [3, 4, -2] as [number, number, number],
        color: "#f38181",
        targetPosition: [0, 0, 0] as [number, number, number],
      },
    ],
    [],
  );

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 5, 0]} intensity={1} color="#ffffff" />

      <Stage />
      <LaserGrid />
      <PerformerSpot />
      <CrowdParticles />
      <MusicBars />
      <EnergyWaves />

      {stageLights.map((light, i) => (
        <StageLight key={i} {...light} />
      ))}
    </>
  );
};

export const VJsAgencyDemo: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        maxDistance={15}
        minDistance={5}
      />
    </Canvas>
  );
};

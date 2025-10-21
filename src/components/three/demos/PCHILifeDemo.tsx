import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface SceneNodeProps {
  position: [number, number, number];
  color: string;
  scale: number;
}

const SceneNode: React.FC<SceneNodeProps> = ({ position, color, scale }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => new THREE.OctahedronGeometry(0.3, 0), []);
  const ringGeometry = useMemo(() => new THREE.TorusGeometry(0.5, 0.05, 8, 32), []);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.6,
        metalness: 0.9,
        roughness: 0.1,
      }),
    [color],
  );

  const ringMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: color,
        transparent: true,
        opacity: 0.3,
        emissive: color,
        emissiveIntensity: 0.4,
      }),
    [color],
  );

  useFrame((state) => {
    if (meshRef.current && ringRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.02;
      const scaleValue = scale * (1 + Math.sin(state.clock.elapsedTime * 2) * 0.2);
      meshRef.current.scale.setScalar(scaleValue);

      ringRef.current.rotation.x = Math.PI / 2;
      ringRef.current.rotation.z = state.clock.elapsedTime;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} geometry={geometry} material={material} />
      <mesh ref={ringRef} geometry={ringGeometry} material={ringMaterial} />
    </group>
  );
};

const ConnectionLines: React.FC = () => {
  const linesRef = useRef<THREE.LineSegments>(null);

  const { geometry, material } = useMemo(() => {
    const nodes = [
      [0, 0, 0],
      [3, 2, 1],
      [-3, 1, -1],
      [2, -2, 2],
      [-2, -1, 2],
      [1, 3, -2],
    ];

    const positions: number[] = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.5) {
          positions.push(...nodes[i], ...nodes[j]);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

    const mat = new THREE.LineBasicMaterial({
      color: "#4ecdc4",
      transparent: true,
      opacity: 0.3,
    });

    return { geometry: geo, material: mat };
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      const mat = linesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.2 + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return <lineSegments ref={linesRef} geometry={geometry} material={material} />;
};

const DataPackets: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const packets = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      angle: (i / 30) * Math.PI * 2,
      radius: 4 + Math.random(),
      speed: 0.5 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  const geometry = useMemo(() => new THREE.BoxGeometry(0.1, 0.1, 0.1), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const packet = packets[i];
        const angle = packet.angle + state.clock.elapsedTime * packet.speed;
        child.position.x = Math.cos(angle) * packet.radius;
        child.position.z = Math.sin(angle) * packet.radius;
        child.position.y = Math.sin(state.clock.elapsedTime + packet.offset) * 2;
        child.rotation.x += 0.02;
        child.rotation.y += 0.03;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {packets.map((packet) => {
        const color = new THREE.Color().setHSL((packet.id / 30) * 0.3 + 0.5, 1, 0.6);
        const material = new THREE.MeshStandardMaterial({
          color: color,
          emissive: color,
          emissiveIntensity: 0.5,
        });

        return <mesh key={packet.id} geometry={geometry} material={material} />;
      })}
    </group>
  );
};

const ProtocolRings: React.FC = () => {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => new THREE.TorusGeometry(5, 0.05, 16, 100), []);

  useFrame((state) => {
    if (ring1Ref.current && ring2Ref.current && ring3Ref.current) {
      ring1Ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ring2Ref.current.rotation.y = state.clock.elapsedTime * 0.4;
      ring3Ref.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <>
      <mesh ref={ring1Ref} geometry={geometry}>
        <meshStandardMaterial
          color="#4ecdc4"
          transparent
          opacity={0.2}
          emissive="#4ecdc4"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh ref={ring2Ref} geometry={geometry}>
        <meshStandardMaterial
          color="#95e1d3"
          transparent
          opacity={0.2}
          emissive="#95e1d3"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh ref={ring3Ref} geometry={geometry}>
        <meshStandardMaterial
          color="#00b4d8"
          transparent
          opacity={0.2}
          emissive="#00b4d8"
          emissiveIntensity={0.3}
        />
      </mesh>
    </>
  );
};

const Scene: React.FC = () => {
  const nodes = useMemo(
    () => [
      { position: [0, 0, 0] as [number, number, number], color: "#4ecdc4", scale: 1.2 },
      { position: [3, 2, 1] as [number, number, number], color: "#95e1d3", scale: 1 },
      { position: [-3, 1, -1] as [number, number, number], color: "#00b4d8", scale: 1 },
      { position: [2, -2, 2] as [number, number, number], color: "#4ecdc4", scale: 0.9 },
      { position: [-2, -1, 2] as [number, number, number], color: "#95e1d3", scale: 0.9 },
      { position: [1, 3, -2] as [number, number, number], color: "#00b4d8", scale: 1.1 },
    ],
    [],
  );

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#4ecdc4" />
      <pointLight position={[0, 0, 10]} intensity={0.6} color="#95e1d3" />

      <ProtocolRings />
      <ConnectionLines />
      <DataPackets />

      {nodes.map((node, i) => (
        <SceneNode key={i} {...node} />
      ))}
    </>
  );
};

export const PCHILifeDemo: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [8, 5, 8], fov: 60 }}
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

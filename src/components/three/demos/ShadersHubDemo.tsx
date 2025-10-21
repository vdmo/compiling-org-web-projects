import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface ShaderCardProps {
  position: [number, number, number];
  color: string;
  index: number;
}

const ShaderCard: React.FC<ShaderCardProps> = ({ position, color, index }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => new THREE.PlaneGeometry(1.2, 1.6), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.8,
        metalness: 0.8,
        roughness: 0.2,
      }),
    [color],
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] +
        Math.sin(state.clock.elapsedTime * 0.8 + index * 0.5) * 0.2;
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.05;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} geometry={geometry} material={material} />
      {/* Border frame */}
      <lineSegments position={[0, 0, 0.01]}>
        <edgesGeometry attach="geometry" args={[geometry]} />
        <lineBasicMaterial color={color} />
      </lineSegments>
    </group>
  );
};

const CodeFragments: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const fragmentCount = 400;
    const positions = new Float32Array(fragmentCount * 3);
    const colors = new Float32Array(fragmentCount * 3);

    for (let i = 0; i < fragmentCount; i++) {
      const angle = (i / fragmentCount) * Math.PI * 2 * 3;
      const radius = 5 + Math.random() * 2;
      const height = (Math.random() - 0.5) * 8;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.1 + 0.85, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    return { geometry: geo, material: mat };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
};

const CentralHub: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => new THREE.SphereGeometry(1, 32, 32), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#fcbad3",
        emissive: "#ff6b9d",
        emissiveIntensity: 1,
        metalness: 0.9,
        roughness: 0.1,
      }),
    [],
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
};

const ConnectionBeams: React.FC = () => {
  const linesRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 3;
      positions.push(
        0,
        0,
        0,
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius,
      );
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    return geo;
  }, []);

  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#fcbad3",
        transparent: true,
        opacity: 0.5,
      }),
    [],
  );

  useFrame((state) => {
    if (linesRef.current) {
      const mat = linesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry} material={material} />
  );
};

const FloatingIcons: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const icons = useMemo(() => {
    const colors = ["#fcbad3", "#ff6b9d", "#ff99cc", "#ffaadd"];
    return Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 8;
      return {
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 4,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        color: colors[i % colors.length],
        speed: 0.3 + Math.random() * 0.3,
      };
    });
  }, []);

  const geometry = useMemo(() => new THREE.OctahedronGeometry(0.2, 0), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.children.forEach((child, i) => {
        child.rotation.x = state.clock.elapsedTime * icons[i].speed;
        child.rotation.y = state.clock.elapsedTime * icons[i].speed * 0.7;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {icons.map((icon, i) => {
        const material = new THREE.MeshStandardMaterial({
          color: icon.color,
          emissive: icon.color,
          emissiveIntensity: 0.5,
          metalness: 0.8,
          roughness: 0.2,
        });

        return (
          <mesh
            key={i}
            position={icon.position}
            geometry={geometry}
            material={material}
          />
        );
      })}
    </group>
  );
};

const Scene: React.FC = () => {
  const shaderCards = useMemo(() => {
    const colors = [
      "#fcbad3",
      "#ff6b9d",
      "#ff99cc",
      "#ffaadd",
      "#ffd1e0",
      "#ffe0ec",
    ];
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 3;
      return {
        position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius] as [
          number,
          number,
          number,
        ],
        color: colors[i],
        index: i,
      };
    });
  }, []);

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={1.2} color="#fcbad3" />
      <pointLight position={[0, 10, -10]} intensity={1} color="#ff6b9d" />
      <spotLight
        position={[0, 15, 0]}
        angle={0.5}
        penumbra={1}
        intensity={1.2}
        color="#ff99cc"
      />

      <CodeFragments />
      <CentralHub />
      <ConnectionBeams />
      <FloatingIcons />

      {shaderCards.map((card) => (
        <ShaderCard key={card.index} {...card} />
      ))}
    </>
  );
};

export const ShadersHubDemo: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 3, 10], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        maxDistance={15}
        minDistance={5}
        autoRotate
        autoRotateSpeed={1}
      />
    </Canvas>
  );
};

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AudioSphereProps {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
}

const AudioSphere: React.FC<AudioSphereProps> = ({
  position,
  color,
  scale,
  speed,
}) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => new THREE.SphereGeometry(0.5, 32, 32), []);
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.1,
      metalness: 0.8,
      emissive: color,
      emissiveIntensity: 0.5,
    });
  }, [color]);

  useFrame((state) => {
    if (sphereRef.current) {
      const time = state.clock.elapsedTime;
      const audioReactive = Math.sin(time * speed) * 0.3 + 1;
      sphereRef.current.scale.setScalar(scale * audioReactive);
      sphereRef.current.rotation.y = time * 0.5;
    }
  });

  return (
    <mesh
      ref={sphereRef}
      position={position}
      geometry={geometry}
      material={material}
    />
  );
};

const MixerGrid: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const geometry = useMemo(() => new THREE.BoxGeometry(0.3, 0.3, 0.3), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
    }
  });

  const boxes = useMemo(() => {
    const colors = ["#ff6b9d", "#4ecdc4", "#ffd93d", "#a8e6cf"];
    return Array.from({ length: 4 }, (_, i) => {
      const angle = (i / 4) * Math.PI * 2;
      const radius = 2;
      return {
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * 0.5,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        color: colors[i],
      };
    });
  }, []);

  return (
    <group ref={groupRef}>
      {boxes.map((box, i) => {
        const material = new THREE.MeshStandardMaterial({
          color: box.color,
          transparent: true,
          opacity: 0.6,
          wireframe: true,
        });
        return (
          <mesh
            key={i}
            position={box.position}
            geometry={geometry}
            material={material}
          />
        );
      })}
    </group>
  );
};

const ParticleRing: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3 + Math.random() * 0.5;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      const color = new THREE.Color();
      color.setHSL(i / count, 1, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      sizeAttenuation: true,
    });

    return { geometry: geo, material: mat };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
};

const Scene: React.FC = () => {
  const spheres = useMemo(
    () => [
      {
        position: [-1.5, 0.5, 0] as [number, number, number],
        color: "#ff6b9d",
        scale: 1,
        speed: 2,
      },
      {
        position: [1.5, 0.5, 0] as [number, number, number],
        color: "#4ecdc4",
        scale: 0.8,
        speed: 2.5,
      },
      {
        position: [0, -1, 0] as [number, number, number],
        color: "#ffd93d",
        scale: 0.6,
        speed: 3,
      },
      {
        position: [0, 1.5, 0] as [number, number, number],
        color: "#a8e6cf",
        scale: 0.7,
        speed: 1.8,
      },
    ],
    [],
  );

  const centralGeometry = useMemo(
    () => new THREE.SphereGeometry(0.3, 32, 32),
    [],
  );
  const centralMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#ffffff",
      emissive: "#ffffff",
      emissiveIntensity: 1,
      transparent: true,
      opacity: 0.8,
    });
  }, []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#ff6b9d" />
      <pointLight position={[0, 5, -5]} intensity={0.6} color="#4ecdc4" />

      <ParticleRing />
      <MixerGrid />

      {spheres.map((sphere, i) => (
        <AudioSphere key={i} {...sphere} />
      ))}

      {/* Central mixing sphere */}
      <mesh
        geometry={centralGeometry}
        material={centralMaterial}
        position={[0, 0, 0]}
      />
    </>
  );
};

export const PlayDemo: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 2, 6], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
    </Canvas>
  );
};

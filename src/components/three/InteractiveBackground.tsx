import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingShapeProps {
  position: [number, number, number];
  color: string;
  speed: number;
}

const FloatingShape: React.FC<FloatingShapeProps> = ({
  position,
  color,
  speed,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const baseY = position[1];

  const geometry = useMemo(() => new THREE.OctahedronGeometry(0.3, 0), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
        emissive: color,
        emissiveIntensity: 0.2,
      }),
    [color],
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.01 * speed;
      meshRef.current.position.y =
        baseY + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      geometry={geometry}
      material={material}
    />
  );
};

const ParticleField: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: "#ffffff",
      size: 0.02,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      depthWrite: false,
    });

    return { geometry: geo, material: mat };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return <points ref={particlesRef} geometry={geometry} material={material} />;
};

const Scene: React.FC = () => {
  const shapes = useMemo(() => {
    const colors = ["#ff6b35", "#4ecdc4", "#95e1d3", "#f38181", "#aa96da"];
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ] as [number, number, number],
      color: colors[i % colors.length],
      speed: 0.5 + Math.random() * 0.5,
    }));
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ecdc4" />

      <ParticleField />

      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} />
      ))}
    </>
  );
};

export const InteractiveBackground: React.FC = () => {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (gl) {
        setCanRender(true);
      }
    } catch (e) {
      console.warn("WebGL not available:", e);
    }
  }, []);

  if (!canRender) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-20 opacity-40 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        onCreated={(state) => {
          state.gl.setClearColor("#000000", 0);
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

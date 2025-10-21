import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AnimatedSphereProps {
  color: string;
}

const AnimatedSphere: React.FC<AnimatedSphereProps> = ({ color }) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  const geometry = useMemo(() => new THREE.SphereGeometry(1, 32, 32), []);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.6,
    });
  }, [color]);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.3;

      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      sphereRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={sphereRef} geometry={geometry} material={material} scale={1.2} />
  );
};

interface ProjectCard3DProps {
  color: string;
  isHovered: boolean;
}

export const ProjectCard3D: React.FC<ProjectCard3DProps> = ({
  color,
  isHovered,
}) => {
  if (!isHovered) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 transition-opacity duration-500 opacity-100"
      style={{ pointerEvents: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color={color} />
        <AnimatedSphere color={color} />
      </Canvas>
    </div>
  );
};

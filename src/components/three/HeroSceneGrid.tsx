import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GridNodeProps {
  position: [number, number, number];
  delay: number;
  color: string;
}

const GridNode: React.FC<GridNodeProps> = ({ position, delay, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => new THREE.SphereGeometry(0.08, 16, 16), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2,
      }),
    [color],
  );

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime + delay;
      const scale = 1 + Math.sin(time * 2) * 0.3;
      meshRef.current.scale.setScalar(scale);

      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.3 + Math.sin(time * 2) * 0.4;
    }
  });

  return <mesh ref={meshRef} position={position} geometry={geometry} material={material} />;
};

const GridConnections: React.FC = () => {
  const linesRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const positions: number[] = [];
    const gridSize = 8;
    const spacing = 1.5;
    const offset = (gridSize * spacing) / 2;

    // Horizontal lines
    for (let y = 0; y < gridSize; y++) {
      for (let z = 0; z < gridSize; z++) {
        for (let x = 0; x < gridSize - 1; x++) {
          positions.push(
            x * spacing - offset,
            y * spacing - offset,
            z * spacing - offset,
            (x + 1) * spacing - offset,
            y * spacing - offset,
            z * spacing - offset,
          );
        }
      }
    }

    // Vertical lines
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        for (let y = 0; y < gridSize - 1; y++) {
          positions.push(
            x * spacing - offset,
            y * spacing - offset,
            z * spacing - offset,
            x * spacing - offset,
            (y + 1) * spacing - offset,
            z * spacing - offset,
          );
        }
      }
    }

    // Depth lines
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize - 1; z++) {
          positions.push(
            x * spacing - offset,
            y * spacing - offset,
            z * spacing - offset,
            x * spacing - offset,
            y * spacing - offset,
            (z + 1) * spacing - offset,
          );
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

    return geo;
  }, []);

  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: "#4ecdc4",
      transparent: true,
      opacity: 0.15,
    });
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return <lineSegments ref={linesRef} geometry={geometry} material={material} />;
};

const Grid3D: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const nodeData: Array<{
      position: [number, number, number];
      delay: number;
      color: string;
    }> = [];

    const colors = ["#ff6b35", "#4ecdc4", "#95e1d3", "#f38181", "#aa96da"];
    const gridSize = 8;
    const spacing = 1.5;
    const offset = (gridSize * spacing) / 2;

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          // Only show corner and edge nodes for performance
          const isCorner =
            (x === 0 || x === gridSize - 1) &&
            (y === 0 || y === gridSize - 1) &&
            (z === 0 || z === gridSize - 1);
          const isEdge =
            ((x === 0 || x === gridSize - 1) && (y === 0 || y === gridSize - 1)) ||
            ((x === 0 || x === gridSize - 1) && (z === 0 || z === gridSize - 1)) ||
            ((y === 0 || y === gridSize - 1) && (z === 0 || z === gridSize - 1));

          if (isCorner || (isEdge && Math.random() > 0.3) || Math.random() > 0.95) {
            nodeData.push({
              position: [
                x * spacing - offset,
                y * spacing - offset,
                z * spacing - offset,
              ],
              delay: (x + y + z) * 0.1,
              color: colors[Math.floor(Math.random() * colors.length)],
            });
          }
        }
      }
    }

    return nodeData;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <GridNode key={i} {...node} />
      ))}
    </group>
  );
};

const FloatingCube: React.FC<{
  position: [number, number, number];
  size: number;
  color: string;
}> = ({ position, size, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => new THREE.BoxGeometry(size, size, size), [size]);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
    [color],
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return <mesh ref={meshRef} position={position} geometry={geometry} material={material} />;
};

const AmbientParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const particleCount = 400;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.05,
      color: "#ffffff",
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
    });

    return { geometry: geo, material: mat };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
};

const Scene: React.FC = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#4ecdc4" />
      <pointLight position={[0, 10, -10]} intensity={0.6} color="#ff6b35" />

      {/* Scene Elements */}
      <AmbientParticles />
      <GridConnections />
      <Grid3D />
      <FloatingCube position={[0, 0, 0]} size={3} color="#95e1d3" />
      <FloatingCube position={[-8, 4, -4]} size={1.5} color="#ff6b35" />
      <FloatingCube position={[8, -4, 4]} size={1.5} color="#4ecdc4" />
    </>
  );
};

export const HeroSceneGrid: React.FC = () => {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
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
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [12, 8, 12], fov: 60 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        onCreated={(state) => {
          state.gl.setClearColor("#000000", 0);
          state.camera.lookAt(0, 0, 0);
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

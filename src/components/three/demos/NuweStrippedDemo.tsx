import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";

interface NodeProps {
  position: [number, number, number];
  color: string;
  connections: number[];
}

const Node: React.FC<NodeProps> = ({ position, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      );
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

const NodeConnections: React.FC = () => {
  const nodes = useMemo(() => {
    return [
      { position: [-2, 2, 0], color: "#e74c3c", connections: [1, 2] },
      { position: [0, 2, 0], color: "#e74c3c", connections: [2, 3] },
      { position: [2, 2, 0], color: "#e74c3c", connections: [3] },
      { position: [-2, 0, 0], color: "#c0392b", connections: [4, 5] },
      { position: [0, 0, 0], color: "#c0392b", connections: [5] },
      { position: [2, 0, 0], color: "#c0392b", connections: [] },
      { position: [-1, -2, 0], color: "#ff6b6b", connections: [] },
      { position: [1, -2, 0], color: "#ff6b6b", connections: [] },
    ] as const;
  }, []);

  const connections = useMemo(() => {
    const lines: Array<{ start: [number, number, number]; end: [number, number, number] }> = [];
    nodes.forEach((node, i) => {
      node.connections.forEach((targetIdx) => {
        lines.push({
          start: node.position as [number, number, number],
          end: nodes[targetIdx].position as [number, number, number],
        });
      });
    });
    return lines;
  }, [nodes]);

  return (
    <group>
      {connections.map((conn, i) => (
        <Line
          key={i}
          points={[conn.start, conn.end]}
          color="#e74c3c"
          lineWidth={2}
          transparent
          opacity={0.5}
        />
      ))}
      {nodes.map((node, i) => (
        <Node key={i} {...node} />
      ))}
    </group>
  );
};

const AudioWave: React.FC = () => {
  const lineRef = useRef<THREE.Line>(null);

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 50; i++) {
      pts.push(new THREE.Vector3((i / 50) * 6 - 3, 0, -2));
    }
    return pts;
  }, []);

  useFrame((state) => {
    if (lineRef.current) {
      const positions = lineRef.current.geometry.attributes.position;
      for (let i = 0; i <= 50; i++) {
        const wave =
          Math.sin(i * 0.3 + state.clock.elapsedTime * 3) * 0.5 +
          Math.sin(i * 0.15 + state.clock.elapsedTime * 2) * 0.3;
        positions.setY(i, wave);
      }
      positions.needsUpdate = true;
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#e74c3c" linewidth={3} />
    </line>
  );
};

const ParticleField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position;
      for (let i = 0; i < particles.length / 3; i++) {
        const y = positions.getY(i);
        positions.setY(i, y + Math.sin(state.clock.elapsedTime + i) * 0.002);
      }
      positions.needsUpdate = true;
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
        color="#e74c3c"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};

const Scene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#e74c3c" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#ff6b6b" />

      <ParticleField />
      <AudioWave />
      <NodeConnections />
    </>
  );
};

export const NuweStrippedDemo: React.FC = () => {
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

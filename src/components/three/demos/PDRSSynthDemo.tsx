import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

const PatchBox: React.FC<{ position: [number, number, number]; label: string }> = ({
  position,
  label,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.8, 0.6, 0.1]} />
        <meshStandardMaterial
          color="#1abc9c"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
};

const ConnectionLines: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const connections = useMemo(() => {
    return [
      { start: [-2, 1.5, 0], end: [0, 1, 0] },
      { start: [0, 1, 0], end: [2, 0.5, 0] },
      { start: [-1, 0, 0], end: [1, -0.5, 0] },
      { start: [0, -1, 0], end: [2, -1.5, 0] },
    ];
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((line, i) => {
        const material = (line as THREE.Line).material as THREE.LineBasicMaterial;
        material.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.3;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {connections.map((conn, i) => {
        const curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(...conn.start),
          new THREE.Vector3(
            (conn.start[0] + conn.end[0]) / 2,
            (conn.start[1] + conn.end[1]) / 2 - 0.5,
            0
          ),
          new THREE.Vector3(...conn.end)
        );
        const points = curve.getPoints(20);

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
              color="#1abc9c"
              transparent
              opacity={0.7}
              linewidth={2}
            />
          </line>
        );
      })}
    </group>
  );
};

const DataFlow: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 150;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;

      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = 0;
    }

    return { positions, velocities };
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position;

      for (let i = 0; i < particles.positions.length / 3; i++) {
        positions.array[i * 3] += particles.velocities[i * 3];
        positions.array[i * 3 + 1] += particles.velocities[i * 3 + 1];

        // Wrap around
        if (Math.abs(positions.array[i * 3]) > 3) {
          positions.array[i * 3] *= -1;
        }
        if (Math.abs(positions.array[i * 3 + 1]) > 2) {
          positions.array[i * 3 + 1] *= -1;
        }
      }

      positions.needsUpdate = true;
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
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#1abc9c"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const OscillatorVisual: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.TorusGeometry>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;

      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry ref={geometryRef} args={[1.5, 0.4, 16, 50]} />
      <meshStandardMaterial
        color="#1abc9c"
        wireframe
        transparent
        opacity={0.4}
      />
    </mesh>
  );
};

const Scene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#1abc9c" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#16a085" />

      <DataFlow />
      <OscillatorVisual />
      <ConnectionLines />

      <PatchBox position={[-2, 1.5, 0]} label="OSC~" />
      <PatchBox position={[0, 1, 0]} label="*~" />
      <PatchBox position={[2, 0.5, 0]} label="DAC~" />
      <PatchBox position={[-1, 0, 0]} label="METRO" />
      <PatchBox position={[1, -0.5, 0]} label="DELAY" />
      <PatchBox position={[0, -1, 0]} label="FILTER" />
    </>
  );
};

export const PDRSSynthDemo: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 60 }}
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

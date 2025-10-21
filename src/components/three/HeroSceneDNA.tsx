import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DNAStrandProps {
  radius: number;
  height: number;
  color1: string;
  color2: string;
  speed: number;
}

const DNAStrand: React.FC<DNAStrandProps> = ({
  radius,
  height,
  color1,
  color2,
  speed,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  const { spheres, connections } = useMemo(() => {
    const sphereData: Array<{
      position: [number, number, number];
      color: string;
    }> = [];
    const connectionData: Array<{
      start: [number, number, number];
      end: [number, number, number];
    }> = [];

    const steps = 30;
    const c1 = new THREE.Color(color1);
    const c2 = new THREE.Color(color2);

    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const angle = t * Math.PI * 4;
      const y = (t - 0.5) * height;

      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;

      sphereData.push({
        position: [x1, y, z1],
        color: color1,
      });
      sphereData.push({
        position: [x2, y, z2],
        color: color2,
      });

      if (i % 3 === 0) {
        connectionData.push({
          start: [x1, y, z1],
          end: [x2, y, z2],
        });
      }
    }

    return { spheres: sphereData, connections: connectionData };
  }, [radius, height, color1, color2]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * speed;
    }
  });

  return (
    <group ref={groupRef}>
      {/* DNA Spheres */}
      {spheres.map((sphere, i) => {
        const geometry = new THREE.SphereGeometry(0.15, 16, 16);
        const material = new THREE.MeshStandardMaterial({
          color: sphere.color,
          emissive: sphere.color,
          emissiveIntensity: 0.5,
          metalness: 0.8,
          roughness: 0.2,
        });

        return (
          <mesh key={i} position={sphere.position} geometry={geometry} material={material} />
        );
      })}

      {/* Connection Lines */}
      {connections.map((conn, i) => {
        const start = new THREE.Vector3(...conn.start);
        const end = new THREE.Vector3(...conn.end);
        const direction = new THREE.Vector3().subVectors(end, start);
        const length = direction.length();
        const center = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);

        const geometry = new THREE.CylinderGeometry(0.03, 0.03, length, 8);
        const material = new THREE.MeshStandardMaterial({
          color: "#ffffff",
          transparent: true,
          opacity: 0.4,
        });

        const quaternion = new THREE.Quaternion();
        quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          direction.clone().normalize()
        );

        return (
          <mesh
            key={`conn-${i}`}
            position={center.toArray()}
            quaternion={quaternion}
            geometry={geometry}
            material={material}
          />
        );
      })}
    </group>
  );
};

const FloatingParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const particleCount = 800;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.3 + 0.5, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    return { geometry: geo, material: mat };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
};

const DataStream: React.FC<{ position: [number, number, number]; color: string }> = ({
  position,
  color,
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const count = 50;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = (i / count) * 10 - 5;
      positions[i * 3 + 2] = 0;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: color,
      size: 0.1,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    return { geometry: geo, material: mat };
  }, [color]);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.05;
        if (positions[i + 1] < -5) {
          positions[i + 1] = 5;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points
      ref={pointsRef}
      position={position}
      geometry={geometry}
      material={material}
    />
  );
};

const Scene: React.FC = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#4ecdc4" />
      <pointLight position={[0, 0, 15]} intensity={0.6} color="#ff6b35" />
      <spotLight
        position={[0, 20, 0]}
        angle={0.4}
        penumbra={1}
        intensity={0.8}
        color="#95e1d3"
      />

      {/* Scene Elements */}
      <FloatingParticles />
      <DNAStrand radius={2} height={12} color1="#ff6b35" color2="#4ecdc4" speed={0.2} />
      <DNAStrand radius={3.5} height={10} color1="#95e1d3" color2="#f38181" speed={-0.15} />

      {/* Data Streams */}
      <DataStream position={[-6, 0, 0]} color="#ff6b35" />
      <DataStream position={[6, 0, 0]} color="#4ecdc4" />
      <DataStream position={[0, 0, -6]} color="#95e1d3" />
      <DataStream position={[0, 0, 6]} color="#f38181" />
    </>
  );
};

export const HeroSceneDNA: React.FC = () => {
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
        camera={{ position: [0, 0, 12], fov: 60 }}
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

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface APINodeProps {
  position: [number, number, number];
  label: string;
  color: string;
}

const APINode: React.FC<APINodeProps> = ({ position, label, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(0.6, 1), []);
  const ringGeometry = useMemo(
    () => new THREE.TorusGeometry(1, 0.1, 16, 32),
    [],
  );

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.8,
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
        opacity: 0.6,
        emissive: color,
        emissiveIntensity: 0.5,
      }),
    [color],
  );

  useFrame((state) => {
    if (meshRef.current && ringRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;

      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
      meshRef.current.scale.setScalar(scale);

      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.5;
      ringRef.current.rotation.y = state.clock.elapsedTime * 0.8;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} geometry={geometry} material={material} />
      <mesh ref={ringRef} geometry={ringGeometry} material={ringMaterial} />
    </group>
  );
};

interface TextureStreamProps {
  startPos: [number, number, number];
  endPos: [number, number, number];
  color: string;
}

const TextureStream: React.FC<TextureStreamProps> = ({
  startPos,
  endPos,
  color,
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const particleCount = 50;
    const positions = new Float32Array(particleCount * 3);
    const colorObj = new THREE.Color(color);

    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      positions[i * 3] = THREE.MathUtils.lerp(startPos[0], endPos[0], t);
      positions[i * 3 + 1] = THREE.MathUtils.lerp(startPos[1], endPos[1], t);
      positions[i * 3 + 2] = THREE.MathUtils.lerp(startPos[2], endPos[2], t);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.15,
      color: colorObj,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    return { geometry: geo, material: mat };
  }, [startPos, endPos, color]);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < 50; i++) {
        const t = (i / 50 + state.clock.elapsedTime * 0.2) % 1;
        positions[i * 3] = THREE.MathUtils.lerp(startPos[0], endPos[0], t);
        positions[i * 3 + 1] = THREE.MathUtils.lerp(startPos[1], endPos[1], t);
        positions[i * 3 + 2] = THREE.MathUtils.lerp(startPos[2], endPos[2], t);
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
};

const DataGrid: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => new THREE.PlaneGeometry(8, 8, 16, 16), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#aa96da",
        emissive: "#aa96da",
        emissiveIntensity: 0.3,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      }),
    [],
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI / 3;
      meshRef.current.position.y = -3;

      const positions = meshRef.current.geometry.attributes.position
        .array as Float32Array;
      const originalPositions = geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        const x = originalPositions[i];
        const y = originalPositions[i + 1];
        const wave =
          Math.sin(x * 0.5 + state.clock.elapsedTime) *
          Math.sin(y * 0.5 + state.clock.elapsedTime * 0.7) *
          0.5;
        positions[i + 2] = wave;
      }

      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
};

const FloatingCubes: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const cubes = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 8,
      ] as [number, number, number],
      scale: 0.2 + Math.random() * 0.3,
      speed: 0.5 + Math.random() * 1,
      color: i % 2 === 0 ? "#aa96da" : "#fcbad3",
    }));
  }, []);

  const geometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const cube = cubes[i];
        child.rotation.x = state.clock.elapsedTime * cube.speed;
        child.rotation.y = state.clock.elapsedTime * cube.speed * 0.7;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => {
        const material = new THREE.MeshStandardMaterial({
          color: cube.color,
          emissive: cube.color,
          emissiveIntensity: 0.5,
          transparent: true,
          opacity: 0.6,
          wireframe: true,
        });

        return (
          <mesh
            key={i}
            position={cube.position}
            scale={cube.scale}
            geometry={geometry}
            material={material}
          />
        );
      })}
    </group>
  );
};

const ConnectionLines: React.FC = () => {
  const linesRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const positions = [
      // Vulkan to Metal
      -3, 2, 0, 3, 2, 0,
      // Vulkan to WebGPU
      -3, 2, 0, 0, -2, 0,
      // Metal to WebGPU
      3, 2, 0, 0, -2, 0,
    ];

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
        color: "#ffd93d",
        transparent: true,
        opacity: 0.4,
      }),
    [],
  );

  useFrame((state) => {
    if (linesRef.current) {
      const mat = linesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry} material={material} />
  );
};

const Scene: React.FC = () => {
  const apiNodes = useMemo(
    () => [
      {
        position: [-3, 2, 0] as [number, number, number],
        label: "Vulkan",
        color: "#aa96da",
      },
      {
        position: [3, 2, 0] as [number, number, number],
        label: "Metal",
        color: "#fcbad3",
      },
      {
        position: [0, -2, 0] as [number, number, number],
        label: "WebGPU",
        color: "#ffd93d",
      },
    ],
    [],
  );

  const streams = useMemo(
    () => [
      {
        startPos: [-3, 2, 0] as [number, number, number],
        endPos: [3, 2, 0] as [number, number, number],
        color: "#aa96da",
      },
      {
        startPos: [-3, 2, 0] as [number, number, number],
        endPos: [0, -2, 0] as [number, number, number],
        color: "#fcbad3",
      },
      {
        startPos: [3, 2, 0] as [number, number, number],
        endPos: [0, -2, 0] as [number, number, number],
        color: "#ffd93d",
      },
    ],
    [],
  );

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#aa96da" />
      <pointLight position={[0, 10, 0]} intensity={0.8} color="#fcbad3" />
      <spotLight
        position={[0, 15, 5]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        color="#ffd93d"
      />

      <DataGrid />
      <FloatingCubes />
      <ConnectionLines />

      {apiNodes.map((node, i) => (
        <APINode key={i} {...node} />
      ))}

      {streams.map((stream, i) => (
        <TextureStream key={i} {...stream} />
      ))}
    </>
  );
};

export const GeyserDemo: React.FC = () => {
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
      />
    </Canvas>
  );
};

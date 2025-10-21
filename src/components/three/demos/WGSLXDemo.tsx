import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const CodeParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const codeSymbols = useMemo(() => {
    const symbols = ["fn", "var", "let", "@", "->", "{", "}", "vec3", "f32"];
    return symbols;
  }, []);

  const particles = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const color = new THREE.Color("#ffcccc");
      color.lerp(new THREE.Color("#ff6b9d"), Math.random());
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
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
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const FloatingCodeBlock: React.FC<{
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
}> = ({ position, rotation, color }) => {
  const groupRef = useRef<THREE.Group>(null);
  const initialY = position[1];

  const geometry = useMemo(() => new THREE.BoxGeometry(0.5, 0.5, 0.5), []);
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: color,
      transparent: true,
      opacity: 0.4,
      wireframe: true,
    });
  }, [color]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        initialY + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <mesh geometry={geometry} material={material} />
    </group>
  );
};

const ShaderSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color("#ffcccc") },
        uColorB: { value: new THREE.Color("#ff6b9d") },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float uTime;

        void main() {
          vUv = uv;
          vPosition = position;

          vec3 pos = position;
          float displacement = sin(position.x * 2.0 + uTime) *
                              sin(position.y * 2.0 + uTime) * 0.1;
          pos += normal * displacement;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        varying vec2 vUv;
        varying vec3 vPosition;

        void main() {
          vec3 color = mix(uColorA, uColorB, vUv.y);

          float pattern = sin(vPosition.x * 5.0 + uTime) *
                         sin(vPosition.y * 5.0 + uTime) *
                         sin(vPosition.z * 5.0 + uTime);

          color += pattern * 0.2;

          float fresnel = pow(1.0 - dot(normalize(vPosition), vec3(0.0, 0.0, 1.0)), 2.0);
          color += fresnel * uColorB * 0.5;

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.DoubleSide,
      transparent: true,
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} material={shaderMaterial}>
      <icosahedronGeometry args={[1, 4]} />
    </mesh>
  );
};

const WireframeBox: React.FC<{ position: [number, number, number] }> = ({
  position,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshBasicMaterial color="#ff6b9d" wireframe transparent opacity={0.3} />
    </mesh>
  );
};

const Scene: React.FC = () => {
  const codeBlocks = useMemo(
    () => [
      {
        position: [-2, 1, 0] as [number, number, number],
        rotation: [0, 0.5, 0] as [number, number, number],
        color: "#ffcccc",
      },
      {
        position: [2, -1, 0] as [number, number, number],
        rotation: [0, -0.5, 0] as [number, number, number],
        color: "#ff6b9d",
      },
      {
        position: [0, 2, -1] as [number, number, number],
        rotation: [0.3, 0, 0] as [number, number, number],
        color: "#ff99cc",
      },
      {
        position: [-1.5, -1.5, 1] as [number, number, number],
        rotation: [-0.3, 0.8, 0] as [number, number, number],
        color: "#ffaadd",
      },
    ],
    [],
  );

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#ff6b9d" />
      <spotLight
        position={[0, 5, 0]}
        angle={0.5}
        penumbra={1}
        intensity={0.5}
        color="#ffcccc"
      />

      <CodeParticles />
      <ShaderSphere />

      {codeBlocks.map((block, i) => (
        <FloatingCodeBlock key={i} {...block} />
      ))}

      <WireframeBox position={[-3, 0, -2]} />
      <WireframeBox position={[3, 0, -2]} />
    </>
  );
};

export const WGSLXDemo: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        maxDistance={8}
        minDistance={3}
      />
    </Canvas>
  );
};

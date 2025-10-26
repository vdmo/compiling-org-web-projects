import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const NeuralNetwork: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const layers = useMemo(() => {
    const layerSizes = [8, 12, 16, 12, 8];
    const layerData = [];

    for (let i = 0; i < layerSizes.length; i++) {
      const nodes = [];
      const size = layerSizes[i];
      const xPos = (i - 2) * 1.5;

      for (let j = 0; j < size; j++) {
        const yPos = (j - size / 2) * 0.4;
        nodes.push({
          position: [xPos, yPos, 0] as [number, number, number],
        });
      }

      layerData.push(nodes);
    }

    return layerData;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {layers.map((layer, layerIdx) =>
        layer.map((node, nodeIdx) => (
          <mesh key={`${layerIdx}-${nodeIdx}`} position={node.position}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color="#3498db"
              emissive="#3498db"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        ))
      )}
    </group>
  );
};

const BrainWaves: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shaderData = useMemo(() => {
    return {
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        
        void main() {
          vec2 uv = vUv;
          
          // Create wave patterns
          float wave1 = sin(uv.x * 10.0 + uTime * 2.0) * 0.5;
          float wave2 = sin(uv.y * 8.0 - uTime * 1.5) * 0.5;
          float pattern = wave1 + wave2;
          
          // Color gradient
          vec3 color1 = vec3(0.2, 0.6, 0.86); // #3498db
          vec3 color2 = vec3(0.13, 0.42, 0.71); // darker blue
          vec3 color = mix(color1, color2, pattern * 0.5 + 0.5);
          
          // Add glow
          float glow = 1.0 - length(vUv - 0.5) * 1.5;
          color += glow * 0.2;
          
          gl_FragColor = vec4(color, 0.6);
        }
      `,
    };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <planeGeometry args={[6, 4, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={shaderData.vertexShader}
        fragmentShader={shaderData.fragmentShader}
        uniforms={{
          uTime: { value: 0 },
        }}
        transparent
      />
    </mesh>
  );
};

const DataStream: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Create flowing stream pattern
      const angle = (i / count) * Math.PI * 4;
      const radius = 2 + Math.random() * 1.5;
      const height = (i / count) * 6 - 3;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      // Gradient color
      const t = i / count;
      colors[i * 3] = 0.2 + t * 0.3; // R
      colors[i * 3 + 1] = 0.6 + t * 0.2; // G
      colors[i * 3 + 2] = 0.86; // B
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.15;

      const positions = pointsRef.current.geometry.attributes.position;
      for (let i = 0; i < particles.positions.length / 3; i++) {
        const height = positions.getY(i);
        const newHeight = height + 0.03;
        positions.setY(i, newHeight > 3 ? -3 : newHeight);
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
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const DiffusionSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.IcosahedronGeometry>(null);

  const initialPositions = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(1.5, 3);
    return geometry.attributes.position.array.slice();
  }, []);

  useFrame((state) => {
    if (meshRef.current && geometryRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;

      const positions = geometryRef.current.attributes.position.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        const x = initialPositions[i];
        const y = initialPositions[i + 1];
        const z = initialPositions[i + 2];

        const distance = Math.sqrt(x * x + y * y + z * z);
        const wave = Math.sin(distance * 2 + state.clock.elapsedTime) * 0.15;

        positions[i] = x * (1 + wave);
        positions[i + 1] = y * (1 + wave);
        positions[i + 2] = z * (1 + wave);
      }

      geometryRef.current.attributes.position.needsUpdate = true;
      geometryRef.current.computeVertexNormals();
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry ref={geometryRef} args={[1.5, 3]} />
      <meshStandardMaterial
        color="#3498db"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
};

const Scene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#3498db" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#2980b9" />

      <BrainWaves />
      <DataStream />
      <NeuralNetwork />
      <DiffusionSphere />
    </>
  );
};

export const StreamDiffusionRSDemo: React.FC = () => {
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

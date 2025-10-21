import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface PresentationSlideProps {
  position: [number, number, number];
  color: string;
  index: number;
}

const PresentationSlide: React.FC<PresentationSlideProps> = ({
  position,
  color,
  index,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => new THREE.PlaneGeometry(2.5, 3), []);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
        uIndex: { value: index },
      },
      vertexShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uIndex;

        void main() {
          vUv = uv;
          vec3 pos = position;

          float wave = sin(pos.x * 2.0 + uTime + uIndex) * 0.15;
          wave += sin(pos.y * 2.0 + uTime * 0.7 + uIndex) * 0.15;
          pos.z += wave;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uIndex;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;

          // Bright base color
          vec3 baseColor = uColor * 1.5;

          // Grid pattern - much brighter
          float gridX = step(0.92, fract(uv.x * 12.0));
          float gridY = step(0.92, fract(uv.y * 12.0));
          float grid = max(gridX, gridY);

          // Animated gradient
          vec3 color1 = baseColor;
          vec3 color2 = baseColor * 1.2;
          vec3 color = mix(color1, color2, uv.y);

          // Scanline effect
          float scanline = sin(uv.y * 40.0 + uTime * 3.0 + uIndex) * 0.15 + 0.85;
          color *= scanline;

          // Pulse effect
          float pulse = sin(uTime * 2.0 + uIndex) * 0.2 + 1.0;
          color *= pulse;

          // Add bright grid
          color += grid * baseColor * 0.6;

          // Diagonal lines
          float diagonal = sin((uv.x + uv.y) * 20.0 + uTime) * 0.5 + 0.5;
          color += diagonal * baseColor * 0.2;

          // Edge glow - brighter
          float edgeGlow = smoothstep(0.0, 0.15, uv.x) *
                          smoothstep(1.0, 0.85, uv.x) *
                          smoothstep(0.0, 0.15, uv.y) *
                          smoothstep(1.0, 0.85, uv.y);
          color += (1.0 - edgeGlow) * baseColor * 0.8;

          // Corner highlights
          float corner = max(
            max(smoothstep(0.95, 1.0, uv.x), smoothstep(0.0, 0.05, uv.x)),
            max(smoothstep(0.95, 1.0, uv.y), smoothstep(0.0, 0.05, uv.y))
          );
          color += corner * vec3(1.0) * 0.5;

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });
  }, [color, index]);

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.8 + index) * 0.4;
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        attach="material"
        args={[shaderMaterial]}
      />
    </mesh>
  );
};

const FloatingScreen: React.FC<{
  position: [number, number, number];
  color: string;
}> = ({ position, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => new THREE.BoxGeometry(1.5, 1, 0.1), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 1.2,
        metalness: 0.9,
        roughness: 0.1,
      }),
    [color],
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
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

const LaserBeams: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const beams = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 6;
      return {
        position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius] as [
          number,
          number,
          number,
        ],
        color: [
          "#f38181",
          "#95e1d3",
          "#aa96da",
          "#ffd93d",
          "#ff6b9d",
          "#4ecdc4",
        ][i],
      };
    });
  }, []);

  const geometry = useMemo(
    () => new THREE.CylinderGeometry(0.05, 0.05, 12, 8),
    [],
  );

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity =
          0.8 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.4;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {beams.map((beam, i) => {
        const material = new THREE.MeshStandardMaterial({
          color: beam.color,
          emissive: beam.color,
          emissiveIntensity: 1,
          transparent: true,
          opacity: 0.6,
        });

        return (
          <mesh
            key={i}
            position={beam.position}
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
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;

      const color = new THREE.Color();
      color.setHSL(Math.random(), 1, 0.7);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    return { geometry: geo, material: mat };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      pointsRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
};

const EnergyRings: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const rings = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      radius: 4 + i * 2,
      color: ["#f38181", "#95e1d3", "#aa96da"][i],
      delay: i * 0.5,
    }));
  }, []);

  const geometry = useMemo(() => new THREE.TorusGeometry(1, 0.08, 16, 100), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const ring = rings[i];
        child.rotation.x = state.clock.elapsedTime * 0.3 + ring.delay;
        child.rotation.y = state.clock.elapsedTime * 0.2 + ring.delay;
        const scale =
          ring.radius *
          (1 + Math.sin(state.clock.elapsedTime * 2 + ring.delay) * 0.2);
        child.scale.setScalar(scale);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => {
        const material = new THREE.MeshStandardMaterial({
          color: ring.color,
          emissive: ring.color,
          emissiveIntensity: 1.5,
          transparent: true,
          opacity: 0.5,
        });

        return <mesh key={i} geometry={geometry} material={material} />;
      })}
    </group>
  );
};

const Scene: React.FC = () => {
  const slides = useMemo(
    () => [
      {
        position: [-4, 0.5, 0] as [number, number, number],
        color: "#f38181",
        index: 0,
      },
      {
        position: [0, 0, 2] as [number, number, number],
        color: "#95e1d3",
        index: 1,
      },
      {
        position: [4, -0.5, 0] as [number, number, number],
        color: "#aa96da",
        index: 2,
      },
    ],
    [],
  );

  const screens = useMemo(
    () => [
      { position: [-3, 3, -3] as [number, number, number], color: "#ffd93d" },
      { position: [3, 3, -3] as [number, number, number], color: "#ff6b9d" },
      { position: [0, 4, 3] as [number, number, number], color: "#4ecdc4" },
    ],
    [],
  );

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#f38181" />
      <pointLight position={[0, 10, -10]} intensity={1.2} color="#95e1d3" />
      <pointLight position={[10, -5, 5]} intensity={1} color="#aa96da" />
      <spotLight
        position={[0, 20, 0]}
        angle={0.6}
        penumbra={1}
        intensity={2}
        color="#ffd93d"
      />

      <FloatingParticles />
      <LaserBeams />
      <EnergyRings />

      {slides.map((slide) => (
        <PresentationSlide key={slide.index} {...slide} />
      ))}

      {screens.map((screen, i) => (
        <FloatingScreen key={i} {...screen} />
      ))}
    </>
  );
};

export const PodiumRocksDemo: React.FC = () => {
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
        autoRotate
        autoRotateSpeed={0.8}
      />
    </Canvas>
  );
};

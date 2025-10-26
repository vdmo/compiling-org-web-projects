import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingCodeCubeProps {
  position: [number, number, number];
  color: string;
  speed: number;
  rotationSpeed: number;
}

const FloatingCodeCube: React.FC<FloatingCodeCubeProps> = ({
  position,
  color,
  speed,
  rotationSpeed,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const baseY = position[1];

  const geometry = useMemo(() => new THREE.BoxGeometry(0.4, 0.4, 0.4), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
        emissive: color,
        emissiveIntensity: 0.4,
      }),
    [color],
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed * 0.7;
      meshRef.current.position.y =
        baseY + Math.sin(state.clock.elapsedTime * speed) * 0.8;
    }
  });

  return (
    <mesh ref={meshRef} position={position} geometry={geometry} material={material} />
  );
};

interface GalaxyRingProps {
  radius: number;
  particleCount: number;
  color: string;
  speed: number;
}

const GalaxyRing: React.FC<GalaxyRingProps> = ({
  radius,
  particleCount,
  color,
  speed,
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorObj = new THREE.Color(color);

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radiusVariation = radius + (Math.random() - 0.5) * 0.5;

      positions[i * 3] = Math.cos(angle) * radiusVariation;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
      positions[i * 3 + 2] = Math.sin(angle) * radiusVariation;

      colors[i * 3] = colorObj.r;
      colors[i * 3 + 1] = colorObj.g;
      colors[i * 3 + 2] = colorObj.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    return { geometry: geo, material: mat };
  }, [radius, particleCount, color]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * speed;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
};

const CentralSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.5, 4), []);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#ff6b35") },
        uColor2: { value: new THREE.Color("#4ecdc4") },
        uColor3: { value: new THREE.Color("#95e1d3") },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float uTime;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;

          vec3 pos = position;
          float displacement = sin(pos.x * 2.0 + uTime) *
                              sin(pos.y * 2.0 + uTime) *
                              sin(pos.z * 2.0 + uTime) * 0.15;
          pos += normal * displacement;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          vec3 color = mix(uColor1, uColor2, vNormal.y * 0.5 + 0.5);
          color = mix(color, uColor3, vNormal.x * 0.5 + 0.5);

          float pattern = sin(vPosition.x * 5.0 + uTime) *
                         sin(vPosition.y * 5.0 + uTime) *
                         sin(vPosition.z * 5.0 + uTime);
          color += pattern * 0.1;

          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
          color += fresnel * uColor2 * 0.5;

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} material={shaderMaterial}>
      <shaderMaterial ref={materialRef} attach="material" {...shaderMaterial} />
    </mesh>
  );
};

const StarField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const starCount = 1500;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      const color = new THREE.Color();
      color.setHSL(Math.random(), 0.5, 0.7);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    return { geometry: geo, material: mat };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
};

const OrbitingCubes: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const cubes = useMemo(() => {
    const colors = ["#ff6b35", "#4ecdc4", "#95e1d3", "#f38181", "#aa96da", "#fcbad3"];
    return Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 5;
      return {
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * 2,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        color: colors[i % colors.length],
        speed: 0.5 + Math.random() * 0.5,
        rotationSpeed: 0.01 + Math.random() * 0.02,
      };
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <FloatingCodeCube key={i} {...cube} />
      ))}
    </group>
  );
};

const MouseInteractive: React.FC = () => {
  const { camera } = useThree();
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      targetRotation.current.x = (event.clientY / window.innerHeight - 0.5) * 0.2;
      targetRotation.current.y = (event.clientX / window.innerWidth - 0.5) * 0.2;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    camera.rotation.x += (targetRotation.current.x - camera.rotation.x) * 0.05;
    camera.rotation.y += (targetRotation.current.y - camera.rotation.y) * 0.05;
  });

  return null;
};

const Scene: React.FC = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ff6b35" />
      <pointLight position={[0, 10, -10]} intensity={0.6} color="#4ecdc4" />
      <spotLight
        position={[0, 15, 0]}
        angle={0.5}
        penumbra={1}
        intensity={0.5}
        color="#95e1d3"
      />

      {/* Scene Elements */}
      <StarField />
      <CentralSphere />
      <GalaxyRing radius={3} particleCount={200} color="#ff6b35" speed={0.2} />
      <GalaxyRing radius={4.5} particleCount={250} color="#4ecdc4" speed={-0.15} />
      <GalaxyRing radius={6} particleCount={300} color="#95e1d3" speed={0.1} />
      <OrbitingCubes />
      <MouseInteractive />
    </>
  );
};

export const HeroScene: React.FC = () => {
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
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 3, 10], fov: 60 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        onCreated={(state) => {
          state.gl.setClearColor("#000000", 0);
          // Tilt camera to look down at the scene for Saturn-like view
          state.camera.rotation.x = -0.3;
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

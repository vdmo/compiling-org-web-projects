import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const CodeEditor: React.FC<{ position: [number, number, number] }> = ({
  position,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => new THREE.PlaneGeometry(2.5, 3.5), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1e1e1e",
        emissive: "#2a2d3a",
        emissiveIntensity: 0.5,
        roughness: 0.8,
        metalness: 0.2,
      }),
    [],
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} geometry={geometry} material={material} />
      {/* Code lines */}
      {Array.from({ length: 12 }, (_, i) => {
        const y = 1.5 - i * 0.25;
        const width = 1.8 - Math.random() * 0.5;
        const color = ["#569cd6", "#ce9178", "#4ec9b0", "#c586c0"][i % 4];
        return (
          <mesh key={i} position={[-0.3, y, 0.01]}>
            <planeGeometry args={[width, 0.08]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.8}
            />
          </mesh>
        );
      })}
      {/* Border */}
      <lineSegments position={[0, 0, 0.02]}>
        <edgesGeometry
          attach="geometry"
          args={[new THREE.PlaneGeometry(2.5, 3.5)]}
        />
        <lineBasicMaterial color="#a8d8ea" />
      </lineSegments>
    </group>
  );
};

const ShaderPreview: React.FC<{ position: [number, number, number] }> = ({
  position,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => new THREE.PlaneGeometry(2.5, 2.5), []);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv * 2.0 - 1.0;
          float dist = length(uv);

          // Animated rings
          float rings = sin(dist * 10.0 - uTime * 3.0) * 0.5 + 0.5;

          // Rotating gradient
          float angle = atan(uv.y, uv.x) + uTime;
          float gradient = sin(angle * 3.0) * 0.5 + 0.5;

          // Colors
          vec3 color1 = vec3(0.26, 0.85, 0.92); // Cyan
          vec3 color2 = vec3(0.3, 0.76, 0.69); // Teal
          vec3 color3 = vec3(0.58, 0.88, 0.83); // Light teal

          vec3 color = mix(color1, color2, rings);
          color = mix(color, color3, gradient);

          // Vignette
          color *= 1.0 - dist * 0.3;

          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.5 + 1) * 0.1;
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

const FloatingIcons: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const icons = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 5;
      return {
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 3,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        color: ["#a8d8ea", "#4ecdc4", "#95e1d3", "#00b4d8"][i % 4],
      };
    });
  }, []);

  const geometry = useMemo(() => new THREE.BoxGeometry(0.3, 0.3, 0.3), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.children.forEach((child, i) => {
        child.rotation.x = state.clock.elapsedTime * (0.5 + i * 0.1);
        child.rotation.y = state.clock.elapsedTime * (0.3 + i * 0.1);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {icons.map((icon, i) => {
        const material = new THREE.MeshStandardMaterial({
          color: icon.color,
          emissive: icon.color,
          emissiveIntensity: 0.5,
          metalness: 0.8,
          roughness: 0.2,
        });
        return (
          <mesh
            key={i}
            position={icon.position}
            geometry={geometry}
            material={material}
          />
        );
      })}
    </group>
  );
};

const ConnectionLine: React.FC = () => {
  const lineRef = useRef<THREE.Line>(null);

  const geometry = useMemo(() => {
    const points = [
      new THREE.Vector3(-1.3, 0, 0),
      new THREE.Vector3(1.3, 0, 0),
    ];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#a8d8ea",
        linewidth: 2,
      }),
    [],
  );

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.material.opacity =
        0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return <line ref={lineRef} geometry={geometry} material={material} />;
};

const VSCodeLogo: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => new THREE.BoxGeometry(0.6, 0.6, 0.6), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#a8d8ea",
        emissive: "#a8d8ea",
        emissiveIntensity: 0.8,
        metalness: 0.9,
        roughness: 0.1,
      }),
    [],
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, 3, 0]}
      geometry={geometry}
      material={material}
    />
  );
};

const Particles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = Math.random() * 10 - 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

      color.setHSL(0.5 + Math.random() * 0.1, 0.8, 0.6);
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
      opacity: 0.8,
      sizeAttenuation: true,
    });

    return { geometry: geo, material: mat };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.01;
        if (positions[i + 1] < -5) {
          positions[i + 1] = 5;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
};

const Scene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#a8d8ea" />
      <pointLight position={[0, 0, 10]} intensity={0.8} color="#4ecdc4" />

      <Particles />
      <FloatingIcons />
      <ConnectionLine />
      <VSCodeLogo />

      <CodeEditor position={[-2.5, 0, 0]} />
      <ShaderPreview position={[2.5, 0, 0]} />
    </>
  );
};

export const VSCodeISFDemo: React.FC = () => {
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

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const ShaderPlane: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#95e1d3") },
        uColor2: { value: new THREE.Color("#4ecdc4") },
        uColor3: { value: new THREE.Color("#00b4d8") },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vElevation;
        uniform float uTime;

        void main() {
          vUv = uv;

          vec3 pos = position;
          float elevation = sin(pos.x * 3.0 + uTime) * 0.1;
          elevation += sin(pos.y * 2.0 + uTime * 0.5) * 0.1;
          pos.z += elevation;

          vElevation = elevation;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        varying vec2 vUv;
        varying float vElevation;

        void main() {
          vec3 color = mix(uColor1, uColor2, vUv.y);
          color = mix(color, uColor3, vElevation * 5.0 + 0.5);

          float pattern = sin(vUv.x * 10.0 + uTime) * sin(vUv.y * 10.0 + uTime);
          color += pattern * 0.1;

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} material={shaderMaterial}>
      <planeGeometry args={[4, 4, 32, 32]} />
    </mesh>
  );
};

const BackgroundPlanes: React.FC = () => {
  return (
    <>
      <mesh position={[0, 0, -2]} rotation={[0, 0, 0]}>
        <planeGeometry args={[6, 6, 1, 1]} />
        <meshBasicMaterial color="#0a0a0a" transparent opacity={0.5} />
      </mesh>
    </>
  );
};

export const PodiumJSDemo: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4ecdc4" />

      <BackgroundPlanes />
      <ShaderPlane />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
};

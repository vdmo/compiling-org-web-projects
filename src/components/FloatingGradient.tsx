import React, { useRef } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const GradientMaterial = shaderMaterial(
  // Uniforms
  {
    u_time: 0,
    u_colorA: new THREE.Color('#3a0ca3'), // A deep purple
    u_colorB: new THREE.Color('#4361ee'), // A nice blue
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float u_time;
    uniform vec3 u_colorA;
    uniform vec3 u_colorB;
    varying vec2 vUv;

    // 2D Random
    float random (vec2 st) {
        return fract(sin(dot(st.xy,
                             vec2(12.9898,78.233)))*
            43758.5453123);
    }

    // 2D Noise
    float noise (in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        vec2 u = f*f*(3.0-2.0*f);
        return mix(a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.y * u.x;
    }

    void main() {
      vec2 scaledUv = vUv * 3.0;
      float t = u_time * 0.1;
      
      float n = noise(scaledUv + t);
      
      vec3 color = mix(u_colorA, u_colorB, n);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ GradientMaterial });

const Scene = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      (materialRef.current as any).u_time = clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      {/* @ts-ignore */}
      <gradientMaterial ref={materialRef} />
    </mesh>
  );
};

export const FloatingGradient = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full -z-20 opacity-20">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Scene />
      </Canvas>
    </div>
  );
};
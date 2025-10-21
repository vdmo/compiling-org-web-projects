# Project Demos Guide

Complete documentation for all Three.js demos on the compiling.org website.

---

## Overview

Each project on compiling.org features a unique, interactive Three.js demo that visualizes its core concepts and functionality. All demos are lazy-loaded for optimal performance and include:

- Custom shader materials
- Animated geometries
- Interactive camera controls (OrbitControls)
- Particle systems
- Real-time animations

---

## Demo Implementations

### 1. NUWE Rust Demo
**File:** `NuweRustDemo.tsx`  
**Project ID:** `nuwe-rust`  
**Theme:** Procedural mesh generation with animated geometry

#### Visual Elements
- **Procedural Mesh**: Animated icosahedron with wave-based vertex displacement
- **Wireframe Overlay**: Rotating octahedron for architectural visualization
- **Floating Cubes**: 6 cubes orbiting in circular formation
- **Particle System**: 500 particles in spherical distribution
- **Multi-Light Setup**: Dynamic lighting with colored point lights

#### Technical Details
- Vertex displacement using distance-based sine waves
- Real-time normal recalculation
- Metallic/rough materials (metalness: 0.8, roughness: 0.2)
- Interactive OrbitControls with zoom limits

#### Colors
- Primary: `#ff6b35` (Orange-red)
- Emissive intensity: 0.3

---

### 2. PCHI Life Demo
**File:** `PCHILifeDemo.tsx`  
**Project ID:** `pchi-life`  
**Theme:** Universal language protocol for 3D scenes

#### Visual Elements
- **Scene Nodes**: 6 octahedron nodes representing different platforms
- **Protocol Rings**: 3 rotating torus rings around each node
- **Connection Lines**: Dynamic lines between nodes showing data flow
- **Data Packets**: 30 animated cubes flowing between nodes
- **Outer Rings**: Large rotating protocol layer rings

#### Technical Details
- Node-based architecture visualization
- Pulsing scale animation on nodes
- Packet circulation using polar coordinates
- Line opacity animation based on time
- Multi-axis ring rotation

#### Colors
- Teal: `#4ecdc4` (Primary protocol)
- Mint: `#95e1d3` (Secondary)
- Blue: `#00b4d8` (Accent)

---

### 3. PodiumJS Demo
**File:** `PodiumJSDemo.tsx`  
**Project ID:** `podiumjs`  
**Theme:** WebGPU-based shader plane animation

#### Visual Elements
- **Shader Plane**: Custom GLSL shader with wave displacement
- **Background Planes**: Depth enhancement layers
- **OrbitControls**: Limited to Y-axis rotation

#### Technical Details
- Custom vertex shader with elevation mapping
- Fragment shader color mixing
- Scanline effect overlay
- Pattern generation using sine functions
- Double-sided rendering

#### Shader Features
```glsl
// Wave animation
elevation = sin(pos.x * 3.0 + uTime) * 0.1
elevation += sin(pos.y * 2.0 + uTime * 0.5) * 0.1
```

#### Colors
- Gradient: `#95e1d3` to `#4ecdc4` to `#00b4d8`

---

### 4. Podium.Rocks Demo
**File:** `PodiumRocksDemo.tsx`  
**Project ID:** `podium-rocks`  
**Theme:** WebGPU presentation toolkit with dynamic slides

#### Visual Elements
- **Presentation Slides**: 3 shader-animated planes with scanlines
- **Floating Icons**: 12 geometric shapes (cubes, cones, torus)
- **Laser Beams**: 8 vertical cylinder beams
- **Particle Field**: 600 particles with additive blending
- **Auto-Rotation**: Automatic camera rotation

#### Technical Details
- Custom shader materials for each slide
- Grid pattern overlay on slides
- Pulse effect synchronized across elements
- Edge glow effects
- Delay-based animation timing

#### Shader Effects
- Scanline animation: `sin(uv.y * 50.0 + uTime * 2.0)`
- Grid pattern: `step(0.95, fract(uv * 10.0))`
- Pulse effect: `sin(uTime * 2.0) * 0.1 + 0.9`

#### Colors
- Coral: `#f38181`
- Mint: `#95e1d3`
- Purple: `#aa96da`

---

### 5. Geyser Demo
**File:** `GeyserDemo.tsx`  
**Project ID:** `geyser`  
**Theme:** Cross-platform texture sharing visualization

#### Visual Elements
- **API Nodes**: 3 icosahedrons representing Vulkan, Metal, WebGPU
- **Texture Streams**: Particle flows between APIs (150 total particles)
- **Texture Grid**: Animated plane with wave displacement
- **Data Cubes**: 20 wireframe cubes representing texture data
- **Pulsing Rings**: Torus rings around each API node

#### Technical Details
- Particle streaming using linear interpolation
- Real-time position updates in useFrame
- Shader-based grid with elevation mapping
- Node rotation and scale animation
- Multi-colored particle streams

#### API Nodes
- **Vulkan**: Purple `#aa96da` at (-3, 2, 0)
- **Metal**: Pink `#fcbad3` at (3, 2, 0)
- **WebGPU**: Yellow `#ffd93d` at (0, -2, 0)

---

### 6. ShadersHub Demo
**File:** `ShadersHubDemo.tsx`  
**Project ID:** `shadershub`  
**Theme:** Shader marketplace visualization

#### Visual Elements
- **Shader Cards**: 6 animated planes with code-like patterns
- **Central Hub**: Shader-animated sphere with grid pattern
- **Code Fragments**: 400 particles in spiral formation
- **Connection Beams**: Lines from hub to cards
- **Floating Icons**: 12 octahedrons orbiting the scene
- **Auto-Rotate**: Continuous rotation at 1 RPM

#### Technical Details
- Random code pattern generation
- Scanline effects on cards
- Fresnel glow on central sphere
- Additive blending for fragments
- Opacity animation on connection beams

#### Shader Features
```glsl
// Code-like pattern
float codePattern = step(0.85, random(floor(uv * vec2(8.0, 20.0))))
// Animated scanline
float scanline = sin(uv.y * 30.0 + uTime * 3.0) * 0.05 + 0.95
```

#### Colors
- Pink: `#fcbad3` (Primary)
- Hot Pink: `#ff6b9d` (Secondary)
- Light Pink: `#ff99cc`, `#ffaadd`, `#ffd1e0`, `#ffe0ec`

---

### 7. VJs.agency Demo
**File:** `VJsAgencyDemo.tsx`  
**Project ID:** `vjs-agency`  
**Theme:** VJ booking platform with stage visualization

#### Visual Elements
- **Stage Platform**: Dark metallic box (8×0.2×6 units)
- **Stage Lights**: 5 spotlights with cone beam visualization
- **Performer Spot**: Central cylinder with pulsing ring
- **Crowd Particles**: 500 particles simulating audience
- **Music Bars**: 16 animated bars reacting to "audio"
- **Energy Waves**: 3 expanding torus rings
- **Laser Grid**: Overhead wireframe grid

#### Technical Details
- Spotlight intensity animation
- Beam opacity pulsing
- Crowd particle position/color animation
- Music bars with height and color based on sine waves
- Energy wave expansion with opacity fade
- HSL color cycling on crowd

#### Lighting
- 5 spotlights: pink, teal, yellow, mint, coral
- Intensity: 2.0 + sin(time * 2) * 0.5
- Angle: 0.4 radians
- Penumbra: 0.5

#### Colors
- Stage Lights: `#ff6b9d`, `#4ecdc4`, `#ffffd2`, `#95e1d3`, `#f38181`
- Performer: `#ffffd2` (Yellow highlight)

---

### 8. VS Code ISF Demo
**File:** `VSCodeISFDemo.tsx`  
**Project ID:** `vscode-isf`  
**Theme:** VS Code editor with live shader preview

#### Visual Elements
- **Code Editor**: Left plane (3×4) with VS Code dark theme
- **Shader Preview**: Right plane (2.5×2.5) with live ISF effect
- **Floating Brackets**: 12 symbol characters { } < > [ ] ( )
- **Data Stream**: 300 falling particles
- **Connection Line**: Animated line between editor and preview
- **VS Code Logo**: Rotating cube at top

#### Technical Details
- Custom shader simulating code editor
- Syntax highlighting (5 colors)
- Line numbers and cursor blink
- Active line highlight
- Selection visualization
- Live shader preview with kaleidoscope effect

#### Editor Features
```glsl
// Syntax colors
Blue:   vec3(0.33, 0.63, 0.83) // Keywords
Yellow: vec3(0.86, 0.86, 0.52) // Strings
Green:  vec3(0.34, 0.73, 0.56) // Comments
Purple: vec3(0.78, 0.47, 0.70) // Functions
Red:    vec3(0.84, 0.38, 0.38) // Types
```

#### Preview Shader
- Kaleidoscope effect with 8 segments
- Ripple animation
- Color cycling (3 colors)
- Circular waves
- Vignette effect

#### Colors
- Primary: `#a8d8ea` (Light blue - VS Code theme)
- Accent: `#4ecdc4`, `#95e1d3`

---

### 9. WGSLX Demo
**File:** `WGSLXDemo.tsx`  
**Project ID:** `wgslx`  
**Theme:** WGSL shader format visualization

#### Visual Elements
- **Code Particles**: 100 particles with HSL color variation
- **Floating Code Blocks**: 4 wireframe cubes representing code
- **Shader Sphere**: Central icosahedron with custom shader
- **Wireframe Boxes**: 2 accent boxes
- **OrbitControls**: Full interaction with zoom

#### Technical Details
- Custom shader with displacement
- Pattern generation using position
- Fresnel effect for edge glow
- Wireframe cube rotation
- Code particle spiral distribution

#### Shader Features
```glsl
// Displacement
float displacement = sin(pos.x * 2.0 + uTime) *
                    sin(pos.y * 2.0 + uTime) *
                    sin(pos.z * 2.0 + uTime) * 0.1
// Pattern
float pattern = sin(vPosition.x * 5.0 + uTime) *
               sin(vPosition.y * 5.0 + uTime) *
               sin(vPosition.z * 5.0 + uTime)
```

#### Colors
- Light Pink: `#ffcccc`
- Hot Pink: `#ff6b9d`
- Pink variations: `#ff99cc`, `#ffaadd`

---

### 10. Play Demo
**File:** `PlayDemo.tsx`  
**Project ID:** `play`  
**Theme:** Browser-based VJ mixer visualization

#### Visual Elements
- **Audio Spheres**: 4 spheres with audio-reactive scaling
- **Mixer Grid**: 4 rotating wireframe boxes
- **Particle Ring**: 200 particles in circular formation with HSL colors
- **Central Sphere**: White mixing sphere
- **Multi-Light Setup**: 3 colored point lights

#### Technical Details
- Audio-reactive scale animation using sine waves
- HSL color gradient on particle ring
- Mixer grid rotation with sine wave
- Individual sphere speeds and scales
- Additive blending on particles

#### Audio Spheres
- Position: 4 spheres at cardinal positions
- Scale range: 0.6 to 1.0
- Speed range: 1.8 to 3.0
- Colors: pink, teal, yellow, mint

#### Colors
- Pink: `#ff6b9d`
- Teal: `#4ecdc4`
- Yellow: `#ffd93d`
- Mint: `#a8e6cf`

---

## Performance Metrics

### Particle Counts
- NUWE Rust: 500 particles
- PCHI Life: 30 packets + connection lines
- PodiumJS: Minimal (shader-based)
- Podium.Rocks: 600 particles
- Geyser: 150 stream particles + 20 cubes
- ShadersHub: 400 particles
- VJs.agency: 500 crowd particles
- VS Code ISF: 300 particles
- WGSLX: 100 particles
- Play: 200 particles

### Average FPS
- All demos target: **60 FPS**
- Recommended hardware: Modern GPU (2016+)
- Minimum: WebGL 1.0
- Recommended: WebGL 2.0

---

## Common Features

### All Demos Include

1. **WebGL Detection**
   - Graceful degradation if not available
   - Clear error handling

2. **Performance Optimization**
   - `useMemo` for geometry/materials
   - `useFrame` for animations
   - Lazy loading (code splitting)

3. **Camera Controls**
   - OrbitControls for user interaction
   - Zoom limits (min/max distance)
   - Auto-rotate on some demos

4. **Lighting Setup**
   - Ambient light (0.3-0.4 intensity)
   - 2-3 point lights
   - Spotlight on select demos
   - Color-coded lighting matching project theme

5. **Responsive**
   - Adapts to container size
   - Maintains aspect ratio
   - Touch-friendly controls

---

## Integration

### Using Demos in Project Pages

Demos are automatically loaded based on project ID:

```typescript
// src/pages/ProjectDetail.tsx
const DemoComponent = getDemoComponent(project.id);

{DemoComponent && (
  <DemoContainer projectId={project.id}>
    <DemoComponent />
  </DemoContainer>
)}
```

### Demo Container Features
- Error boundaries
- Loading states
- Suspense fallbacks
- WebGL compatibility check

---

## Customization Guide

### Changing Colors

Edit the color values in each demo file:

```typescript
// Example from NuweRustDemo.tsx
const material = new THREE.MeshStandardMaterial({
  color: "#ff6b35", // Change this
  emissive: "#ff6b35", // And this
  emissiveIntensity: 0.3,
});
```

### Adjusting Animation Speed

Modify the time multipliers in `useFrame`:

```typescript
useFrame((state) => {
  mesh.rotation.y = state.clock.elapsedTime * 0.2; // Slower: 0.1, Faster: 0.5
});
```

### Particle Density

Change particle counts for performance:

```typescript
const particleCount = 500; // Reduce to 200 for better performance
```

### Camera Position

Adjust viewing angle in Canvas setup:

```typescript
<Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
  {/* position: [x, y, z] */}
  {/* fov: field of view (45-75 typical) */}
</Canvas>
```

---

## Creating New Demos

### Template Structure

```typescript
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const Scene: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#4ecdc4",
  }), []);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime;
    }
  });
  
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} />
      <mesh ref={meshRef} geometry={geometry} material={material} />
    </>
  );
};

export const MyProjectDemo: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      <Scene />
      <OrbitControls />
    </Canvas>
  );
};
```

### Best Practices

1. **Use refs for animated objects**
   - Allows direct manipulation in useFrame
   - Avoids unnecessary re-renders

2. **Memoize geometries and materials**
   - Prevents recreation on each render
   - Improves performance

3. **Keep particle counts reasonable**
   - Test on lower-end devices
   - 500-1000 particles max for general scenes

4. **Add fallbacks**
   - Check for WebGL support
   - Provide static fallback content

5. **Use appropriate lighting**
   - At least ambient + 1 point light
   - Color lights matching project theme

---

## Troubleshooting

### Demo Not Showing
- Check browser console for errors
- Verify WebGL is enabled: `chrome://gpu`
- Ensure component is registered in `demos/index.tsx`
- Check project ID matches in `getDemoComponent()`

### Low Performance
- Reduce particle counts
- Simplify geometry detail (fewer segments)
- Remove expensive shader operations
- Disable shadows if enabled

### Shader Not Working
- Check for GLSL syntax errors
- Verify uniform declarations
- Ensure vertex/fragment shaders are paired
- Check WebGL version support

### OrbitControls Not Responding
- Verify pointer-events are not disabled
- Check z-index conflicts
- Ensure Canvas is not covered by other elements

---

## Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [GLSL Reference](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language)
- [WebGL Fundamentals](https://webglfundamentals.org/)
- [Shader Tutorial](https://thebookofshaders.com/)

---

**Last Updated:** 2024  
**Maintained by:** Compiling Team
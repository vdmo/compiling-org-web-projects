# Hero Scenes Guide

## Overview

The compiling.org website features three stunning Three.js hero scenes that you can easily switch between. Each scene offers a unique visual aesthetic and performance characteristics.

## Quick Start

To change the active hero scene, edit `src/components/three/HeroConfig.tsx`:

```typescript
// Uncomment the scene you want to use:
export const ActiveHeroScene = HeroScene;        // Universe (Default)
// export const ActiveHeroScene = HeroSceneDNA;  // DNA Helix
// export const ActiveHeroScene = HeroSceneGrid; // Grid
```

Save the file and the dev server will hot-reload with your chosen scene.

---

## Scene 1: Universe Scene (Default)

**File:** `HeroScene.tsx`  
**Best for:** Immersive, space-themed, creative portfolios

### Visual Elements

- **Central Sphere**: Shader-animated icosahedron with color mixing
  - Animated vertex displacement creating organic movement
  - Triple-color gradient (orange, teal, mint)
  - Fresnel glow effect on edges
  - Continuous rotation on X and Y axes

- **Galaxy Rings**: 3 concentric particle rings
  - Ring 1: 200 particles at 3 units radius (orange, speed: 0.2)
  - Ring 2: 250 particles at 4.5 units radius (teal, speed: -0.15)
  - Ring 3: 300 particles at 6 units radius (mint, speed: 0.1)
  - Counter-rotating for dynamic effect
  - Additive blending for glow

- **Orbiting Cubes**: 8 wireframe cubes
  - Positioned in circular formation at 5 units radius
  - Individual floating animation with sine wave
  - Color-coded with project palette
  - Independent rotation speeds

- **Star Field**: 1500+ particles
  - Full 360° spherical distribution
  - HSL color variation for variety
  - Subtle rotation for depth
  - Creates cosmic atmosphere

- **Mouse Interaction**: Camera follows cursor
  - Smooth parallax effect
  - X/Y rotation based on mouse position
  - Lerp interpolation for smooth movement

### Performance
- **Particle Count**: ~2,050 particles
- **Geometry**: ~8 meshes
- **Recommended FPS**: 60fps on modern hardware

### Use Cases
- Creative agencies
- Visual effects companies
- Space/technology themes
- Projects emphasizing innovation

---

## Scene 2: DNA Helix Scene

**File:** `HeroSceneDNA.tsx`  
**Best for:** Tech, biotech, data science, molecular themes

### Visual Elements

- **DNA Strands**: 2 dual-helix structures
  - Primary Helix: 30 nodes per strand (orange/teal, 2 units radius)
  - Secondary Helix: 30 nodes per strand (mint/coral, 3.5 units radius)
  - Counter-rotating at different speeds
  - Realistic biological appearance

- **Connection Nodes**: Spheres at helix points
  - 0.15 unit radius spheres
  - Emissive material for glow
  - High metalness (0.8) for reflections
  - Color-coded by strand

- **Connecting Bridges**: Cylindrical connections
  - Links between opposite strands
  - Every 3rd node connected
  - Semi-transparent white material
  - Creates ladder-like structure

- **Data Streams**: 4 vertical particle flows
  - 50 particles per stream
  - Continuous downward flow
  - Reset at bottom for infinite loop
  - Positioned at cardinal directions

- **Floating Particles**: 800 ambient particles
  - Warm color palette (HSL variation)
  - Spherical distribution
  - Slow rotation with sine wave tilt
  - Additive blending

### Performance
- **Particle Count**: ~1,000 particles
- **Geometry**: ~120 meshes (nodes + connections)
- **Recommended FPS**: 55-60fps

### Use Cases
- Biotech companies
- Data visualization platforms
- Scientific applications
- Health & wellness tech

---

## Scene 3: Grid Scene

**File:** `HeroSceneGrid.tsx`  
**Best for:** Minimal, architectural, modern tech

### Visual Elements

- **3D Grid Structure**: Wireframe cube grid
  - 8×8×8 grid (7 cubes per dimension)
  - 1.5 unit spacing between nodes
  - Semi-transparent teal lines (15% opacity)
  - Continuous Y-axis rotation
  - Subtle X-axis sine wave tilt

- **Grid Nodes**: Pulsing spheres at intersections
  - Selective rendering for performance
  - All corner nodes visible
  - Random edge and internal nodes
  - Animated scale (pulse effect)
  - Emissive intensity variation
  - Staggered delay based on position

- **Floating Cubes**: 3 wireframe boxes
  - Central cube: 3×3×3 units (mint)
  - Left cube: 1.5×1.5×1.5 units (orange)
  - Right cube: 1.5×1.5×1.5 units (teal)
  - Independent rotation speeds
  - Wireframe rendering at 30% opacity

- **Ambient Particles**: 400 particles
  - Wide distribution (40 unit range)
  - White with 40% opacity
  - Very slow rotation
  - Depth enhancement

### Performance
- **Particle Count**: ~400 particles
- **Geometry**: ~80 nodes + 3 cubes + grid lines
- **Recommended FPS**: 60fps (most performant)

### Use Cases
- Tech startups
- Architecture firms
- Minimalist portfolios
- Modern SaaS products

---

## Technical Details

### Common Features

All hero scenes include:

1. **WebGL Detection**
   ```typescript
   const canvas = document.createElement("canvas");
   const gl = canvas.getContext("webgl") || 
              canvas.getContext("experimental-webgl");
   if (!gl) return null; // Graceful degradation
   ```

2. **Performance Optimization**
   - `useMemo` for geometry/materials
   - `useFrame` for efficient animations
   - `powerPreference: "high-performance"`
   - Clear alpha background for compositing

3. **Responsive Camera**
   - Adjustable FOV (60° default)
   - Optimal viewing distance per scene
   - Automatic viewport sizing

### File Structure

```
src/components/three/
├── HeroConfig.tsx        # Configuration (switch scenes here)
├── HeroScene.tsx         # Universe scene
├── HeroSceneDNA.tsx      # DNA helix scene
├── HeroSceneGrid.tsx     # Grid scene
└── ...
```

### Integration

Hero scenes are integrated in `src/pages/Index.tsx`:

```tsx
import { ActiveHeroScene } from "@/components/three/HeroConfig";

<header className="relative min-h-screen">
  <ActiveHeroScene />
  <div className="relative z-10">
    {/* Your content here */}
  </div>
</header>
```

---

## Customization Guide

### Changing Colors

Edit the color arrays in each scene:

```typescript
// HeroScene.tsx
const colors = ["#ff6b35", "#4ecdc4", "#95e1d3", "#f38181", "#aa96da"];

// HeroSceneDNA.tsx
<DNAStrand color1="#ff6b35" color2="#4ecdc4" />

// HeroSceneGrid.tsx
const colors = ["#ff6b35", "#4ecdc4", "#95e1d3", "#f38181", "#aa96da"];
```

### Adjusting Animation Speed

Modify the speed multipliers:

```typescript
// Slower rotation
groupRef.current.rotation.y = state.clock.elapsedTime * 0.05; // was 0.1

// Faster pulsing
const scale = 1 + Math.sin(time * 4) * 0.3; // was * 2
```

### Particle Density

Change particle counts:

```typescript
// More particles
const particleCount = 2000; // was 1500

// Fewer particles (better performance)
const particleCount = 500; // was 1000
```

### Camera Position

Adjust the viewing angle:

```typescript
<Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
  {/* Closer: [0, 0, 8] */}
  {/* Further: [0, 0, 20] */}
  {/* Angled: [10, 5, 10] */}
</Canvas>
```

---

## Performance Tips

### Optimization Strategies

1. **Reduce Particle Counts**
   - Star field: 1500 → 800
   - Ambient particles: 800 → 400

2. **Simplify Geometry**
   - Sphere segments: 32 → 16
   - Grid size: 8×8×8 → 6×6×6

3. **Limit Node Rendering**
   - Show only corner nodes
   - Random sampling for edges

4. **Disable Features**
   - Remove mouse interaction
   - Disable shadows
   - Reduce material complexity

### Mobile Considerations

For mobile devices, consider:

```typescript
const isMobile = window.innerWidth < 768;
const particleCount = isMobile ? 300 : 1500;
const quality = isMobile ? 'low' : 'high';
```

---

## Troubleshooting

### Black Screen
- Check browser console for WebGL errors
- Ensure GPU acceleration is enabled
- Verify no conflicting plugins

### Low FPS
- Reduce particle counts
- Simplify geometry details
- Check for other CPU/GPU intensive processes

### Particles Not Visible
- Verify particle size (may be too small)
- Check camera position and FOV
- Ensure materials have proper opacity

### Scene Not Loading
- Check WebGL support: `chrome://gpu`
- Verify no Vite config conflicts
- Clear browser cache

---

## Browser Compatibility

### Supported Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### WebGL Requirements
- WebGL 1.0 minimum
- WebGL 2.0 recommended
- GPU acceleration enabled

---

## Creating Custom Hero Scenes

To create your own hero scene:

1. **Create New File**
   ```bash
   src/components/three/HeroSceneCustom.tsx
   ```

2. **Copy Template**
   ```typescript
   import React, { useEffect, useState } from "react";
   import { Canvas } from "@react-three/fiber";
   
   const Scene: React.FC = () => {
     return (
       <>
         <ambientLight intensity={0.5} />
         {/* Your 3D elements */}
       </>
     );
   };
   
   export const HeroSceneCustom: React.FC = () => {
     const [canRender, setCanRender] = useState(false);
     
     useEffect(() => {
       // WebGL detection
       try {
         const canvas = document.createElement("canvas");
         const gl = canvas.getContext("webgl");
         if (gl) setCanRender(true);
       } catch (e) {
         console.warn("WebGL not available");
       }
     }, []);
     
     if (!canRender) return null;
     
     return (
       <div className="absolute inset-0 pointer-events-none">
         <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
           <Scene />
         </Canvas>
       </div>
     );
   };
   ```

3. **Add to Config**
   ```typescript
   // HeroConfig.tsx
   import { HeroSceneCustom } from "./HeroSceneCustom";
   export const ActiveHeroScene = HeroSceneCustom;
   ```

---

## Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [WebGL Fundamentals](https://webglfundamentals.org/)
- [Shader Tutorial](https://thebookofshaders.com/)

---

**Last Updated:** 2024  
**Maintained by:** Compiling Team
# Compiling.org - Visual Tools & Projects

A modern, interactive showcase website for Compiling's collection of visual tools and projects. Built with React, TypeScript, Three.js, and Tailwind CSS.

## 🚀 Features

### Interactive 3D Hero Section
- **Three.js Hero**: Full-screen immersive 3D universe as the main hero
- **3 Hero Scene Options**: Easily switch between different visual styles
  - **Universe Scene** (Default): Galaxy rings, central shader sphere, orbiting cubes, 1500+ stars
  - **DNA Helix Scene**: Rotating DNA strands with data streams
  - **Grid Scene**: Minimal 3D geometric grid with pulsing nodes
- **Mouse-Interactive**: Camera follows mouse movement for parallax effect
- **Smooth Animations**: Fade-in text with scroll indicator

### Interactive 3D Experiences
- **3D Project Cards**: Animated spheres with pulsing effects appear on hover
- **Project-Specific Demos**: Each project page features a custom interactive 3D visualization
  - **NUWE Rust**: Procedural mesh generation with animated geometry
  - **PodiumJS**: Shader-based wave animation on planes
  - **Play**: VJ mixer visualization with audio-reactive spheres
  - **WGSLX**: Shader code visualization with floating elements

### Individual Project Pages
- Detailed project information with comprehensive descriptions
- Technology tags and project status indicators
- GitHub and demo links
- Interactive 3D demonstrations
- Feature highlights and use cases
- Color-coded design matching each project's theme

### Modern UI/UX
- Responsive design that works on all devices
- Smooth page transitions and animations
- Fixed navigation bar with glassmorphism effect
- Dark theme optimized for visual content
- Gradient text effects and hover animations

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Three.js** - 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **Lucide React** - Icon library

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
compiling-web/
├── src/
│   ├── components/
│   │   ├── three/              # Three.js components
│   │   │   ├── demos/          # Project-specific 3D demos
│   │   │   │   ├── NuweRustDemo.tsx
│   │   │   │   ├── PlayDemo.tsx
│   │   │   │   ├── PodiumJSDemo.tsx
│   │   │   │   └── index.tsx
│   │   │   ├── DemoContainer.tsx
│   │   │   ├── InteractiveBackground.tsx
│   │   │   └── ProjectCard3D.tsx
│   │   ├── ui/                 # Shadcn UI components
│   │   ├── Navigation.tsx
│   │   ├── ProjectCard.tsx
│   │   └── VJUnitonSection.tsx
│   ├── data/
│   │   └── projects.ts         # Project data and types
│   ├── pages/
│   │   ├── Index.tsx           # Landing page
│   │   ├── ProjectDetail.tsx   # Individual project pages
│   │   └── NotFound.tsx
│   ├── App.tsx
│   └── main.tsx
├── public/
└── package.json
```

## 🎨 Customizing the Hero Scene

To change the hero scene, edit `src/components/three/HeroConfig.tsx`:

```typescript
// Option 1: Universe Scene (Default)
export const ActiveHeroScene = HeroScene;

// Option 2: DNA Helix Scene
// export const ActiveHeroScene = HeroSceneDNA;

// Option 3: Grid Scene
// export const ActiveHeroScene = HeroSceneGrid;
```

### Hero Scene Descriptions

**1. Universe Scene (HeroScene)**
- Central shader-animated sphere with color mixing
- 3 concentric galaxy rings rotating at different speeds
- 8 orbiting wireframe cubes in project colors
- 1500+ star field particles with HSL colors
- Mouse-interactive camera for parallax effect
- Best for: Immersive, space-themed, creative aesthetic

**2. DNA Helix Scene (HeroSceneDNA)**
- Dual rotating DNA double helixes
- Connected nodes along strands with cylinders
- 4 vertical data streams flowing downward
- 800 floating colored particles
- Best for: Tech, biotech, data-focused aesthetic

**3. Grid Scene (HeroSceneGrid)**
- 3D wireframe grid structure (8x8x8)
- Pulsing nodes at intersections with delays
- 3 floating rotating wireframe cubes
- Minimal ambient particles
- Best for: Clean, architectural, modern aesthetic

All scenes include:
- WebGL detection and graceful degradation
- High-performance rendering optimizations
- Responsive camera positioning
- Smooth animations at 60fps

## 🔄 Automatic Project Sync

The website automatically syncs project data from GitHub repositories:

- **Daily sync** at 6 AM UTC
- Fetches README content and repository metadata
- Creates PRs when changes are detected
- Manual sync: `npm run sync-projects`

See [SYNC_GUIDE.md](./SYNC_GUIDE.md) for detailed documentation.

## 🎨 Adding New Projects

1. **Update Project Data** (`src/data/projects.ts`):
```typescript
{
  id: "my-project",
  title: "My Project",
  tagline: "Short description",
  description: "Card description",
  fullDescription: "Detailed description for project page",
  href: "/projects/my-project",
  github: "https://github.com/compiling-org/my-project", // Required for auto-sync
  status: "active" | "development" | "planned" | "maintained",
  tags: ["Tag1", "Tag2"],
  featured: true,
  color: "#hexcolor",
}
```

2. **Create 3D Demo** (optional) (`src/components/three/demos/MyProjectDemo.tsx`):
```typescript
import { Canvas, useFrame } from "@react-three/fiber";

export const MyProjectDemo: React.FC = () => {
  return (
    <Canvas>
      {/* Your 3D scene */}
    </Canvas>
  );
};
```

3. **Register Demo** (`src/components/three/demos/index.tsx`):
```typescript
export const MyProjectDemo = lazy(() =>
  import("./MyProjectDemo").then((module) => ({ default: module.MyProjectDemo }))
);

// Add to demoMap
const demoMap: Record<string, React.LazyExoticComponent<React.FC>> = {
  "my-project": MyProjectDemo,
  // ...
};
```

## 🎯 Key Components

### InteractiveBackground
Creates an immersive 3D background with floating shapes and particles that animate continuously.

### ProjectCard3D
Adds a 3D sphere with distortion effect that appears when hovering over project cards.

### DemoContainer
Wraps Three.js demos with error boundaries and loading states for robust error handling.

### Navigation
Fixed header with glassmorphism effect, smooth transitions, and responsive design.

## 🌐 Routes

- `/` - Landing page with all projects
- `/projects/:id` - Individual project detail page
- `*` - 404 Not Found page

## 🎨 Customization

### Colors
Project colors are defined in `src/data/projects.ts` and are used throughout the UI for:
- Card hover effects
- 3D demo lighting
- Status badges
- Gradient overlays

### Three.js Scenes
Each demo component is fully customizable. Common patterns:
- Use `useFrame` for animations
- Use `useRef` for accessing mesh/geometry references
- Use `useMemo` for expensive calculations
- Use `OrbitControls` for user interaction

## 🚀 Performance

- **Lazy Loading**: Demo components are lazy-loaded to reduce initial bundle size
- **Code Splitting**: Each demo is in a separate chunk
- **WebGL Optimization**: Three.js scenes use efficient geometries and materials
- **Suspense Boundaries**: Loading states prevent layout shifts

## 📝 Development Notes

- Three.js demos automatically pause when not visible
- All demos include error boundaries for graceful degradation
- Mobile devices receive optimized Three.js scenes
- WebGL availability is checked before rendering 3D content

## 🐛 Troubleshooting

**Three.js demos not showing:**
- Check browser WebGL support
- Check console for errors
- Ensure GPU acceleration is enabled

**Build warnings about chunk size:**
- This is expected due to Three.js bundle size
- Demos are already code-split for optimal loading

## 📄 License

See LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🔗 Links

- [GitHub](https://github.com/compiling)
- [Website](https://compiling.org)

---

Built with ❤️ by the Compiling team
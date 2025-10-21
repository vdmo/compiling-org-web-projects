// Hero Scene Configuration
// Import your preferred hero scene and export it as `ActiveHeroScene`

// Available Hero Scenes:
import { HeroScene } from "./HeroScene"; // Universe with galaxy rings and central sphere
import { HeroSceneDNA } from "./HeroSceneDNA"; // DNA helix strands with data streams
import { HeroSceneGrid } from "./HeroSceneGrid"; // 3D grid with pulsing nodes

// Choose your hero scene by uncommenting one of the options below:

// Option 1: Universe Scene (Default) - Immersive 3D universe with galaxy rings, central sphere, and orbiting cubes
export const ActiveHeroScene = HeroScene;

// Option 2: DNA Helix Scene - Rotating DNA strands with connecting nodes and data streams
// export const ActiveHeroScene = HeroSceneDNA;

// Option 3: Grid Scene - Minimal geometric 3D grid with pulsing nodes and floating cubes
// export const ActiveHeroScene = HeroSceneGrid;

/*
 * HERO SCENE DESCRIPTIONS:
 *
 * 1. HeroScene (Universe):
 *    - Central shader-animated sphere
 *    - 3 concentric galaxy rings with particles
 *    - 8 orbiting wireframe cubes
 *    - 1500+ star field particles
 *    - Mouse-interactive camera
 *    - Best for: Immersive, space-themed aesthetic
 *
 * 2. HeroSceneDNA:
 *    - Dual rotating DNA helixes
 *    - Connected nodes along strands
 *    - 4 vertical data streams
 *    - 800 floating particles
 *    - Best for: Tech, biotech, data-focused aesthetic
 *
 * 3. HeroSceneGrid:
 *    - 3D wireframe grid structure
 *    - Pulsing nodes at intersections
 *    - 3 floating wireframe cubes
 *    - Minimal ambient particles
 *    - Best for: Clean, architectural, modern aesthetic
 */

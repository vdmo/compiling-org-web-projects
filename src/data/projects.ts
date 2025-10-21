export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  fullDescription: string;
  href: string;
  github?: string;
  status: "active" | "development" | "planned" | "maintained";
  tags: string[];
  featured?: boolean;
  color: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    id: "nuwe-rust",
    title: "NUWE Rust",
    tagline: "Visual modal system built with Bevy and Rust",
    description:
      "A visual modal system built with Bevy and Rust for creating complex and performant visual applications.",
    fullDescription:
      "NUWE Rust is a powerful visual modal system that leverages the Bevy game engine and Rust's performance to create complex, high-performance visual applications. It provides a modular architecture for building interactive visual experiences with real-time rendering capabilities. The system is designed for VJs, visual artists, and creative coders who need low-latency, GPU-accelerated visual processing.",
    href: "/projects/nuwe-rust",
    github: "https://github.com/compiling/nuwe-rust",
    status: "development",
    tags: ["Rust", "Bevy", "Real-time", "GPU", "Visuals"],
    featured: true,
    color: "#ff6b35",
  },
  {
    id: "pchi-life",
    title: "PCHI life",
    tagline: "Universal language protocol for interactive 3D scenes",
    description:
      "A universal language protocol for creating and sharing interactive 3D scenes across platforms.",
    fullDescription:
      "PCHI life is a revolutionary protocol that enables creators to define, share, and execute interactive 3D scenes across different platforms and engines. Think of it as a universal intermediate language for 3D graphics and interactive experiences. It allows artists and developers to create once and deploy everywhere, from web browsers to native applications, from Three.js to Unity.",
    href: "/projects/pchi-life",
    github: "https://github.com/compiling/pchi-life",
    status: "development",
    tags: ["Protocol", "3D", "Cross-platform", "WebGL", "WASM"],
    featured: true,
    color: "#4ecdc4",
  },
  {
    id: "podiumjs",
    title: "PodiumJS",
    tagline: "Modern WebGPU alternative to Curtains.js",
    description:
      "A modern WebGPU-based alternative to Curtains.js for creating interactive planes and stunning visual effects.",
    fullDescription:
      "PodiumJS is a next-generation library for creating interactive 2D and 3D planes with WebGPU. Inspired by Curtains.js, it brings modern GPU capabilities to the web, allowing developers to create stunning visual effects with improved performance. Perfect for creating interactive websites, image galleries with advanced effects, and creative web experiences that push the boundaries of what's possible in the browser.",
    href: "/projects/podiumjs",
    github: "https://github.com/vdmo/podiumjs-rocks",
    status: "active",
    tags: ["WebGPU", "JavaScript", "Shaders", "Interactive", "Web"],
    featured: true,
    color: "#95e1d3",
  },
  {
    id: "podium-rocks",
    title: "Podium.Rocks",
    tagline: "WebGPU Presentation and Visuals Toolkit",
    description: "WebGPU Presentation and Visuals for The Web Toolkit.",
    fullDescription:
      "Podium.Rocks is a comprehensive toolkit for creating stunning presentations and visual experiences using WebGPU technology. It combines the power of modern GPU computing with an intuitive API, making it easy to create professional-grade visual content for the web. Whether you're building interactive presentations, live visual performances, or immersive web experiences, Podium.Rocks provides the tools you need.",
    href: "/projects/podium-rocks",
    github: "https://github.com/compiling/podium-rocks",
    status: "active",
    tags: ["WebGPU", "Presentations", "Visuals", "Toolkit", "Real-time"],
    color: "#f38181",
  },
  {
    id: "geyser",
    title: "Geyser",
    tagline: "Cross-platform texture sharing in Rust",
    description: "Vulkan, Metal and WebGPU texture sharing built in Rust.",
    fullDescription:
      "Geyser is a high-performance library for sharing GPU textures across different graphics APIs including Vulkan, Metal, and WebGPU. Built in Rust, it provides a unified interface for zero-copy texture sharing between applications and processes. This is crucial for creating efficient visual pipelines, enabling real-time collaboration between different tools, and building modular visual systems where different components can share GPU resources seamlessly.",
    href: "/projects/geyser",
    github: "https://github.com/compiling/geyser",
    status: "development",
    tags: ["Rust", "Vulkan", "Metal", "WebGPU", "GPU", "Texture Sharing"],
    color: "#aa96da",
  },
  {
    id: "shadershub",
    title: "ShadersHub.com",
    tagline: "Marketplace for shaders and visual tools",
    description: "A marketplace for shaders, education, and tools.",
    fullDescription:
      "ShadersHub.com is a vibrant marketplace and community hub for shader enthusiasts, visual artists, and developers. Buy and sell high-quality shaders, access educational resources, discover tools and plugins, and connect with other creators. Whether you're looking for ISF shaders, GLSL effects, or learning materials, ShadersHub is your one-stop destination for all things shader-related.",
    href: "/projects/shadershub",
    status: "planned",
    tags: ["Marketplace", "Shaders", "Community", "Education", "Tools"],
    featured: true,
    color: "#fcbad3",
  },
  {
    id: "vjs-agency",
    title: "VJs.agency",
    tagline: "Connect artists with booking opportunities",
    description: "A place where artists can get booked.",
    fullDescription:
      "VJs.agency is a professional platform connecting visual artists and VJs with event organizers, venues, and clients. Create your portfolio, showcase your work, manage bookings, and grow your career as a visual artist. For event organizers, discover talented VJs, browse portfolios, and book artists for your events with confidence. We're building the future of visual arts booking.",
    href: "/projects/vjs-agency",
    status: "planned",
    tags: ["Platform", "Artists", "Booking", "Community", "Marketplace"],
    color: "#ffffd2",
  },
  {
    id: "vscode-isf",
    title: "VS Code ISF Plugin",
    tagline: "Preview ISF shaders directly in VS Code",
    description: "Preview ISF files directly in VS Code.",
    fullDescription:
      "The VS Code ISF Plugin brings powerful shader development directly into your favorite code editor. Preview Interactive Shader Format (ISF) files in real-time as you code, with syntax highlighting, auto-completion, and live rendering. Debug your shaders, test parameters, and iterate quickly without leaving your development environment. Essential tool for shader developers and VJs.",
    href: "/projects/vscode-isf",
    github: "https://github.com/compiling/vscode-isf",
    status: "maintained",
    tags: ["VS Code", "ISF", "Shaders", "Developer Tools", "Extension"],
    color: "#a8d8ea",
  },
  {
    id: "wgslx",
    title: "WGSLX",
    tagline: "ISF alternative for WGSL shaders",
    description: "ISF alternative for WGSL.",
    fullDescription:
      "WGSLX is a modern shader format designed as a successor to ISF, built specifically for WGSL (WebGPU Shading Language). It provides a standardized way to create interactive, parameterized shaders with metadata, making it easy to share and integrate shaders across different platforms and applications. WGSLX brings the power and convenience of ISF to the WebGPU era.",
    href: "/projects/wgslx",
    github: "https://github.com/compiling/wgslx",
    status: "development",
    tags: ["WGSL", "WebGPU", "Shaders", "Format", "Standard"],
    color: "#ffcccc",
  },
  {
    id: "play",
    title: "Play",
    tagline: "Browser-based VJ mixer for the modern web",
    description:
      "Browser based VJ mixer to mix between Videos, GIFs, MILK Drop, ISF, Threejs.",
    fullDescription:
      "Play is a revolutionary browser-based VJ mixer that brings professional visual performance capabilities to the web. Mix and blend videos, animated GIFs, MilkDrop visualizations, ISF shaders, and Three.js scenes in real-time. With support for MIDI controllers, audio reactivity, and an intuitive interface, Play makes VJing accessible to everyone. No installation required – just open your browser and start creating.",
    href: "/projects/play",
    github: "https://github.com/compiling/play",
    status: "development",
    tags: [
      "VJ",
      "Mixer",
      "Web",
      "Real-time",
      "ISF",
      "Three.js",
      "MilkDrop",
    ],
    featured: true,
    color: "#ff6b9d",
  },
];

export const getFeaturedProjects = () =>
  projects.filter((p) => p.featured);

export const getProjectById = (id: string) =>
  projects.find((p) => p.id === id);

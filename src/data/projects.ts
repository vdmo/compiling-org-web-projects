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
  features?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
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
    github: "https://github.com/compiling-org/nuwe-stripped",
    status: "development",
    tags: ["Rust", "Bevy", "Real-time", "GPU", "Visuals"],
    featured: true,
    color: "#ff6b35",
    features: [
      {
        icon: "🎮",
        title: "Bevy Integration",
        description:
          "Built on the Bevy game engine for high-performance, modular architecture with ECS design patterns and efficient resource management.",
      },
      {
        icon: "🚀",
        title: "GPU Acceleration",
        description:
          "Low-latency, GPU-accelerated visual processing optimized for real-time performance in live settings and interactive installations.",
      },
      {
        icon: "🎨",
        title: "Visual Modal System",
        description:
          "Modular visual system enabling complex, performant visual applications with flexible composition and real-time rendering capabilities.",
      },
      {
        icon: "⚙️",
        title: "Built with Rust",
        description:
          "Memory-safe and blazingly fast performance with Rust's zero-cost abstractions, perfect for demanding visual applications.",
      },
    ],
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
    github: "https://github.com/compiling-org/pchi-life",
    status: "development",
    tags: ["Protocol", "3D", "Cross-platform", "WebGL", "WASM"],
    featured: true,
    color: "#4ecdc4",
    features: [
      {
        icon: "🌐",
        title: "Universal Protocol",
        description:
          "Cross-platform intermediate language for 3D graphics that works seamlessly across web browsers, native applications, Three.js, Unity, and more.",
      },
      {
        icon: "🔄",
        title: "Create Once, Deploy Everywhere",
        description:
          "Define interactive 3D scenes once and execute them across different platforms and engines without modification.",
      },
      {
        icon: "🎯",
        title: "Interactive Experiences",
        description:
          "Enable creators to build and share rich interactive 3D experiences with consistent behavior across all target platforms.",
      },
      {
        icon: "⚡",
        title: "WebGL & WASM Ready",
        description:
          "Optimized for modern web technologies with WebAssembly support for maximum performance in browser environments.",
      },
    ],
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
    github: "https://github.com/compiling-org/podium-rocks",
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
    github: "https://github.com/compiling-org/Geyser",
    status: "development",
    tags: ["Rust", "Vulkan", "Metal", "WebGPU", "GPU", "Texture Sharing"],
    color: "#aa96da",
    features: [
      {
        icon: "🔗",
        title: "Zero-Copy Texture Sharing",
        description:
          "Unified interface for sharing GPU textures between applications and processes without expensive memory copies, maximizing performance.",
      },
      {
        icon: "🎨",
        title: "Multi-API Support",
        description:
          "Seamless texture sharing across Vulkan, Metal, and WebGPU with a consistent API, enabling efficient visual pipelines.",
      },
      {
        icon: "⚡",
        title: "Real-Time Collaboration",
        description:
          "Enable different tools and applications to share GPU resources in real-time, perfect for modular visual systems.",
      },
      {
        icon: "🦀",
        title: "Safe & Performant",
        description:
          "Built in Rust for memory safety and high performance, ensuring reliable GPU resource management.",
      },
    ],
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
    github: "https://github.com/compiling-org/vscode-isf",
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
    github: "https://github.com/compiling-org/wgslx",
    status: "development",
    tags: ["WGSL", "WebGPU", "Shaders", "Format", "Standard"],
    color: "#ffcccc",
    features: [
      {
        icon: "✨",
        title: "Modern Shader Format",
        description:
          "Successor to ISF designed specifically for WGSL and WebGPU, bringing modern GPU capabilities to shader development.",
      },
      {
        icon: "📦",
        title: "Parameterized Shaders",
        description:
          "Standardized format for creating interactive shaders with metadata, making them easy to share and integrate across platforms.",
      },
      {
        icon: "🔄",
        title: "Cross-Platform Compatibility",
        description:
          "Share and use shaders seamlessly across different applications and platforms with consistent behavior.",
      },
      {
        icon: "🚀",
        title: "WebGPU Era",
        description:
          "Brings the power and convenience of ISF format to the next generation of web graphics with WebGPU.",
      },
    ],
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
    github: "https://github.com/compiling-org/play",
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
    features: [
      {
        icon: "🎬",
        title: "Multi-Source Mixing",
        description:
          "Mix and blend videos, animated GIFs, MilkDrop visualizations, ISF shaders, and Three.js scenes in real-time.",
      },
      {
        icon: "🎛️",
        title: "MIDI & Audio Reactive",
        description:
          "Full MIDI controller support with audio reactivity for responsive, dynamic visual performances.",
      },
      {
        icon: "🌐",
        title: "Browser-Based",
        description:
          "No installation required - professional VJing capabilities directly in your web browser, accessible anywhere.",
      },
      {
        icon: "⚡",
        title: "Real-Time Performance",
        description:
          "Optimized for live performances with low latency, smooth transitions, and intuitive interface for creative expression.",
      },
    ],
  },
  {
    id: "nuwe-stripped",
    title: "NUWE Stripped",
    tagline: "Immersive VJ System with Node-Based Architecture",
    description:
      "A node-based audio-visual performance system built in Rust with real-time audio synthesis and GPU-accelerated visuals.",
    fullDescription:
      "NUWE-Rust is an immersive VJ system that combines powerful audio and visual capabilities in a unified node-based architecture. Features include Glicol live coding for real-time audio synthesis, full MIDI support with device detection and routing, real-time FFT analysis and beat detection, GPU-accelerated rendering using Bevy engine with Vulkan/DirectX support, shader hot-reload for live development, and a comprehensive post-processing pipeline. The visual node editor allows creating complex workflows with seamless integration between audio and visual processing, including oscillators, filters, effects, analysis nodes, shaders, and generators. Perfect for VJ performances, live coding sessions, and interactive audiovisual installations.",
    href: "/projects/nuwe-stripped",
    github: "https://github.com/compiling-org/nuwe-stripped",
    status: "active",
    tags: ["Rust", "Bevy", "Glicol", "MIDI", "Live Coding", "VJ", "Real-time"],
    featured: true,
    color: "#e74c3c",
    features: [
      {
        icon: "🎵",
        title: "Audio System",
        description:
          "Glicol live coding for real-time audio synthesis, full MIDI support with device detection, real-time FFT analysis, beat detection, and spectral analysis with advanced synthesis capabilities.",
      },
      {
        icon: "🎨",
        title: "Visual System",
        description:
          "GPU-accelerated rendering using Bevy engine with Vulkan/DirectX support, shader hot-reload for real-time development, customizable post-processing pipeline, and efficient asset management.",
      },
      {
        icon: "🔗",
        title: "Node-Based Architecture",
        description:
          "Visual node editor for creating complex workflows with audio nodes (oscillators, filters, effects) and visual nodes (shaders, post-processing, generators) with seamless audio-visual integration.",
      },
      {
        icon: "⚡",
        title: "Real-Time Performance",
        description:
          "Low-latency audio processing, GPU-accelerated visuals, live coding capabilities, and hybrid workflows perfect for VJ performances and interactive installations.",
      },
    ],
  },
  {
    id: "modurust-vst-hexodsp",
    title: "Modurust VST HexoDSP",
    tagline: "VST3 plugin with modular synthesis",
    description:
      "A VST3 plugin based on HexoDSP modular synthesizer and rust framework. Advanced modular synthesis with node-based audio processing.",
    fullDescription:
      "Modurust VST HexoDSP is an advanced VST3 plugin that brings the power of HexoDSP modular synthesizer to your DAW. Built with Rust for exceptional performance and stability, it offers a comprehensive modular synthesis environment with node-based audio processing. Create complex patches, route signals freely, and explore endless sonic possibilities. Perfect for electronic music producers, sound designers, and anyone looking for a powerful, CPU-efficient modular synthesizer.",
    href: "/projects/modurust-vst-hexodsp",
    github: "https://github.com/compiling-org/Modurust-vst-hexodsp",
    status: "active",
    tags: ["Rust", "VST3", "Audio", "Synthesis", "Modular", "Plugin"],
    color: "#9b59b6",
    features: [
      {
        icon: "🎛️",
        title: "HexoDSP Integration",
        description:
          "Comprehensive modular synthesis environment with node-based audio processing, bringing HexoDSP's power to your DAW.",
      },
      {
        icon: "🔗",
        title: "Modular Routing",
        description:
          "Create complex patches with free signal routing, exploring endless sonic possibilities with flexible modular architecture.",
      },
      {
        icon: "⚡",
        title: "High Performance",
        description:
          "Built with Rust for exceptional performance, stability, and CPU efficiency perfect for demanding production environments.",
      },
      {
        icon: "🎵",
        title: "Sound Design Ready",
        description:
          "Perfect for electronic music producers and sound designers seeking powerful, professional-grade modular synthesis.",
      },
    ],
  },
  {
    id: "pd-rs-synth",
    title: "PD-RS Synth",
    tagline: "Pure Data powered VST3 synthesizer",
    description:
      "A VST3 synthesizer plugin that integrates Pure Data patches as synthesizer modules. Based on the PlugData runtime system for embedded Pd patches in VST3 format.",
    fullDescription:
      "PD-RS Synth bridges the worlds of Pure Data and modern DAWs by embedding Pd patches directly into a VST3 plugin. Based on the PlugData runtime and pd-rs, it allows you to use your existing Pure Data patches as synthesizer modules in any VST3-compatible host. This opens up endless creative possibilities, combining the flexibility of Pure Data with the convenience of modern music production workflows. Create custom synthesizers, effects, and processors using the familiar Pd visual programming environment.",
    href: "/projects/pd-rs-synth",
    github: "https://github.com/compiling-org/pd-rs-synth",
    status: "development",
    tags: ["Pure Data", "VST3", "Synthesis", "Rust", "Plugin", "Audio"],
    color: "#1abc9c",
    features: [
      {
        icon: "🔌",
        title: "Pure Data Integration",
        description:
          "Embed Pure Data patches directly into VST3 plugins, bringing Pd's flexibility to modern DAW workflows.",
      },
      {
        icon: "🎨",
        title: "Visual Programming",
        description:
          "Create custom synthesizers, effects, and processors using Pure Data's familiar visual programming environment.",
      },
      {
        icon: "🔄",
        title: "Patch Compatibility",
        description:
          "Use your existing Pure Data patches as synthesizer modules in any VST3-compatible host without modification.",
      },
      {
        icon: "⚡",
        title: "PlugData Runtime",
        description:
          "Based on PlugData runtime and pd-rs for reliable, efficient embedded Pd patch execution in VST3 format.",
      },
    ],
  },
  {
    id: "rust-fractal-shader-engine",
    title: "Rust Fractal Shader Engine",
    tagline: "GPU-accelerated fractal rendering system",
    description:
      "Modular fractal shader system using Bevy and Shadplay. Advanced GPU-accelerated fractal rendering and shader development.",
    fullDescription:
      "A comprehensive, modular fractal shader system built with Rust and Bevy. Features advanced GPU-accelerated fractal rendering, ISF shader support, real-time audio/MIDI control, and a visual node-based composition interface. Perfect for creating mathematical visualizations, exploring fractal geometry, and building interactive art installations. The engine offers real-time parameter control, shader hot-reloading, and powerful export capabilities for both still images and animations.",
    href: "/projects/rust-fractal-shader-engine",
    github: "https://github.com/compiling-org/rust-fractal-shader-engine",
    status: "development",
    tags: ["Rust", "Bevy", "Fractals", "Shaders", "GPU", "Generative Art"],
    color: "#f39c12",
    features: [
      {
        icon: "🎨",
        title: "GPU-Accelerated Rendering",
        description:
          "Real-time fractal rendering with advanced GPU acceleration, enabling smooth exploration of complex mathematical visualizations.",
      },
      {
        icon: "🎵",
        title: "Audio/MIDI Control",
        description:
          "Real-time audio and MIDI control integration for reactive fractal parameters, perfect for audiovisual performances.",
      },
      {
        icon: "🔗",
        title: "Node-Based Composition",
        description:
          "Visual node-based interface for composing complex fractal scenes with modular architecture and shader hot-reloading.",
      },
      {
        icon: "📤",
        title: "Export Capabilities",
        description:
          "Powerful export features for both still images and animations, with real-time parameter control for precise results.",
      },
    ],
  },
  {
    id: "stream-diffusion-rs",
    title: "Stream Diffusion RS",
    tagline: "Multimodal AI research framework in Rust",
    description:
      "High-performance multimodal AI and ML research framework in Rust - A comprehensive toolkit for diffusion models, EEG analysis, multisensorial processing, and real-time neurofeedback systems.",
    fullDescription:
      "Stream Diffusion RS is a comprehensive multimodal AI and machine learning research framework built in Rust for maximum performance. It provides tools for working with diffusion models, analyzing EEG data, processing multisensorial inputs, and creating real-time neurofeedback systems. Perfect for researchers, artists working with biofeedback, and developers building next-generation AI-powered interactive experiences. The framework emphasizes real-time processing, low latency, and seamless integration with various hardware sensors and AI models.",
    href: "/projects/stream-diffusion-rs",
    github: "https://github.com/compiling-org/stream-diffusion-rs",
    status: "development",
    tags: ["Rust", "AI", "Machine Learning", "Diffusion", "EEG", "Neurofeedback"],
    featured: true,
    color: "#3498db",
    features: [
      {
        icon: "🤖",
        title: "Diffusion Models",
        description:
          "Comprehensive toolkit for working with diffusion models in real-time, optimized for maximum performance and low latency.",
      },
      {
        icon: "🧠",
        title: "EEG Analysis",
        description:
          "Advanced EEG data analysis and processing with support for various hardware sensors and real-time neurofeedback systems.",
      },
      {
        icon: "🌐",
        title: "Multisensorial Processing",
        description:
          "Process and integrate multiple sensory inputs for creating immersive, AI-powered interactive experiences.",
      },
      {
        icon: "⚡",
        title: "Real-Time Performance",
        description:
          "Built in Rust for maximum performance with emphasis on real-time processing, low latency, and seamless hardware integration.",
      },
    ],
  },
  {
    id: "nft-blockchain-interactive",
    title: "NFT Blockchain Interactive",
    tagline: "Interactive NFT system with blockchain integration",
    description:
      "Interactive NFT system with Filecoin and NEAR blockchain integration. Smart contracts for connecting Nuwe system to Filecoin and NEAR blockchains.",
    fullDescription:
      "NFT Blockchain Interactive is an innovative system that brings interactivity to NFTs through blockchain integration. With support for Filecoin and NEAR blockchains, it enables creators to mint, manage, and interact with NFTs that connect to the Nuwe audiovisual system. Create NFTs that are not just static assets but dynamic, interactive experiences. The smart contract infrastructure provides robust, decentralized storage and ownership verification, while enabling unique interactive features that blur the line between digital art and performance.",
    href: "/projects/nft-blockchain-interactive",
    github: "https://github.com/compiling-org/nft-blockchain-interactive",
    status: "development",
    tags: ["Blockchain", "NFT", "Filecoin", "NEAR", "Smart Contracts", "Web3"],
    color: "#e67e22",
    features: [
      {
        icon: "🎨",
        title: "Interactive NFTs",
        description:
          "Create NFTs that are dynamic, interactive experiences connected to the Nuwe audiovisual system, not just static assets.",
      },
      {
        icon: "⛓️",
        title: "Multi-Chain Support",
        description:
          "Support for both Filecoin and NEAR blockchains with robust smart contract infrastructure for decentralized storage and ownership.",
      },
      {
        icon: "🔒",
        title: "Secure & Decentralized",
        description:
          "Decentralized storage with ownership verification through blockchain, ensuring authenticity and provenance.",
      },
      {
        icon: "✨",
        title: "Art Meets Performance",
        description:
          "Unique interactive features that blur the line between digital art and live performance, creating new possibilities for creators.",
      },
    ],
  },
];

export const getFeaturedProjects = () =>
  projects.filter((p) => p.featured);

export const getProjectById = (id: string) =>
  projects.find((p) => p.id === id);

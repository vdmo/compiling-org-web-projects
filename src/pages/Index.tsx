import { ProjectCard } from "@/components/ProjectCard";
import { VJUnitonSection } from "@/components/VJUnitonSection";
import { MadeWithDyad } from "@/components/made-with-dyad";

const projects = [
  {
    title: "NUWE Rust",
    description:
      "A visual modal system built with Bevy and Rust for creating complex and performant visual applications.",
    href: "#",
  },
  {
    title: "PCHI life",
    description:
      "A universal language protocol designed for creating and sharing interactive 3D scenes across platforms.",
    href: "#",
  },
  {
    title: "PodiumJS",
    description:
      "A modern WebGPU-based alternative to Curtains.js for creating interactive planes and stunning visual effects.",
    href: "https://github.com/vdmo/podiumjs-rocks",
  },
  {
    title: "Podium.Rocks",
    description: "WebGPU Presentation and Visuals for The Web Toolkit.",
    href: "#",
  },
  {
    title: "Geyser",
    description: "Vulkan, Metal and WebGPU texture sharing build in Rust.",
    href: "#",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white antialiased">
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-black bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <header className="container mx-auto px-4 flex flex-col items-center justify-center pt-24 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 tracking-tighter">
            compiling.org
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Next Generation of Tools for Visual and AV performance.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-16">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Projects
          </h2>
          <p className="text-lg text-gray-400">
            We are the creators, maintainers, and contributors of some of the most critical infrastructure projects in the Rust/Bevy/JavaScript ecosystem.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              href={project.href}
            />
          ))}
        </div>
        
        <VJUnitonSection />
      </main>

      <footer className="w-full pb-4">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Index;
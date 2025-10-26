import { ProjectCard } from "@/components/ProjectCard";
import { MadeWithVDMO } from "@/components/made-with-dyad";
import { Navigation } from "@/components/Navigation";
import { ActiveHeroScene } from "@/components/three/HeroConfig";
import { projects } from "@/data/projects";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white antialiased relative">
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-black bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <Navigation />

      {/* Hero Section with Three.js */}
      <header className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <ActiveHeroScene />
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-500 tracking-tighter animate-fade-in">
              compiling.org
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 animate-fade-in-delay">
              High-Performance Creative Tools, AI/ML, and Blockchain Infrastructure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay-2">
              <a
                href="#projects"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg transition-all duration-300 font-semibold text-lg shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 hover:scale-105"
              >
                Explore Projects
              </a>
              <a
                href="https://github.com/compiling"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-300 font-semibold text-lg backdrop-blur-sm hover:scale-105"
              >
                View on GitHub
              </a>
              <a
                href="https://discord.gg/JFXGYzHZ"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-300 font-semibold text-lg backdrop-blur-sm hover:scale-105"
              >
                Join Discord
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white/50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </header>

      <main id="projects" className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Projects
          </h2>
          <p className="text-lg text-gray-400">
            Building high-performance creative tools, AI/ML frameworks, and blockchain
            solutions with Rust, Bevy, and modern web technologies.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              href={project.href}
              color={project.color}
              tags={project.tags}
              status={project.status}
            />
          ))}
        </div>
      </main>

      <footer className="w-full pb-4">
        <MadeWithVDMO />
      </footer>
    </div>
  );
};

export default Index;

import { ProjectCard } from "@/components/ProjectCard";
import { MadeWithDyad } from "@/components/made-with-dyad";

const projects = [
  {
    title: "VJ Union",
    description:
      "A worldwide community of VJs, sharing knowledge, resources, and passion for live visual performance.",
  },
  {
    title: "NUWE Rust",
    description:
      "A visual modal system built with Bevy and Rust for creating complex and performant visual applications.",
  },
  {
    title: "PCHI life",
    description:
      "A universal language protocol designed for creating and sharing interactive 3D scenes across platforms.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white antialiased">
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-black bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <main className="container mx-auto px-4 flex flex-col items-center justify-center min-h-screen py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 tracking-tighter">
            compiling.org
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Next Generation of Tools for Visual and AV performance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
            />
          ))}
        </div>
      </main>
      <div className="absolute bottom-0 w-full">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;
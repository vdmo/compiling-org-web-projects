import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, Box } from "lucide-react";
import { getProjectById } from "@/data/projects";
import { Navigation } from "@/components/Navigation";
import { DemoContainer } from "@/components/three/DemoContainer";
import { getDemoComponent } from "@/components/three/demos";

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? getProjectById(id) : null;
  const DemoComponent = id ? getDemoComponent(id) : null;

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  const statusColors = {
    active: "bg-green-500/20 text-green-400 border-green-500/30",
    development: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    planned: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    maintained: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  };

  return (
    <div className="min-h-screen w-full bg-black text-white antialiased">
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-black bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <Navigation />

      <main className="container mx-auto px-4 pt-32 pb-16">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </Link>

        {/* Hero Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <h1
              className="text-5xl md:text-7xl font-bold tracking-tighter"
              style={{
                background: `linear-gradient(135deg, ${project.color} 0%, white 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {project.title}
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border ${
                statusColors[project.status]
              }`}
            >
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
          </div>

          <p className="text-2xl text-gray-300 mb-8">{project.tagline}</p>

          {/* Links */}
          <div className="flex flex-wrap gap-4 mb-12">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-300 group"
              >
                <Github className="h-5 w-5" />
                <span>View on GitHub</span>
                <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg transition-all duration-300 group"
              >
                <Box className="h-5 w-5" />
                <span>View Demo</span>
                <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Three.js Demo Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div
            className="w-full h-[500px] rounded-xl border border-white/10 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden group"
            style={{
              background: `radial-gradient(circle at center, ${project.color}15 0%, transparent 70%)`,
            }}
          >
            {DemoComponent ? (
              <DemoContainer projectId={project.id}>
                <DemoComponent />
              </DemoContainer>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Box className="h-16 w-16 text-white/30 mx-auto mb-4 animate-pulse" />
                  <p className="text-gray-500 text-lg">Interactive 3D Demo</p>
                  <p className="text-gray-600 text-sm mt-2">Coming Soon</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Description Section */}
        <div className="max-w-4xl mx-auto">
          <div className="border border-white/10 rounded-xl p-8 bg-black/30 backdrop-blur-sm mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              About
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
              {project.fullDescription}
            </p>
          </div>

          {/* Features Section */}
          <div className="border border-white/10 rounded-xl p-8 bg-black/30 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Key Features
            </h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start space-x-3">
                <span className="text-2xl">🚀</span>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    High Performance
                  </h3>
                  <p className="text-gray-400">
                    Built with modern technologies for optimal performance and
                    low latency.
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-2xl">🎨</span>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    Creative Freedom
                  </h3>
                  <p className="text-gray-400">
                    Powerful tools that don't limit your creativity or artistic
                    vision.
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-2xl">🔧</span>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    Developer Friendly
                  </h3>
                  <p className="text-gray-400">
                    Clean APIs and comprehensive documentation for quick
                    integration.
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-2xl">🌐</span>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    Cross-Platform
                  </h3>
                  <p className="text-gray-400">
                    Works seamlessly across different platforms and
                    environments.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Related Projects */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Explore More Projects
          </h2>
          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg transition-all duration-300"
            >
              <span>View All Projects</span>
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Code2 } from "lucide-react";

export const Navigation: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors group"
          >
            <Code2 className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              compiling.org
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            {!isHomePage && (
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            )}
            <a
              href="https://github.com/compiling"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://discord.gg/JFXGYzHZ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Discord
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

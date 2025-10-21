import React from "react";
import { Globe } from "lucide-react";

const countries = [
  "USA", "Germany", "Japan", "UK", "Brazil", "France", "Canada",
  "Netherlands", "Australia", "Spain", "Italy", "Mexico", "Argentina",
  "Russia", "South Korea", "Poland", "Belgium", "Switzerland", "Sweden", "Colombia"
];

export const VJUnitonSection: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
          VJ Union Community
        </h2>
        <p className="text-lg text-gray-400">
          A worldwide community of VJs, sharing knowledge, resources, and passion.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 text-center">
        {countries.map((country) => (
          <a
            key={country}
            href="#"
            className="text-gray-400 hover:text-white hover:bg-white/5 p-3 rounded-md transition-colors duration-300"
          >
            {country}
          </a>
        ))}
        <a
          href="#"
          className="text-white font-semibold bg-white/10 hover:bg-white/20 p-3 rounded-md transition-colors duration-300 flex items-center justify-center"
        >
          <Globe className="mr-2 h-4 w-4" />
          View All
        </a>
      </div>
    </section>
  );
};
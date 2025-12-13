import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLink } from "react-icons/fa";

interface ProjectProps {
  id: number;
  title: string;
  description: string;
  image: string;
  stack: string[];
  links: {
    demo?: string;
    github?: string;
  };
}

const ProjectCard: React.FC<ProjectProps> = ({
  title,
  description,
  image,
  stack,
  links,
}) => {
  return (
    <motion.div
      className="bg-black rounded-lg overflow-hidden shadow-lg border border-gray-700 cursor-pointer h-full flex flex-col"
      initial={{ opacity: 0.9, scale: 1 }}
      whileHover={{
        opacity: 1,
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Project Image */}
      <div className="h-64 overflow-hidden relative group">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect fill='%23374151' width='400' height='200'/%3E%3Ctext fill='%239CA3AF' font-family='sans-serif' font-size='30' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3EProject Image%3C/text%3E%3C/svg%3E";
          }}
        />
        {/* Overlay on hover (optional, but nice) */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          {links.demo && (
            <a
              href={links.demo}
              className="p-2 bg-white rounded-full text-black hover:bg-gray-200"
              title="Live Demo"
            >
              <FaLink />
            </a>
          )}
          {links.github && (
            <a
              href={links.github}
              className="p-2 bg-white rounded-full text-black hover:bg-gray-200"
              title="GitHub"
            >
              <FaGithub />
            </a>
          )}
        </div>
      </div>

      {/* Project Info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-gray-900 border border-gray-700 rounded text-xs text-blue-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

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
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const ProjectCard: React.FC<ProjectProps> = ({
  id,
  title,
  description,
  image,
  stack,
  links,
  onEdit,
  onDelete,
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
        
        {/* Edit/Delete Actions */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          {onEdit && (
            <button 
              onClick={(e) => { e.stopPropagation(); onEdit(id); }} 
              className="p-2 bg-black/60 rounded-full hover:bg-emerald-600 text-white shadow-lg backdrop-blur-sm transition-colors"
              title="Edit Project"
            >
              {/* Edit Icon */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(id); }} 
              className="p-2 bg-black/60 rounded-full hover:bg-red-600 text-white shadow-lg backdrop-blur-sm transition-colors"
              title="Delete Project"
            >
              {/* Delete Icon */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          )}
        </div>

        {/* Overlay on hover */}
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
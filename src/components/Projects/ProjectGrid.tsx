import React from "react";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

const ProjectGrid: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="p-6 md:p-10 w-full overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">{t.labels.projectsTitle}</h2>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {t.projects.map((project) => (
          <motion.div
            key={project.id}
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            className="h-full"
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </motion.div>

      {/* Footer Text */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        {t.labels.footer}
      </div>
    </section>
  );
};

export default ProjectGrid;

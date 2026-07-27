import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { projectApi, type ProjectDto } from "../../api/projectApi";
import ProjectUploadModal from "./ProjectUploadModal";
import LoginModal from "../LoginModal";

const ProjectGrid: React.FC = () => {
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<ProjectDto | null>(null);

  const isAdmin = !!sessionStorage.getItem('adminToken');

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const data = await projectApi.getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className="p-6 md:p-10 w-full overflow-y-auto">
      <div className="mb-8 flex justify-between items-end border-b border-gray-800 pb-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">{t.labels.projectsTitle}</h2>
          <p className="text-gray-400 text-sm">
            {language === 'en' ? 'My latest works and experiments.' : '最近の作品と実験プロジェクト。'}
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={() => {
              setProjectToEdit(null);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-600/50 rounded transition-colors"
          >
            + Add Project
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64 text-emerald-500">
          Loading projects...
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500 border border-dashed border-gray-800 rounded-xl">
          <p className="mb-4">No projects found.</p>
          {isAdmin && (
            <button onClick={() => { setProjectToEdit(null); setIsModalOpen(true); }} className="text-emerald-500 hover:underline">
              Be the first to add one!
            </button>
          )}
        </div>
      ) : (
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
          {projects.map((p) => {
            // Map ProjectDto to what ProjectCard expects based on current language
            const mappedProject = {
              id: p.id!,
              title: language === 'en' ? p.titleEn : p.titleJa,
              description: language === 'en' ? p.descriptionEn : p.descriptionJa,
              image: p.imageUrl || '',
              stack: p.stacks || [],
              links: {
                demo: p.demoLink,
                github: p.githubLink
              }
            };

            return (
              <motion.div
                key={mappedProject.id}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
                className="h-full"
              >
                <ProjectCard 
                  {...mappedProject} 
                  onEdit={isAdmin ? (id) => {
                    const proj = projects.find((p) => p.id === id);
                    if (proj) {
                      setProjectToEdit(proj);
                      setIsModalOpen(true);
                    }
                  } : undefined}
                  onDelete={isAdmin ? async (id) => {
                    if (window.confirm("本当に削除しますか？")) {
                      try {
                        await projectApi.deleteProject(id);
                        fetchProjects();
                      } catch (err) {
                        console.error("Failed to delete project:", err);
                        alert("削除に失敗しました。");
                      }
                    }
                  } : undefined}
                />
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Footer Text */}
      <div className="mt-12 flex justify-center items-center gap-2 text-gray-500 text-sm">
        {t.labels.footer}
        {isAdmin ? (
          <button onClick={() => { sessionStorage.removeItem('adminToken'); window.location.reload(); }} className="hover:text-red-400" title="Logout">
            🔓
          </button>
        ) : (
          <button onClick={() => setIsLoginModalOpen(true)} className="hover:text-emerald-400" title="Admin Login">
            🔒
          </button>
        )}
      </div>

      <ProjectUploadModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setProjectToEdit(null);
        }} 
        onSuccess={() => {
          fetchProjects(); // Refresh the list after successful upload
        }}
        initialData={projectToEdit}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={() => {
          // Force a re-render or just let state update via reloading or component state
          window.location.reload();
        }}
      />
    </section>
  );
};

export default ProjectGrid;

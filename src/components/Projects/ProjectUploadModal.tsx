import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectApi, type ProjectDto } from '../../api/projectApi';

interface ProjectUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: ProjectDto | null;
}

const ProjectUploadModal: React.FC<ProjectUploadModalProps> = ({ isOpen, onClose, onSuccess, initialData }) => {
  const isEditMode = !!initialData;

  const [formData, setFormData] = useState<ProjectDto>({
    titleEn: '',
    titleJa: '',
    descriptionEn: '',
    descriptionJa: '',
    demoLink: '',
    githubLink: '',
    stacks: []
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [stacksInput, setStacksInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          titleEn: initialData.titleEn,
          titleJa: initialData.titleJa,
          descriptionEn: initialData.descriptionEn,
          descriptionJa: initialData.descriptionJa,
          demoLink: initialData.demoLink || '',
          githubLink: initialData.githubLink || '',
          stacks: initialData.stacks
        });
        setStacksInput(initialData.stacks.join(', '));
      } else {
        setFormData({
          titleEn: '',
          titleJa: '',
          descriptionEn: '',
          descriptionJa: '',
          demoLink: '',
          githubLink: '',
          stacks: []
        });
        setStacksInput('');
      }
      setImageFile(null);
      setError('');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditMode && !imageFile) {
      setError('Please select an image file.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      
      const submitData = {
        ...formData,
        stacks: stacksInput.split(',').map(s => s.trim()).filter(s => s.length > 0)
      };

      if (isEditMode && initialData?.id) {
        await projectApi.updateProject(initialData.id, submitData, imageFile || undefined);
      } else {
        await projectApi.createProject(submitData, imageFile!);
      }
      
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      setError('Failed to save project. Check console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#1e1e1e] rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">{isEditMode ? 'Edit Project' : 'Add New Project'}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">&times;</button>
          </div>

          {error && <div className="mb-4 p-3 bg-red-900/50 text-red-200 rounded border border-red-800">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-gray-400">Title (English) *</label>
                <input required type="text" name="titleEn" value={formData.titleEn} onChange={handleInputChange} className="w-full bg-[#121212] border border-gray-700 rounded p-2 focus:border-emerald-500 focus:outline-none" />
              </div>
              <div>
                <label className="block mb-1 text-gray-400">Title (Japanese) *</label>
                <input required type="text" name="titleJa" value={formData.titleJa} onChange={handleInputChange} className="w-full bg-[#121212] border border-gray-700 rounded p-2 focus:border-emerald-500 focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-gray-400">Description (English) *</label>
                <textarea required name="descriptionEn" value={formData.descriptionEn} onChange={handleInputChange} rows={3} className="w-full bg-[#121212] border border-gray-700 rounded p-2 focus:border-emerald-500 focus:outline-none" />
              </div>
              <div>
                <label className="block mb-1 text-gray-400">Description (Japanese) *</label>
                <textarea required name="descriptionJa" value={formData.descriptionJa} onChange={handleInputChange} rows={3} className="w-full bg-[#121212] border border-gray-700 rounded p-2 focus:border-emerald-500 focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-gray-400">Tech Stacks (comma separated) *</label>
              <input required type="text" placeholder="e.g. React, Tailwind CSS, Spring Boot" value={stacksInput} onChange={(e) => setStacksInput(e.target.value)} className="w-full bg-[#121212] border border-gray-700 rounded p-2 focus:border-emerald-500 focus:outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-gray-400">Demo Link</label>
                <input type="url" name="demoLink" value={formData.demoLink} onChange={handleInputChange} className="w-full bg-[#121212] border border-gray-700 rounded p-2 focus:border-emerald-500 focus:outline-none" />
              </div>
              <div>
                <label className="block mb-1 text-gray-400">GitHub Link</label>
                <input type="url" name="githubLink" value={formData.githubLink} onChange={handleInputChange} className="w-full bg-[#121212] border border-gray-700 rounded p-2 focus:border-emerald-500 focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-gray-400">Thumbnail Image {!isEditMode && '*'}</label>
              <input required={!isEditMode} type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full bg-[#121212] border border-gray-700 rounded p-2 text-gray-400 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-emerald-600 file:text-white hover:file:bg-emerald-500" />
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded text-gray-400 hover:bg-gray-800">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded disabled:opacity-50 flex items-center gap-2">
                {isSubmitting ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Add Project')}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectUploadModal;

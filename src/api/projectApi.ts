import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/projects';

export interface ProjectDto {
  id?: number;
  titleEn: string;
  titleJa: string;
  descriptionEn: string;
  descriptionJa: string;
  imageUrl?: string;
  demoLink?: string;
  githubLink?: string;
  stacks: string[];
}

export const projectApi = {
  getAllProjects: async (): Promise<ProjectDto[]> => {
    const response = await axios.get<ProjectDto[]>(API_BASE_URL);
    return response.data;
  },

  createProject: async (projectData: ProjectDto, imageFile: File): Promise<ProjectDto> => {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    // Spring Boot expects JSON string for 'requestDto' part
    formData.append(
      'requestDto', 
      new Blob([JSON.stringify(projectData)], { type: 'application/json' })
    );

    const response = await axios.post<ProjectDto>(API_BASE_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};

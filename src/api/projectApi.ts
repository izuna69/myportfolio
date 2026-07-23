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

const getAuthHeaders = () => {
  const token = sessionStorage.getItem('adminToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const projectApi = {
  getAllProjects: async (): Promise<ProjectDto[]> => {
    const response = await axios.get<ProjectDto[]>(API_BASE_URL);
    return response.data;
  },

  login: async (username: string, password: string): Promise<{ token: string; message: string }> => {
    const authUrl = API_BASE_URL.replace('/projects', '/auth/login');
    const response = await axios.post(authUrl, { username, password });
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
        ...getAuthHeaders(),
      },
    });
    return response.data;
  },

  updateProject: async (id: number, projectData: ProjectDto, imageFile?: File): Promise<ProjectDto> => {
    const formData = new FormData();
    if (imageFile) {
      formData.append('image', imageFile);
    }
    formData.append('requestDto', new Blob([JSON.stringify(projectData)], {
      type: 'application/json'
    }));

    const response = await axios.put<ProjectDto>(`${API_BASE_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...getAuthHeaders(),
      },
    });
    return response.data;
  },

  deleteProject: async (id: number): Promise<void> => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  }
};

import { create } from "zustand";
import { fetchProjects, createProject, fetchProjectById } from "../api/projectApi";

export const useProjectsStore = create((set) => ({
  projects: [],
  loading: false,
  selectedProject: null,

  loadProjects: async () => {
    set({ loading: true });
    const data = await fetchProjects();
    set({ projects: data, loading: false });
  },

  loadProject: async (id) => {
    set({ loading: true });
    const project = await fetchProjectById(id);
    set({ selectedProject: project, loading: false });
  },

  addProject: async (payload) => {
    const newProject = await createProject(payload);
    set((state) => ({
      projects: [newProject, ...state.projects]
    }));
    return newProject;
  },
}));

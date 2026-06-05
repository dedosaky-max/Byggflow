import { create } from "zustand";
import {
  getChecklists,
  createChecklist,
  updateChecklist,
} from "@modules/hse/api/hseChecklistApi";

export const useHseChecklistStore = create((set, get) => ({
  checklists: [],
  selected: null,

  loadChecklists: async (projectId) => {
    const { data } = await getChecklists(projectId);
    set({ checklists: data || [] });
  },

  createChecklist: async (payload) => {
    const { data } = await createChecklist(payload);
    if (data) {
      set((state) => ({ checklists: [data[0], ...state.checklists] }));
    }
  },

  updateChecklist: async (id, payload) => {
    await updateChecklist(id, payload);
    await get().loadChecklists(get().selected.project_id);
  },
}));

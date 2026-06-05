import { create } from "zustand";
import { getAudits, createAudit, updateAudit } from "@modules/hse/api/hseAuditApi";

export const useHseAuditStore = create((set, get) => ({
  audits: [],
  selected: null,

  loadAudits: async (projectId) => {
    const { data } = await getAudits(projectId);
    set({ audits: data || [] });
  },

  createAudit: async (payload) => {
    const { data } = await createAudit(payload);
    if (data) {
      set((state) => ({ audits: [data[0], ...state.audits] }));
    }
  },

  updateAudit: async (id, payload) => {
    await updateAudit(id, payload);
    await get().loadAudits(get().selected.project_id);
  },
}));

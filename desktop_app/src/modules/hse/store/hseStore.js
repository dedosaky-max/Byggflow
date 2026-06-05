import { create } from "zustand";
import {
  getHseEvents,
  createHseEvent,
  updateHseStatus,
  addHseSignature,
} from "@modules/hse/api/hseApi";

export const useHseStore = create((set, get) => ({
  events: [],
  selected: null,
  loading: false,

  loadEvents: async (projectId) => {
    set({ loading: true });
    const { data } = await getHseEvents(projectId);
    set({ events: data || [], loading: false });
  },

  selectEvent: (ev) => set({ selected: ev }),

  createEvent: async (payload) => {
    const { data } = await createHseEvent(payload);
    if (data) {
      set((state) => ({ events: [data[0], ...state.events] }));
    }
  },

  updateStatus: async (eventId, status) => {
    await updateHseStatus(eventId, status);
    await get().loadEvents(get().selected.project_id);
  },

  signEvent: async (eventId, signature) => {
    await addHseSignature(eventId, signature);
    await get().loadEvents(get().selected.project_id);
  },
}));

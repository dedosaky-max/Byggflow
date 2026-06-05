import { create } from "zustand";

export const useLogStore = create((set) => ({
  logs: [],

  addLog: (entry) =>
    set((state) => ({
      logs: [
        {
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          ...entry,
        },
        ...state.logs,
      ],
    })),
}));

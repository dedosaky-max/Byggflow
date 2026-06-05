import { create } from "zustand";

export const useTowersStore = create((set) => ({
  towers: [],

  loadTowers: () => {
    // MOCK — sostituire con API reale
    set({
      towers: [
        { id: "S-014", name: "Tower S-014" },
        { id: "S-015", name: "Tower S-015" },
        { id: "S-016", name: "Tower S-016" },
      ],
    });
  },
}));

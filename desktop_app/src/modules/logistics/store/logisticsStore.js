import { create } from "zustand";
import { apiLoadVehicles } from "@modules/logistics/api/logisticsApi";

export const useLogisticsStore = create((set) => ({
  vehicles: [],
  selectedVehicle: null,

  /* LOAD VEHICLES */
  loadVehicles: async () => {
    const data = await apiLoadVehicles();
    set({ vehicles: data });
  },

  /* SELECT VEHICLE */
  selectVehicle: (vehicle) => {
    set({ selectedVehicle: vehicle });
  },
}));

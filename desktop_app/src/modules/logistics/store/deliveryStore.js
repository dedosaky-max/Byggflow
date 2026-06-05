import { create } from "zustand";
import {
  apiLoadDeliveries,
  apiCreateDelivery,
  apiUpdateDeliveryStatus,
} from "@modules/logistics/api/deliveryApi";

export const useDeliveryStore = create((set, get) => ({
  deliveries: [],
  selected: null,

  /* LOAD */
  loadDeliveries: async (projectId) => {
    const data = await apiLoadDeliveries(projectId);
    set({ deliveries: data });
  },

  /* SELECT */
  selectDelivery: (delivery) => {
    set({ selected: delivery });
  },

  /* CREATE */
  createDelivery: async (payload) => {
    const newDelivery = await apiCreateDelivery(payload);
    set({ deliveries: [...get().deliveries, newDelivery] });
  },

  /* UPDATE STATUS */
  updateStatus: async (id, status) => {
    const updated = await apiUpdateDeliveryStatus(id, status);

    set({
      deliveries: get().deliveries.map((d) =>
        d.id === id ? { ...d, status } : d
      ),
      selected:
        get().selected?.id === id
          ? { ...get().selected, status }
          : get().selected,
    });

    return updated;
  },
}));

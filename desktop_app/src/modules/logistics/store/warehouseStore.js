import { create } from "zustand";
import {
  apiLoadWarehouse,
  apiAddWarehouseItem,
  apiUpdateWarehouseQuantity,
} from "@modules/logistics/api/warehouseApi";

export const useWarehouseStore = create((set, get) => ({
  items: [],

  /* LOAD */
  loadWarehouse: async (projectId) => {
    const data = await apiLoadWarehouse(projectId);
    set({ items: data });
  },

  /* ADD ITEM */
  addItem: async (payload) => {
    const newItem = await apiAddWarehouseItem(payload);
    set({ items: [...get().items, newItem] });
  },

  /* UPDATE QTY */
  updateQuantity: async (id, quantity) => {
    await apiUpdateWarehouseQuantity(id, quantity);

    set({
      items: get().items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    });
  },
}));

// @modules/logistics/api/warehouseApi.js

let WAREHOUSE_DB = [];

export async function apiLoadWarehouse(projectId) {
  return WAREHOUSE_DB.filter((i) => i.project_id === projectId);
}

export async function apiAddWarehouseItem(payload) {
  const newItem = {
    id: crypto.randomUUID(),
    ...payload,
  };

  WAREHOUSE_DB.push(newItem);
  return newItem;
}

export async function apiUpdateWarehouseQuantity(id, quantity) {
  WAREHOUSE_DB = WAREHOUSE_DB.map((i) =>
    i.id === id ? { ...i, quantity } : i
  );

  return { id, quantity };
}

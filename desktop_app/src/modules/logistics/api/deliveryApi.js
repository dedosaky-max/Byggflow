// @modules/logistics/api/deliveryApi.js

let DELIVERY_DB = [];

export async function apiLoadDeliveries(projectId) {
  return DELIVERY_DB.filter((d) => d.project_id === projectId);
}

export async function apiCreateDelivery(payload) {
  const newDelivery = {
    id: crypto.randomUUID(),
    ...payload,
  };

  DELIVERY_DB.push(newDelivery);
  return newDelivery;
}

export async function apiUpdateDeliveryStatus(id, status) {
  DELIVERY_DB = DELIVERY_DB.map((d) =>
    d.id === id ? { ...d, status } : d
  );

  return { id, status };
}

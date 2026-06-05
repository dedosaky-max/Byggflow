import LogisticsDashboardPage from "@modules/logistics/pages/LogisticsDashboardPage";

import DeliveryListPage from "@modules/logistics/pages/DeliveryListPage";
import DeliveryCreatePage from "@modules/logistics/pages/DeliveryCreatePage";
import DeliveryDetailPage from "@modules/logistics/pages/DeliveryDetailPage";

import WarehousePage from "@modules/logistics/pages/WarehousePage";
// import VehiclesPage from "@modules/logistics/pages/VehiclesPage"; // opzionale

export const logisticsRoutes = [
  { path: "/logistics", element: <LogisticsDashboardPage /> },

  // CONSEGNE
  { path: "/logistics/deliveries", element: <DeliveryListPage /> },
  { path: "/logistics/deliveries/create", element: <DeliveryCreatePage /> },
  { path: "/logistics/deliveries/detail/:id", element: <DeliveryDetailPage /> },

  // MAGAZZINO
  { path: "/logistics/warehouse", element: <WarehousePage /> },

  // MEZZI (opzionale)
  // { path: "/logistics/vehicles", element: <VehiclesPage /> },
];

import { createBrowserRouter } from "react-router-dom";

import ByggflowApp from "@/app/ByggflowApp";

// ROUTES PER MODULO
import { projectRoutes } from "./projectRoutes";
import { documentsRoutes } from "./documentsRoutes";
import { hseRoutes } from "./hseRoutes";
import { logisticsRoutes } from "./logisticsRoutes";
import { settingsRoutes } from "./settingsRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ByggflowApp />,
    children: [
      ...projectRoutes,
      ...documentsRoutes,
      ...hseRoutes,
      ...logisticsRoutes,
      ...settingsRoutes,
    ],
  },
]);

export default router;

import HSEPage from "@modules/hse/pages/HSEPage";
import HseDashboardPage from "@modules/hse/pages/HseDashboardPage";
import HseListPage from "@modules/hse/pages/HseListPage";
import HseCreatePage from "@modules/hse/pages/HseCreatePage";
import HseDetailPage from "@modules/hse/pages/HseDetailPage";

import AuditListPage from "@modules/hse/pages/AuditListPage";
import AuditCreatePage from "@modules/hse/pages/AuditCreatePage";
import AuditDetailPage from "@modules/hse/pages/AuditDetailPage";

import ChecklistPage from "@modules/hse/pages/ChecklistPage";
import ChecklistCreatePage from "@modules/hse/pages/ChecklistCreatePage";
import ChecklistDetailPage from "@modules/hse/pages/ChecklistDetailPage";

export const hseRoutes = [
  { path: "/hse", element: <HSEPage /> },
  { path: "/hse/dashboard", element: <HseDashboardPage /> },

  // EVENTI HSE
  { path: "/hse/list", element: <HseListPage /> },
  { path: "/hse/create", element: <HseCreatePage /> },
  { path: "/hse/detail/:id", element: <HseDetailPage /> },

  // AUDIT
  { path: "/hse/audits", element: <AuditListPage /> },
  { path: "/hse/audits/create", element: <AuditCreatePage /> },
  { path: "/hse/audits/detail/:id", element: <AuditDetailPage /> },

  // CHECKLIST
  { path: "/hse/checklists", element: <ChecklistPage /> },
  { path: "/hse/checklists/create", element: <ChecklistCreatePage /> },
  { path: "/hse/checklists/detail/:id", element: <ChecklistDetailPage /> },
];

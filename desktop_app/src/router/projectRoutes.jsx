import ProjectListPage from "@modules/projects/pages/ProjectListPage";
import ProjectDetailPage from "@modules/projects/pages/ProjectDetailPage";
import ProjectCreatePage from "@modules/projects/pages/ProjectCreatePage";

export const projectRoutes = [
  {
    path: "/projects",
    element: <ProjectListPage />,
  },
  {
    path: "/projects/create",
    element: <ProjectCreatePage />,
  },
  {
    path: "/projects/detail/:id",
    element: <ProjectDetailPage />,
  },
];

import DocumentsDashboardPage from "@modules/documents/pages/DocumentsDashboardPage";
import DocumentFolderPage from "@modules/documents/pages/DocumentFolderPage";
import DocumentUploadPage from "@modules/documents/pages/DocumentUploadPage";

export const documentsRoutes = [
  {
    path: "/documents",
    element: <DocumentsDashboardPage />,
  },
  {
    path: "/documents/folder/:folderId",
    element: <DocumentFolderPage />,
  },
  {
    path: "/documents/upload",
    element: <DocumentUploadPage />,
  },
];

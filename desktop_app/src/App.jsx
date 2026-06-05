import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout principale
import Layout from "./layout/Layout";

// Dashboard
import Dashboard from "./modules/dashboard/Dashboard";

// Projects
import ProjectsListPage from "./modules/projects/pages/ProjectsListPage";
import ProjectDetailPage from "./modules/projects/pages/ProjectDetailPage";
import CreateProjectPage from "./modules/projects/pages/CreateProjectPage";

// HSE
import HseListPage from "./modules/hse/pages/HseListPage";
import HseCreatePage from "./modules/hse/pages/HseCreatePage";
import HseDetailPage from "./modules/hse/pages/HseDetailPage";

// Photos
import PhotosPage from "./modules/photos/pages/PhotosPage";

// Documents
import DocumentsPage from "./modules/documents/pages/DocumentsPage";

// Placeholder moduli futuri
import LogisticsPage from "./modules/logistics/pages/LogisticsPage";
import ReportsPage from "./modules/reports/pages/ReportsPage";
import UsersPage from "./modules/admin/pages/UsersPage";
import RolesPage from "./modules/admin/pages/RolesPage";
import SettingsPage from "./modules/admin/pages/SettingsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* Dashboard */}
        <Route index element={<Dashboard />} />

        {/* Projects */}
        <Route path="projects" element={<ProjectsListPage />} />
        <Route path="projects/new" element={<CreateProjectPage />} />
        <Route path="projects/:projectId" element={<ProjectDetailPage />} />

        {/* HSE */}
        <Route path="hse" element={<HseListPage />} />
        <Route path="hse/new" element={<HseCreatePage />} />
        <Route path="hse/new/:towerId" element={<HseCreatePage />} />
        <Route path="hse/:hseId" element={<HseDetailPage />} />

        {/* Photos */}
        <Route path="photos" element={<PhotosPage />} />

        {/* Documents */}
        <Route path="documents" element={<DocumentsPage />} />

        {/* Logistics */}
        <Route path="logistics" element={<LogisticsPage />} />

        {/* Reports */}
        <Route path="reports" element={<ReportsPage />} />

        {/* Admin */}
        <Route path="users" element={<UsersPage />} />
        <Route path="roles" element={<RolesPage />} />
        <Route path="settings" element={<SettingsPage />} />

        {/* 404 */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Route>
    </Routes>
  );
}

import React from "react";

export default function ProjectProgress({ project }) {
  return (
    <div className="bg-white border rounded p-4 shadow-sm mb-6">
      <h2 className="text-lg font-semibold mb-3">Project Progress</h2>

      <div className="mb-4">
        <div className="text-sm text-gray-500 mb-1">Overall Progress</div>
        <div className="w-full bg-gray-200 rounded h-3">
          <div
            className="bg-blue-600 h-3 rounded"
            style={{ width: `${project.progress ?? 0}%` }}
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Towers</h3>
        <ul className="text-sm text-gray-600">
          <li>Total: {project.towersTotal ?? "—"}</li>
          <li>Completed: {project.towersCompleted ?? "—"}</li>
          <li>In Progress: {project.towersInProgress ?? "—"}</li>
          <li>Critical: {project.towersCritical ?? "—"}</li>
        </ul>
      </div>
    </div>
  );
}

import React from "react";

export default function ProjectCard({ project, onClick }) {
  return (
    <div
      onClick={onClick}
      className="border rounded p-4 bg-white shadow-sm hover:shadow cursor-pointer"
    >
      <div className="text-lg font-semibold">{project.name}</div>
      <div className="text-sm text-gray-500">{project.client}</div>
      <div className="text-xs text-gray-400 mt-2">
        Start: {project.startDate}
      </div>
    </div>
  );
}

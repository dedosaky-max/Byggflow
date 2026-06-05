import React from "react";

export default function ProjectHeader({ project }) {
  return (
    <div className="mb-4">
      <h1 className="text-3xl font-semibold">{project.name}</h1>
      <p className="text-gray-600">{project.client}</p>

      <div className="text-sm text-gray-500 mt-1">
        Start: {project.startDate} — End: {project.endDate}
      </div>
    </div>
  );
}

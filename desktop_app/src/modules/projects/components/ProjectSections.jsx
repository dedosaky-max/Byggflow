import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProjectSections({ projectId }) {
  const navigate = useNavigate();

  const sections = [
    { label: "Documents", path: `/documents?project=${projectId}` },
    { label: "HSE", path: `/hse?project=${projectId}` },
    { label: "Logistics", path: `/logistics?project=${projectId}` },
    { label: "Photos", path: `/photos?project=${projectId}` },
    { label: "Reports", path: `/reports?project=${projectId}` },
  ];

  return (
    <div className="grid grid-cols-5 gap-4">
      {sections.map((s) => (
        <button
          key={s.label}
          onClick={() => navigate(s.path)}
          className="bg-white border rounded p-4 shadow-sm hover:bg-gray-50 text-center"
        >
          <div className="text-lg font-semibold">{s.label}</div>
          <div className="text-xs text-gray-500 mt-1">Open module</div>
        </button>
      ))}
    </div>
  );
}

import React from "react";

export default function ProjectTabs({ active, onChange }) {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "documents", label: "Documents" },
    { id: "hse", label: "HSE" },
    { id: "logistics", label: "Logistics" },
    { id: "photos", label: "Photos" },
    { id: "reports", label: "Reports" },
  ];

  return (
    <div className="flex gap-6 border-b mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`pb-2 text-sm font-medium ${
            active === tab.id
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

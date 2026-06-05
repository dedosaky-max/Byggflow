import React from "react";

export default function ProjectKpiCards({ project }) {
  const kpis = [
    { label: "Revenue to Date", value: project.revenue ?? "—" },
    { label: "Cost to Date", value: project.cost ?? "—" },
    { label: "Margin", value: project.margin ?? "—" },
    { label: "Progress", value: project.progress ?? "—" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="bg-white border rounded p-4 shadow-sm"
        >
          <div className="text-sm text-gray-500">{kpi.label}</div>
          <div className="text-xl font-semibold mt-1">{kpi.value}</div>
        </div>
      ))}
    </div>
  );
}

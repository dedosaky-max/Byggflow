import React from "react";
import ProjectKpiCards from "../ProjectKpiCards";
import ProjectProgress from "../ProjectProgress";
import ProjectSections from "../ProjectSections";

export default function OverviewTab({ project, projectId }) {
  return (
    <div className="space-y-6">
      <ProjectKpiCards project={project} />
      <ProjectProgress project={project} />
      <ProjectSections projectId={projectId} />
    </div>
  );
}

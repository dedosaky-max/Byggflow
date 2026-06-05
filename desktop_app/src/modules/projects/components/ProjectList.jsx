import React from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectList({ projects, onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} onClick={() => onSelect(p.id)} />
      ))}
    </div>
  );
}

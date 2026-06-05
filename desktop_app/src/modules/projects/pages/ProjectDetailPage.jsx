import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { PageTemplate } from "@components/PageTemplate";
import { Breadcrumbs } from '@components/ui/Breadcrumbs';
import { Panel } from '@components/ui/Panel';
import { SectionHeader } from "@components/ui/SectionHeader";
import { Button } from '@components/ui/Button';

// TODO: sostituire con integrazione reale supabase
function useProject(id) {
  const [project, setProject] = useState(null);

  useEffect(() => {
    // Mock temporaneo
    const mock = [
      { id: 1, name: "Cantiere Oslo Nord", status: "In corso", manager: "Mendes" },
      { id: 2, name: "Tunnel Bergen", status: "Completato", manager: "Larsen" },
      { id: 3, name: "Ponte Stavanger", status: "In corso", manager: "Hansen" }
    ];

    const found = mock.find((p) => p.id === Number(id));
    setProject(found);
  }, [id]);

  return { project };
}

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { project } = useProject(id);

  if (!project) {
    return (
      <PageTemplate>
        <SectionHeader title="Caricamento progetto..." />
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Progetti", to: "/projects" },
          { label: project.name }
        ]}
      />

      <SectionHeader
        title={project.name}
        subtitle={`Responsabile: ${project.manager} • Stato: ${project.status}`}
      />

      <div style={{ marginBottom: "var(--space-4)" }}>
        <Button variant="secondary" onClick={() => navigate("/projects")}>
          ← Torna ai progetti
        </Button>
      </div>

      <Panel title="Informazioni generali">
        <p><strong>ID:</strong> {project.id}</p>
        <p><strong>Nome:</strong> {project.name}</p>
        <p><strong>Stato:</strong> {project.status}</p>
        <p><strong>Responsabile:</strong> {project.manager}</p>
      </Panel>

      <Panel title="Moduli del progetto">
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Button onClick={() => navigate(`/projects/${id}/hse`)}>HSE</Button>
          <Button onClick={() => navigate(`/projects/${id}/documents`)}>Documenti</Button>
          <Button onClick={() => navigate(`/projects/${id}/logistics`)}>Logistica</Button>
          <Button onClick={() => navigate(`/projects/${id}/photos`)}>Foto</Button>
          <Button onClick={() => navigate(`/projects/${id}/quality`)}>Qualità</Button>
          <Button onClick={() => navigate(`/projects/${id}/reports`)}>Rapporti</Button>
          <Button onClick={() => navigate(`/projects/${id}/foundations`)}>Fondazioni</Button>
          <Button onClick={() => navigate(`/projects/${id}/sds`)}>SDS</Button>
          <Button onClick={() => navigate(`/projects/${id}/competence`)}>Competenze</Button>
        </div>
      </Panel>
    </PageTemplate>
  );
}

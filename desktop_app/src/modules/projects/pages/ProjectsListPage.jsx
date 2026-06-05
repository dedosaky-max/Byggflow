import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PageTemplate } from "@components/PageTemplate";
import { Breadcrumbs } from '@components/ui/Breadcrumbs';
import { Button } from '@components/ui/Button';
import { Table } from "@components/ui/Table";
import { Panel } from '@components/ui/Panel';
import { SectionHeader } from "@components/ui/SectionHeader";

// TODO: sostituire con integrazione reale supabase
function useProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Mock temporaneo
    setProjects([
      { id: 1, name: "Cantiere Oslo Nord", status: "In corso", manager: "Mendes" },
      { id: 2, name: "Tunnel Bergen", status: "Completato", manager: "Larsen" },
      { id: 3, name: "Ponte Stavanger", status: "In corso", manager: "Hansen" }
    ]);
  }, []);

  return { projects };
}

export default function ProjectsListPage() {
  const navigate = useNavigate();
  const { projects } = useProjects();

  const columns = [
    { key: "name", label: "Nome progetto" },
    { key: "status", label: "Stato" },
    { key: "manager", label: "Responsabile" }
  ];

  const rows = projects.map((p) => ({
    ...p,
    onClick: () => navigate(`/projects/${p.id}`)
  }));

  return (
    <PageTemplate>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Progetti" }
        ]}
      />

      <SectionHeader
        title="Progetti"
        subtitle="Gestisci tutti i progetti attivi e completati"
      />

      <div style={{ marginBottom: "var(--space-4)" }}>
        <Button
          variant="primary"
          onClick={() => navigate("/projects/create")}
        >
          + Nuovo progetto
        </Button>
      </div>

      <Panel title="Lista progetti">
        <Table columns={columns} data={rows} />
      </Panel>
    </PageTemplate>
  );
}

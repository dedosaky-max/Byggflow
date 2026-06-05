import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PageTemplate } from "@components/PageTemplate";
import { Breadcrumbs } from '@components/ui/Breadcrumbs';
import { Panel } from '@components/ui/Panel';
import { SectionHeader } from "@components/ui/SectionHeader";
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';

// TODO: sostituire con integrazione reale supabase
async function createProject(data) {
  console.log("Creazione progetto (mock):", data);

  // Simulazione ritardo
  return new Promise((resolve) =>
    setTimeout(() => resolve({ id: Date.now(), ...data }), 600)
  );
}

export default function CreateProjectPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    manager: "",
    status: "In corso"
  });

  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newProject = await createProject(form);

    navigate(`/projects/${newProject.id}`);
  };

  return (
    <PageTemplate>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Progetti", to: "/projects" },
          { label: "Nuovo progetto" }
        ]}
      />

      <SectionHeader
        title="Nuovo progetto"
        subtitle="Crea un nuovo progetto e definisci le informazioni principali"
      />

      <Panel title="Dati del progetto">
        <form onSubmit={handleSubmit}>
          <Input
            label="Nome progetto"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            required
          />

          <Input
            label="Responsabile"
            value={form.manager}
            onChange={(e) => updateField("manager", e.target.value)}
            required
          />

          <Input
            label="Stato"
            value={form.status}
            onChange={(e) => updateField("status", e.target.value)}
          />

          <div style={{ marginTop: "var(--space-4)" }}>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Creazione in corso..." : "Crea progetto"}
            </Button>

            <Button
              variant="ghost"
              style={{ marginLeft: "12px" }}
              onClick={() => navigate("/projects")}
              type="button"
            >
              Annulla
            </Button>
          </div>
        </form>
      </Panel>
    </PageTemplate>
  );
}

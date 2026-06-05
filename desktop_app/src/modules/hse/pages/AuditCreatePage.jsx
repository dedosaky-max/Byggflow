import { useState } from "react";

import Layout from "@layout/Layout";
import PageTemplate from "@components/PageTemplate";

import Input from "@ui/Input";
import TextArea from "@ui/TextArea";
import Button from "@ui/Button";

import { useHseAuditStore } from "@modules/hse/store/hseAuditStore";

export default function AuditCreatePage() {
  const { createAudit } = useHseAuditStore();

  const [form, setForm] = useState({
    title: "",
    description: "",
    inspector: "",
  });

  const projectId = "PRJ-001"; // da router o store globale

  const handleSubmit = async () => {
    if (!form.title.trim()) return;

    await createAudit({
      ...form,
      project_id: projectId,
      created_at: new Date().toISOString(),
    });

    // redirect alla lista audit
    window.location.href = "/hse/audits";
  };

  return (
    <Layout>
      <PageTemplate title="Nuovo Audit HSE">
        <div className="space-y-4 max-w-xl">
          <Input
            label="Titolo"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <Input
            label="Ispettore"
            value={form.inspector}
            onChange={(e) => setForm({ ...form, inspector: e.target.value })}
          />

          <TextArea
            label="Descrizione"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <Button onClick={handleSubmit}>Crea Audit</Button>
        </div>
      </PageTemplate>
    </Layout>
  );
}

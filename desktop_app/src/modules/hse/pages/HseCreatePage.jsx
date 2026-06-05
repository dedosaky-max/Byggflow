import { useState } from "react";

import Layout from "@layout/Layout";
import PageTemplate from "@components/PageTemplate";

import Input from "@ui/Input";
import TextArea from "@ui/TextArea";
import Select from "@ui/Select";
import Button from "@ui/Button";

import { useHseStore } from "@modules/hse/store/hseStore";
import { getHseFolderPath } from "@modules/documents/utils/getHseFolderPath";

export default function HseCreatePage() {
  const { createEvent } = useHseStore();

  const projectId = "PRJ-001"; // da router o store globale
  const towerId = "TWR-001";   // da router o store globale

  const [form, setForm] = useState({
    type: "incident",
    severity: "medium",
    title: "",
    description: "",
    location: "",
    reporter: "",
    attachments: [],
    geo: { lat: null, lng: null },
  });

  /* -----------------------------------------
     MOCK GEOLOCATION
  ------------------------------------------ */
  const mockGeolocation = () => {
    setForm({
      ...form,
      geo: {
        lat: 59.291, // mock Avaldsnes
        lng: 5.306,
      },
    });
  };

  /* -----------------------------------------
     FILE UPLOAD (solo in memoria)
  ------------------------------------------ */
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setForm({ ...form, attachments: files });
  };

  /* -----------------------------------------
     SALVATAGGIO EVENTO HSE
  ------------------------------------------ */
  const handleSubmit = async () => {
    if (!form.title.trim()) return;

    const hseFolder = getHseFolderPath(towerId);

    await createEvent({
      ...form,
      project_id: projectId,
      tower_id: towerId,
      created_at: new Date().toISOString(),
      status: "open",
      document_folder: hseFolder,
    });

    window.location.href = "/hse";
  };

  return (
    <Layout>
      <PageTemplate title="Nuovo Evento HSE">
        <div className="space-y-6 max-w-2xl">

          {/* TIPO EVENTO */}
          <Select
            label="Tipo evento"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            options={[
              { label: "Incident", value: "incident" },
              { label: "Near Miss", value: "near_miss" },
              { label: "Observation", value: "observation" },
            ]}
          />

          {/* SEVERITÀ */}
          <Select
            label="Severità"
            value={form.severity}
            onChange={(e) => setForm({ ...form, severity: e.target.value })}
            options={[
              { label: "Low", value: "low" },
              { label: "Medium", value: "medium" },
              { label: "High", value: "high" },
            ]}
          />

          {/* TITOLO */}
          <Input
            label="Titolo"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          {/* DESCRIZIONE */}
          <TextArea
            label="Descrizione"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          {/* LOCATION */}
          <Input
            label="Luogo"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />

          {/* REPORTER */}
          <Input
            label="Segnalato da"
            value={form.reporter}
            onChange={(e) => setForm({ ...form, reporter: e.target.value })}
          />

          {/* GEOLOCATION */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Geolocalizzazione</label>
            <div className="flex gap-2">
              <Input
                placeholder="Latitudine"
                value={form.geo.lat || ""}
                disabled
              />
              <Input
                placeholder="Longitudine"
                value={form.geo.lng || ""}
                disabled
              />
            </div>
            <Button variant="secondary" onClick={mockGeolocation}>
              Imposta geolocalizzazione automatica
            </Button>
          </div>

          {/* ATTACHMENTS */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Allegati</label>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="block"
            />
            {form.attachments.length > 0 && (
              <p className="text-sm text-gray-600">
                {form.attachments.length} file selezionati
              </p>
            )}
          </div>

          {/* SALVA */}
          <Button className="mt-4" onClick={handleSubmit}>
            Crea Evento HSE
          </Button>
        </div>
      </PageTemplate>
    </Layout>
  );
}

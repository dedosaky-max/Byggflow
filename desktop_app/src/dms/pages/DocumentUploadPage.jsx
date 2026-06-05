import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PageTemplate } from "@components/PageTemplate";
import { Breadcrumbs } from '@components/ui/Breadcrumbs';
import { Panel } from '@components/ui/Panel';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { TextArea } from '@components/ui/TextArea';

import { useDocumentStore } from "../store/documentStore";

export default function DocumentUploadPage() {
  const navigate = useNavigate();
  const { uploadDocument, uploadAttachment } = useDocumentStore();

  const [form, setForm] = useState({
    title: "",
    category: "",
    createdBy: "Mendes",
    expiresAt: "",
  });

  const [mainFile, setMainFile] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleMainFileSelect = (e) => {
    setMainFile(e.target.files?.[0] || null);
  };

  const handleAttachmentSelect = (e) => {
    setAttachments(Array.from(e.target.files));
  };

  const handleSubmit = async () => {
    if (!form.title.trim() || !mainFile) return;

    setSaving(true);

    // 1) CREA DOCUMENTO (versione 1)
    const created = await uploadDocument(form, mainFile);

    if (!created) {
      setSaving(false);
      return;
    }

    // 2) CARICA ALLEGATI
    for (const file of attachments) {
      await uploadAttachment(created.id, file);
    }

    setSaving(false);
    navigate(`/documents/detail/${created.id}`);
  };

  return (
    <PageTemplate>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Documenti", to: "/documents" },
          { label: "Carica nuovo documento" },
        ]}
      />

      <Panel title="Carica nuovo documento">
        {/* ------------------------------
            TITOLO
        -------------------------------- */}
        <div style={{ marginBottom: "var(--space-4)" }}>
          <Input
            label="Titolo documento"
            placeholder="Es. Piano di Sicurezza"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        {/* ------------------------------
            CATEGORIA
        -------------------------------- */}
        <div style={{ marginBottom: "var(--space-4)" }}>
          <select
            className="form-select"
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
          >
            <option value="">Seleziona categoria</option>
            <option value="HSE">HSE</option>
            <option value="Drawings">Disegni</option>
            <option value="Reports">Rapporti</option>
          </select>
        </div>

        {/* ------------------------------
            SCADENZA
        -------------------------------- */}
        <div style={{ marginBottom: "var(--space-4)" }}>
          <Input
            type="date"
            label="Data di scadenza (opzionale)"
            value={form.expiresAt}
            onChange={(e) => handleChange("expiresAt", e.target.value)}
          />
        </div>

        {/* ------------------------------
            FILE PRINCIPALE
        -------------------------------- */}
        <Panel title="File principale" style={{ marginBottom: "var(--space-4)" }}>
          <label className="form-label">Seleziona file PDF</label>
          <input type="file" accept="application/pdf" onChange={handleMainFileSelect} />

          {mainFile && (
            <p style={{ marginTop: "8px" }}>
              <strong>File selezionato:</strong> {mainFile.name}
            </p>
          )}
        </Panel>

        {/* ------------------------------
            ALLEGATI
        -------------------------------- */}
        <Panel title="Allegati (opzionali)" style={{ marginBottom: "var(--space-4)" }}>
          <input type="file" multiple onChange={handleAttachmentSelect} />

          {attachments.length > 0 && (
            <ul style={{ paddingLeft: "16px", marginTop: "8px" }}>
              {attachments.map((f) => (
                <li key={f.name}>{f.name}</li>
              ))}
            </ul>
          )}
        </Panel>

        {/* ------------------------------
            AZIONI
        -------------------------------- */}
        <div style={{ display: "flex", gap: "12px" }}>
          <Button
            variant="primary"
            disabled={saving}
            onClick={handleSubmit}
          >
            {saving ? "Caricamento..." : "Carica documento"}
          </Button>

          <Button variant="ghost" onClick={() => navigate("/documents")}>
            Annulla
          </Button>
        </div>
      </Panel>
    </PageTemplate>
  );
}

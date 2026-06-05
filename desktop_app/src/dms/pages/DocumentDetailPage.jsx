import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { PageTemplate } from "@components/PageTemplate";
import { Breadcrumbs } from '@components/ui/Breadcrumbs';
import { Panel } from '@components/ui/Panel';
import { Button } from '@components/ui/Button';
import { TextArea } from '@components/ui/TextArea';

import { useDocumentStore } from "../store/documentStore";

export default function DocumentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    selectedDocument,
    loadDocument,
    changeDocumentStatus,
    addVersion,
    uploadAttachment,
    loading,
    error,
  } = useDocumentStore();

  const [uploadingAttachment, setUploadingAttachment] = useState(false);
  const [uploadingVersion, setUploadingVersion] = useState(false);
  const [newVersionChanges, setNewVersionChanges] = useState("");

  useEffect(() => {
    loadDocument(id);
  }, [id, loadDocument]);

  if (loading || !selectedDocument) {
    return (
      <PageTemplate>
        <Panel title="Caricamento...">
          <p>Attendere...</p>
        </Panel>
      </PageTemplate>
    );
  }

  if (error) {
    return (
      <PageTemplate>
        <Panel title="Errore">
          <p>{error}</p>
          <Button variant="ghost" onClick={() => navigate("/documents")}>
            Torna alla lista
          </Button>
        </Panel>
      </PageTemplate>
    );
  }

  const doc = selectedDocument;

  const handleStatusChange = async (newStatus) => {
    await changeDocumentStatus(doc.id, newStatus);
  };

  const handleAttachmentUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAttachment(true);
    await uploadAttachment(doc.id, file);
    setUploadingAttachment(false);
  };

  const handleNewVersionUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingVersion(true);
    await addVersion(doc.id, file, newVersionChanges);
    setUploadingVersion(false);
    setNewVersionChanges("");
  };

  const getStatusBadge = (status) => {
    const base = {
      padding: "4px 8px",
      borderRadius: "6px",
      fontSize: "12px",
      fontWeight: "600",
      display: "inline-block",
      textTransform: "capitalize",
    };

    switch (status) {
      case "draft":
        return { ...base, background: "var(--color-border)", color: "#000" };
      case "under_review":
        return { ...base, background: "var(--color-warning)", color: "#000" };
      case "approved":
        return { ...base, background: "var(--color-success)", color: "#fff" };
      case "archived":
        return { ...base, background: "var(--color-text-light)", color: "#fff" };
      default:
        return base;
    }
  };

  return (
    <PageTemplate>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Documenti", to: "/documents" },
          { label: "Dettaglio documento" },
        ]}
      />

      {/* -----------------------------------------
          METADATI DOCUMENTO
      ------------------------------------------ */}
      <Panel title="Dettagli documento">
        <p><strong>ID:</strong> {doc.id}</p>
        <p><strong>Titolo:</strong> {doc.title}</p>
        <p><strong>Categoria:</strong> {doc.category}</p>
        <p><strong>Versione corrente:</strong> v{doc.version}</p>
        <p><strong>Creato da:</strong> {doc.createdBy}</p>
        <p><strong>Creato il:</strong> {new Date(doc.createdAt).toLocaleString()}</p>
        <p><strong>Ultimo aggiornamento:</strong> {new Date(doc.updatedAt).toLocaleString()}</p>

        {doc.expiresAt && (
          <p>
            <strong>Scadenza:</strong>{" "}
            {new Date(doc.expiresAt).toLocaleDateString()}
          </p>
        )}

        <p>
          <strong>Stato:</strong>{" "}
          <span style={getStatusBadge(doc.status)}>
            {doc.status.replace("_", " ")}
          </span>
        </p>

        <div style={{ marginTop: "var(--space-4)", display: "flex", gap: "12px" }}>
          {doc.status !== "draft" && (
            <Button variant="ghost" onClick={() => handleStatusChange("draft")}>
              Bozza
            </Button>
          )}

          {doc.status !== "under_review" && (
            <Button variant="ghost" onClick={() => handleStatusChange("under_review")}>
              In revisione
            </Button>
          )}

          {doc.status !== "approved" && (
            <Button variant="ghost" onClick={() => handleStatusChange("approved")}>
              Approvato
            </Button>
          )}

          {doc.status !== "archived" && (
            <Button variant="ghost" onClick={() => handleStatusChange("archived")}>
              Archiviato
            </Button>
          )}
        </div>
      </Panel>

      {/* -----------------------------------------
          PREVIEW DOCUMENTO
      ------------------------------------------ */}
      <Panel title="Preview documento">
        <iframe
          src={doc.fileUrl}
          title="preview"
          style={{
            width: "100%",
            height: "500px",
            border: "1px solid var(--color-border)",
            borderRadius: "8px",
          }}
        />
      </Panel>

      {/* -----------------------------------------
          VERSIONING
      ------------------------------------------ */}
      <Panel title="Versioni documento">
        <ul style={{ paddingLeft: "16px" }}>
          {doc.history.map((v) => (
            <li key={v.version} style={{ marginBottom: "8px" }}>
              <strong>v{v.version}</strong> — {v.changes}
              <span style={{ color: "var(--color-text-light)" }}>
                {" "}
                ({new Date(v.date).toLocaleString()})
              </span>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: "var(--space-4)" }}>
          <TextArea
            label="Note per la nuova versione"
            placeholder="Descrivi le modifiche apportate..."
            value={newVersionChanges}
            onChange={(e) => setNewVersionChanges(e.target.value)}
          />

          <label
            style={{
              display: "inline-block",
              padding: "8px 12px",
              background: "var(--color-primary)",
              color: "#fff",
              borderRadius: "6px",
              cursor: "pointer",
              marginTop: "8px",
            }}
          >
            {uploadingVersion ? "Caricamento..." : "Carica nuova versione"}
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleNewVersionUpload}
              disabled={uploadingVersion}
            />
          </label>
        </div>
      </Panel>

      {/* -----------------------------------------
          ALLEGATI
      ------------------------------------------ */}
      <Panel title="Allegati">
        <div style={{ marginBottom: "var(--space-4)" }}>
          <label
            style={{
              display: "inline-block",
              padding: "8px 12px",
              background: "var(--color-primary)",
              color: "#fff",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {uploadingAttachment ? "Caricamento..." : "Carica allegato"}
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleAttachmentUpload}
              disabled={uploadingAttachment}
            />
          </label>
        </div>

        {doc.attachments?.length === 0 && (
          <p style={{ color: "var(--color-text-light)" }}>
            Nessun allegato presente.
          </p>
        )}

        {doc.attachments?.length > 0 && (
          <ul style={{ paddingLeft: "16px" }}>
            {doc.attachments.map((a) => (
              <li key={a.id} style={{ marginBottom: "8px" }}>
                <a href={a.url} target="_blank" rel="noreferrer">
                  {a.name}
                </a>{" "}
                <span style={{ color: "var(--color-text-light)" }}>
                  ({new Date(a.uploadedAt).toLocaleString()})
                </span>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Button variant="ghost" onClick={() => navigate("/documents")}>
        Torna alla lista
      </Button>
    </PageTemplate>
  );
}

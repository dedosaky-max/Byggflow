import React, { useEffect, useState } from "react";
import { PageTemplate } from "@components/PageTemplate";
import { Breadcrumbs } from '@components/ui/Breadcrumbs';
import { Panel } from '@components/ui/Panel';
import { Button } from '@components/ui/Button';

import { useDocumentStore } from "../store/documentStore";

export default function DocumentListPage() {
  const { documents, loadDocuments, loading, error } = useDocumentStore();

  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

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

  const filteredDocuments = documents.filter((doc) => {
    const categoryMatch =
      filterCategory === "all" || doc.category === filterCategory;

    const statusMatch =
      filterStatus === "all" || doc.status === filterStatus;

    return categoryMatch && statusMatch;
  });

  return (
    <PageTemplate>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Documenti", to: "/documents" },
          { label: "Gestione Documenti" },
        ]}
      />

      <Panel title="Gestione Documenti">
        {/* -----------------------------------------
            FILTRI
        ------------------------------------------ */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "var(--space-4)",
          }}
        >
          <select
            className="form-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ width: "200px" }}
          >
            <option value="all">Tutte le categorie</option>
            <option value="HSE">HSE</option>
            <option value="Drawings">Disegni</option>
            <option value="Reports">Rapporti</option>
          </select>

          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ width: "200px" }}
          >
            <option value="all">Tutti gli stati</option>
            <option value="draft">Bozza</option>
            <option value="under_review">In revisione</option>
            <option value="approved">Approvato</option>
            <option value="archived">Archiviato</option>
          </select>

          <Button variant="primary" to="/documents/upload">
            Carica nuovo documento
          </Button>
        </div>

        {/* -----------------------------------------
            LISTA DOCUMENTI
        ------------------------------------------ */}
        {loading && <p>Caricamento documenti...</p>}
        {error && <p style={{ color: "var(--color-danger)" }}>{error}</p>}

        {!loading && filteredDocuments.length === 0 && (
          <p style={{ color: "var(--color-text-light)" }}>
            Nessun documento trovato.
          </p>
        )}

        {!loading && filteredDocuments.length > 0 && (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Titolo</th>
                <th style={thStyle}>Categoria</th>
                <th style={thStyle}>Versione</th>
                <th style={thStyle}>Stato</th>
                <th style={thStyle}>Ultimo aggiornamento</th>
                <th style={thStyle}>Azioni</th>
              </tr>
            </thead>

            <tbody>
              {filteredDocuments.map((doc) => (
                <tr key={doc.id}>
                  <td style={tdStyle}>{doc.title}</td>
                  <td style={tdStyle}>{doc.category}</td>
                  <td style={tdStyle}>v{doc.version}</td>
                  <td style={tdStyle}>
                    <span style={getStatusBadge(doc.status)}>
                      {doc.status.replace("_", " ")}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    {new Date(doc.updatedAt).toLocaleDateString()}
                  </td>
                  <td style={tdStyle}>
                    <Button
                      variant="ghost"
                      to={`/documents/detail/${doc.id}`}
                      style={{ marginRight: "8px" }}
                    >
                      Apri
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel>
    </PageTemplate>
  );
}

/* ------------------------------
   STILI TABELLA
-------------------------------- */

const thStyle = {
  textAlign: "left",
  padding: "10px 8px",
  borderBottom: "2px solid var(--color-border)",
  fontWeight: "600",
  color: "var(--color-text)",
};

const tdStyle = {
  padding: "10px 8px",
  borderBottom: "1px solid var(--color-border)",
  color: "var(--color-text)",
};

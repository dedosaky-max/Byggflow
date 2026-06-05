import { useEffect } from "react";

import Layout from "@layout/Layout";
import PageTemplate from "@components/PageTemplate";
import Button from "@ui/Button";

import { useHseAuditStore } from "@modules/hse/store/hseAuditStore";

export default function AuditDetailPage() {
  const { audits, selected, loadAudits } = useHseAuditStore();

  const projectId = "PRJ-001"; // da router o store globale

  // Se non abbiamo un audit selezionato, carichiamo la lista e prendiamo il primo (placeholder)
  useEffect(() => {
    const init = async () => {
      await loadAudits(projectId);
    };
    init();
  }, [loadAudits, projectId]);

  const audit = selected || audits[0];

  if (!audit) {
    return (
      <Layout>
        <PageTemplate title="Dettaglio Audit HSE">
          <p className="text-gray-500">Nessun audit selezionato.</p>
        </PageTemplate>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageTemplate title={`Audit: ${audit.title}`}>
        <div className="space-y-4 max-w-2xl">
          <div>
            <h3 className="text-sm font-semibold text-gray-500">Ispettore</h3>
            <p className="text-lg">{audit.inspector || "-"}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500">Descrizione</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {audit.description || "-"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-500">
                Creato il
              </h3>
              <p className="text-gray-700">
                {audit.created_at
                  ? new Date(audit.created_at).toLocaleString()
                  : "-"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500">Stato</h3>
              <p className="text-gray-700">{audit.status || "Bozza"}</p>
            </div>
          </div>

          <div className="pt-4 border-t mt-4 flex gap-2">
            <Button onClick={() => (window.location.href = "/hse/audits")}>
              Torna alla lista
            </Button>
            <Button variant="secondary">
              Esporta PDF
            </Button>
          </div>
        </div>
      </PageTemplate>
    </Layout>
  );
}

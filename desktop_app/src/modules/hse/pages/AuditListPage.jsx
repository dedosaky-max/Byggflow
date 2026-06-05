import { useEffect } from "react";

import Layout from "@layout/Layout";
import PageTemplate from "@components/PageTemplate";
import Button from "@ui/Button";
import Table from "@ui/Table";

import { useHseAuditStore } from "@modules/hse/store/hseAuditStore";

export default function AuditListPage() {
  const { audits, loadAudits } = useHseAuditStore();

  const projectId = "PRJ-001"; // da router o store globale

  useEffect(() => {
    loadAudits(projectId);
  }, [loadAudits, projectId]);

  const openDetail = (audit) => {
    window.location.href = `/hse/audits/detail/${audit.id}`;
  };

  return (
    <Layout>
      <PageTemplate title="Audit HSE">
        <div className="mb-4">
          <Button onClick={() => (window.location.href = "/hse/audits/create")}>
            Nuovo Audit
          </Button>
        </div>

        <Table>
          <thead>
            <tr>
              <th>Titolo</th>
              <th>Ispettore</th>
              <th>Data</th>
              <th>Stato</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {audits.length === 0 && (
              <tr>
                <td colSpan={5} className="py-3 text-gray-500">
                  Nessun audit presente.
                </td>
              </tr>
            )}

            {audits.map((audit) => (
              <tr
                key={audit.id}
                className="cursor-pointer hover:bg-gray-50 transition"
              >
                <td>{audit.title}</td>
                <td>{audit.inspector || "-"}</td>
                <td>
                  {audit.created_at
                    ? new Date(audit.created_at).toLocaleDateString()
                    : "-"}
                </td>
                <td>{audit.status || "Bozza"}</td>
                <td>
                  <Button
                    variant="ghost"
                    onClick={() => openDetail(audit)}
                  >
                    Apri
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </PageTemplate>
    </Layout>
  );
}

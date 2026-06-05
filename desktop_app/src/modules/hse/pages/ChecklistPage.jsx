import { useEffect } from "react";

import Layout from "@layout/Layout";
import PageTemplate from "@components/PageTemplate";
import Button from "@ui/Button";
import Table from "@ui/Table";

import { useHseChecklistStore } from "@modules/hse/store/hseChecklistStore";

export default function ChecklistPage() {
  const { checklists, loadChecklists } = useHseChecklistStore();

  const projectId = "PRJ-001"; // da router o store globale

  useEffect(() => {
    loadChecklists(projectId);
  }, [loadChecklists, projectId]);

  const openDetail = (checklist) => {
    window.location.href = `/hse/checklists/detail/${checklist.id}`;
  };

  return (
    <Layout>
      <PageTemplate title="Checklists HSE">
        <div className="mb-4">
          <Button onClick={() => (window.location.href = "/hse/checklists/create")}>
            Nuova Checklist
          </Button>
        </div>

        <Table>
          <thead>
            <tr>
              <th>Titolo</th>
              <th>Categoria</th>
              <th>Assegnata a</th>
              <th>Scadenza</th>
              <th>Stato</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {checklists.length === 0 && (
              <tr>
                <td colSpan={6} className="py-3 text-gray-500">
                  Nessuna checklist presente.
                </td>
              </tr>
            )}

            {checklists.map((c) => (
              <tr
                key={c.id}
                className="cursor-pointer hover:bg-gray-50 transition"
              >
                <td>{c.title}</td>
                <td>{c.category || "-"}</td>
                <td>{c.assignedTo || "-"}</td>
                <td>
                  {c.dueDate
                    ? new Date(c.dueDate).toLocaleDateString()
                    : "-"}
                </td>
                <td>{c.status || "open"}</td>
                <td>
                  <Button
                    variant="ghost"
                    onClick={() => openDetail(c)}
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

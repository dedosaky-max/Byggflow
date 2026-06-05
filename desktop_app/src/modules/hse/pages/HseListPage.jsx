import { useEffect } from "react";

import Layout from "@layout/Layout";
import PageTemplate from "@components/PageTemplate";

import Table from "@ui/Table";
import Button from "@ui/Button";
import Badge from "@ui/Badge";

import { useHseStore } from "@modules/hse/store/hseStore";

export default function HseListPage() {
  const { events, loadEvents } = useHseStore();

  const projectId = "PRJ-001"; // da router o store globale

  /* -----------------------------------------
     CARICAMENTO EVENTI
  ------------------------------------------ */
  useEffect(() => {
    loadEvents(projectId);
  }, [loadEvents, projectId]);

  /* -----------------------------------------
     NAVIGAZIONE
  ------------------------------------------ */
  const openDetail = (ev) => {
    window.location.href = `/hse/detail/${ev.id}`;
  };

  const createNew = () => {
    window.location.href = "/hse/create";
  };

  return (
    <Layout>
      <PageTemplate title="Eventi HSE">
        {/* TOOLBAR */}
        <div className="mb-4">
          <Button onClick={createNew}>Nuovo Evento HSE</Button>
        </div>

        {/* TABELLA EVENTI */}
        <Table>
          <thead>
            <tr>
              <th>Titolo</th>
              <th>Tipo</th>
              <th>Severità</th>
              <th>Stato</th>
              <th>Data</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {events.length === 0 && (
              <tr>
                <td colSpan={6} className="py-3 text-gray-500">
                  Nessun evento HSE presente.
                </td>
              </tr>
            )}

            {events.map((ev) => (
              <tr
                key={ev.id}
                className="cursor-pointer hover:bg-gray-50 transition"
              >
                <td>{ev.title}</td>

                <td>
                  <Badge>{ev.type}</Badge>
                </td>

                <td>
                  <Badge variant={
                    ev.severity === "high"
                      ? "danger"
                      : ev.severity === "medium"
                      ? "warning"
                      : "info"
                  }>
                    {ev.severity}
                  </Badge>
                </td>

                <td>
                  <Badge variant={
                    ev.status === "open"
                      ? "danger"
                      : ev.status === "in_progress"
                      ? "warning"
                      : "success"
                  }>
                    {ev.status}
                  </Badge>
                </td>

                <td>
                  {ev.created_at
                    ? new Date(ev.created_at).toLocaleDateString()
                    : "-"}
                </td>

                <td>
                  <Button
                    variant="ghost"
                    onClick={() => openDetail(ev)}
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

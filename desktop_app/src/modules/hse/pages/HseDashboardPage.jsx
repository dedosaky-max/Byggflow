import { useEffect } from "react";

import Layout from "@layout/Layout";
import PageTemplate from "@components/PageTemplate";

import Button from "@ui/Button";
import Card from "@ui/Card";
import Table from "@ui/Table";

import { useHseStore } from "@modules/hse/store/hseStore";

export default function HseDashboardPage() {
  const { events, loadEvents } = useHseStore();

  const projectId = "PRJ-001"; // da router o store globale

  /* -----------------------------------------
     CARICAMENTO EVENTI HSE
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

  /* -----------------------------------------
     STATISTICHE
  ------------------------------------------ */
  const stats = {
    total: events.length,
    open: events.filter((e) => e.status === "open").length,
    inProgress: events.filter((e) => e.status === "in_progress").length,
    closed: events.filter((e) => e.status === "closed").length,
  };

  return (
    <Layout>
      <PageTemplate title="Dashboard HSE">
        
        {/* -----------------------------------------
            SEZIONE STATISTICHE
        ------------------------------------------ */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <h3 className="text-sm text-gray-500">Totale eventi</h3>
            <p className="text-2xl font-semibold">{stats.total}</p>
          </Card>

          <Card className="p-4">
            <h3 className="text-sm text-gray-500">Aperti</h3>
            <p className="text-2xl font-semibold text-red-600">{stats.open}</p>
          </Card>

          <Card className="p-4">
            <h3 className="text-sm text-gray-500">In lavorazione</h3>
            <p className="text-2xl font-semibold text-yellow-600">
              {stats.inProgress}
            </p>
          </Card>

          <Card className="p-4">
            <h3 className="text-sm text-gray-500">Chiusi</h3>
            <p className="text-2xl font-semibold text-green-600">
              {stats.closed}
            </p>
          </Card>
        </div>

        {/* -----------------------------------------
            TOOLBAR
        ------------------------------------------ */}
        <div className="mb-4">
          <Button onClick={createNew}>Nuovo Evento HSE</Button>
        </div>

        {/* -----------------------------------------
            TABELLA EVENTI RECENTI
        ------------------------------------------ */}
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
                <td>{ev.type}</td>
                <td>{ev.severity}</td>
                <td>{ev.status}</td>
                <td>
                  {ev.created_at
                    ? new Date(ev.created_at).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  <Button variant="ghost" onClick={() => openDetail(ev)}>
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

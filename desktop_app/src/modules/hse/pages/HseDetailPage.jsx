import { useEffect, useState } from "react";

import Layout from "@layout/Layout";
import PageTemplate from "@components/PageTemplate";

import Card from "@ui/Card";
import Button from "@ui/Button";
import Badge from "@ui/Badge";

import SignatureModal from "@modules/hse/components/SignatureModal";

import { useHseStore } from "@modules/hse/store/hseStore";

export default function HseDetailPage() {
  const {
    events,
    selected,
    loadEvents,
    selectEvent,
    updateStatus,
    signEvent,
  } = useHseStore();

  const [signatureOpen, setSignatureOpen] = useState(false);

  const projectId = "PRJ-001"; // da router o store globale

  /* -----------------------------------------
     CARICAMENTO EVENTI
  ------------------------------------------ */
  useEffect(() => {
    loadEvents(projectId);
  }, [loadEvents, projectId]);

  /* -----------------------------------------
     SELEZIONE EVENTO
  ------------------------------------------ */
  const event = selected || events[0];

  useEffect(() => {
    if (event) selectEvent(event);
  }, [event, selectEvent]);

  if (!event) {
    return (
      <Layout>
        <PageTemplate title="Dettaglio Evento HSE">
          <p className="text-gray-500">Nessun evento selezionato.</p>
        </PageTemplate>
      </Layout>
    );
  }

  /* -----------------------------------------
     WORKFLOW
  ------------------------------------------ */
  const nextStatus = {
    open: "in_progress",
    in_progress: "closed",
    closed: null,
  };

  const handleStatusChange = async () => {
    const newStatus = nextStatus[event.status];
    if (!newStatus) return;
    await updateStatus(event.id, newStatus);
  };

  /* -----------------------------------------
     FIRMA DIGITALE
  ------------------------------------------ */
  const handleSignature = async (base64) => {
    await signEvent(event.id, base64);
  };

  return (
    <Layout>
      <PageTemplate title={`Evento HSE: ${event.title}`}>
        <div className="space-y-6 max-w-3xl">

          {/* -----------------------------------------
              HEADER EVENTO
          ------------------------------------------ */}
          <Card className="p-4 space-y-2">
            <h2 className="text-xl font-semibold">{event.title}</h2>

            <div className="flex gap-3 items-center">
              <Badge>{event.type}</Badge>
              <Badge variant="warning">{event.severity}</Badge>
              <Badge variant="info">{event.status}</Badge>
            </div>

            <p className="text-gray-700 whitespace-pre-line mt-2">
              {event.description}
            </p>
          </Card>

          {/* -----------------------------------------
              INFO EVENTO
          ------------------------------------------ */}
          <Card className="p-4 space-y-3">
            <h3 className="font-semibold text-lg">Informazioni</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Luogo</p>
                <p>{event.location || "-"}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Segnalato da</p>
                <p>{event.reporter || "-"}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Data</p>
                <p>
                  {event.created_at
                    ? new Date(event.created_at).toLocaleString()
                    : "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Geolocalizzazione</p>
                <p>
                  {event.geo?.lat && event.geo?.lng
                    ? `${event.geo.lat}, ${event.geo.lng}`
                    : "-"}
                </p>
              </div>
            </div>
          </Card>

          {/* -----------------------------------------
              ALLEGATI
          ------------------------------------------ */}
          <Card className="p-4 space-y-3">
            <h3 className="font-semibold text-lg">Allegati</h3>

            {event.attachments?.length > 0 ? (
              <ul className="list-disc ml-6">
                {event.attachments.map((file, i) => (
                  <li key={i}>{file.name || file}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Nessun allegato.</p>
            )}
          </Card>

          {/* -----------------------------------------
              FIRMA DIGITALE
          ------------------------------------------ */}
          <Card className="p-4 space-y-3">
            <h3 className="font-semibold text-lg">Firma digitale</h3>

            {event.signature ? (
              <img
                src={event.signature}
                alt="Firma"
                className="w-64 border rounded"
              />
            ) : (
              <p className="text-gray-500">Nessuna firma presente.</p>
            )}

            <Button variant="secondary" onClick={() => setSignatureOpen(true)}>
              Firma evento
            </Button>
          </Card>

          {/* -----------------------------------------
              WORKFLOW
          ------------------------------------------ */}
          <Card className="p-4 space-y-3">
            <h3 className="font-semibold text-lg">Workflow</h3>

            <p className="text-gray-600">
              Stato attuale: <strong>{event.status}</strong>
            </p>

            {nextStatus[event.status] ? (
              <Button onClick={handleStatusChange}>
                Avanza a: {nextStatus[event.status]}
              </Button>
            ) : (
              <p className="text-green-600 font-medium">
                Evento completato e chiuso.
              </p>
            )}
          </Card>

          {/* -----------------------------------------
              TORNA
          ------------------------------------------ */}
          <Button
            variant="secondary"
            onClick={() => (window.location.href = "/hse")}
          >
            Torna alla dashboard
          </Button>
        </div>

        {/* MODALE FIRMA */}
        <SignatureModal
          open={signatureOpen}
          onClose={() => setSignatureOpen(false)}
          onSign={handleSignature}
        />
      </PageTemplate>
    </Layout>
  );
}

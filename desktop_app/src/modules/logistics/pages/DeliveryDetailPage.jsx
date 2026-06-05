import { useEffect } from "react";

import Layout from "@layout/Layout";
import PageTemplate from "@components/PageTemplate";

import Card from "@ui/Card";
import Button from "@ui/Button";
import Badge from "@ui/Badge";

import { useDeliveryStore } from "@modules/logistics/store/deliveryStore";

export default function DeliveryDetailPage() {
  const { deliveries, selected, loadDeliveries, selectDelivery, updateStatus } =
    useDeliveryStore();

  const projectId = "PRJ-001"; // da router o store globale

  /* -----------------------------------------
     CARICAMENTO CONSEGNE
  ------------------------------------------ */
  useEffect(() => {
    loadDeliveries(projectId);
  }, [loadDeliveries, projectId]);

  /* -----------------------------------------
     SELEZIONE CONSEGNA
  ------------------------------------------ */
  const delivery = selected || deliveries[0];

  useEffect(() => {
    if (delivery) selectDelivery(delivery);
  }, [delivery, selectDelivery]);

  if (!delivery) {
    return (
      <Layout>
        <PageTemplate title="Dettaglio Consegna">
          <p className="text-gray-500">Nessuna consegna selezionata.</p>
        </PageTemplate>
      </Layout>
    );
  }

  /* -----------------------------------------
     WORKFLOW
  ------------------------------------------ */
  const nextStatus = {
    pending: "approved",
    approved: "delivered",
    delivered: null,
  };

  const handleStatusChange = async () => {
    const newStatus = nextStatus[delivery.status];
    if (!newStatus) return;
    await updateStatus(delivery.id, newStatus);
  };

  return (
    <Layout>
      <PageTemplate title={`Consegna #${delivery.id}`}>
        <div className="space-y-6 max-w-3xl">

          {/* -----------------------------------------
              HEADER
          ------------------------------------------ */}
          <Card className="p-4 space-y-2">
            <h2 className="text-xl font-semibold">Richiesta di Consegna</h2>

            <div className="flex gap-3 items-center">
              <Badge variant="info">{delivery.status}</Badge>
              <Badge>{delivery.vehicle?.type || "Mezzo"}</Badge>
            </div>

            <p className="text-gray-700 mt-2">
              {delivery.notes || "Nessuna nota aggiuntiva."}
            </p>
          </Card>

          {/* -----------------------------------------
              INFO PRINCIPALI
          ------------------------------------------ */}
          <Card className="p-4 space-y-3">
            <h3 className="font-semibold text-lg">Informazioni</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Data</p>
                <p>{delivery.date}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Orario</p>
                <p>{delivery.time}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Autista</p>
                <p>{delivery.driver || "-"}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Mezzo</p>
                <p>{delivery.vehicle?.name || "-"}</p>
              </div>
            </div>
          </Card>

          {/* -----------------------------------------
              MATERIALI
          ------------------------------------------ */}
          <Card className="p-4 space-y-3">
            <h3 className="font-semibold text-lg">Materiali</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {delivery.materials || "-"}
            </p>
          </Card>

          {/* -----------------------------------------
              ALLEGATI
          ------------------------------------------ */}
          <Card className="p-4 space-y-3">
            <h3 className="font-semibold text-lg">Allegati</h3>

            {delivery.attachments?.length > 0 ? (
              <ul className="list-disc ml-6">
                {delivery.attachments.map((file, i) => (
                  <li key={i}>{file.name || file}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Nessun allegato.</p>
            )}
          </Card>

          {/* -----------------------------------------
              WORKFLOW
          ------------------------------------------ */}
          <Card className="p-4 space-y-3">
            <h3 className="font-semibold text-lg">Workflow</h3>

            <p className="text-gray-600">
              Stato attuale: <strong>{delivery.status}</strong>
            </p>

            {nextStatus[delivery.status] ? (
              <Button onClick={handleStatusChange}>
                Avanza a: {nextStatus[delivery.status]}
              </Button>
            ) : (
              <p className="text-green-600 font-medium">
                Consegna completata.
              </p>
            )}
          </Card>

          {/* -----------------------------------------
              TORNA
          ------------------------------------------ */}
          <Button
            variant="secondary"
            onClick={() => (window.location.href = "/logistics/deliveries")}
          >
            Torna alla lista
          </Button>
        </div>
      </PageTemplate>
    </Layout>
  );
}

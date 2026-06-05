import Layout from "@layout/Layout";
import PageTemplate from "@components/PageTemplate";

import DeliveryForm from "@modules/logistics/components/DeliveryForm";
import { useDeliveryStore } from "@modules/logistics/store/deliveryStore";

export default function DeliveryCreatePage() {
  const { createDelivery } = useDeliveryStore();

  const projectId = "PRJ-001";
  const towerId = "TWR-001";

  const handleSubmit = async (form) => {
    await createDelivery({
      ...form,
      project_id: projectId,
      tower_id: towerId,
      status: "pending",
      created_at: new Date().toISOString(),
    });

    window.location.href = "/logistics/deliveries";
  };

  return (
    <Layout>
      <PageTemplate title="Nuova Richiesta di Consegna">
        <div className="max-w-2xl">
          <DeliveryForm onSubmit={handleSubmit} />
        </div>
      </PageTemplate>
    </Layout>
  );
}

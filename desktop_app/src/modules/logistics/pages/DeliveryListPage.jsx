import { useEffect } from "react";

import Layout from "@layout/Layout";
import PageTemplate from "@components/PageTemplate";

import DeliveryList from "@modules/logistics/components/DeliveryList";
import { useDeliveryStore } from "@modules/logistics/store/deliveryStore";

export default function DeliveryListPage() {
  const { deliveries, loadDeliveries } = useDeliveryStore();
  const projectId = "PRJ-001";

  useEffect(() => {
    loadDeliveries(projectId);
  }, [loadDeliveries, projectId]);

  const openDetail = (delivery) => {
    window.location.href = `/logistics/deliveries/detail/${delivery.id}`;
  };

  const createNew = () => {
    window.location.href = "/logistics/deliveries/create";
  };

  return (
    <Layout>
      <PageTemplate title="Consegne">
        <DeliveryList
          deliveries={deliveries}
          onOpen={openDetail}
          onCreate={createNew}
        />
      </PageTemplate>
    </Layout>
  );
}

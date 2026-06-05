import { useEffect, useState } from "react";

import Layout from "@layout/Layout";
import PageTemplate from "@components/PageTemplate";

import Button from "@ui/Button";
import Modal from "@ui/Modal";
import Input from "@ui/Input";
import Select from "@ui/Select";

import WarehouseList from "@modules/logistics/components/WarehouseList";
import { useWarehouseStore } from "@modules/logistics/store/warehouseStore";

export default function WarehousePage() {
  const { items, loadWarehouse, addItem, updateQuantity } = useWarehouseStore();
  const projectId = "PRJ-001";

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: 0,
    unit: "pcs",
    location: "",
  });

  useEffect(() => {
    loadWarehouse(projectId);
  }, [loadWarehouse, projectId]);

  const handleAdd = async () => {
    if (!form.name.trim()) return;

    await addItem({
      ...form,
      project_id: projectId,
      created_at: new Date().toISOString(),
    });

    setModalOpen(false);
    setForm({
      name: "",
      category: "",
      quantity: 0,
      unit: "pcs",
      location: "",
    });
  };

  const increment = (item) => updateQuantity(item.id, item.quantity + 1);
  const decrement = (item) =>
    updateQuantity(item.id, Math.max(0, item.quantity - 1));

  return (
    <Layout>
      <PageTemplate title="Magazzino">
        <div className="mb-4">
          <Button onClick={() => setModalOpen(true)}>Aggiungi materiale</Button>
        </div>

        <WarehouseList
          items={items}
          onIncrement={increment}
          onDecrement={decrement}
        />

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Aggiungi materiale"
        >
          <div className="space-y-4">
            <Input
              label="Nome materiale"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <Input
              label="Categoria"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />

            <Input
              label="Quantità iniziale"
              type="number"
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: Number(e.target.value) })
              }
            />

            <Select
              label="Unità"
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
              options={[
                { label: "Pezzi", value: "pcs" },
                { label: "Kg", value: "kg" },
                { label: "m", value: "m" },
                { label: "L", value: "l" },
              ]}
            />

            <Input
              label="Posizione in magazzino"
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
            />

            <Button className="mt-4" onClick={handleAdd}>
              Aggiungi
            </Button>
          </div>
        </Modal>
      </PageTemplate>
    </Layout>
  );
}

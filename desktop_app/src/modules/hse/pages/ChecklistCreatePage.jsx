import { useState } from "react";

import Layout from "@layout/Layout";
import PageTemplate from "@components/PageTemplate";

import Input from "@ui/Input";
import TextArea from "@ui/TextArea";
import Button from "@ui/Button";

import { useHseChecklistStore } from "@modules/hse/store/hseChecklistStore";

export default function ChecklistCreatePage() {
  const { createChecklist } = useHseChecklistStore();

  const [form, setForm] = useState({
    title: "",
    description: "",
    items: [{ text: "", mandatory: false }],
  });

  const projectId = "PRJ-001"; // da router o store globale

  /* -----------------------------------------
     GESTIONE ITEMS CHECKLIST
  ------------------------------------------ */

  const updateItem = (index, key, value) => {
    const updated = [...form.items];
    updated[index][key] = value;
    setForm({ ...form, items: updated });
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { text: "", mandatory: false }],
    });
  };

  const removeItem = (index) => {
    const updated = form.items.filter((_, i) => i !== index);
    setForm({ ...form, items: updated });
  };

  /* -----------------------------------------
     SALVATAGGIO CHECKLIST
  ------------------------------------------ */

  const handleSubmit = async () => {
    if (!form.title.trim()) return;

    await createChecklist({
      ...form,
      project_id: projectId,
      created_at: new Date().toISOString(),
    });

    window.location.href = "/hse/checklists";
  };

  return (
    <Layout>
      <PageTemplate title="Nuova Checklist HSE">
        <div className="space-y-6 max-w-2xl">

          {/* TITOLO */}
          <Input
            label="Titolo"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          {/* DESCRIZIONE */}
          <TextArea
            label="Descrizione"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          {/* ITEMS CHECKLIST */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Elementi della checklist</h3>

            {form.items.map((item, index) => (
              <div
                key={index}
                className="p-4 border rounded-md space-y-2 bg-gray-50"
              >
                <Input
                  label={`Elemento ${index + 1}`}
                  value={item.text}
                  onChange={(e) =>
                    updateItem(index, "text", e.target.value)
                  }
                />

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={item.mandatory}
                    onChange={(e) =>
                      updateItem(index, "mandatory", e.target.checked)
                    }
                  />
                  <span>Obbligatorio</span>
                </div>

                {form.items.length > 1 && (
                  <Button
                    variant="danger"
                    onClick={() => removeItem(index)}
                  >
                    Rimuovi elemento
                  </Button>
                )}
              </div>
            ))}

            <Button variant="secondary" onClick={addItem}>
              Aggiungi elemento
            </Button>
          </div>

          {/* SALVA */}
          <Button className="mt-4" onClick={handleSubmit}>
            Crea Checklist
          </Button>
        </div>
      </PageTemplate>
    </Layout>
  );
}

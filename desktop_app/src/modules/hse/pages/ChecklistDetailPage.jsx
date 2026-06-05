import { useEffect, useState } from "react";

import Layout from "@layout/Layout";
import PageTemplate from "@components/PageTemplate";

import Button from "@ui/Button";
import Input from "@ui/Input";
import TextArea from "@ui/TextArea";

import { useHseChecklistStore } from "@modules/hse/store/hseChecklistStore";

export default function ChecklistDetailPage() {
  const { checklists, selected, loadChecklists, updateChecklist } =
    useHseChecklistStore();

  const projectId = "PRJ-001"; // da router o store globale

  // Stato locale per modifiche
  const [form, setForm] = useState(null);

  /* -----------------------------------------
     CARICAMENTO CHECKLIST
  ------------------------------------------ */

  useEffect(() => {
    const init = async () => {
      await loadChecklists(projectId);
    };
    init();
  }, [loadChecklists, projectId]);

  // Selezione checklist (placeholder: prima della lista)
  const checklist = selected || checklists[0];

  useEffect(() => {
    if (checklist) {
      setForm({
        title: checklist.title,
        description: checklist.description,
        items: checklist.items || [],
      });
    }
  }, [checklist]);

  if (!checklist || !form) {
    return (
      <Layout>
        <PageTemplate title="Dettaglio Checklist HSE">
          <p className="text-gray-500">Nessuna checklist selezionata.</p>
        </PageTemplate>
      </Layout>
    );
  }

  /* -----------------------------------------
     GESTIONE ITEMS
  ------------------------------------------ */

  const toggleItem = (index) => {
    const updated = [...form.items];
    updated[index].checked = !updated[index].checked;
    setForm({ ...form, items: updated });
  };

  /* -----------------------------------------
     SALVATAGGIO
  ------------------------------------------ */

  const handleSave = async () => {
    await updateChecklist(checklist.id, {
      title: form.title,
      description: form.description,
      items: form.items,
      updated_at: new Date().toISOString(),
    });

    window.location.href = "/hse/checklists";
  };

  return (
    <Layout>
      <PageTemplate title={`Checklist: ${form.title}`}>
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

          {/* ELEMENTI CHECKLIST */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Elementi</h3>

            {form.items.map((item, index) => (
              <div
                key={index}
                className="p-4 border rounded-md bg-gray-50 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{item.text}</p>
                  {item.mandatory && (
                    <p className="text-xs text-red-600">Obbligatorio</p>
                  )}
                </div>

                <input
                  type="checkbox"
                  checked={item.checked || false}
                  onChange={() => toggleItem(index)}
                />
              </div>
            ))}
          </div>

          {/* SALVA */}
          <Button className="mt-4" onClick={handleSave}>
            Salva modifiche
          </Button>

          {/* TORNA */}
          <Button
            variant="secondary"
            className="mt-2"
            onClick={() => (window.location.href = "/hse/checklists")}
          >
            Torna alla lista
          </Button>
        </div>
      </PageTemplate>
    </Layout>
  );
}

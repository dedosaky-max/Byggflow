import { useState } from "react";

import Input from "@ui/Input";
import TextArea from "@ui/TextArea";
import Button from "@ui/Button";

import VehicleSelector from "@modules/logistics/components/VehicleSelector";

export default function DeliveryForm({ initialValue, onSubmit, submitting }) {
  const [form, setForm] = useState(
    initialValue || {
      date: "",
      time: "",
      vehicle: null,
      driver: "",
      materials: "",
      notes: "",
      attachments: [],
    }
  );

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setForm({ ...form, attachments: files });
  };

  const handleSubmit = () => {
    if (!form.date || !form.time || !form.vehicle) return;
    onSubmit(form);
  };

  return (
    <div className="space-y-6">
      <Input
        label="Data"
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      <Input
        label="Orario"
        type="time"
        value={form.time}
        onChange={(e) => setForm({ ...form, time: e.target.value })}
      />

      <VehicleSelector
        selected={form.vehicle}
        onSelect={(vehicle) => setForm({ ...form, vehicle })}
      />

      <Input
        label="Autista"
        value={form.driver}
        onChange={(e) => setForm({ ...form, driver: e.target.value })}
      />

      <TextArea
        label="Materiali da consegnare"
        value={form.materials}
        onChange={(e) => setForm({ ...form, materials: e.target.value })}
      />

      <TextArea
        label="Note aggiuntive"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      />

      <div className="space-y-2">
        <label className="text-sm font-medium">Allegati</label>
        <input type="file" multiple onChange={handleFileUpload} />
        {form.attachments.length > 0 && (
          <p className="text-sm text-gray-600">
            {form.attachments.length} file selezionati
          </p>
        )}
      </div>

      <Button className="mt-4" onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Salvataggio..." : "Salva"}
      </Button>
    </div>
  );
}

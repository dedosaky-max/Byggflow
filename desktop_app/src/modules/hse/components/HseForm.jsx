import Input from "@ui/Input";
import TextArea from "@ui/TextArea";
import Button from "@ui/Button";

export default function HseForm({ form, setForm, onSubmit }) {
  return (
    <div className="space-y-3">
      <Input
        label="Titolo"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <TextArea
        label="Descrizione"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <Button onClick={onSubmit}>Salva</Button>
    </div>
  );
}

import Button from "@ui/Button";

export default function Toolbar({ onUpload, onNewFolder }) {
  return (
    <div className="flex gap-2 mb-4">
      <Button onClick={onUpload}>Carica documento</Button>
      <Button onClick={onNewFolder}>Nuova cartella</Button>
    </div>
  );
}

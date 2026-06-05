import Modal from "@ui/Modal";
import Button from "@ui/Button";
import Input from "@ui/Input";
import { useState } from "react";

export default function NewFolderModal({ open, onClose, onCreate }) {
  const [name, setName] = useState("");

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate(name);
    setName("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Nuova cartella">
      <Input
        placeholder="Nome cartella"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Button className="mt-4" onClick={handleCreate}>
        Crea cartella
      </Button>
    </Modal>
  );
}

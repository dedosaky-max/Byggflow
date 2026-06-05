import Modal from "@ui/Modal";
import Button from "@ui/Button";
import { useState } from "react";

export default function UploadModal({ open, onClose, onUpload }) {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file) return;
    onUpload(file);
    setFile(null);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Carica documento">
      <input
        type="file"
        className="mt-2"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <Button className="mt-4" onClick={handleUpload}>
        Carica
      </Button>
    </Modal>
  );
}

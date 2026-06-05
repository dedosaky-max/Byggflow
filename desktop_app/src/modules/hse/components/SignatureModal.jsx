import Modal from "@ui/Modal";
import Button from "@ui/Button";
import { useRef } from "react";

export default function SignatureModal({ open, onClose, onSign }) {
  const canvasRef = useRef(null);

  const handleSave = () => {
    const base64 = canvasRef.current.toDataURL();
    onSign(base64);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Firma digitale">
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        className="border rounded"
      />

      <Button className="mt-4" onClick={handleSave}>
        Salva firma
      </Button>
    </Modal>
  );
}

import React from "react";
import { logEvent } from "../logging/logService";

export default function PdfPreviewModal({ open, onClose, fileUrl, fileName }) {
  if (!open) return null;

  const handleOpenSystem = () => {
    logEvent("PDF_OPEN_SYSTEM", { fileName, fileUrl });
    window.open(fileUrl, "_blank");
  };

  logEvent("PDF_PREVIEW_OPENED", { fileName, fileUrl });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white w-[90%] h-[90%] rounded shadow-lg flex flex-col overflow-hidden">

        <div className="p-3 border-b flex justify-between items-center">
          <h2 className="font-semibold text-lg">{fileName}</h2>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-700 text-white rounded"
          >
            Chiudi
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          <iframe
            src={fileUrl}
            title={fileName}
            className="w-full h-full"
            style={{ border: "none" }}
          />
        </div>

        <div className="p-3 border-t flex justify-end">
          <button
            onClick={handleOpenSystem}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Apri nel visualizzatore di sistema
          </button>
        </div>
      </div>
    </div>
  );
}

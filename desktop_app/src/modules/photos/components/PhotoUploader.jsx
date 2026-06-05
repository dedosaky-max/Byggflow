import React from "react";

export default function PhotoUploader({ onUpload }) {
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) onUpload(file);
        }}
        className="border p-2 rounded"
      />
    </div>
  );
}

import React from "react";

export default function PhotoGallery({ photos }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {photos.map((p) => (
        <div key={p.id} className="border rounded overflow-hidden shadow-sm">
          <img
            src={p.url}
            alt={p.name}
            className="w-full h-32 object-cover"
          />
          <div className="p-1 text-xs text-gray-600">{p.name}</div>
        </div>
      ))}
    </div>
  );
}

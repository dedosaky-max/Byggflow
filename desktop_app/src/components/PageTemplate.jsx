import React from "react";

export function PageTemplate({ title, children }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">{title}</h1>

      <div className="bg-white border rounded p-4 shadow-sm">
        {children}
      </div>
    </div>
  );
}

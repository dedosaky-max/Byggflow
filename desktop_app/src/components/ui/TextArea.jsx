import React from "react";

export function TextArea({
  label,
  value,
  placeholder,
  onChange,
  disabled = false,
  rows = 4,
}) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}

      <textarea
        className="form-textarea"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        style={{
          width: "100%",
          padding: "var(--space-2)",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--border-color)",
          resize: "vertical",
        }}
      />
    </div>
  );
}

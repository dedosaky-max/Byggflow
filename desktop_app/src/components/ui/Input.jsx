export function Input({ label, type = "text", style, ...props }) {
  return (
    <div style={{ marginBottom: "var(--space-4)" }}>
      {label && (
        <label
          style={{
            display: "block",
            marginBottom: "var(--space-1)",
            fontSize: "var(--font-size-sm)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          {label}
        </label>
      )}

      <input
        type={type}
        style={{
          width: "100%",
          padding: "8px 12px",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--color-border)",
          fontSize: "var(--font-size-md)",
          ...style,
        }}
        {...props}
      />
    </div>
  );
}

export function Panel({ title, children }) {
  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        padding: "var(--space-4)",
        marginBottom: "var(--space-4)"
      }}
    >
      <h2
        style={{
          fontSize: "var(--font-size-lg)",
          fontWeight: "var(--font-weight-semibold)",
          marginBottom: "var(--space-3)"
        }}
      >
        {title}
      </h2>

      {children}
    </div>
  );
}

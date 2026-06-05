export function SectionHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: "var(--space-4)" }}>
      <h1
        style={{
          fontSize: "var(--font-size-xl)",
          fontWeight: "var(--font-weight-bold)",
          marginBottom: "var(--space-1)"
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            fontSize: "var(--font-size-md)",
            color: "var(--color-text-light)"
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

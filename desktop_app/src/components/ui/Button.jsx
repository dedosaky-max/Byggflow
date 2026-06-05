export function Button({
  children,
  variant = "primary",
  onClick,
  style,
  ...props
}) {
  const base = {
    padding: "8px 16px",
    borderRadius: "var(--radius-sm)",
    fontSize: "var(--font-size-md)",
    fontWeight: "var(--font-weight-medium)",
    cursor: "pointer",
    border: "1px solid transparent",
    transition: "0.15s ease",
  };

  const variants = {
    primary: {
      background: "var(--color-primary)",
      color: "#fff",
      borderColor: "var(--color-primary-dark)",
    },
    secondary: {
      background: "#fff",
      color: "var(--color-primary)",
      borderColor: "var(--color-primary)",
    },
    ghost: {
      background: "transparent",
      color: "var(--color-text)",
      borderColor: "transparent",
    },
  };

  return (
    <button
      onClick={onClick}
      style={{ ...base, ...variants[variant], ...style }}
      {...props}
    >
      {children}
    </button>
  );
}

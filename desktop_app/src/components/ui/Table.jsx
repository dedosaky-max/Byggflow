export function Table({ columns = [], data = [] }) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
      }}
    >
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              style={{
                textAlign: "left",
                padding: "12px",
                background: "#f0f2f5",
                borderBottom: "1px solid var(--color-border)",
                fontSize: "var(--font-size-sm)",
                fontWeight: "var(--font-weight-semibold)",
              }}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map((col) => (
              <td
                key={col.key}
                style={{
                  padding: "12px",
                  borderBottom: "1px solid var(--color-border)",
                  fontSize: "var(--font-size-md)",
                }}
              >
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

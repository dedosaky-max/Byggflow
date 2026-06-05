import Table from "@ui/Table";

export default function DocumentTable({ documents, onSelect }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Tipo</th>
          <th>Ultima modifica</th>
          <th>Autore</th>
        </tr>
      </thead>

      <tbody>
        {documents.length === 0 && (
          <tr>
            <td colSpan={4} className="py-3 text-gray-500">
              Nessun documento presente.
            </td>
          </tr>
        )}

        {documents.map((doc) => (
          <tr
            key={doc.id}
            className="cursor-pointer hover:bg-gray-50 transition"
            onClick={() => onSelect(doc)}
          >
            <td>{doc.name}</td>
            <td>{doc.type}</td>
            <td>{doc.updated_at || "-"}</td>
            <td>{doc.author || "-"}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

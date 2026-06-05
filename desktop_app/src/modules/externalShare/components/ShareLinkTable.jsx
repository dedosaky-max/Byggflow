import Table from "@ui/Table";

export default function ShareLinkTable({ links }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Cartella</th>
          <th>Link</th>
          <th>Scadenza</th>
          <th>Download</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link) => (
          <tr key={link.id}>
            <td>{link.folder_path}</td>
            <td>
              <a
                href={link.public_url}
                target="_blank"
                className="text-blue-600 underline"
              >
                Apri
              </a>
            </td>
            <td>{link.expires_in_days} giorni</td>
            <td>{link.allow_download ? "Sì" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

import Table from "@ui/Table";
import Button from "@ui/Button";
import Badge from "@ui/Badge";

export default function DeliveryList({ deliveries, onOpen, onCreate }) {
  return (
    <>
      <div className="mb-4">
        <Button onClick={onCreate}>Nuova Consegna</Button>
      </div>

      <Table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Orario</th>
            <th>Mezzo</th>
            <th>Autista</th>
            <th>Stato</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {deliveries.length === 0 && (
            <tr>
              <td colSpan={6} className="py-3 text-gray-500">
                Nessuna consegna presente.
              </td>
            </tr>
          )}

          {deliveries.map((d) => (
            <tr
              key={d.id}
              className="cursor-pointer hover:bg-gray-50 transition"
            >
              <td>{d.date}</td>
              <td>{d.time}</td>
              <td>{d.vehicle?.name || "-"}</td>
              <td>{d.driver || "-"}</td>

              <td>
                <Badge
                  variant={
                    d.status === "pending"
                      ? "warning"
                      : d.status === "approved"
                      ? "info"
                      : "success"
                  }
                >
                  {d.status}
                </Badge>
              </td>

              <td>
                <Button variant="ghost" onClick={() => onOpen(d)}>
                  Apri
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

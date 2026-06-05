import Table from "@ui/Table";
import Button from "@ui/Button";
import Badge from "@ui/Badge";

export default function WarehouseList({ items, onIncrement, onDecrement }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Materiale</th>
          <th>Categoria</th>
          <th>Quantità</th>
          <th>Unità</th>
          <th>Posizione</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {items.length === 0 && (
          <tr>
            <td colSpan={6} className="py-3 text-gray-500">
              Nessun materiale presente in magazzino.
            </td>
          </tr>
        )}

        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>
              <Badge variant="info">{item.category || "-"}</Badge>
            </td>
            <td>{item.quantity}</td>
            <td>{item.unit}</td>
            <td>{item.location || "-"}</td>

            <td className="flex gap-2">
              <Button variant="secondary" onClick={() => onIncrement(item)}>
                +1
              </Button>
              <Button
                variant="danger"
                onClick={() => onDecrement(item)}
                disabled={item.quantity <= 0}
              >
                -1
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

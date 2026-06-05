import Card from "@ui/Card";
import Badge from "@ui/Badge";

export default function WarehouseItemCard({ item }) {
  return (
    <Card className="p-4 space-y-2">
      <h3 className="font-semibold">{item.name}</h3>

      <Badge variant="info">{item.category || "Generico"}</Badge>

      <p className="text-gray-700">
        Quantità: <strong>{item.quantity}</strong> {item.unit}
      </p>

      <p className="text-gray-600 text-sm">
        Posizione: {item.location || "-"}
      </p>
    </Card>
  );
}

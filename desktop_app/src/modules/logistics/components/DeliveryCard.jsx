import Card from "@ui/Card";
import Badge from "@ui/Badge";
import Button from "@ui/Button";

export default function DeliveryCard({ delivery, onOpen }) {
  return (
    <Card className="p-4 space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">
          Consegna {delivery.date} – {delivery.time}
        </h3>

        <Badge
          variant={
            delivery.status === "pending"
              ? "warning"
              : delivery.status === "approved"
              ? "info"
              : "success"
          }
        >
          {delivery.status}
        </Badge>
      </div>

      <p className="text-gray-700">
        Mezzo: <strong>{delivery.vehicle?.name || "-"}</strong>
      </p>

      <p className="text-gray-600 text-sm">
        Autista: {delivery.driver || "-"}
      </p>

      <Button variant="secondary" onClick={onOpen}>
        Apri
      </Button>
    </Card>
  );
}

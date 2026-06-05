import { useEffect } from "react";
import Card from "@ui/Card";
import Badge from "@ui/Badge";

import { useLogisticsStore } from "@modules/logistics/store/logisticsStore";

export default function VehicleSelector({ selected, onSelect }) {
  const { vehicles, loadVehicles } = useLogisticsStore();

  useEffect(() => {
    loadVehicles();
  }, [loadVehicles]);

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Seleziona un mezzo</p>

      <div className="grid grid-cols-3 gap-4">
        {vehicles.map((v) => (
          <Card
            key={v.id}
            className={`p-4 cursor-pointer transition ${
              selected?.id === v.id
                ? "ring-2 ring-blue-500"
                : "hover:bg-gray-50"
            }`}
            onClick={() => onSelect(v)}
          >
            <h4 className="font-semibold">{v.name}</h4>
            <p className="text-gray-600 text-sm">{v.capacity}</p>
            <Badge variant="info" className="mt-2">
              {v.type}
            </Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}

import Card from "@ui/Card";

export default function HseCard({ event, onOpen }) {
  return (
    <Card
      className="cursor-pointer hover:bg-gray-50 transition"
      onClick={() => onOpen(event)}
    >
      <h3 className="font-semibold">{event.title}</h3>
      <p className="text-gray-600 text-sm">{event.description}</p>

      <div className="mt-2 text-xs text-gray-500">
        Stato: {event.status}
      </div>
    </Card>
  );
}

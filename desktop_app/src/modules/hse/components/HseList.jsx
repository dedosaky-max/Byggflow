import HseCard from "@modules/hse/components/HseCard";

export default function HseList({ events, onOpen }) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {events.map((ev) => (
        <HseCard key={ev.id} event={ev} onOpen={onOpen} />
      ))}
    </div>
  );
}

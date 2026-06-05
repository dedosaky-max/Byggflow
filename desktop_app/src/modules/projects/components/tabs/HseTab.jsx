import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHseStore } from "../../../hse/store/hseStore";
import HseList from "../../../hse/components/HseList";

export default function HseTab({ projectId }) {
  const navigate = useNavigate();
  const { items, loadItems, loading } = useHseStore();

  useEffect(() => {
    loadItems(projectId);
  }, [projectId]);

  if (loading) {
    return <p className="text-gray-500">Loading HSE events...</p>;
  }

  return (
    <div className="p-2">

      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">HSE Events</h2>

        <button
          onClick={() => navigate(`/projects/${projectId}/hse/new`)}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          + New HSE Event
        </button>
      </div>

      <HseList
        items={items}
        onSelect={(id) => navigate(`/projects/${projectId}/hse/${id}`)}
      />
    </div>
  );
}

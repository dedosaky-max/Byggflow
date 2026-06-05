import { useLogStore } from "./logStore";

export function logEvent(type, data = {}) {
  const addLog = useLogStore.getState().addLog;

  addLog({
    type,
    data,
  });

  // In futuro: invio al backend
  // fetch("/api/logs", { method: "POST", body: JSON.stringify({ type, data }) });
}

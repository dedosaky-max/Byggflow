export async function fetchProjects() {
  return [
    { id: "p1", name: "Project A", client: "Client 1", startDate: "2026-01-10" },
    { id: "p2", name: "Project B", client: "Client 2", startDate: "2026-02-15" },
  ];
}

export async function fetchProjectById(id) {
  return {
    id,
    name: `Project ${id.toUpperCase()}`,
    client: "Client X",
    description: "Project description...",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
  };
}

export async function createProject(payload) {
  return {
    id: crypto.randomUUID(),
    ...payload,
  };
}

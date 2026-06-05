import supabase from "@lib/supabaseClient";

export async function getChecklists(projectId) {
  return supabase
    .from("hse_checklists")
    .select("*")
    .eq("project_id", projectId);
}

export async function createChecklist(payload) {
  return supabase.from("hse_checklists").insert(payload).select();
}

export async function updateChecklist(id, payload) {
  return supabase
    .from("hse_checklists")
    .update(payload)
    .eq("id", id)
    .select();
}

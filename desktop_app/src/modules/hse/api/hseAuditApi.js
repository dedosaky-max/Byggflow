import supabase from "@lib/supabaseClient";

export async function getAudits(projectId) {
  return supabase
    .from("hse_audits")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });
}

export async function createAudit(payload) {
  return supabase.from("hse_audits").insert(payload).select();
}

export async function updateAudit(auditId, payload) {
  return supabase
    .from("hse_audits")
    .update(payload)
    .eq("id", auditId)
    .select();
}

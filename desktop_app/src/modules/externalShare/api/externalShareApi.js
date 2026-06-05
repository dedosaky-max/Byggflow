import supabase from "@lib/supabaseClient";

/**
 * Restituisce tutte le cartelle condivisibili del progetto/tower.
 */
export async function getSharedFolders(projectId) {
  return supabase
    .from("shared_folders")
    .select("*")
    .eq("project_id", projectId);
}

/**
 * Crea un nuovo link di condivisione.
 */
export async function createShareLink(payload) {
  return supabase.from("share_links").insert(payload).select();
}

/**
 * Restituisce tutti i link generati per un progetto.
 */
export async function getShareLinks(projectId) {
  return supabase
    .from("share_links")
    .select("*")
    .eq("project_id", projectId);
}

/**
 * Registra un accesso al link.
 */
export async function logShareAccess(shareLinkId) {
  return supabase.from("share_link_access_logs").insert({
    share_link_id: shareLinkId,
    accessed_at: new Date().toISOString(),
  });
}

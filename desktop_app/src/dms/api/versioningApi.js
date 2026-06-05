/**
 * versioningApi.js
 *
 * API layer per la gestione delle versioni dei documenti.
 * Versione ENTERPRISE-READY con mock locale.
 *
 * In FASE 9 sostituiremo:
 * - uploadVersion → Supabase Storage
 * - listVersions → Supabase DB
 * - rollbackVersion → Supabase DB
 *
 * Tutte le funzioni ritornano Promise per compatibilità futura.
 */

export const versioningApi = {
  /* -----------------------------------------
     LISTA VERSIONI DI UN DOCUMENTO
  ------------------------------------------ */
  listVersions: async (documentId) => {
    // MOCK — in futuro: SELECT * FROM document_versions WHERE document_id = ?
    return [];
  },

  /* -----------------------------------------
     UPLOAD NUOVA VERSIONE
  ------------------------------------------ */
  uploadVersion: async (documentId, file, author, note = null) => {
    // MOCK — in futuro: upload su Supabase Storage
    const fakeUrl = URL.createObjectURL(file);

    return {
      version: Date.now(), // placeholder, sostituito da DB in futuro
      url: fakeUrl,
      author,
      note,
      createdAt: new Date().toISOString(),
    };
  },

  /* -----------------------------------------
     ROLLBACK A VERSIONE PRECEDENTE
  ------------------------------------------ */
  rollbackVersion: async (documentId, versionNumber) => {
    // MOCK — in futuro: UPDATE document_versions SET active = true WHERE version = ?
    return { success: true };
  },

  /* -----------------------------------------
     DETTAGLIO VERSIONE
  ------------------------------------------ */
  getVersion: async (documentId, versionNumber) => {
    // MOCK — in futuro: SELECT * FROM document_versions WHERE version = ?
    return null;
  },
};

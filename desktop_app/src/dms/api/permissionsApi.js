/**
 * permissionsApi.js
 *
 * API layer per la gestione dei permessi (ACL) dei documenti.
 * Versione ENTERPRISE-READY con mock locale.
 *
 * In FASE 9.2 sostituiremo:
 * - getDocumentPermissions → FastAPI /permissions/{documentId}
 * - setDocumentPermissions → FastAPI /permissions/{documentId}
 * - getUserRole → FastAPI /auth/me
 *
 * Tutte le funzioni ritornano Promise per compatibilità futura.
 */

export const permissionsApi = {
  /* -----------------------------------------
     RUOLO UTENTE CORRENTE
  ------------------------------------------ */
  getUserRole: async () => {
    // MOCK — in futuro: GET /auth/me
    return {
      id: "user-001",
      name: "Mendes",
      role: "admin",
    };
  },

  /* -----------------------------------------
     PERMESSI DOCUMENTO
  ------------------------------------------ */
  getDocumentPermissions: async (documentId) => {
    // MOCK — in futuro: GET /permissions/{documentId}
    return {
      view: ["admin", "manager", "hse"],
      upload: ["admin", "manager"],
      delete: ["admin"],
      versioning: ["admin", "manager"],
    };
  },

  setDocumentPermissions: async (documentId, permissions) => {
    // MOCK — in futuro: POST /permissions/{documentId}
    return {
      success: true,
      documentId,
      permissions,
    };
  },

  /* -----------------------------------------
     LISTA RUOLI DISPONIBILI
  ------------------------------------------ */
  listRoles: async () => {
    // MOCK — in futuro: GET /roles
    return ["admin", "manager", "hse", "worker"];
  },
};

import { create } from "zustand";

/**
 * permissionsStore.js
 *
 * Gestisce:
 * - ruolo utente corrente
 * - permessi dei documenti
 * - funzioni di controllo ACL
 *
 * Struttura permessi documento:
 * {
 *   view: ["admin", "manager"],
 *   upload: ["admin"],
 *   delete: ["admin"],
 *   versioning: ["admin", "manager"]
 * }
 */

export const usePermissionsStore = create((set, get) => ({
  /* -----------------------------------------
     RUOLO UTENTE CORRENTE
  ------------------------------------------ */

  currentUser: {
    id: "user-001",
    name: "Mendes",
    role: "admin", // admin, manager, hse, worker...
  },

  setUserRole: (role) =>
    set((state) => ({
      currentUser: { ...state.currentUser, role },
    })),

  /* -----------------------------------------
     PERMESSI DOCUMENTI
  ------------------------------------------ */

  documentPermissions: {},

  setDocumentPermissions: (documentId, permissions) =>
    set((state) => ({
      documentPermissions: {
        ...state.documentPermissions,
        [documentId]: permissions,
      },
    })),

  /* -----------------------------------------
     FUNZIONI DI CONTROLLO
  ------------------------------------------ */

  canView: (documentId) => {
    const { currentUser, documentPermissions } = get();
    const perms = documentPermissions[documentId];
    if (!perms) return true; // default: visibile
    return perms.view?.includes(currentUser.role);
  },

  canUpload: (documentId) => {
    const { currentUser, documentPermissions } = get();
    const perms = documentPermissions[documentId];
    if (!perms) return false;
    return perms.upload?.includes(currentUser.role);
  },

  canDelete: (documentId) => {
    const { currentUser, documentPermissions } = get();
    const perms = documentPermissions[documentId];
    if (!perms) return false;
    return perms.delete?.includes(currentUser.role);
  },

  canVersion: (documentId) => {
    const { currentUser, documentPermissions } = get();
    const perms = documentPermissions[documentId];
    if (!perms) return false;
    return perms.versioning?.includes(currentUser.role);
  },
}));

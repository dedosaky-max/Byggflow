import { create } from "zustand";

/**
 * versioningStore.js
 *
 * Gestisce:
 * - versioni dei documenti
 * - aggiunta nuova versione
 * - rollback a versione precedente
 * - recupero versioni
 *
 * Struttura dati:
 * versions = {
 *   [documentId]: [
 *     {
 *       version: 1,
 *       url: "...",
 *       author: "Mendes",
 *       createdAt: "2026-05-14T12:00:00Z",
 *       note: "Prima versione"
 *     },
 *     ...
 *   ]
 * }
 */

export const useVersioningStore = create((set, get) => ({
  /* -----------------------------------------
     STATO INIZIALE
  ------------------------------------------ */
  versions: {},

  /* -----------------------------------------
     ACTIONS
  ------------------------------------------ */

  /**
   * Aggiunge una nuova versione a un documento
   */
  addVersion: (documentId, versionData) =>
    set((state) => {
      const existing = state.versions[documentId] || [];

      const newVersionNumber =
        existing.length > 0
          ? Math.max(...existing.map((v) => v.version)) + 1
          : 1;

      const newVersion = {
        version: newVersionNumber,
        createdAt: new Date().toISOString(),
        ...versionData,
      };

      return {
        versions: {
          ...state.versions,
          [documentId]: [...existing, newVersion],
        },
      };
    }),

  /**
   * Restituisce tutte le versioni di un documento
   */
  getVersions: (documentId) => {
    const { versions } = get();
    return versions[documentId] || [];
  },

  /**
   * Restituisce la versione corrente (ultima)
   */
  getCurrentVersion: (documentId) => {
    const { versions } = get();
    const list = versions[documentId] || [];
    if (list.length === 0) return null;
    return list[list.length - 1];
  },

  /**
   * Rollback: imposta una versione precedente come corrente
   */
  rollbackVersion: (documentId, versionNumber) =>
    set((state) => {
      const list = state.versions[documentId] || [];
      const target = list.find((v) => v.version === versionNumber);

      if (!target) return state;

      // Manteniamo solo le versioni fino a quella scelta
      const updated = list.filter((v) => v.version <= versionNumber);

      return {
        versions: {
          ...state.versions,
          [documentId]: updated,
        },
      };
    }),
}));

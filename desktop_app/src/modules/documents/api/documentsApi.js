/**
 * documentsApi.js
 *
 * API layer del modulo Documenti.
 * Versione ENTERPRISE-READY con mock locale.
 *
 * In FASE 9 sostituiremo:
 * - uploadFile → Supabase Storage
 * - listFiles → Supabase DB
 * - listFolders → Supabase DB
 * - deleteFile → Supabase Storage + DB
 * - createFolder → Supabase DB
 *
 * Tutte le funzioni ritornano Promise per compatibilità futura.
 */

export const documentsApi = {
  /* -----------------------------------------
     LISTA CARTELLE
  ------------------------------------------ */
  listFolders: async () => {
    // MOCK — in futuro: SELECT * FROM folders
    return [
      { path: "/", name: "Documenti", parent: null },
      { path: "/hse", name: "HSE", parent: "/" },
      { path: "/drawings", name: "Disegni", parent: "/" },
      { path: "/reports", name: "Rapporti", parent: "/" },
      { path: "/sds", name: "SDS", parent: "/hse" },
    ];
  },

  /* -----------------------------------------
     LISTA FILE PER CARTELLA
  ------------------------------------------ */
  listFiles: async (folderPath) => {
    // MOCK — in futuro: SELECT * FROM files WHERE folder = folderPath
    return [];
  },

  /* -----------------------------------------
     UPLOAD FILE
  ------------------------------------------ */
  uploadFile: async (folderPath, file) => {
    // MOCK — in futuro: upload su Supabase Storage
    const fakeUrl = URL.createObjectURL(file);

    return {
      id: Date.now() + Math.random(),
      name: file.name,
      url: fakeUrl,
      folder: folderPath,
      updatedAt: new Date().toISOString(),
      author: "User",
    };
  },

  /* -----------------------------------------
     ELIMINA FILE
  ------------------------------------------ */
  deleteFile: async (fileId) => {
    // MOCK — in futuro: delete su Supabase Storage + DB
    return { success: true };
  },

  /* -----------------------------------------
     CREA CARTELLA
  ------------------------------------------ */
  createFolder: async (parentPath, name) => {
    // MOCK — in futuro: INSERT INTO folders
    const newPath = `${parentPath}/${name}`
      .replace("//", "/")
      .toLowerCase();

    return {
      path: newPath,
      name,
      parent: parentPath,
    };
  },

  /* -----------------------------------------
     DETTAGLIO FILE
  ------------------------------------------ */
  getFileById: async (id) => {
    // MOCK — in futuro: SELECT * FROM files WHERE id = ?
    return null;
  },
};

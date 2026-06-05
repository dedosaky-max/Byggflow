import { create } from "zustand";

import {
  getDocuments,
  uploadDocument,
  createFolder as apiCreateFolder,
  deleteDocument,
} from "@modules/documents/api/documentsApi";

import { createTowerFolderStructure } from "@modules/documents/utils/createTowerFolderStructure";
import { createTowerStructure } from "@modules/documents/utils/createTowerStructure";
import { getHseFolderPath } from "@modules/documents/utils/getHseFolderPath";
import { getPhotoFolderPath } from "@modules/documents/utils/getPhotoFolderPath";

/**
 * documentsStore.js
 *
 * Gestisce:
 * - struttura cartelle torre
 * - lista documenti
 * - caricamento file
 * - creazione cartelle
 * - selezione cartella
 * - integrazione con HSE e Photos
 */

export const useDocumentsStore = create((set, get) => ({
  /* -----------------------------------------
     STATO
  ------------------------------------------ */

  folders: [],
  files: [],
  selectedFolder: null,
  towerId: null,

  loading: false,
  error: null,

  /* -----------------------------------------
     INIZIALIZZAZIONE TORRE
  ------------------------------------------ */

  initTower: (towerId) => {
    const structure = createTowerStructure(towerId);
    const folderStructure = createTowerFolderStructure(towerId);

    set({
      towerId,
      folders: folderStructure.map((path) => ({ id: path, name: path.split("/").pop(), path })),
    });

    return structure;
  },

  /* -----------------------------------------
     CARICAMENTO DOCUMENTI
  ------------------------------------------ */

  loadFolder: async (folder) => {
    set({ loading: true, error: null });

    try {
      const files = await getDocuments(folder.path);

      set({
        selectedFolder: folder,
        files,
        loading: false,
      });
    } catch (err) {
      set({ error: "Errore nel caricamento documenti", loading: false });
    }
  },

  /* -----------------------------------------
     UPLOAD DOCUMENTO
  ------------------------------------------ */

  uploadFile: async (file) => {
    const folder = get().selectedFolder;
    if (!folder) return;

    set({ loading: true, error: null });

    try {
      await uploadDocument(file, folder.path);
      await get().loadFolder(folder);
    } catch (err) {
      set({ error: "Errore nel caricamento file", loading: false });
    }
  },

  /* -----------------------------------------
     CREAZIONE CARTELLA
  ------------------------------------------ */

  createFolder: async (name) => {
    const folder = get().selectedFolder;
    if (!folder) return;

    set({ loading: true, error: null });

    try {
      const newPath = `${folder.path}/${name}`;
      await apiCreateFolder(newPath);

      set((state) => ({
        folders: [...state.folders, { id: newPath, name, path: newPath }],
        loading: false,
      }));
    } catch (err) {
      set({ error: "Errore nella creazione cartella", loading: false });
    }
  },

  /* -----------------------------------------
     CANCELLAZIONE DOCUMENTO
  ------------------------------------------ */

  deleteFile: async (file) => {
    const folder = get().selectedFolder;
    if (!folder) return;

    set({ loading: true, error: null });

    try {
      await deleteDocument(file.id);
      await get().loadFolder(folder);
    } catch (err) {
      set({ error: "Errore nella cancellazione file", loading: false });
    }
  },

  /* -----------------------------------------
     PERCORSI SPECIALI (HSE / PHOTOS)
  ------------------------------------------ */

  getHsePath: () => {
    const towerId = get().towerId;
    return towerId ? getHseFolderPath(towerId) : null;
  },

  getPhotoPath: () => {
    const towerId = get().towerId;
    return towerId ? getPhotoFolderPath(towerId) : null;
  },
}));

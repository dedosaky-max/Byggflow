import { create } from "zustand";
import { documentApi } from "../api/documentApi";

/**
 * documentStore.js
 *
 * Gestisce:
 * - lista documenti
 * - dettaglio documento
 * - upload documento
 * - versioning
 * - workflow stato
 * - allegati
 */

export const useDocumentStore = create((set, get) => ({
  /* -----------------------------------------
     STATO
  ------------------------------------------ */

  documents: [],
  selectedDocument: null,

  loading: false,
  error: null,

  /* -----------------------------------------
     LOAD LIST
  ------------------------------------------ */

  loadDocuments: async () => {
    set({ loading: true, error: null });
    try {
      const data = await documentApi.getDocuments();
      set({ documents: data, loading: false });
    } catch (err) {
      set({ error: "Errore nel caricamento documenti", loading: false });
    }
  },

  /* -----------------------------------------
     LOAD DETAIL
  ------------------------------------------ */

  loadDocument: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await documentApi.getDocument(id);
      set({ selectedDocument: data, loading: false });
    } catch (err) {
      set({ error: "Errore nel caricamento documento", loading: false });
    }
  },

  /* -----------------------------------------
     UPLOAD DOCUMENT
  ------------------------------------------ */

  uploadDocument: async (docData, file) => {
    set({ loading: true, error: null });
    try {
      const created = await documentApi.uploadDocument(docData, file);

      set((state) => ({
        documents: [...state.documents, created],
        loading: false,
      }));

      return created;
    } catch (err) {
      set({ error: "Errore nel caricamento documento", loading: false });
      return null;
    }
  },

  /* -----------------------------------------
     CHANGE STATUS
  ------------------------------------------ */

  changeDocumentStatus: async (id, newStatus) => {
    set({ loading: true, error: null });
    try {
      const updated = await documentApi.changeStatus(id, newStatus);

      set((state) => ({
        documents: state.documents.map((d) =>
          d.id === id ? updated : d
        ),
        selectedDocument:
          state.selectedDocument?.id === id
            ? updated
            : state.selectedDocument,
        loading: false,
      }));

      return updated;
    } catch (err) {
      set({ error: "Errore nel cambio stato documento", loading: false });
      return null;
    }
  },

  /* -----------------------------------------
     ADD VERSION
  ------------------------------------------ */

  addVersion: async (id, file, changes) => {
    set({ loading: true, error: null });
    try {
      const updated = await documentApi.addVersion(id, file, changes);

      set((state) => ({
        selectedDocument: updated,
        documents: state.documents.map((d) =>
          d.id === id ? updated : d
        ),
        loading: false,
      }));

      return updated;
    } catch (err) {
      set({ error: "Errore nell'aggiunta versione", loading: false });
      return null;
    }
  },

  /* -----------------------------------------
     UPLOAD ATTACHMENT
  ------------------------------------------ */

  uploadAttachment: async (docId, file) => {
    set({ loading: true, error: null });
    try {
      const attachment = await documentApi.uploadAttachment(docId, file);

      set((state) => ({
        selectedDocument: {
          ...state.selectedDocument,
          attachments: [
            ...(state.selectedDocument?.attachments || []),
            attachment,
          ],
        },
        loading: false,
      }));

      return attachment;
    } catch (err) {
      set({ error: "Errore nel caricamento allegato", loading: false });
      return null;
    }
  },
}));

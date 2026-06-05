/**
 * documentApi.js
 *
 * API layer per la gestione dei Documenti.
 * Versione ENTERPRISE-READY con mock locale.
 *
 * In FASE 9 sostituiremo:
 * - getDocuments → Supabase /documents
 * - getDocument → Supabase /documents/{id}
 * - uploadDocument → Supabase Storage + insert metadata
 * - addVersion → Supabase Storage + version table
 * - changeStatus → Supabase RPC
 * - uploadAttachment → Supabase Storage
 */

export const documentApi = {
  /* -----------------------------------------
     LISTA DOCUMENTI
  ------------------------------------------ */

  getDocuments: async () => {
    // MOCK — in futuro: SELECT * FROM documents
    return [
      {
        id: 1,
        title: "Piano di Sicurezza",
        category: "HSE",
        version: 3,
        status: "approved",
        createdBy: "Mendes",
        createdAt: "2026-05-01T10:00:00Z",
        updatedAt: "2026-05-10T14:00:00Z",
        expiresAt: "2026-12-31T23:59:59Z",
        fileUrl: "/mock/piano_sicurezza_v3.pdf",
        attachments: [],
        history: [
          { version: 1, date: "2026-05-01", user: "Mendes", changes: "Creazione documento" },
          { version: 2, date: "2026-05-05", user: "Larsen", changes: "Aggiornamento DPI" },
          { version: 3, date: "2026-05-10", user: "Mendes", changes: "Revisione finale" },
        ],
      },
      {
        id: 2,
        title: "Disegno Strutturale A12",
        category: "Drawings",
        version: 1,
        status: "draft",
        createdBy: "Larsen",
        createdAt: "2026-05-12T09:00:00Z",
        updatedAt: "2026-05-12T09:00:00Z",
        expiresAt: null,
        fileUrl: "/mock/drawing_a12_v1.pdf",
        attachments: [],
        history: [
          { version: 1, date: "2026-05-12", user: "Larsen", changes: "Caricamento iniziale" },
        ],
      },
    ];
  },

  /* -----------------------------------------
     DETTAGLIO DOCUMENTO
  ------------------------------------------ */

  getDocument: async (id) => {
    // MOCK — in futuro: SELECT * FROM documents WHERE id = {id}
    return {
      id,
      title: "Piano di Sicurezza",
      category: "HSE",
      version: 3,
      status: "approved",
      createdBy: "Mendes",
      createdAt: "2026-05-01T10:00:00Z",
      updatedAt: "2026-05-10T14:00:00Z",
      expiresAt: "2026-12-31T23:59:59Z",
      fileUrl: "/mock/piano_sicurezza_v3.pdf",
      attachments: [
        {
          id: 101,
          name: "foto_area_1.jpg",
          url: "/mock/foto_area_1.jpg",
          uploadedAt: "2026-05-10T12:00:00Z",
        },
      ],
      history: [
        { version: 1, date: "2026-05-01", user: "Mendes", changes: "Creazione documento" },
        { version: 2, date: "2026-05-05", user: "Larsen", changes: "Aggiornamento DPI" },
        { version: 3, date: "2026-05-10", user: "Mendes", changes: "Revisione finale" },
      ],
    };
  },

  /* -----------------------------------------
     UPLOAD DOCUMENTO (NUOVA VERSIONE 1)
  ------------------------------------------ */

  uploadDocument: async (docData, file) => {
    // MOCK — in futuro:
    // 1. upload file → Supabase Storage
    // 2. insert metadata → Supabase table "documents"

    const fakeUrl = URL.createObjectURL(file);

    return {
      id: Date.now(),
      ...docData,
      version: 1,
      status: "draft",
      createdBy: docData.createdBy || "Mendes",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      fileUrl: fakeUrl,
      attachments: [],
      history: [
        {
          version: 1,
          date: new Date().toISOString(),
          user: docData.createdBy || "Mendes",
          changes: "Creazione documento",
        },
      ],
    };
  },

  /* -----------------------------------------
     CAMBIO STATO DOCUMENTO
  ------------------------------------------ */

  changeStatus: async (id, newStatus) => {
    // MOCK — in futuro: UPDATE documents SET status = {newStatus}
    return {
      id,
      status: newStatus,
    };
  },

  /* -----------------------------------------
     AGGIUNTA VERSIONE
  ------------------------------------------ */

  addVersion: async (id, file, changes) => {
    // MOCK — in futuro:
    // 1. upload file → Supabase Storage
    // 2. insert version row → Supabase table "document_versions"
    // 3. update main document version

    const fakeUrl = URL.createObjectURL(file);

    return {
      id,
      title: "Piano di Sicurezza",
      category: "HSE",
      version: 4,
      status: "under_review",
      createdBy: "Mendes",
      createdAt: "2026-05-01T10:00:00Z",
      updatedAt: new Date().toISOString(),
      expiresAt: "2026-12-31T23:59:59Z",
      fileUrl: fakeUrl,
      attachments: [],
      history: [
        { version: 1, date: "2026-05-01", user: "Mendes", changes: "Creazione documento" },
        { version: 2, date: "2026-05-05", user: "Larsen", changes: "Aggiornamento DPI" },
        { version: 3, date: "2026-05-10", user: "Mendes", changes: "Revisione finale" },
        {
          version: 4,
          date: new Date().toISOString(),
          user: "Mendes",
          changes: changes || "Nuova versione caricata",
        },
      ],
    };
  },

  /* -----------------------------------------
     UPLOAD ALLEGATO
  ------------------------------------------ */

  uploadAttachment: async (docId, file) => {
    // MOCK — in futuro: upload → Supabase Storage
    const fakeUrl = URL.createObjectURL(file);

    return {
      id: Date.now(),
      documentId: docId,
      name: file.name,
      url: fakeUrl,
      uploadedAt: new Date().toISOString(),
    };
  },
};

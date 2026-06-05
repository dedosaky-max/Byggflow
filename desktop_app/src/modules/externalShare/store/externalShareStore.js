import { create } from "zustand";
import {
  getSharedFolders,
  createShareLink,
  getShareLinks,
} from "@modules/externalShare/api/externalShareApi";

export const useExternalShareStore = create((set, get) => ({
  folders: [],
  links: [],
  selectedFolder: null,
  loading: false,

  loadFolders: async (projectId) => {
    set({ loading: true });
    const { data } = await getSharedFolders(projectId);
    set({ folders: data || [], loading: false });
  },

  loadLinks: async (projectId) => {
    const { data } = await getShareLinks(projectId);
    set({ links: data || [] });
  },

  selectFolder: (folder) => set({ selectedFolder: folder }),

  generateLink: async ({ projectId, folderPath, expiresIn, allowDownload }) => {
    const payload = {
      project_id: projectId,
      folder_path: folderPath,
      expires_in_days: expiresIn,
      allow_download: allowDownload,
      created_at: new Date().toISOString(),
    };

    const { data } = await createShareLink(payload);

    if (data) {
      set((state) => ({ links: [...state.links, data[0]] }));
    }
  },
}));

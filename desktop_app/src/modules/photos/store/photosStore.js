import { create } from "zustand";
import { useDocumentsStore } from "../../documents/store/documentsStore";
import { getPhotoFolderPath } from "../../documents/utils/getPhotoFolderPath";

export const usePhotosStore = create((set, get) => ({
  photos: [],

  loadPhotos: (projectId, towerId) => {
    const files = useDocumentsStore.getState().files;
    const folderPictures = getPhotoFolderPath(projectId, towerId, false);
    const folderHsePhotos = getPhotoFolderPath(projectId, towerId, true);

    const filtered = files.filter(
      (f) =>
        f.folderPath === folderPictures ||
        f.folderPath === folderHsePhotos
    );

    set({ photos: filtered });
  },

  uploadPhoto: (file, projectId, towerId, isHse = false) => {
    const folderPath = getPhotoFolderPath(projectId, towerId, isHse);
    const addFileToFolder = useDocumentsStore.getState().addFileToFolder;

    addFileToFolder(folderPath, file, projectId, towerId);

    set((state) => ({
      photos: [
        ...state.photos,
        {
          id: crypto.randomUUID(),
          name: file.name,
          url: URL.createObjectURL(file),
          folderPath,
          projectId,
          towerId,
          uploadedAt: new Date().toISOString(),
        },
      ],
    }));
  },
}));

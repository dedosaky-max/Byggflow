import React, { useEffect } from "react";
import { usePhotosStore } from "../../../photos/store/photosStore";
import PhotoUploader from "../../../photos/components/PhotoUploader";
import PhotoGallery from "../../../photos/components/PhotoGallery";

export default function PhotosTab({ projectId }) {
  const towerId = "S-014"; // TODO: selezione Tower reale
  const { photos, loadPhotos, uploadPhoto } = usePhotosStore();

  useEffect(() => {
    loadPhotos(projectId, towerId);
  }, [projectId, towerId]);

  const handleUpload = (file) => {
    uploadPhoto(file, projectId, towerId, false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Photos</h2>

      <PhotoUploader onUpload={handleUpload} />

      <PhotoGallery photos={photos} />
    </div>
  );
}

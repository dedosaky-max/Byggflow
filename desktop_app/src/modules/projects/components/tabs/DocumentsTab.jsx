import React, { useEffect, useState } from "react";
import FolderTree from "../../../documents/components/FolderTree";
import FileList from "../../../documents/components/FileList";
import Toolbar from "../../../documents/components/Toolbar";
import UploadModal from "../../../documents/components/UploadModal";
import NewFolderModal from "../../../documents/components/NewFolderModal";
import { useDocumentsStore } from "../../../documents/store/documentsStore";

export default function DocumentsTab({ projectId }) {
  const {
    folders,
    currentFolderId,
    setCurrentFolder,
    addFolder,
    addFile,
  } = useDocumentsStore();

  const [uploadOpen, setUploadOpen] = useState(false);
  const [newFolderOpen, setNewFolderOpen] = useState(false);

  // Select project root folder when entering tab
  useEffect(() => {
    const root = folders.find(
      (f) => f.projectId === projectId && f.parentId === null
    );

    if (root) {
      setCurrentFolder(root.id);
    }
  }, [projectId, folders]);

  const handleUpload = (files) => {
    files.forEach((file) => addFile(currentFolderId, file, projectId));
    setUploadOpen(false);
  };

  const handleCreateFolder = (name) => {
    addFolder(currentFolderId, name, projectId);
    setNewFolderOpen(false);
  };

  return (
    <div className="h-full flex gap-4">

      {/* Sidebar folders */}
      <div className="w-64 bg-white border rounded p-2 flex flex-col">
        <div className="font-semibold text-sm mb-2">Folders</div>
        <div className="flex-1 overflow-auto">
          <FolderTree />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-white border rounded p-3 flex flex-col">
        <Toolbar
          onUpload={() => setUploadOpen(true)}
          onNewFolder={() => setNewFolderOpen(true)}
        />

        <div className="flex-1 overflow-auto">
          <FileList />
        </div>
      </div>

      {/* Modals */}
      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUpload={handleUpload}
      />

      <NewFolderModal
        open={newFolderOpen}
        onClose={() => setNewFolderOpen(false)}
        onCreate={handleCreateFolder}
      />
    </div>
  );
}

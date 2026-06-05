import { useEffect, useState } from "react";

import Layout from "@layout/Layout";
import PageTemplate from "@components/PageTemplate";

import Toolbar from "@modules/documents/components/Toolbar";
import FolderTree from "@modules/documents/components/FolderTree";
import FileList from "@modules/documents/components/FileList";
import UploadModal from "@modules/documents/components/UploadModal";
import NewFolderModal from "@modules/documents/components/NewFolderModal";

import { useDocumentsStore } from "@modules/documents/store/documentsStore";

export default function DocumentsPage() {
  const {
    folders,
    files,
    selectedFolder,
    loadFolder,
    uploadFile,
    createFolder,
    initTower,
    loading,
  } = useDocumentsStore();

  // Stato modali
  const [uploadOpen, setUploadOpen] = useState(false);
  const [newFolderOpen, setNewFolderOpen] = useState(false);

  // Inizializzazione torre (esempio)
  useEffect(() => {
    initTower("TWR-001");
  }, [initTower]);

  return (
    <Layout>
      <PageTemplate title="Documenti">
        {/* Toolbar */}
        <Toolbar
          onUpload={() => setUploadOpen(true)}
          onNewFolder={() => setNewFolderOpen(true)}
        />

        {/* Layout a 2 colonne */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          {/* Colonna sinistra: struttura cartelle */}
          <div className="col-span-1">
            <FolderTree
              folders={folders}
              onSelect={(folder) => loadFolder(folder)}
            />
          </div>

          {/* Colonna destra: lista file */}
          <div className="col-span-3">
            {loading && (
              <p className="text-gray-500 mb-2">Caricamento in corso…</p>
            )}

            <FileList
              files={files}
              onOpen={(file) => console.log("Apertura file:", file)}
            />
          </div>
        </div>

        {/* Modale Upload */}
        <UploadModal
          open={uploadOpen}
          onClose={() => setUploadOpen(false)}
          onUpload={(file) => uploadFile(file)}
        />

        {/* Modale Nuova Cartella */}
        <NewFolderModal
          open={newFolderOpen}
          onClose={() => setNewFolderOpen(false)}
          onCreate={(name) => createFolder(name)}
        />
      </PageTemplate>
    </Layout>
  );
}

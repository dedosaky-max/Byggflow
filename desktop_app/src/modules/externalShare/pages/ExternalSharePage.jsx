import { useEffect } from "react";

import Layout from "@layout/Layout";
import PageTemplate from "@components/PageTemplate";

import ShareFolderSelector from "@modules/externalShare/components/ShareFolderSelector";
import ShareOptionsPanel from "@modules/externalShare/components/ShareOptionsPanel";
import ShareLinkTable from "@modules/externalShare/components/ShareLinkTable";

import { useExternalShareStore } from "@modules/externalShare/store/externalShareStore";

export default function ExternalSharePage() {
  const {
    folders,
    links,
    selectedFolder,
    loadFolders,
    loadLinks,
    selectFolder,
    generateLink,
  } = useExternalShareStore();

  const projectId = "PRJ-001"; // da router o store globale

  useEffect(() => {
    loadFolders(projectId);
    loadLinks(projectId);
  }, []);

  return (
    <Layout>
      <PageTemplate title="Condivisione Esterna">
        <div className="grid grid-cols-4 gap-4 mt-4">
          {/* Colonna sinistra: cartelle */}
          <div className="col-span-1">
            <ShareFolderSelector
              folders={folders}
              onSelect={selectFolder}
            />
          </div>

          {/* Colonna centrale: opzioni */}
          <div className="col-span-1">
            {selectedFolder && (
              <ShareOptionsPanel
                onGenerate={({ expiresIn, allowDownload }) =>
                  generateLink({
                    projectId,
                    folderPath: selectedFolder.path,
                    expiresIn,
                    allowDownload,
                  })
                }
              />
            )}
          </div>

          {/* Colonna destra: link generati */}
          <div className="col-span-2">
            <ShareLinkTable links={links} />
          </div>
        </div>
      </PageTemplate>
    </Layout>
  );
}

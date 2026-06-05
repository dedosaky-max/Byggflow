export default function FileList({ files, onOpen }) {
  return (
    <div className="space-y-2">
      {files.length === 0 && (
        <p className="text-gray-500">Nessun file presente.</p>
      )}

      {files.map((file) => (
        <div
          key={file.id}
          className="p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition"
          onClick={() => onOpen(file)}
        >
          <div className="font-medium">{file.name}</div>
          <div className="text-sm text-gray-500">
            {file.type} • {file.updated_at}
          </div>
        </div>
      ))}
    </div>
  );
}

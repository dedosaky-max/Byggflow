export default function ShareFolderSelector({ folders, onSelect }) {
  return (
    <div className="space-y-1">
      {folders.map((folder) => (
        <div
          key={folder.id}
          className="p-2 rounded cursor-pointer hover:bg-gray-100"
          onClick={() => onSelect(folder)}
        >
          {folder.name}
        </div>
      ))}
    </div>
  );
}

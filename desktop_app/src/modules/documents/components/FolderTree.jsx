export default function FolderTree({ folders, onSelect }) {
  return (
    <div className="space-y-1">
      {folders.map((folder) => (
        <div
          key={folder.id}
          className="p-2 rounded cursor-pointer hover:bg-gray-100 transition"
          onClick={() => onSelect(folder)}
        >
          <span className="font-medium">{folder.name}</span>
        </div>
      ))}
    </div>
  );
}

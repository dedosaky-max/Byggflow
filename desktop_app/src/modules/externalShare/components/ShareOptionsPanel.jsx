import Button from "@ui/Button";
import Input from "@ui/Input";
import { useState } from "react";

export default function ShareOptionsPanel({ onGenerate }) {
  const [expiresIn, setExpiresIn] = useState(7);
  const [allowDownload, setAllowDownload] = useState(true);

  return (
    <div className="p-4 border rounded-md space-y-3">
      <div>
        <label className="text-sm font-medium">Scadenza (giorni)</label>
        <Input
          type="number"
          value={expiresIn}
          onChange={(e) => setExpiresIn(Number(e.target.value))}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={allowDownload}
          onChange={(e) => setAllowDownload(e.target.checked)}
        />
        <span>Permetti download</span>
      </div>

      <Button onClick={() => onGenerate({ expiresIn, allowDownload })}>
        Genera link
      </Button>
    </div>
  );
}

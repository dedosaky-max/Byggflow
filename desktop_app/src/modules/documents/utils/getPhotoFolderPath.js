/**
 * Restituisce il percorso della cartella foto per una torre.
 *
 * @param {string} towerId - ID della torre
 * @returns {string} - Percorso cartella foto
 */
export function getPhotoFolderPath(towerId) {
  if (!towerId) throw new Error("towerId is required");

  return `towers/${towerId}/documents/photos`;
}

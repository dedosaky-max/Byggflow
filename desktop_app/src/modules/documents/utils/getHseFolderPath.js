/**
 * Restituisce il percorso della cartella HSE per una torre.
 *
 * @param {string} towerId - ID della torre
 * @returns {string} - Percorso cartella HSE
 */
export function getHseFolderPath(towerId) {
  if (!towerId) throw new Error("towerId is required");

  return `towers/${towerId}/documents/hse`;
}

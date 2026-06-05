/**
 * Genera la struttura delle cartelle per un nuovo tower.
 * Usato quando si crea un nuovo progetto o una nuova torre.
 *
 * @param {string} towerId - ID della torre
 * @returns {Array<string>} - Lista dei percorsi cartella da creare
 */
export function createTowerFolderStructure(towerId) {
  if (!towerId) throw new Error("towerId is required");

  return [
    `towers/${towerId}/documents`,
    `towers/${towerId}/documents/hse`,
    `towers/${towerId}/documents/photos`,
    `towers/${towerId}/documents/reports`,
    `towers/${towerId}/documents/logistics`,
  ];
}

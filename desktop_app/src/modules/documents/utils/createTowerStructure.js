/**
 * Genera la struttura base di una torre.
 * Usato per inizializzare un nuovo tower nel sistema documentale.
 *
 * @param {string} towerId - ID della torre
 * @returns {Object} - Struttura iniziale della torre
 */
export function createTowerStructure(towerId) {
  if (!towerId) throw new Error("towerId is required");

  return {
    id: towerId,
    root: `towers/${towerId}`,
    documents: `towers/${towerId}/documents`,
    createdAt: new Date().toISOString(),
  };
}

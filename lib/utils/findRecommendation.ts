import { RECOMMENDED_LIBRARIES } from '../constants/recommended-libraries';

import { KNOWN_LIBRARIES, REMAPPINGS } from '@/lib/constants/known-libraries';
import { RecommendedContract, RecommendedLibrary } from '@/lib/types/library';

/**
 * Find a recommended contract, as part of a library, for a given import line,
 * by reading the whole library at that import.
 */
export const findRecommendation_libraryToLibrary = (line: string): RecommendedContract | null => {
  // For all known libraries
  for (const [library, prefixes] of Object.entries(KNOWN_LIBRARIES)) {
    // If the import line contains a known prefix (associated with a recommendation)
    if (prefixes.some((prefix) => line.includes(prefix))) {
      // Get all its contracts
      const libraryContracts = RECOMMENDED_LIBRARIES[library as RecommendedLibrary];
      console.log(RECOMMENDED_LIBRARIES);

      // Find the contract matching the import
      const findName = line.match(/\/([^/]+)\.sol/);
      let contractName = findName ? findName[1] : null;

      // Check if there is a remapping to be done (e.g. Multicall => Multicaller)
      if (contractName && REMAPPINGS[contractName]) {
        contractName = REMAPPINGS[contractName];
        libraryContracts;
      }

      // If we got a name, and a matching contract
      if (contractName && libraryContracts.some((contract) => contract.name === contractName)) {
        // Return the recommended alternative if it exists
        return libraryContracts.find((contract) => contract.name === contractName) || null;
      }
    }
  }

  return null;
};

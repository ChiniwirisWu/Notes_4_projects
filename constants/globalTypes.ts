import { Key } from "./listItem"
import { Item } from "./listItem"

export type ItemInfo = {
  key: Key,
  title: string,
  description: string,
  functionalRequirements: Item[], // JSON
  nonFunctionalRequirements: Item[], // JSON
  votation: (1 | 2 | 3| 4| 5);
};

export type ItemInfoWithJSON = {
  key: Key,
  title: string,
  description: string,
  functionalRequirements: string, // JSON
  nonFunctionalRequirements: string, // JSON
  votation: (1 | 2 | 3| 4| 5);
};

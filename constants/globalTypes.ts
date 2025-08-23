import { Key } from "./listItem"
import { Item } from "./listItem"

export type ItemInfo = {
  key?: Key,
  title: string,
  description: string,
  functionalRequirements: Item[], // JSON
  nonFunctionalRequirements: Item[], // JSON
  score: number 
};

export type ItemInfoWithJSON = {
  key?: Key,
  title: string,
  description: string,
  functionalRequirements: string, // JSON
  nonFunctionalRequirements: string, // JSON
  score:  number;
};

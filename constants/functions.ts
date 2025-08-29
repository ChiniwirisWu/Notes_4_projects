import { Levels, Key } from "@/constants/types";
import { HASH_LENGTH } from "./default";
import { NoteInfo } from "@/constants/types";
import { defaultValues } from "./default";

export function generateKey(id:number, alias:string) : Key{
  const hash:string = Math.random().toString(36).substring(2, 2 + HASH_LENGTH); 
  return `${alias}-${hash}-${id}`;
}

export function generateRandomInteger(){
  const MIN_VALUE = 1;
  const MAX_VALUE = 100000;
  return Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE)) + MIN_VALUE;
}

export function getLevelFromNumber (x:number) : Levels{
  switch(x){
    case 1: return Levels.common;
    case 2: return Levels.uncommon;
    case 3: return Levels.rare;
    case 4: return Levels.epic;
    case 5: return Levels.legendary;
    default: return Levels.common;
  }
};


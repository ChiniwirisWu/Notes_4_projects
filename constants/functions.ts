import { type SQLiteDatabase } from "expo-sqlite";
import { Levels, Key } from "@/constants/types";
import { getMessage, MessageType } from "./messages";

export function generateKey(id:number, hashLength:number, alias:string) : Key{
  const hash:string = Math.random().toString(36).substring(2, 2 + hashLength); 
  return `${alias}-${hash}-${id}`;
}

export function generateRandomInteger(){
  const MIN_VALUE = 1;
  const MAX_VALUE = 100000;
  return Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE)) + MIN_VALUE;
}

type TryConnectDBParams = {
  db:(SQLiteDatabase | null), 
  setIsDBReady:(isReady:boolean)=>void
  isDBReady:boolean
};

export function tryConnectDB({db, setIsDBReady, isDBReady}: TryConnectDBParams) : boolean{
  if(!db){
    console.warn(getMessage(MessageType.DATABASE_NOT_LOADED));
    if(isDBReady == false) return false; // if it is already false, do nothing.
    setIsDBReady(false);
    return false;
  } else {
    if(isDBReady == true) return true; // if it is already true, do nothing.
    setIsDBReady(true);
    return true;
  }
};

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


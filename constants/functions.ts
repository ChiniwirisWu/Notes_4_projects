import { type SQLiteDatabase } from "expo-sqlite";
import { useDatabase } from "@/components/Shared/DatabaseProvider";
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

// Assumes that the DB will connect eventualy.
export function tryConnectDB() : SQLiteDatabase | false{
  const db = useDatabase();

  let isConnected = false;

  while(!isConnected){
    if(db){
      return db;
    }
  };

  return false; // it returns false because I don't know how to avoid this statement yet.
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


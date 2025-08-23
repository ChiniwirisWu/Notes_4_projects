import { Key } from "./listItem";
import { type SQLiteDatabase } from "expo-sqlite";

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
    console.log("Database is still loading...");
    if(isDBReady == false) return false; // if it is already false, do nothing.
    setIsDBReady(false);
    return false;
  } else {
    if(isDBReady == true) return true; // if it is already true, do nothing.
    setIsDBReady(true);
    return true;
  }
};

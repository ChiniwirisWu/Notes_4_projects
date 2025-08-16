import { Key } from "./listItem";
import { type SQLiteDatabase } from "expo-sqlite";

export function generateKey(id:number, hashLength:number, alias:string) : Key{
  console.log(id);
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
};

export function tryConnectDB({db, setIsDBReady}: TryConnectDBParams) : boolean{
  if(!db){
    console.log("Database is still loading...");
    setIsDBReady(false);
    return false;
  } else {
    setIsDBReady(true);
    return true;
  }
};

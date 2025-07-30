import { Key } from "./listItem";

export function generateKey(id:number, hashLength:number, alias:string) : Key{
  console.log(id);
  const hash:string = Math.random().toString(36).substring(2, 2 + hashLength); 
  return `${alias}-${hash}-${id}`;
}

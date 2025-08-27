import { SQLiteDatabase } from "expo-sqlite";
import { Key } from "@/constants/types";

type UpdateFieldsInDBType = {
  db: SQLiteDatabase,
  fields: {
    title:string, 
    description:string,
    score:number,
    key: Key
  };
};

export class DetailsPageController {
  static updateFieldsInDB = async ({db, fields} : UpdateFieldsInDBType) : Promise<boolean>=>{
  const { title, description, score, key } = fields;

  try {
    const statement = await db.prepareAsync("UPDATE note SET title=$title, description=$description, score=$score WHERE key=$key");
    await statement.executeAsync({$title:title, $description:description, $score:score, $key:key});
    return true;

  } catch (e){
    console.error(e);
    return false;
  }
}
};

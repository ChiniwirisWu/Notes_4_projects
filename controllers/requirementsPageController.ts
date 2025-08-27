import { SQLiteDatabase } from "expo-sqlite";
import { NoteTask } from "@/constants/types";
import { Key } from "@/constants/types";

type SaveRequirementsType = {
  db: SQLiteDatabase,
  params: {
    key: Key,
    functionalRequirements: NoteTask[],
    nonFunctionalRequirements: NoteTask[],
  }
};

export class RequirementsPageController {
  static saveRequirements = async ({db, params} : SaveRequirementsType) : Promise<boolean> =>{
    const { key, functionalRequirements, nonFunctionalRequirements } = params;
    try {
      const sql = `
        UPDATE note SET 
        functionalRequirements = $functionalRequirements, 
        nonFunctionalRequirements = $nonFunctionalRequirements
        WHERE key = $key;
      `;
      const result = await db.runAsync(sql, {
        $functionalRequirements: JSON.stringify(functionalRequirements), 
        $nonFunctionalRequirements: JSON.stringify(nonFunctionalRequirements),
        $key: key
      });
      return true;
    } catch (e){
      console.error(e);
      return false;
    }
  };
};

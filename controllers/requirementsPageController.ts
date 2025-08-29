import { SQLiteDatabase } from "expo-sqlite";
import { getMessage, MessageType } from "@/constants/messages";
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

type DestroyNoteType = {
  db: SQLiteDatabase,
  key: Key,
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
      console.log(getMessage(MessageType.UPDATED));
      return true;
    } catch (e){
      console.error(getMessage(MessageType.QUERY_FAILED));
      console.error(e);
      return false;
    }
  };

  static destroyNote = async ({db, key} : DestroyNoteType)=>{
    try {
      await db.runAsync("DELETE FROM note WHERE key=$key", {$key: key});
      console.log(getMessage(MessageType.DELETED));
      return true;
    } catch (e){
      console.error(getMessage(MessageType.QUERY_FAILED));
      console.error(e);
      return false;
    }
  };
};














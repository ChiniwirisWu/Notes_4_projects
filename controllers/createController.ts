// the user passes the db to the methods to ensure that the db is not null
// I use the "WHERE id=1" because I will only have one row in the database.

import { SQLiteDatabase } from "expo-sqlite";
import { generateKey, generateRandomInteger } from "@/constants/functions";
import { NoteTask } from "@/constants/types";
import { defaultNoteValue } from "@/constants/default";

function showErrorMessage(errorMessage:any){
  console.error(`Error at settings.ts: ${errorMessage}`);
};

// This is made so the database is responsable on protecting itself.
type ItemInfoWithNull = {
  title: string | null | undefined,
  description: string | null | undefined,
  functionalRequirements: NoteTask[] | null | undefined, // JSON
  nonFunctionalRequirements: NoteTask[] | null | undefined, // JSON
  score: number | null | undefined 
};

export class CreateController{

  static async saveNewNoteIntoDB (db:SQLiteDatabase, newNoteInfo:ItemInfoWithNull) : Promise<boolean> {

    const {title, description,functionalRequirements, nonFunctionalRequirements, score} = newNoteInfo;

    try { 
      if(!db){
        console.error("La base de datos no ha sido inicializada todavia!");
        return false;
      }

      const functionalRequirementsJSON = JSON.stringify(functionalRequirements);
      const nonFunctionalRequirementsJSON = JSON.stringify(nonFunctionalRequirements);
      const hashLength = 10;
      const alias = "note4projects";

      const statement = await db.prepareAsync(`
      INSERT INTO note (key, title, description, score, functionalRequirements, nonFunctionalRequirements) 
      VALUES ($key, $title, $description, $score, $functionalRequirements, $nonFunctionalRequirements);
      `);

      await statement.executeAsync({
        $key: generateKey(generateRandomInteger(), hashLength, alias),
        $title: (title == "" || title == undefined) ? defaultNoteValue.title : title, 
        $description: (description == "" || description == undefined) ? defaultNoteValue.description : description, 
        $score: score ? score : 1, 
        $functionalRequirements: functionalRequirementsJSON ? functionalRequirements : JSON.stringify([]),
        $nonFunctionalRequirements : nonFunctionalRequirementsJSON ? nonFunctionalRequirements : JSON.stringify([])
      });

      // Show messages only if the note is saved.
      return true;
    } catch (e){
      console.error(e);
      return false;
    }
  };
};



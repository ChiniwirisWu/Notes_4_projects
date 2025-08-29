// the user passes the db to the methods to ensure that the db is not null
// I use the "WHERE id=1" because I will only have one row in the database.
import { SQLiteDatabase } from "expo-sqlite";
import { generateKey, generateRandomInteger } from "@/constants/functions";
import { defaultValues } from "@/constants/default";
import { NoteInfo } from "@/constants/types";

export class CreateController{

  static async saveNewNoteIntoDB (db:SQLiteDatabase, newNoteInfo:NoteInfo) : Promise<boolean> {

    const { title, description,functionalRequirements, nonFunctionalRequirements, score } = newNoteInfo;

    try { 
      if(!db){
        console.error("La base de datos no ha sido inicializada todavia!");
        return false;
      }
      const alias = "note4projects";
      const sql = `
        INSERT INTO note (key, title, description, score, functionalRequirements, nonFunctionalRequirements) 
        VALUES ($key, $title, $description, $score, $functionalRequirements, $nonFunctionalRequirements);
      `;

      const result = await db.runAsync(sql, {
        $key: generateKey(generateRandomInteger(), alias).toString(),
        $title: (title.trim() != "") ? title : defaultValues.title, 
        $description: (description.trim() != "") ? description : defaultValues.description, 
        $score: score ? score : 1, 
        $functionalRequirements: JSON.stringify(functionalRequirements),
        $nonFunctionalRequirements : JSON.stringify(nonFunctionalRequirements) 
      }
);


      // Show messages only if the note is saved.
      return true;
    } catch (e){
      console.error(e);
      return false;
    }
  };
};



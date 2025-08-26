import { SQLiteDatabase } from "expo-sqlite";
import { NoteInfoWithJSON } from "@/constants/types";
import { MessageType, getMessage } from "@/constants/messages";

export class NotesListController {

  static async fetchAllItems(db:SQLiteDatabase) : Promise<false | NoteInfoWithJSON[]>{

    const SECOND = 1000;
    const TIME_LIMIT = 10;

    // if it takes too long, the caller should re-excecute this method.
    setTimeout(()=>{
      return false;
    }, (SECOND * TIME_LIMIT) );

    try{
      const result = await db.getAllAsync<NoteInfoWithJSON>("SELECT * FROM note");
      console.log(getMessage(MessageType.QUERY_SUCCESS));
      return result;

    } catch (e){
      console.error(getMessage(MessageType.QUERY_FAILED));
      return false;
    }
  };

}


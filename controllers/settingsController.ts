// the user passes the db to the methods to ensure that the db is not null
// I use the "WHERE id=1" because I will only have one row in the database.

import { SQLiteDatabase } from "expo-sqlite";
import { MessageType, getMessage } from "@/constants/messages";
import { tryConnectDB } from "@/constants/functions";

type GetSettingsType = {
  title:string,
  musicOn:number,
  sfxOn:number
};

export class SettingsController{

  static async updateTitleInDB(db:SQLiteDatabase, newTitle:string) : Promise<boolean> {
    try{
      const statement = await db.prepareAsync("UPDATE settings SET title=$title WHERE id=1");
      await statement.executeAsync({$title:newTitle});

      console.log(getMessage(MessageType.QUERY_SUCCESS))
      return true;
    } catch (e){
      console.error(getMessage(MessageType.QUERY_FAILED));
      console.error(e);
      return false;
    }
  };

  static async updateMusicOn(db:SQLiteDatabase, musicOn:boolean) : Promise<boolean>{
    try{
      const statement = await db.prepareAsync("UPDATE settings SET musicOn=$musicOn WHERE id=1");
      await statement.executeAsync({$musicOn:musicOn});

      console.log(getMessage(MessageType.QUERY_SUCCESS))
      return true;
    } catch (e){
      console.error(getMessage(MessageType.QUERY_FAILED));
      console.error(e);
      return false;
    }
  };

  static async updateSfxOn(db:SQLiteDatabase, SfxOn:boolean) : Promise<boolean> {
    try{
      const statement = await db.prepareAsync("UPDATE settings SET SfxOn=$SfxOn WHERE id=1");
      await statement.executeAsync({$SfxOn:SfxOn});

      console.log(getMessage(MessageType.QUERY_SUCCESS))
      return true;
    } catch (e){
      console.error(getMessage(MessageType.QUERY_FAILED));
      console.error(e);
      return false;
    }
  };

  static async getSettings(db:SQLiteDatabase) : Promise<GetSettingsType>{
    try{
      const response = await db.getFirstAsync<GetSettingsType>("SELECT * FROM settings WHERE id=1");
      console.log(getMessage(MessageType.SETTINGS_LOADED));

      return (response) ? response : {title:"DefaultName", musicOn: 1, sfxOn: 1};
    } catch (e){
      console.error(getMessage(MessageType.QUERY_FAILED));
      console.error(e);
      return {title:"Error", musicOn: 1, sfxOn: 1};
    }
  };

  static async getTitleFromDB(db:SQLiteDatabase) : Promise<{title:string}>{
    try{
      const response = await db.getFirstAsync<{title:string}>("SELECT title FROM settings WHERE id=1");
      console.log(getMessage(MessageType.QUERY_SUCCESS))
      console.log(getMessage(MessageType.QUERY_SUCCESS))
      
      return (response) ? response : {title:"Error"};
    } catch (e){
      console.error(getMessage(MessageType.QUERY_FAILED));
      console.error(e);
      return {title:"Error"};
    }
  };

};



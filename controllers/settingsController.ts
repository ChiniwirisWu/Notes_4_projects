// the user passes the db to the methods to ensure that the db is not null
// I use the "WHERE id=1" because I will only have one row in the database.

import { SQLiteDatabase } from "expo-sqlite";

function showErrorMessage(errorMessage:any){
  console.error(`Error at settings.ts: ${errorMessage}`);
};

type GetSettingsType = {
  title:string,
  musicOn:number,
  sfxOn:number
};

export class SettingsController{

  static async updateTitle(db:SQLiteDatabase, newTitle:string){
    try{
      const statement = await db.prepareAsync("UPDATE settings SET title=$title WHERE id=1");
      await statement.executeAsync({$title:newTitle});
      console.log("Title changed successfully ✅");
    } catch (e){
      showErrorMessage(e);
    }
  };

  static async getSettings(db:SQLiteDatabase) : Promise<GetSettingsType>{
    try{
      const response = await db.getFirstAsync<GetSettingsType>("SELECT * FROM settings WHERE id=1");
      console.log("Settings fetched successfully ✅");
      console.log(response);
      return (response) ? response : {title:"DefaultName", musicOn: 1, sfxOn: 1};
    } catch (e){
      showErrorMessage(e);
      return {title:"Error", musicOn: 1, sfxOn: 1};
    }
  };

  static async getTitle(db:SQLiteDatabase) : Promise<{title:string}>{
    try{
      const response = await db.getFirstAsync<{title:string}>("SELECT title FROM settings WHERE id=1");
      console.log("Title fetched successfully ✅");
      console.log(response);
      return (response) ? response : {title:"Error"};
    } catch (e){
      showErrorMessage(e);
      return {title:"Error"};
    }
  };

};



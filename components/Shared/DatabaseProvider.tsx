import {
  useEffect,
  useState,
  useContext,
  createContext,
} from "react";
import { SQLiteDatabase, openDatabaseAsync } from "expo-sqlite";
import { MessageType, getMessage } from "@/constants/messages";

import LoadingScreen from "./LoadingScreen";

const DatabaseContext = createContext<SQLiteDatabase | null>(null);
export const useDatabase = ()=> useContext(DatabaseContext); // I am going to use this one inside the components.


export default function DatabaseProvider({children}:{children:any}){
  const [db, setDb] = useState<SQLiteDatabase | null>(null);

  useEffect(()=>{
    if(!db){
      setUpDatabase();
    } else {
      console.log(getMessage(MessageType.DATABASE_INITIALIZED));
    }
  }, [db]);

  const setUpDatabase = async ()=>{
    try{
      const database = await openDatabaseAsync("notes4projects");
      await database.execAsync(`

      CREATE TABLE IF NOT EXISTS settings(
        id INTEGER PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        musicOn INTEGER NOT NULL,
        sfxOn INTEGER NOT NULL
      );

      INSERT INTO settings (id, title, musicOn, sfxOn)
      SELECT 1, 'My Awesome App', 1, 1
      WHERE (SELECT COUNT(*) FROM settings) = 0;

      CREATE TABLE IF NOT EXISTS note(
        key VARCHAR(200) PRIMARY KEY,
        title VARCHAR(200) NOT NULL UNIQUE,
        description VARCHAR(1000) NOT NULL,
        score INTEGER NOT NULL,
        functionalRequirements VARCHAR(10000),
        nonFunctionalRequirements VARCHAR(10000)
      );
      `);
      setDb(database);

    } catch(e){
      console.error(e);
    }
  }

  if(db){
    return (
      <DatabaseContext.Provider value={db}>
        {children}
      </DatabaseContext.Provider>
    );
  } else {
    <LoadingScreen />
  }
  

}

import {
  useEffect,
  useState,
  useContext,
  createContext,
  useMemo
} from "react";
import {
  SQLiteDatabase,
  SQLiteProvider,
  openDatabaseAsync
} from "expo-sqlite";
import {
  ActivityIndicator,
  Text,
  View
} from "react-native"

const DatabaseContext = createContext<SQLiteDatabase | null>(null);

export const useDatabase = ()=> useContext(DatabaseContext); // I am going to use this one inside the components.


export default function DatabaseProvider({children}:{children:any}){
  const [db, setDb] = useState<SQLiteDatabase | null>(null);

  useEffect(()=>{
    if(!db){
      setUpDatabase();
    } else {
      console.log("Database initialized");
    }
  }, [db]);

  const setUpDatabase = async ()=>{
    try{
      const database = await openDatabaseAsync("notes4projects");
      await database.execAsync(`
      DROP TABLE IF EXISTS settings;

      CREATE TABLE IF NOT EXISTS settings(
        id INTEGER PRIMARY KEY,
        title VARCHAR (200) NOT NULL,
        musicOn INTEGER NOT NULL,
        sfxOn INTEGER NOT NULL
      );
      
      INSERT INTO settings (id, title, musicOn, sfxOn) VALUES (1, 'Crazy title', 1, 1);

      CREATE TABLE IF NOT EXISTS note(
        id INTEGER PRIMARY KEY,
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
  
  return (
    <DatabaseContext.Provider value={db}>
      {children}
    </DatabaseContext.Provider>
  );

}

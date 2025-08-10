import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SQLite from "expo-sqlite";
import { SQLiteProvider } from "expo-sqlite";

SplashScreen.preventAutoHideAsync();

const RootLayout = ()=>{
  let [fontsLoaded] = useFonts({
    VT323: require("../assets/fonts/VT323-Regular.ttf"),
  });

  useEffect(()=>{
    const setUp = async ()=>{
      try{
        
        console.log("Setting up Database");
        const db = await SQLite.openDatabaseAsync("notes4projects");
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS note(
          id INTEGER PRIMARY KEY,
          title VARCHAR(200) NOT NULL UNIQUE,
          description VARCHAR(1000) NOT NULL,
          votation INTEGER NOT NULL,
          functionalRequirements VARCHAR(10000),
          nonFunctionalRequirements VARCHAR(10000)
        );
        `);
        console.log("Database setted");

        //await db.execAsync(`DROP TABLE note`);

        // Retrieve all the rows from the database to check that it works fine.
        console.log("RootLayout setUp() all rows saved 🔒 in the Database: ");
        const result = await db.getAllAsync("SELECT * FROM note");
        console.log(result);

      } catch(e){
        console.error(e);
      }
    }

    setUp();

  }, []);

  if(fontsLoaded){
    SplashScreen.hideAsync();
  }

  return (
    <SQLiteProvider databaseName="notes4projects">
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown:false }} />
        </Stack>
      </GestureHandlerRootView>
    </SQLiteProvider>
  );

}

export default RootLayout;

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
      const db = await SQLite.openDatabaseAsync("notes4projects");
      await db.execAsync(`
      CREATE TABLE IF NOT EXISTS note(
        id VARCHAR(20) PRIMARY KEY,
        title VARCHAR(200) NOT NULL UNIQUE,
        description VARCHAR(1000) NOT NULL,
        votation INT(3) NOT NULL,
        functionalRequirements VARCHAR(10000),
        nonFunctionalRequirements VARCHAR(10000)
      );
      `);
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

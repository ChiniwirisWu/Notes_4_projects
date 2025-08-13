import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SQLite from "expo-sqlite";
import { SQLiteProvider } from "expo-sqlite";
import DatabaseProvider from "@/components/Shared/DatabaseProvider";

SplashScreen.preventAutoHideAsync();

const RootLayout = ()=>{

  let [fontsLoaded] = useFonts({
    VT323: require("../assets/fonts/VT323-Regular.ttf"),
  });

  if(fontsLoaded){

    SplashScreen.hideAsync();

    return (
      <DatabaseProvider>
        <GestureHandlerRootView>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown:false }} />
          </Stack>
        </GestureHandlerRootView>
      </DatabaseProvider>
    );
  }

   
}

export default RootLayout;

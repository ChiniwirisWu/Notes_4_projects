import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

const RootLayout = ()=>{
  let [fontsLoaded] = useFonts({
    VT323: require("../assets/fonts/VT323-Regular.ttf"),
  });

  useEffect(()=>{
    if(fontsLoaded){
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if(!fontsLoaded){
    return null;
  }

  return (
    <GestureHandlerRootView>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown:false }} />
      </Stack>
    </GestureHandlerRootView>
  );

}

export default RootLayout;

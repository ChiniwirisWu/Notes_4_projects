import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SoundManager from "@/components/Shared/SoundManager";
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
          <SoundManager>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown:false }} />
            </Stack>
          </SoundManager>
        </GestureHandlerRootView>
      </DatabaseProvider>
    );
  }

   
}

export default RootLayout;

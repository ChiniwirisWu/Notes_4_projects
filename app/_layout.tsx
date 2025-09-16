import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SoundManager from "@/components/Shared/SoundManager";
import DatabaseProvider from "@/components/Shared/DatabaseProvider";
import LoadingScreen from "@/components/Shared/LoadingScreen";


const RootLayout = ()=>{

  let [fontsLoaded] = useFonts({
    VT323: require("../assets/fonts/VT323-Regular.ttf"),
  });

  if(fontsLoaded){

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
  } else {
    return <LoadingScreen />
  }

   
}

export default RootLayout;

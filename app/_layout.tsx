import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import AppLoading from "expo-app-loading";


const RootLayout = ()=>{
  let [fontsLoaded] = useFonts({
    VT323: require("../assets/fonts/VT323-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown:false }} />
    </Stack>
  )

}

export default RootLayout;

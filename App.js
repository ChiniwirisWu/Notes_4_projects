import { useFonts } from 'expo-font';
import AppLoading from "expo-app-loading";

import Home from './screens/home';

export default function App() {
  let [fontsLoaded] = useFonts({
    "VT323": require("./assets/fonts/VT323-Regular.ttf")
  });

  if(!fontsLoaded){
    return <AppLoading />;
  }

  return (
    <Home />
  );
}


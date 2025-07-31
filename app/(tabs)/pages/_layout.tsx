import { Stack } from "expo-router";

//export const unstable_settings = {
  //initialRouteName: "index"
//};

const PagesLayout = ()=> {
  return (
    <Stack
      initialRouteName="index"
    >
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="[pageId]" options={{headerTitle: ""}} />
    </Stack>
  );
}

export default PagesLayout;

import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index"
};

const PagesLayout = ()=> {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{headerTintColor: "#000" }}
    >
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="details" options={{
        headerTitle: "", 
        headerStyle: {
          backgroundColor: "#000"
        },
        headerTintColor: "#fff"
      }} />
    </Stack>
  );
}

export default PagesLayout;

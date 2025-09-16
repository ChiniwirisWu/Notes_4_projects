import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "home"
};

const PagesLayout = ()=> {
  return (
    <Stack
      initialRouteName="home"
      screenOptions={{headerTintColor: "#000" }}
    >
      <Stack.Screen name="home" options={{headerShown:false}}/>
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

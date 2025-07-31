import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const TabsLayout = () =>{
  const activeColor = "#eee";
  const inactiveColor = "#888";

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue "}}>
      <Tabs.Screen
      name="pages"
      options={{
        title: "Home",
        headerShown: false,
        tabBarActiveBackgroundColor: "#111",
        tabBarInactiveBackgroundColor: "#000",
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarIcon: ({ color }) => <FontAwesome name="home" color={color} size={24} />
      }}
      />

      <Tabs.Screen
      name="create"
      options={{
        title: "Create",
        headerShown: false,
        tabBarActiveBackgroundColor: "#111",
        tabBarInactiveBackgroundColor: "#000",
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarIcon: ({ color }) => <FontAwesome name="home" color={color} size={24} />
      }}
      />
    </Tabs>
  ) 
};

export default TabsLayout;

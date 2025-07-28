import { View  } from "react-native";
import { StatusBar } from 'expo-status-bar';

import Setting from "@/components/setting.tsx";
import Title from "@/components/title.tsx";
import Searchbar from "@/components/searchbar.tsx";
import List from "@/components/list.tsx";

import g_style from "../../constants/styles.ts";

const Home = ()=>{

  return (
    <View style={g_style.container}>
      <Setting />
      <Title />
      <Searchbar />
      <List />
      <StatusBar style="auto" />
    </View>
  );
};

export default Home;

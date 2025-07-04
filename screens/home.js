import { View  } from "react-native";
import { StatusBar } from 'expo-status-bar';

import Setting from "../components/setting.js";
import Title from "../components/title.js";
import Searchbar from "../components/searchbar.js";
import List from "../components/list.js";
import Add from "../components/add.js";

import g_style from "../extra/styles.js";

export default Home = ()=>{

  return (
    <View style={g_style.container}>
      <Setting />
      <Title />
      <Searchbar />
      <List />
      <Add />
      <StatusBar style="auto" />
    </View>
  );
};


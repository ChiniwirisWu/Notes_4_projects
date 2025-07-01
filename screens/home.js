import { View  } from "react-native";
import { StatusBar } from 'expo-status-bar';

import Option from "../components/option";
import Title from "../components/title";
import Searchbar from "../components/searchbar";
import List from "../components/list";
import Add from "../components/add.js";

import g_style from "../extra/styles.js";

export default Home = ()=>{

  return (
    <View style={g_style.container}>
      <Option />
      <Title />
      <Searchbar />
      <List />
      <Add />
      <StatusBar style="auto" />
    </View>
  );
};


import { View, Button  } from "react-native";
import { StatusBar } from 'expo-status-bar';

import Setting from "@/components/Shared/Setting";
import Title from "@/components/Shared/Title";
import Searchbar from "@/components/Pages/Searchbar";
import ProjectsList from "@/components/Pages/Projectslist";

import g_style from "@/constants/styles";

const Home = ()=>{

  return (
    <View style={g_style.container}>
      <Setting />
      <Title editable={true} />
      <Searchbar />
      <ProjectsList />
      <StatusBar style="auto" />
    </View>
  );
};

export default Home;

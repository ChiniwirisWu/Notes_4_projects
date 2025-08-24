import { View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useCallback, useContext, useRef } from "react";
import { useFocusEffect } from "expo-router";
import { SoundType, SoundManagerContext, SoundManagerContextType } from "@/components/Shared/SoundManager";
import g_style from "@/constants/styles";

import Setting from "@/components/Shared/Setting";
import Title from "@/components/Shared/Title";
import Searchbar from "@/components/Pages/Searchbar";
import ProjectsList from "@/components/Pages/Projectslist";
import { ProjectsListFowardRefType } from "@/components/Pages/Projectslist";

/*
 * TODO: Add the number of items filtered ⚠️ at Line 19
 */

const Home = ()=>{

  const projectListRef = useRef<ProjectsListFowardRefType>(null);
  const { handlePlaySoundEffect } = useContext<SoundManagerContextType>(SoundManagerContext);

  useFocusEffect(useCallback(()=>{
    handlePlaySoundEffect(SoundType.touched);
    if(projectListRef.current && projectListRef.current.fetchAllItems){
      projectListRef.current.fetchAllItems();
    };
  }, []));

  return (
  <View style={g_style.container}>
    <Setting />
    <Title editable={true} />
    <Searchbar />  
    <ProjectsList ref={projectListRef}/>
    <StatusBar style="auto" />
  </View>
  );
};

export default Home;

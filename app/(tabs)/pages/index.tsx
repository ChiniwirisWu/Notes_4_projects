import { View, Button } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useCallback, useContext, useRef } from "react";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Item } from "@/constants/listItem";
import { ItemInfo, ItemInfoWithJSON } from "@/constants/globalTypes";
import { useDatabase } from "@/components/Shared/DatabaseProvider";
import { SoundType, SoundManagerContext, SoundManagerContextType } from "@/components/Shared/SoundManager";
import { SUCCESS_MESSAGES } from "@/constants/messages";
import { useSharedValue } from "react-native-reanimated";

import Setting from "@/components/Shared/Setting";
import Title from "@/components/Shared/Title";
import Searchbar from "@/components/Pages/Searchbar";
import ProjectsList from "@/components/Pages/Projectslist";
import { ProjectsListFowardRefType } from "@/components/Pages/Projectslist";

import g_style from "@/constants/styles";
import { tryConnectDB } from "@/constants/functions";
import LoadingScreen from "@/components/Shared/LoadingScreen";

const Home = ()=>{

  const db = useDatabase();
  let onFocus = false; // it will flip from false to true each time it focuses
  const {handlePlaySoundEffect} = useContext<SoundManagerContextType>(SoundManagerContext);
  const projectListRef = useRef<ProjectsListFowardRefType>(null);

  useFocusEffect(useCallback(()=>{
    handlePlaySoundEffect(SoundType.touched);
    if(projectListRef.current && projectListRef.current.fetchAllItems){
      projectListRef.current.fetchAllItems();
    };
  }, []))

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

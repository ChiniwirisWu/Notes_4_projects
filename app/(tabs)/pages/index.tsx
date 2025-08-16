import { View, Button } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Item } from "@/constants/listItem";
import { ItemInfo, ItemInfoWithJSON } from "@/constants/globalTypes";
import { useDatabase } from "@/components/Shared/DatabaseProvider";

import Setting from "@/components/Shared/Setting";
import Title from "@/components/Shared/Title";
import Searchbar from "@/components/Pages/Searchbar";
import ProjectsList from "@/components/Pages/Projectslist";

import g_style from "@/constants/styles";
import { tryConnectDB } from "@/constants/functions";
import LoadingScreen from "@/components/Shared/LoadingScreen";

const Home = ()=>{

  const db = useDatabase();
  const [items, setItems] = useState<Array<ItemInfoWithJSON>>([]);
  const [isDBReady, setIsDBReady] = useState<boolean>(false); // this method is to load the method once, not twice.

  const fetchAllItems = async ()=>{
    if(db){
      console.log("fetching all the items...");
      const result = await db.getAllAsync<ItemInfoWithJSON>("SELECT * FROM note");
      setItems(result);
    }
  };

  useFocusEffect(useCallback(()=>{
    console.log("index.tsx useFocusEffect");
    if(tryConnectDB({db, setIsDBReady})){
      fetchAllItems();
    }
  }, [db])
  );

  if(!isDBReady){

    return <LoadingScreen />;

  } else {

    return (
    <View style={g_style.container}>
      <Setting />
      <Title editable={true} />
      <Searchbar />
      <ProjectsList ideasList={items} />
      <StatusBar style="auto" />
    </View>
  );
  }
};

export default Home;

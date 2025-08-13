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

const Home = ()=>{

  const db = useDatabase();
  const [items, setItems] = useState<Array<ItemInfoWithJSON>>([]);

  useFocusEffect(useCallback(()=>{

    const getAllItemsFromDB = async ()=> {
      try {
        if(db == null) {
          console.error("Home Component - Database is not ready to use.");
          return;
        };

        console.log("DATABASE SHOULD BE USABLE HERE.");

        //console.log(`Home Component - Fetching all the items....`);
        //const result = await db.getAllAsync<ItemInfoWithJSON>("SELECT * FROM note"); 
        //console.log(`Home Component - ${result.length} fetched.`);
        //setItems(result);
      } catch (e){
        console.error(`Home Component - Error updating the database: ${e}`);
      }
    }; 

    if(db){
      getAllItemsFromDB();
    }

  }, []));



  return (
    <View style={g_style.container}>
      <Setting />
      <Title editable={true} />
      <Searchbar />
      <ProjectsList ideasList={items} />
      <StatusBar style="auto" />
    </View>
  );
};

export default Home;

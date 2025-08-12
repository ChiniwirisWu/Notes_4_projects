import { View, Button } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { Item } from "@/constants/listItem";
import { ItemInfo, ItemInfoWithJSON } from "@/constants/globalTypes";

import Setting from "@/components/Shared/Setting";
import Title from "@/components/Shared/Title";
import Searchbar from "@/components/Pages/Searchbar";
import ProjectsList from "@/components/Pages/Projectslist";

import g_style from "@/constants/styles";

const Home = ()=>{

  const db = useSQLiteContext();
  console.log(`Home component - DB status: ${db}`);
  const [items, setItems] = useState<Array<ItemInfoWithJSON>>([]);

  useEffect(()=>{

    if(!db){
      console.error("Home Component - Database has not initialized yet");
    }

    const getAllItemsFromDB = async ()=> {
      try {
        console.log(`Home Component - Fetching all the items....`);
        const result = await db.getAllAsync<ItemInfoWithJSON>("SELECT * FROM note"); 
        console.log(`Home Component - ${result.length} fetched.`);
        setItems(result);
      } catch (e){
        console.error(`Home Component - Error updating the database: ${e}`);
      }
    }; 

    getAllItemsFromDB();
  }, []);



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

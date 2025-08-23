import React, { useState, useContext, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useFocusEffect } from 'expo-router';
import { tryConnectDB } from '@/constants/functions';
import {FlatList, StyleSheet, Text, View, Pressable} from 'react-native';
import { SoundType, SoundManagerContext, SoundManagerContextType } from '../Shared/SoundManager';
import { SUCCESS_MESSAGES } from '@/constants/messages';
import { router } from "expo-router";
import { useDatabase } from '../Shared/DatabaseProvider';
import g_styles from "@/constants/styles";
import { Item } from '@/constants/listItem';
import Vote from "@/components/Pages/Vote";
import { ItemInfoWithJSON } from '@/constants/globalTypes';

enum Levels {
  common,
  uncommon,
  rare,
  epic,
  legendary,
};

type Idea = {
  title: string,
  vote: Levels,
};

function getLevelFromNumber (x:number) : Levels{
  switch(x){
    case 1: return Levels.common;
    case 2: return Levels.uncommon;
    case 3: return Levels.rare;
    case 4: return Levels.epic;
    case 5: return Levels.legendary;
    default: return Levels.common;
    break;
  }
};


const IdeaListItem = ({idea} : {idea:ItemInfoWithJSON})=>{
  const {title, score} = idea;

  return (
    <Pressable onPress={()=> router.navigate({pathname: "/(tabs)/pages/details", params: {details: JSON.stringify(idea)}})}>
      <View style={styles.item}>
        <Text style={[g_styles.p, {flex: 1, paddingRight: 5}]}>{title}</Text>
        <Vote level={getLevelFromNumber(score)} />
      </View>
    </Pressable>
  )
}

export interface ProjectsListFowardRefType {
  fetchAllItems:()=> void
};

// onFocus is used as an event to re-render the ProjectsList
const ProjectsList = forwardRef<ProjectsListFowardRefType>((props, ref)=>{

  const [items, setItems] = useState<ItemInfoWithJSON[]>([]);
  const [isDBReady, setIsDBReady] = useState<boolean>(false); // this method is to load the method once, not twice.
  const { handlePlaySoundEffect } = useContext<SoundManagerContextType>(SoundManagerContext);
  let firstLoaded = true; // this variable is used to manage that it only loads one time the setup.
  const db = useDatabase();

  const fetchAllItems = async ()=>{
    if(db){
      const result = await db.getAllAsync<ItemInfoWithJSON>("SELECT * FROM note");
      console.log(SUCCESS_MESSAGES.ALL_ITEMS_FETCHED);
      setItems(result);
    }
  };

  useImperativeHandle(ref, ()=> ({
    fetchAllItems
  }));

  useEffect(useCallback(()=>{
    handlePlaySoundEffect(SoundType.touched);

    tryConnectDB({db, setIsDBReady, isDBReady});

    if(db && isDBReady && firstLoaded){
      firstLoaded = false;
      fetchAllItems();
    };     
    // if the database has not loaded yet, try to connect.
  }, [isDBReady]) );
  
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({item}) => <IdeaListItem idea={item} />}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  item:{
    width: "100%",
    height: 100,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10
  },
});

export default ProjectsList;

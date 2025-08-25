import React, { useState, useContext, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react';
import { tryConnectDB } from '@/constants/functions';
import {FlatList, StyleSheet, Text, View, Pressable} from 'react-native';
import { SoundType, SoundManagerContext, SoundManagerContextType } from '../Shared/SoundManager';
import { router, useFocusEffect } from "expo-router";
import { useDatabase } from '../Shared/DatabaseProvider';
import g_styles from "@/constants/styles";
import Vote from "@/components/Pages/Vote";
import { NoteInfoWithJSON } from '@/constants/types';
import { getLevelFromNumber } from '@/constants/functions';
import { getMessage, MessageType } from '@/constants/messages';

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

// 2) It go to details of each note with from this component.
const IdeaListItem = ({idea} : {idea:NoteInfoWithJSON})=>{
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

const ProjectsList = forwardRef<ProjectsListFowardRefType>((props, ref)=>{

  const { handlePlaySoundEffect } = useContext<SoundManagerContextType>(SoundManagerContext);
  const [items, setItems] = useState<NoteInfoWithJSON[]>([]);
  const [isDBReady, setIsDBReady] = useState<boolean>(false); // this method is to load the method once, not twice.
  const db = useDatabase();

  const fetchAllItems = async ()=>{
    if(db){
      const result = await db.getAllAsync<NoteInfoWithJSON>("SELECT * FROM note");
      console.log(getMessage(MessageType.QUERY_SUCCESS));
      setItems(result);
    }
  };

  useImperativeHandle(ref, ()=> ({
    fetchAllItems
  }));

  useEffect(useCallback(()=>{
    handlePlaySoundEffect(SoundType.bump);

    //tryConnectDB({db, setIsDBReady, isDBReady});
    let isConnected = false;

    while(!isConnected){
      isConnected = (db) ? true : false;
    };

    if(isDBReady){
      fetchAllItems();
    };     
    // if the database has not loaded yet, try to connect.
  }, []) );
  
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({item}) => <IdeaListItem idea={item} />}
      />
    </View>
  );
});




export default ProjectsList;

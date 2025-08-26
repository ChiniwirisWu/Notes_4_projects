import React, { useState, useContext, useCallback, useEffect, forwardRef, useImperativeHandle, useDebugValue } from 'react';
import {FlatList, StyleSheet, Text, View, Pressable} from 'react-native';
import { router, useFocusEffect } from "expo-router";
import { useDatabase } from '../Shared/DatabaseProvider';
import g_styles from "@/constants/styles";
import Vote from "@/components/Pages/Vote";
import { NoteInfoWithJSON } from '@/constants/types';
import { getLevelFromNumber } from '@/constants/functions';
import { NotesListController } from '@/controllers/notesList';

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

export interface NotesListFowardRefMethods {
  fetchAllItems:()=> void
};

const NotesList = forwardRef<NotesListFowardRefMethods>((props, ref)=>{

  const [items, setItems] = useState<NoteInfoWithJSON[]>([]);
  const db = useDatabase();

  // 1) first execution when the component mounts.
  useEffect(()=>{

    if(db){
      fetchAllItems();
    };

  }, [db]);

  // 2) fetching and reloading method.
  const fetchAllItems = async ()=>{
    if(db){

      let currentNotes:(false | NoteInfoWithJSON[]) = false;
      
      while (!currentNotes){
        currentNotes = await NotesListController.fetchAllItems(db); 
      };

      setItems(currentNotes);
    };
  };

  // 3) throw to the parent the trigger to fetch all Notes and reload the component. 
  useImperativeHandle(ref, ()=> ({
    fetchAllItems
  }));

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({item}) => <IdeaListItem idea={item} />}
      />
    </View>
  );
});




export default NotesList;

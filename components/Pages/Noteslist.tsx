import 
React, { 
  useState, 
  useEffect, 
  forwardRef, 
  useImperativeHandle,
  useRef
} from 'react';
import {
  FlatList, 
  StyleSheet, 
  Text, 
  View, 
  Pressable
} from 'react-native';
import { router } from "expo-router";
import { useDatabase } from '../Shared/DatabaseProvider';
import g_styles from "@/constants/styles";
import { NoteInfoWithJSON } from '@/constants/types';
import { getLevelFromNumber } from '@/constants/functions';
import { NotesListController } from '@/controllers/notesList';
import { SearchBarRef } from '@/components/Pages/SearchBar';

import Vote from "@/components/Pages/Vote";
import SearchBar from '@/components/Pages/SearchBar';

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
const Note = ({idea} : {idea:NoteInfoWithJSON})=>{
  const { title, score } = idea;

  return (
    <Pressable onPress={()=> router.navigate({pathname: "/(tabs)/(pages)/details", params: {details: JSON.stringify(idea)}})}>
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
  const [notesAmount, setNotesAmount] = useState<number>(0);
  const searchBarRef = useRef<SearchBarRef>(null);
  const db = useDatabase();

  // 1) first execution when the component mounts.
  useEffect(()=>{

    if(db){
      fetchAllItems();
    };

  }, [db]);

  // 2) fetching and reloading methods
  const fetchAllItems = async (alternativeFilterText?:string)=>{
    if(db){

      let currentNotes:(false | NoteInfoWithJSON[]) = false;
      
      while (!currentNotes){
        if(searchBarRef.current){
          // alternativeFilterText has more priority than getCurrentFilterText.
          console.log(alternativeFilterText);
          let filterText = (alternativeFilterText || alternativeFilterText == "") ? alternativeFilterText : searchBarRef.current.getCurrentFilterText();
          currentNotes = await NotesListController.fetchAllItemsWithFilter(db, filterText); 
        }
      };

      setItems(currentNotes);
      setNotesAmount(currentNotes.length);
    };
  };

  // 3) throw to the parent the trigger to fetch all Notes and reload the component. 
  useImperativeHandle(ref, ()=> ({
    fetchAllItems
  }));

  return (
  <>
    <SearchBar fetchAllItems={fetchAllItems} notesAmount={notesAmount} ref={searchBarRef} />
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({item}) => <Note idea={item} />}
      />
    </View>
  </>
  );
});




export default NotesList;

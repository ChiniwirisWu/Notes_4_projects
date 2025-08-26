import { View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useCallback, useContext, useRef } from "react";
import { useFocusEffect } from "expo-router";
import { SoundType, SoundManagerContext, SoundManagerContextType } from "@/components/Shared/SoundManager";
import g_style from "@/constants/styles";

import Setting from "@/components/Shared/Setting";
import Title from "@/components/Shared/Title";
import Searchbar from "@/components/Pages/Searchbar";
import NotesList from "@/components/Pages/Noteslist";
import { NotesListFowardRefMethods } from "@/components/Pages/Noteslist";

/*
 * TODO: Add the number of items filtered ⚠️ at Line 19
 */

const Home = ()=>{

  const notesListRef = useRef<NotesListFowardRefMethods>(null);
  const { handlePlaySoundEffect } = useContext<SoundManagerContextType>(SoundManagerContext);

  useFocusEffect(useCallback(()=>{

    handlePlaySoundEffect(SoundType.bump);

    if(notesListRef.current && notesListRef.current.fetchAllItems){

      notesListRef.current.fetchAllItems();

    };

  }, []));

  return (
  <View style={g_style.container}>
    <Setting />
    <Title editable={true} />
    <Searchbar />  
    <NotesList ref={notesListRef}/>
    <StatusBar style="auto" />
  </View>
  );
};

export default Home;

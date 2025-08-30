import { View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useCallback, useContext, useRef } from "react";
import { useFocusEffect } from "expo-router";
import { SoundEffect, SoundManagerContext, SoundManagerContextType } from "@/components/Shared/SoundManager";
import g_style from "@/constants/styles";

import Setting from "@/components/Shared/Setting";
import Title from "@/components/Shared/Title";
import NotesList from "@/components/Pages/Noteslist";
import { NotesListFowardRefMethods } from "@/components/Pages/Noteslist";

const Home = ()=>{

  const notesListRef = useRef<NotesListFowardRefMethods>(null);
  const { handlePlaySoundEffect } = useContext<SoundManagerContextType>(SoundManagerContext);

  useFocusEffect(useCallback(()=>{

    handlePlaySoundEffect(SoundEffect.bump);

    if(notesListRef.current && notesListRef.current.fetchAllItems){

      notesListRef.current.fetchAllItems(); 

    };

  }, []));

  return (
  <View style={g_style.container}>
    <Setting />
    <Title editable={true} />
    <NotesList ref={notesListRef}/>
    <StatusBar style="auto" />
  </View>
  );
};

export default Home;

import { View, StyleSheet } from "react-native";
import { useState, useCallback, useContext } from "react";
import g_styles from "@/constants/styles";
import { NoteInfoWithJSON } from "@/constants/types";
import { useLocalSearchParams } from "expo-router";
import { useFocusEffect } from "expo-router";
import { SoundManagerContext, SoundManagerContextType, SoundType } from "@/components/Shared/SoundManager";

import DetailsPage from "@/components/Pages/DetailsPage";
import RequirementsPage from "@/components/Pages/RequirementsPage";
import PageSelectorContainer from "@/components/Pages/PageSelectorContainer";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

const Detail = ()=>{
  const pages = ["Details", "Requirements"]; 
  const [pageSelected, setSelectedPage] = useState<number>(0); 
  const {handlePlaySoundEffect} = useContext<SoundManagerContextType>(SoundManagerContext);
  const { details } = useLocalSearchParams<{details : string}>();
  const [pageInfo] = useState<NoteInfoWithJSON>(JSON.parse(details));

  useFocusEffect(useCallback(()=>{
    handlePlaySoundEffect(SoundType.bump);
    console.log(pageInfo)
  }, []));

  // used to change between pages.
  const handleSelectPage = (pageIndex:number)=> {
    setSelectedPage(pageIndex);
  };
  
  return (
    <View style={[g_styles.container]}>
      <PageSelectorContainer pages={pages} pageSelected={pageSelected} handleSelectPage={handleSelectPage} />
      {(pageSelected == 0) ? (
        <DetailsPage pageInfo={pageInfo} />
      ) : (
        <RequirementsPage pageInfo={pageInfo} />
      )}
    </View>
  );
};

export default Detail;

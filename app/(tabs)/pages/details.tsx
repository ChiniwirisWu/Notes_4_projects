import { View, StyleSheet } from "react-native";
import { useState, useCallback, useContext } from "react";
import g_styles from "@/constants/styles";
import { generateKey } from "@/constants/functions";
import { ItemInfoWithJSON } from "@/constants/globalTypes";
import { useLocalSearchParams } from "expo-router";
import { useFocusEffect } from "expo-router";
import { SoundManagerContext, SoundManagerContextType, SoundType } from "@/components/Shared/SoundManager";

import PageSelector from "@/components/Pages/PageSelector";
import DetailsPage from "@/components/Pages/DetailsPage";
import RequirementsPage from "@/components/Pages/RequirementsPage";
import PageSelectorContainer from "@/components/Pages/PageSelectorContainer";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

const Detail = ()=>{
  // page management --
  const [pageSelected, setSelectedPage] = useState<number>(0); 
  const pages = ["Details", "Requirements"]; 
  const pagesHashLength = 10; 
  const pagesAlias = "pageSelector";
  const {handlePlaySoundEffect} = useContext<SoundManagerContextType>(SoundManagerContext);

  useFocusEffect(useCallback(()=>{
    handlePlaySoundEffect(SoundType.touched);
  }, []))

  // used to change between pages.
  const onSelect = (pageIndex:number)=> {
    setSelectedPage(pageIndex);
  };

  const { details } = useLocalSearchParams<{details : string}>();
  const [pageInfo] = useState<ItemInfoWithJSON>((typeof details === "string") ? JSON.parse(details) : undefined);

  // pageSelectors for the PageSelectorContainer
  const pageSelectors:React.ReactElement<typeof PageSelector>[] = pages.map((el, ind)=> (
    <PageSelector
      title={el}
      key={generateKey(ind, pagesHashLength, pagesAlias)}
      pageIndex={ind}
      onSelect={onSelect}
      pageSelected={pageSelected}
    />
  ));
  
  return (
    <View style={[g_styles.container, styles.container]}>
      <PageSelectorContainer pageSelectors={pageSelectors} pageSelected={pageSelected} />
      {(pageSelected == 0) ? (
        <DetailsPage pageInfo={pageInfo} />
      ) : (
        <RequirementsPage pageInfo={pageInfo} />
      )}
    </View>
  );
};

export default Detail;

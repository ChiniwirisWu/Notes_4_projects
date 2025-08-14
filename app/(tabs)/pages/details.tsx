import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect, createContext } from "react";
import g_styles from "@/constants/styles";
import LongButton from "@/components/Shared/LongButton";
import PageSelectorContainer from "@/components/Pages/PageSelectorContainer";
import PageSelector from "@/components/Pages/PageSelector";
import { generateKey } from "@/constants/functions";
import DetailsPage from "@/components/Pages/DetailsPage";
import RequirementsPage from "@/components/Pages/RequirementsPage";
import { ItemInfoWithJSON, ItemInfo } from "@/constants/globalTypes";
import { useLocalSearchParams } from "expo-router";
import { parse } from "@babel/core";

import { useDatabase } from "@/components/Shared/DatabaseProvider";


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

  const onSelect = (pageIndex:number)=> {
    setSelectedPage(pageIndex);
  };

  const { details } = useLocalSearchParams<{details : string}>();
  const [pageInfo, setPageInfo] = useState<ItemInfo>((typeof details === "string") ? JSON.parse(details) : undefined);

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

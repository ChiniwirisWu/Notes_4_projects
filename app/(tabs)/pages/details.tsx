import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import g_styles from "@/constants/styles";
import LongButton from "@/components/Shared/LongButton";
import PageSelectorContainer from "@/components/Pages/PageSelectorContainer";
import PageSelector from "@/components/Pages/PageSelector";
import { generateKey } from "@/constants/functions";
import DetailsPage from "@/components/Pages/DetailsPage";
import RequirementsPage from "@/components/Pages/RequirementsPage";
import { ItemInfoWithJSON } from "@/constants/globalTypes";
import { useLocalSearchParams } from "expo-router";
import { parse } from "@babel/core";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

const Detail = ()=>{

  const pages = ["Details", "Requirements"]; 
  const [pageSelected, setSelectedPage] = useState<number>(0); 
  const pagesHashLength = 10;
  const pagesAlias = "pageSelector";

  const [pageInfo, setPageInfo] = useState<ItemInfoWithJSON>();
  const { details } = useLocalSearchParams();
  console.log("Detail Component: retrieving page details...");
  console.log(details);


  console.log(`Detail Component - Info retrieved: ${pageInfo}`);
  const [score, setScore] = useState<number>(3);

  function onSelect (pageIndex:number){
    setSelectedPage(pageIndex);
  };
  
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
        <DetailsPage score={score} setScore={setScore} />
      ) : (
        <RequirementsPage />
      )}
    </View>
  );
};

export default Detail;

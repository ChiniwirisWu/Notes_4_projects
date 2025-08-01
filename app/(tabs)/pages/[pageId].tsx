import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import g_styles from "@/constants/styles";
import LongButton from "@/components/Shared/LongButton";
import PageSelectorContainer from "@/components/Pages/PageSelectorContainer";
import PageSelector from "@/components/Pages/PageSelector";
import { generateKey } from "@/constants/functions";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

const Detail = ()=>{

  const pages = ["Details", "Requirements"]; 
  const [pageSelected, setSelectedPage] = useState(0); 
  const pagesHashLength = 10;
  const pagesAlias = "pageSelector";

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
    </View>
  );
};

export default Detail;

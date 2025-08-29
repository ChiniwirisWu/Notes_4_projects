import { StyleSheet, View, Text, Pressable } from "react-native";
import PageSelector from "./PageSelector";
import { generateKey } from "@/constants/functions";

const styles = StyleSheet.create({
  selectorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 330,
    borderWidth: 3,
    borderColor: "#fff",
    margin: "auto",
  },
})

type PageSelectorContainerTypes = {
  pages: string[], 
  pageSelected:number,
  handleSelectPage:(index:number)=> void
};


const PageSelectorContainer = ({ pages, pageSelected, handleSelectPage } : PageSelectorContainerTypes)=>{
  const pagesAlias = "pageSelector";

  // pageSelectors for the PageSelectorContainer
  const pageSelectors:React.ReactElement<typeof PageSelector>[] = pages.map((el, ind)=> (
    <PageSelector
      title={el}
      key={generateKey(ind, pagesAlias)}
      pageIndex={ind}
      handleSelectPage={handleSelectPage}
      pageSelected={pageSelected}
    />
  ));

  return (
    <View style={styles.selectorContainer}>
      {pageSelectors}
    </View>
  );
}

export default PageSelectorContainer;

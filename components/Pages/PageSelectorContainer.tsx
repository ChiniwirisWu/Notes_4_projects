import { StyleSheet, View, Text, Pressable } from "react-native";
import g_styles from "@/constants/styles";
import PageSelector from "./PageSelector";

const styles = StyleSheet.create({
  selectorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 330,
    borderWidth: 3,
    borderColor: "#fff",
  },
})


const PageSelectorContainer = ({
    pageSelectors, 
    pageSelected
} : {
    pageSelectors:React.ReactElement<typeof PageSelector>[], 
    pageSelected:number,
})=>{

  return (
    <View style={styles.selectorContainer}>
      {pageSelectors}
    </View>
  );
}

export default PageSelectorContainer;

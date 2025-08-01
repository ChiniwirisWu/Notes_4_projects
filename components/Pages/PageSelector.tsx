import { Pressable, Text, StyleSheet } from "react-native";
import g_styles from "@/constants/styles";

const styles = StyleSheet.create({
  selectorPressable: {
    flex: 1
  },
  selectorP: {
    textAlign: "center"
  },
  selected: {
    backgroundColor: "#fff",
    color: "#000", 
  },
  unselected: {
    backgroundColor: "#000",
    color: "#fff"
  }
});


/*
 * pageSelected:number is used to update the PageSelector component setting it's style.
 * pageIndex: page which the PageSelector component represents. 
 */
const PageSelector = ({title, pageIndex, onSelect, pageSelected}:{title:string, pageIndex:number, onSelect:(index:number)=> void, pageSelected:number})=>{
  return (
    <Pressable style={styles.selectorPressable} onPress={()=> onSelect(pageIndex)}>
      <Text style={[
        g_styles.p, 
        styles.selectorP, 
        (pageIndex == pageSelected) ? styles.selected : styles.unselected
      ]}>
        {title}
      </Text>
    </Pressable>
  );
}

export default PageSelector;

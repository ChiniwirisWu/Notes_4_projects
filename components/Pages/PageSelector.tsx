import { Pressable, Text, StyleSheet } from "react-native";
import g_styles from "@/constants/styles";
import { SoundType, SoundManagerContextType, SoundManagerContext } from "../Shared/SoundManager";
import { useContext } from "react";

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

type PageSelectorType = {
  title:string, 
  pageIndex:number, 
  handleSelectPage:(index:number)=> void, 
  pageSelected:number
};

const PageSelector = ({ title, pageIndex, handleSelectPage, pageSelected } : PageSelectorType)=>{

  const { handlePlaySoundEffect } = useContext<SoundManagerContextType>(SoundManagerContext);

  return (
    <Pressable 
      style={styles.selectorPressable} 
      onPress={()=> {
        handleSelectPage(pageIndex)
        handlePlaySoundEffect(SoundType.click);
    }}>
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

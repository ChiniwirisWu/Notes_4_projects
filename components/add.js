import AntDesign from '@expo/vector-icons/AntDesign';
import { View, StyleSheet, Pressable } from "react-native";
import g_styles from "../extra/styles.js";

const styles = StyleSheet.create({
  container : {
    height: 75,
  },

  pressable: {
    backgroundColor: "#878300",
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "40%",
    borderWidth: 2,
    borderColor: "#aba857"
  }
});

export default Add = ()=>{
  return (
    <View style={styles.container}>
      <Pressable style={[g_styles.pressable, styles.pressable]}>
        <AntDesign
          name="addfile"
          size={35}
          color="#fff"
        />
      </Pressable> 
    </View>
  )
}

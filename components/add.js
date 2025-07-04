import AntDesign from '@expo/vector-icons/AntDesign';
import { View, StyleSheet, Pressable } from "react-native";
import g_styles from "../extra/styles.js";

const styles = StyleSheet.create({
  container : {
    height: 75,
    justifyContent: "center",
    alignItems: "center"
  },

  pressable: {
    backgroundColor: "#878300",
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    borderWidth: 2,
    borderColor: "#aba857"
  }
});

export default Add = ()=>{
  return (
    <View style={styles.container}>
      <Pressable style={[styles.pressable]}>
        <AntDesign
          name="plus"
          size={35}
          color="#fff"
        />
      </Pressable> 
    </View>
  )
}

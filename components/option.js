import { View, StyleSheet, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import g_styles from "../extra/styles.js";

const Option = () =>{
  return (
    <View style={styles.container}>
      <Pressable style={g_styles.pressable}>

        <MaterialCommunityIcons
          name="dots-vertical"
          size={35}
          color="#fff"
        />

      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

});

export default Option;


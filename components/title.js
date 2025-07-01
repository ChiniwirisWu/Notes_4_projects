import { View, StyleSheet, TextInput, Pressable, Text } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fonts from "../extra/fonts.js";

const Title = () =>{

  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={styles.text}>Brain storming</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    justifyContent: "center"
  },

  text: {
    fontSize: 40,
    color: "#fff",
    fontFamily: Fonts.vt323,
  }

});

export default Title;


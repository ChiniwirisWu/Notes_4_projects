import { View, StyleSheet, TextInput, Pressable, Text } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fonts from "../extra/fonts.js";
import g_styles from "../extra/styles.js";

const Searchbar = () =>{
  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} />
      <Text style={[g_styles.p, styles.text]}>0 Elements found</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },

  textInput: {
    height: 50,
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 5,
    outlineColor: "#fff",
    borderColor: "#fff",
    borderWidth: 5,
    marginBottom: 10,
    color: "#fff",
    fontFamily: Fonts.vt323,
  },

  text: {
    color: "#ddd",
    alignSelf: "flex-start",
    fontSize: 20,
  }
});

export default Searchbar;


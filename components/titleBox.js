import { View, StyleSheet, Text, TextInput } from "react-native";
import g_styles from "../extra/styles.js";
import SaveButton from "./saveButton.js";

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000",
  },

  container: {
    marginTop: 50,
    width: "80%",
    padding: 10,
    height: "30%"
  },

});

export default TitleBox = ({title})=> {
  return (
    <View style={styles.center}>
      <View style={styles.container}>
        <Text style={[g_styles.p, g_styles.titleMargin]}>Update title "title" to...</Text>
        <TextInput style={g_styles.textInput} placeholder="New title"/>
        <SaveButton />
      </View>
    </View>
  );
}

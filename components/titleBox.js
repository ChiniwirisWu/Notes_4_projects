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

export default TitleBox = (props)=> {
  return (
    <View style={styles.center}>
      <View style={styles.container}>
        <Text style={[g_styles.p, g_styles.titleMargin]}>Update title "{props.title}" to...</Text>
        <TextInput placeholderTextColor={"#ddd"} style={[g_styles.textInput, {width: 300, margin: "auto"}]} placeholder="New title"/>
        <SaveButton onSaveQuit={props.onSaveQuit} />
      </View>
    </View>
  );
}

import { View, StyleSheet, Text, TextInput } from "react-native";
import g_styles from "@/constants/styles";
import LongButton from "@/components/Shared/LongButton";

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

const TitleBox = ({title, onSaveQuit} : {title:string, onSaveQuit: ()=> void})=> {
  return (
    <View style={styles.center}>
      <View style={styles.container}>
        <Text style={[g_styles.p, g_styles.titleMargin]}>Update title "{title}" to...</Text>
        <TextInput placeholderTextColor={"#ddd"} style={[g_styles.textInput, {width: 300, margin: "auto"}]} placeholder="New title"/>
        <SaveButton onSaveQuit={onSaveQuit} />
      </View>
    </View>
  );
}

export default TitleBox;

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

type TitleBoxTypes = {
  title:string, 
  handleOnTitleChange: (text:string)=> void,
  handleTitleChange: ()=> void
};

const TitleBox = ({title, handleOnTitleChange, handleTitleChange} : TitleBoxTypes)=> {

  return (
    <View style={styles.center}>
      <View style={styles.container}>
        <Text style={[g_styles.p, g_styles.titleMargin]}>Update title "{title}" to...</Text>
        <TextInput 
          onChangeText={(text)=> handleOnTitleChange(text)} 
          placeholderTextColor={"#ddd"} 
          value={title}
          style={[g_styles.textInput, {width: 300, margin: "auto"}]} 
          placeholder="New title"/>
        <LongButton text="Save/Quit" handleOnPress={handleTitleChange} />
      </View>
    </View>
  );
}

export default TitleBox;

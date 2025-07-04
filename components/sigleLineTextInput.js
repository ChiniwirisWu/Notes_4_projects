import { View, Text, TextInput } from "react-native";
import g_styles from "../extra/styles.js";

const SingleLineTextInput = (props) =>{
  return (
    <View>
      <Text style={g_styles.p}>{props.fieldName}</Text>
      <TextInput placeholderTextColor="#fff" placeholder="..." style={g_styles.textInput}></TextInput>
    </View>
  )
};

export default SingleLineTextInput;


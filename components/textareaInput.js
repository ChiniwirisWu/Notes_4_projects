import { View, Text, TextInput } from "react-native";
import g_styles from "../extra/styles.js";

const TextAreaInput = (props) =>{
  return (
    <View>
      <Text style={g_styles.p}>{props.fieldName}</Text>
      <TextInput multiline={true} placeholderTextColor="#fff" placeholder="..." style={g_styles.textarea}></TextInput>
    </View>
  )
};

export default TextAreaInput;


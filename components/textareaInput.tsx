import { View, Text, TextInput } from "react-native";
import g_styles from "../constants/styles.ts";

const TextAreaInput = ({fieldName}:{fieldName:string}) =>{
  return (
    <View>
      <Text style={g_styles.p}>{fieldName}</Text>
      <TextInput multiline={true} placeholderTextColor="#fff" placeholder="..." style={g_styles.textarea}></TextInput>
    </View>
  )
};

export default TextAreaInput;


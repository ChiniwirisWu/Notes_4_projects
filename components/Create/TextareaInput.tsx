import { View, Text, TextInput } from "react-native";
import g_styles from "@/constants/styles";

const TextAreaInput = ({fieldName, marginBottom}:{fieldName:string, marginBottom?:number}) =>{
  return (
    <View style={{marginBottom: marginBottom ? marginBottom : 0}}>
      <Text style={g_styles.p}>{fieldName}</Text>
      <TextInput multiline={true} placeholderTextColor="#fff" placeholder="..." style={g_styles.textarea}></TextInput>
    </View>
  )
};

export default TextAreaInput;


import { View, Text, TextInput } from "react-native";
import g_styles from "@/constants/styles";

type TextAreaInputParams = {
  fieldName:string, 
  marginBottom?:number,
  value:string|undefined, 
  setValue:(text:string)=>void
}

const TextAreaInput = ({fieldName, marginBottom, value, setValue}:TextAreaInputParams) =>{
  return (
    <View style={{marginBottom: marginBottom ? marginBottom : 0}}>
      <Text style={g_styles.p}>{fieldName}</Text>
      <TextInput 
        multiline={true} 
        value={value}
        onChangeText={(text)=> setValue(text)}
        placeholderTextColor="#fff" 
        placeholder="..." 
        style={g_styles.textarea}>
      </TextInput>
    </View>
  )
};

export default TextAreaInput;


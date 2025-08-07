import { View, Text, TextInput } from "react-native";
import g_styles from "@/constants/styles";

type SingleLineTextInputParams = {
  fieldName:string, 
  value?:(string|undefined), 
  setValue?:(text:(string|undefined))=>void
}

const SingleLineTextInput = ({fieldName, value, setValue}: SingleLineTextInputParams) =>{

  return (
    <View>
      <Text style={g_styles.p}>{fieldName}</Text>
      <TextInput 
        value={value} 
        onChangeText={(text)=> setValue(text)} 
        placeholderTextColor="#fff" 
        placeholder="..." 
        style={g_styles.textInput}>
      </TextInput>
    </View>
  )
};

export default SingleLineTextInput;


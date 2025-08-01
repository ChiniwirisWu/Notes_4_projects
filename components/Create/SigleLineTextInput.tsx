import { View, Text, TextInput } from "react-native";
import g_styles from "@/constants/styles";

const SingleLineTextInput = ({fieldName}:{fieldName:string}) =>{
  return (
    <View>
      <Text style={g_styles.p}>{fieldName}</Text>
      <TextInput placeholderTextColor="#fff" placeholder="..." style={g_styles.textInput}></TextInput>
    </View>
  )
};

export default SingleLineTextInput;


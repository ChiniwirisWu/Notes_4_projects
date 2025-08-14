import { MessageStates } from "@/constants/listItem";
import { View, Text } from "react-native";
import LongButton from "./LongButton";
import g_styles from "@/constants/styles";


export default function MessageBox ({handleOnPress}:{handleOnPress : ()=>void}){
  
  return (
    <View>
      <Text style={[g_styles.p, {textAlign: "center", marginBottom: 40}]}>Note created succesfully!🥳</Text>
      <LongButton text="Close message" handleOnPress={handleOnPress} />
    </View>
  );
}

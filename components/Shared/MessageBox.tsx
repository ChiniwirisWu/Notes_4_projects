import { View, Text } from "react-native";
import LongButton from "./LongButton";
import g_styles from "@/constants/styles";


export default function MessageBox ({handleOnPress, messageText}:{handleOnPress : ()=>void, messageText:string}){
  
  return (
    <View>
      <Text style={[g_styles.p, {textAlign: "center", marginBottom: 40}]}>{messageText}</Text>
      <LongButton text="Close message" handleOnPress={handleOnPress} />
    </View>
  );
}

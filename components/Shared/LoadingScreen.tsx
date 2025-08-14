import { View, Text, ActivityIndicator } from "react-native";
import g_styles from "@/constants/styles";

export default function LoadingScreen({text}:{text?:string}){

  if(text == "" || text == undefined || text == null){
    text = "Loading Database...";
  }

  return (
    <View style={[g_styles.container, {flex: 1, justifyContent: "center", alignItems: "center"}]}>
      <Text style={[g_styles.p, {marginBottom: 20}]}>{text}</Text>
      <ActivityIndicator size={"large"} color={"#fff"} />
    </View>
  );
}

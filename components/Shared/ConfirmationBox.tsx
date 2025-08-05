import { View, Text, StyleSheet } from "react-native";
import g_styles from "@/constants/styles";
import LongButton from "./LongButton";

const styles = StyleSheet.create({
  container: {
    paddingTop: 20
  },
  title: {
    fontSize: 30,
    marginBottom: 40,
    textAlign: "center"
  }
})

const ConfirmationBox = ({message, onConfirm, onCancel}:{message:string, onConfirm:()=> void, onCancel:()=> void})=>{
  return (
    <View style={[g_styles.container, styles.container]}>
      <Text style={[g_styles.p, styles.title]}>{message}</Text>
      <LongButton text="Yes" onPress={onConfirm} marginBottom={20} />
      <LongButton text="No" onPress={onCancel} marginBottom={20} />
    </View>
  );
};

export default ConfirmationBox;

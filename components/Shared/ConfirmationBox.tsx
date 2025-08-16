// This component should always have a parent Context to get the handlers. 
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

type confirmationBoxTypes = {
  message:string, 
  handleCloseModal:()=> void, 
  handleConfirm: ()=> void
};

const ConfirmationBox = ({message, handleCloseModal, handleConfirm} : confirmationBoxTypes)=>{

  return (
    <View style={[g_styles.container, styles.container]}>
      <Text style={[g_styles.p, styles.title]}>{message}</Text>
      <LongButton text="Yes" handleOnPress={()=>{
        handleConfirm();
        handleCloseModal(); 
      }} marginBottom={20} />
      <LongButton text="No" handleOnPress={handleCloseModal} marginBottom={20} />
    </View>
  );
};

export default ConfirmationBox;

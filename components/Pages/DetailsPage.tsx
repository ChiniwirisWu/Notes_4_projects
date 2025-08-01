import { View, StyleSheet } from "react-native";
import SingleLineTextInput from "../Create/SigleLineTextInput";
import TextAreaInput from "../Create/TextareaInput";
import Votation from "../Create/Votation";
import LongButton from "../Shared/LongButton";

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    width: "100%"
  }
});

const DetailsPage = ()=>{

  return (
    <View style={styles.container}>
      <SingleLineTextInput fieldName="Title" />
      <TextAreaInput fieldName="Description" marginBottom={40} />
      <Votation />
    </View>
  ); 
}

export default DetailsPage;

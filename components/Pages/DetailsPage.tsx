import { View, StyleSheet } from "react-native";
import SingleLineTextInput from "../Create/SingleLineTextInput";
import TextAreaInput from "../Create/TextareaInput";
import Votation from "../Create/Votation";
import LongButton from "../Shared/LongButton";

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    width: "100%"
  }
});

type DetailsPageParams = {
  score : number,
  setScore : (x: number) => void
}

const DetailsPage = ({score, setScore}: DetailsPageParams)=>{

  return (
    <View style={styles.container}>
      <SingleLineTextInput fieldName="Title" />
      <TextAreaInput fieldName="Description" marginBottom={40} />
      <Votation score={score} setScore={setScore} />
    </View>
  ); 
}

export default DetailsPage;

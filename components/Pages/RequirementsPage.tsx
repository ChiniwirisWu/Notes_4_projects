import { View, StyleSheet, Text } from "react-native";
import IncrementableList from "../Create/IncrementableList";
import LongButton from "../Shared/LongButton";
import CircularProgress from "react-native-circular-progress-indicator"
import Fonts from "@/constants/fonts";
import g_styles from "@/constants/styles";

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    width: "100%"
  },
  progressBarContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40
  }
});

const RequirementsPage = ()=>{

  return (
    <View style={styles.container}>
      <IncrementableList title="Functional Requirements" alias="functionalR"/>
      <IncrementableList title="Functional Requirements" alias="functionalR"/>
      <View style={styles.progressBarContainer}>
        <Text style={[g_styles.p, {marginBottom: 40, width: "100%"}]}>Requirement's achieved</Text>
        <CircularProgress
          value={80}
          title={"RC"}
          titleColor="#fff"
          valueSuffix="%"
          radius={60}
          progressValueColor={'#fff'}
          inActiveStrokeColor={"#222"}
          activeStrokeColor="#9534eb"
          activeStrokeSecondaryColor="#fced0f"
          duration={1000}
        />
      </View>
      <LongButton text="Delete" onPress={()=> {}} marginBottom={40} />
    </View>
  ); 
}

export default RequirementsPage;

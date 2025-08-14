import { View, StyleSheet, Text, ScrollView } from "react-native";
import IncrementableList from "../Create/IncrementableList";
import LongButton from "../Shared/LongButton";
import CircularProgress from "react-native-circular-progress-indicator"
import Fonts from "@/constants/fonts";
import g_styles from "@/constants/styles";
import { ItemInfo, ItemInfoWithJSON } from "@/constants/globalTypes";
import { useEffect, useState } from "react";
import { Item } from "@/constants/listItem";

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

const RequirementsPage = ({pageInfo}:{pageInfo:ItemInfoWithJSON})=>{

  const [functionalRequirements, setFunctionalRequirements] = useState<Array<Item>>(JSON.parse(pageInfo.functionalRequirements));
  const [nonFunctionalRequirements, setNonFunctionalRequirements] = useState<Array<Item>>(JSON.parse(pageInfo.nonFunctionalRequirements));

  return (
    <ScrollView style={styles.container}>
      <IncrementableList 
        title="Functional Requirements" 
        alias="functionalR" 
        items={functionalRequirements} 
        setItems={setFunctionalRequirements}
      />
      <IncrementableList 
        title="Functional Requirements" 
        alias="nonfunctionalR"
        items={nonFunctionalRequirements}
        setItems={setNonFunctionalRequirements}
      />
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
      <LongButton text="Delete" handleOnPress={()=> {}} marginBottom={40} />
    </ScrollView>
  ); 
}

export default RequirementsPage;

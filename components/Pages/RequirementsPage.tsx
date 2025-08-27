import { View, StyleSheet, Text, ScrollView } from "react-native";
import IncrementableList from "../Create/IncrementableList";
import LongButton from "../Shared/LongButton";
import CircularProgress from "react-native-circular-progress-indicator"
import g_styles from "@/constants/styles";
import { NoteInfoWithJSON } from "@/constants/types";
import { useState, useRef } from "react";
import { NoteTask } from "@/constants/types";
import { MessageType, getMessage } from "@/constants/messages";
import MessageBox from "../Shared/MessageBox";

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

const RequirementsPage = ({pageInfo}:{pageInfo:NoteInfoWithJSON})=>{

  const [functionalRequirements, setFunctionalRequirements] = useState<Array<NoteTask>>(JSON.parse(pageInfo.functionalRequirements));
  const [nonFunctionalRequirements, setNonFunctionalRequirements] = useState<Array<NoteTask>>(JSON.parse(pageInfo.nonFunctionalRequirements));
  const scrollRef = useRef<ScrollView>(null);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>("");

  const handleShowMessage = (messageType:MessageType)=>{
    setMessageText(getMessage(messageType));
    setShowMessage(true);
    // This timeout ensures that it will scroll after the note finishes doing DB queries.
    setTimeout(()=>{
      if(scrollRef.current != null){
        scrollRef.current.scrollToEnd({animated:true});
      }
    }, 200);
  }

  return (
  <View style={g_styles.container}>
    <ScrollView style={styles.container} ref={scrollRef}>
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
      <LongButton text="Save" handleOnPress={()=> {}} marginBottom={40} />
      <LongButton text="Delete" handleOnPress={()=> {}} marginBottom={40} />

      {(showMessage)?(
        <MessageBox handleOnPress={handleCloseMessage} messageText={messageText} />
      ):(
        <></>
      )}
    </ScrollView>
  </View>
  ); 
}

export default RequirementsPage;

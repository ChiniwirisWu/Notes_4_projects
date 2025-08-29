import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useDatabase } from "../Shared/DatabaseProvider";
import LoadingScreen from "../Shared/LoadingScreen";
import { router } from "expo-router";
import { SoundType, SoundManagerContext, SoundManagerContextType } from "../Shared/SoundManager";
import IncrementableList from "../Create/IncrementableList";
import LongButton from "../Shared/LongButton";
import CircularProgress from "react-native-circular-progress-indicator"
import g_styles from "@/constants/styles";
import { NoteInfoWithJSON } from "@/constants/types";
import { useState, useRef, useContext, useEffect } from "react";
import { RequirementsPageController } from "@/controllers/requirementsPageController";
import { NoteTask } from "@/constants/types";
import { MessageType, getMessage } from "@/constants/messages";
import MessageBox from "../Shared/MessageBox";

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
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
  const db = useDatabase();

  const scrollRef = useRef<ScrollView>(null);
  const [showMessage, setShowMessage] = useState<boolean>(true);
  const [messageText, setMessageText] = useState<string>("");
  const { handlePlaySoundEffect } = useContext<SoundManagerContextType>(SoundManagerContext);

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

  const handleCloseMessage = ()=>{
    handlePlaySoundEffect(SoundType.close);
    setShowMessage(false);
    if(scrollRef.current != null){
      scrollRef.current.scrollTo({x:0, y:0})
    }
  };

  const handleSaveRequirements = async ()=>{
    console.log("hi neptuno");
    if(db){
      const params = {key:pageInfo.key, functionalRequirements, nonFunctionalRequirements};
      const isSaved = await RequirementsPageController.saveRequirements({db, params});
      handlePlaySoundEffect(isSaved ? SoundType.success : SoundType.fail);
      handleShowMessage(isSaved ? MessageType.UPDATED : MessageType.NOT_UPDATED);
    }
  };

  const handleDeleteNote = async ()=>{
    if(db){
      const isDeleted = await RequirementsPageController.destroyNote({db, key:pageInfo.key}); 
      const FIVE_SECONDS = 5 * 1000;
      if(isDeleted){

        handleShowMessage(MessageType.DELETED);

        setTimeout(()=>{
          router.back(); 
        }, FIVE_SECONDS);

      } else {
        handleShowMessage(MessageType.NOT_DELETED)
      };
    }
  };

  if(!db){
    return <LoadingScreen />;
  };

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
      <LongButton text="Save" handleOnPress={handleSaveRequirements} marginBottom={40} />
      <LongButton text="Delete" handleOnPress={handleDeleteNote} marginBottom={40} />

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

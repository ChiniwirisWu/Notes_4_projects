import { View, StyleSheet, Text, ScrollView, Modal } from "react-native";
import { useDatabase } from "../Shared/DatabaseProvider";
import LoadingScreen from "../Shared/LoadingScreen";
import { router, useFocusEffect } from "expo-router";
import { SoundEffect, SoundManagerContext, SoundManagerContextType } from "../Shared/SoundManager";
import IncrementableList from "../Create/IncrementableList";
import LongButton from "../Shared/LongButton";
import CircularProgress from "react-native-circular-progress-indicator"
import g_styles from "@/constants/styles";
import { NoteInfoWithJSON, NoteTaskState } from "@/constants/types";
import { useState, useRef, useContext, useEffect, useCallback } from "react";
import { RequirementsPageController } from "@/controllers/requirementsPageController";
import { NoteTask } from "@/constants/types";
import { MessageType, getMessage } from "@/constants/messages";
import { ConfirmationBoxMethods } from "../Shared/ConfirmationBox";

import MessageBox from "../Shared/MessageBox";
import ConfirmationBox from "../Shared/ConfirmationBox";

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
  const confirmationBoxRef = useRef<ConfirmationBoxMethods>(null);
  const db = useDatabase();
  const scrollRef = useRef<ScrollView>(null);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>("");
  const [requirementsAchieved, setRequirementsAchieved] = useState<number>(0);
  const { handlePlaySoundEffect } = useContext<SoundManagerContextType>(SoundManagerContext);

  useFocusEffect(useCallback(()=>{
    calculateRequirementsAchieved(); 
  }, []))

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

  const sumCompletedTask = (requirements:NoteTask[]) : number =>{
    let sum:number = 0;
    requirements.forEach((el, ind)=>{
      if(el.state == NoteTaskState.MARKED){
        sum++;
      }
    });
    return sum;
  };

  const calculateRequirementsAchieved = ()=>{
    const total:number = functionalRequirements.length + nonFunctionalRequirements.length;
    const achieved:number = sumCompletedTask(functionalRequirements) + sumCompletedTask(nonFunctionalRequirements);
    const percentage = (achieved / total) * 100;
    setRequirementsAchieved(percentage);
  };

  const handleOpenDeleteBox = ()=> {
    if(confirmationBoxRef.current){
      confirmationBoxRef.current.handleOpenModal();
    } 
  };

  const handleCloseMessage = ()=>{
    handlePlaySoundEffect(SoundEffect.close);
    setShowMessage(false);
    if(scrollRef.current != null){
      scrollRef.current.scrollTo({x:0, y:0})
    }
  };

  const handleSaveRequirements = async ()=>{
    if(db){
      const params = {key:pageInfo.key, functionalRequirements, nonFunctionalRequirements};
      const isSaved = await RequirementsPageController.saveRequirements({db, params});
      handlePlaySoundEffect(isSaved ? SoundEffect.success : SoundEffect.fail);
      handleShowMessage(isSaved ? MessageType.UPDATED : MessageType.NOT_UPDATED);
      calculateRequirementsAchieved();
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
          value={requirementsAchieved}
          titleColor="#fff"
          valueSuffix="%"
          radius={60}
          progressValueColor={'#0be646'}
          inActiveStrokeColor={"#222"}
          activeStrokeColor="#0be646"
          activeStrokeSecondaryColor="#95339b"
          duration={1000}
        />
      </View>
      <LongButton text="Save" handleOnPress={handleSaveRequirements} marginBottom={40} />
      <LongButton text="Delete" handleOnPress={handleOpenDeleteBox} marginBottom={40} />

      {(showMessage)?(
        <MessageBox handleOnPress={handleCloseMessage} messageText={messageText} />
      ):(
        <></>
      )}

    </ScrollView>

    <View>
      <ConfirmationBox 
        ref={confirmationBoxRef}
        message={"Delete this item"} 
        handleConfirm={handleDeleteNote}/>
    </View>

  </View>
  ); 
}

export default RequirementsPage;

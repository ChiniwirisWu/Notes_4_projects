import { StyleSheet, ScrollView } from "react-native";
import SingleLineTextInput from "../Create/SingleLineTextInput";
import TextAreaInput from "../Create/TextareaInput";
import Votation from "../Create/Votation";
import LongButton from "../Shared/LongButton";
import MessageBox from "../Shared/MessageBox";
import { NoteInfoWithJSON } from "@/constants/types";
import { useFocusEffect } from "expo-router";
import { SoundManagerContext, SoundManagerContextType, SoundType } from "@/components/Shared/SoundManager";
import { MessageType, getMessage } from "@/constants/messages";

import { useState, useRef, useCallback, useContext } from "react";
import { useDatabase } from "../Shared/DatabaseProvider";
import { tryConnectDB } from "@/constants/functions";

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    width: "100%"
  }
});

const DetailsPage = ({pageInfo}: {pageInfo:NoteInfoWithJSON})=>{

  const [title, setTitle] = useState<string>(pageInfo.title);
  const [description, setDescription] = useState<string>(pageInfo.description);
  const [score, setScore] = useState<number>(pageInfo != undefined ? pageInfo.score : 1);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>("");
  const scrollRef = useRef<ScrollView | null>(null);
  const {handlePlaySoundEffect} = useContext<SoundManagerContextType>(SoundManagerContext);

  const db = useDatabase();
  const [isDBReady, setIsDBReady] = useState<boolean>(false);
  
  useFocusEffect(
    useCallback(()=> {
      tryConnectDB({db, setIsDBReady, isDBReady});
    }, [isDBReady])
  );

  const handleCloseMessage = ()=>{
    setShowMessage(false);
    if(scrollRef.current != null){
      scrollRef.current.scrollTo({x: 0, y: 0});
    }
  };

  const handleSaveChanges = async ()=>{
    if(!db) return;
    try {
      const statement = await db.prepareAsync("UPDATE note SET title=$title, description=$description, score=$score WHERE key=$key");
      await statement.executeAsync({$title:title, $description:description, $score:score, $key:pageInfo.key});
      handleShowMessage(MessageType.QUERY_SUCCESS);

    } catch (e){
      console.error(e);
      handleShowMessage(MessageType.QUERY_FAILED);
    }
    console.log({title, score, description});
  }

  const handleShowMessage = (messageType:MessageType)=>{
    setMessageText(getMessage(messageType));
    setShowMessage(true);
    if(scrollRef.current != null){
      scrollRef.current.scrollToEnd();
    }
  }

  return (
    <ScrollView style={styles.container} ref={scrollRef}>
      <SingleLineTextInput fieldName="Title" value={title} setValue={setTitle} />
      <TextAreaInput fieldName="Description" marginBottom={40} value={description} setValue={setDescription} />
      <Votation score={score} setScore={setScore} />
      <LongButton text={"Save"} handleOnPress={()=>{
        handlePlaySoundEffect(SoundType.success);
        handleSaveChanges();
      }} />

      {(showMessage)?(
        <MessageBox 
          handleOnPress={()=>{
            handlePlaySoundEffect(SoundType.bump);
            handleCloseMessage();
          }} 
          messageText={messageText} />
      ):(
        <></>
      )}
    </ScrollView>
  ); 
}

export default DetailsPage;

import { View, StyleSheet, ScrollView } from "react-native";
import SingleLineTextInput from "../Create/SingleLineTextInput";
import TextAreaInput from "../Create/TextareaInput";
import Votation from "../Create/Votation";
import LongButton from "../Shared/LongButton";
import MessageBox from "../Shared/MessageBox";
import { ItemInfoWithJSON } from "@/constants/globalTypes";
import { useSQLiteContext } from "expo-sqlite";
import { useFocusEffect } from "expo-router";
import { SoundManagerContext, SoundManagerContextType, SoundType } from "@/components/Shared/SoundManager";

import { useState, useRef, useCallback, useContext } from "react";
import { useDatabase } from "../Shared/DatabaseProvider";
import { tryConnectDB } from "@/constants/functions";

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    width: "100%"
  }
});

const messageTexts = {
  succeed: "Note modified succesfully!🥳",
  error: "There was a problem creating this note. Hint: try with another title ⚠️"
};

enum MessageType {
  succeed,
  failed,
};

function getMessageText(messageType:MessageType) : string{
  switch(messageType){
    case MessageType.succeed: return messageTexts.succeed;
    case MessageType.failed: return messageTexts.error;
    default: return "";
  }
};

const DetailsPage = ({pageInfo}: {pageInfo:ItemInfoWithJSON})=>{

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
      const response = await statement.executeAsync({$title:title, $description:description, $score:score, $key:pageInfo.key});
      console.log({$title:title, $description:description, $score:score, $key: pageInfo.key})
      console.log(pageInfo);
      console.log("Note updated ✅");
      handleShowMessage(MessageType.succeed);

    } catch (e){
      console.error(e);
      handleShowMessage(MessageType.failed);
    }
    console.log(`Details Page: updating details...`);
    console.log({title, score, description});
  }

  const handleShowMessage = (messageType:MessageType)=>{
    setMessageText(getMessageText(messageType));
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
        handlePlaySoundEffect(SoundType.succeed);
        handleSaveChanges();
      }} />

      {(showMessage)?(
        <MessageBox 
          handleOnPress={()=>{
            handlePlaySoundEffect(SoundType.touched);
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

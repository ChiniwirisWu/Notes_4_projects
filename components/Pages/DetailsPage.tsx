import { StyleSheet, ScrollView } from "react-native";
import SingleLineTextInput from "../Create/SingleLineTextInput";
import TextAreaInput from "../Create/TextareaInput";
import Votation from "../Create/Votation";
import LongButton from "../Shared/LongButton";
import MessageBox from "../Shared/MessageBox";
import { NoteInfoWithJSON } from "@/constants/types";
import { SoundManagerContext, SoundManagerContextType, SoundType } from "@/components/Shared/SoundManager";
import { MessageType, getMessage } from "@/constants/messages";
import { useState, useRef, useCallback, useContext } from "react";
import { useDatabase } from "../Shared/DatabaseProvider";
import { DetailsPageController } from "@/controllers/detailsPageController";

import LoadingScreen from "../Shared/LoadingScreen";

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

  const handleCloseMessage = ()=>{
    handlePlaySoundEffect(SoundType.bump);
    setShowMessage(false);
    if(scrollRef.current != null){
      scrollRef.current.scrollTo({x: 0, y: 0});
    }
  };

  const handleSaveChanges = async ()=>{
    if(db){
      const fields = { title, description, score , key:pageInfo.key};
      const isSaved = await DetailsPageController.updateFieldsInDB({db, fields});
      handleShowMessage(isSaved ? MessageType.UPDATED : MessageType.NOT_UPDATED);
      handlePlaySoundEffect(isSaved ? SoundType.success : SoundType.fail);
    }
  }

  const handleShowMessage = (messageType:MessageType)=>{
    setMessageText(getMessage(messageType));
    setShowMessage(true);
    if(scrollRef.current != null){
      scrollRef.current.scrollToEnd();
    }
  }

  if(!db){
    return <LoadingScreen />
  }

  return (
    <ScrollView style={styles.container} ref={scrollRef}>
      <SingleLineTextInput fieldName="Title" value={title} setValue={setTitle} />
      <TextAreaInput fieldName="Description" marginBottom={40} value={description} setValue={setDescription} />
      <Votation score={score} setScore={setScore} />
      <LongButton text={"Save"} handleOnPress={handleSaveChanges} />

      {(showMessage)?(
        <MessageBox handleOnPress={handleCloseMessage} messageText={messageText} />
      ):(
        null
      )}
    </ScrollView>
  ); 
}

export default DetailsPage;

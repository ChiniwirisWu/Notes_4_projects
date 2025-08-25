import { View, ScrollView, } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from "expo-router";
import { Item } from "@/constants/listItem";
import g_style from "@/constants/styles";
import { useDatabase } from "@/components/Shared/DatabaseProvider";
import { tryConnectDB } from "@/constants/functions";
import { CreateController } from "@/controllers/createController";
import { 
  useState, 
  useRef, 
  useCallback,
  useContext
} from "react";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "@/constants/messages";

import Setting from "@/components/Shared/Setting";
import Title from "@/components/Shared/Title";
import SingleLineTextInput from "@/components/Create/SingleLineTextInput";
import TextAreaInput from "@/components/Create/TextareaInput";
import LongButton from "@/components/Shared/LongButton";
import IncrementableList from "@/components/Create/IncrementableList";
import Votation from "@/components/Create/Votation";
import MessageBox from "@/components/Shared/MessageBox";
import LoadingScreen from "@/components/Shared/LoadingScreen";
import { SoundType, SoundManagerContext, SoundManagerContextType } from "@/components/Shared/SoundManager";

enum MessageType {
  succeed,
  failed,
};

function getMessageText(messageType:MessageType) : string{
  switch(messageType){
    case MessageType.succeed: return SUCCESS_MESSAGES.NOTE_CREATED;
    case MessageType.failed: return ERROR_MESSAGES.NOTE_NOT_CREATED;
    default: return "";
  }
};

const Create = () => {
  const {handlePlaySoundEffect} = useContext<SoundManagerContextType>(SoundManagerContext);
  const [nonFunctionalRequirements, setNonFunctionalRequirements] = useState<Array<Item>>();
  const [functionalRequirements, setFunctionalRequirements] = useState<Array<Item>>();
  const [isDBReady, setIsDBReady] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [description, setDescription] = useState<string>();
  const [messageText, setMessageText] = useState<string>("");
  const scrollRef = useRef<ScrollView | null>(null);
  const [title, setTitle] = useState<string>();
  const [score, setScore] = useState<number>(1);
  const db = useDatabase();
  
  // 1) connect to db if it is disconnected and sound whenever user focuses the screen.
  useFocusEffect(
    useCallback(()=> {
      handlePlaySoundEffect(SoundType.bump);
      tryConnectDB({db, setIsDBReady, isDBReady});
    }, [isDBReady])
  );

  // 2) clean up all the fields and just that!
  const handleEmtpyAllFields = ()=>{
    setTitle("");
    setDescription("");
    setFunctionalRequirements([]);
    setNonFunctionalRequirements([]);
    setScore(1);
  };

  // 3) separate method to keep the behaviour manageable
  const scrollToTop = ()=>{
    if(scrollRef.current != null){
      scrollRef.current.scrollTo({x: 0, y:0});
    } 
  };

  // 4) Closes a messageBox and scrolls to top.
  const handleCloseMessage = ()=>{
    setShowMessage(false);
    handlePlaySoundEffect(SoundType.bump);
    scrollToTop();
  }

  const handleSaveNewNote = ()=>{
    if(!db) return;

    CreateController.saveNewNoteIntoDB(db, {title, description, functionalRequirements, nonFunctionalRequirements, score}).then(res=>{

      if(res){
        // if the note is saved then do success behaviour
        handleEmtpyAllFields();
        handlePlaySoundEffect(SoundType.success);
        handleShowMessage(MessageType.succeed);
      } else {
        // if the note is NOT saved then do success behaviour
        handlePlaySoundEffect(SoundType.fail);
        handleShowMessage(MessageType.failed);
      }})
  };

  const handleShowMessage = (messageType:MessageType)=>{
    setMessageText(getMessageText(messageType));
    setShowMessage(true);
    // This timeout ensures that it will scroll after the note finishes doing DB queries.
    setTimeout(()=>{
      if(scrollRef.current != null){
        scrollRef.current.scrollToEnd({animated:true});
      }
    }, 200);
  }

  // If the database is not set yet, this cuts the way of making an error with SQL queries.
  if(!db){
    <LoadingScreen />
  }

  // It loads only if the database is setted.
  return (
    <View style={g_style.container}>
      <ScrollView ref={scrollRef}>
        <Setting />
        <Title editable={false} />
        <SingleLineTextInput fieldName="Title" value={title} setValue={setTitle} />
        <TextAreaInput fieldName="Description" value={description} setValue={setDescription} marginBottom={40} />
        <IncrementableList 
          title="Functional Requirements" 
          alias="functionalR" 
          items={(functionalRequirements == undefined) ? [] : functionalRequirements} 
          setItems={setFunctionalRequirements}
        />
        <IncrementableList 
          title="Non Functional Requirements" 
          alias="functionalR"
          items={(nonFunctionalRequirements == undefined) ? [] : nonFunctionalRequirements} 
          setItems={setNonFunctionalRequirements}
        />
        <Votation score={score} setScore={setScore} />
        <LongButton text="Save" handleOnPress={handleSaveNewNote} marginBottom={10} />
        <LongButton text="Clear" handleOnPress={()=> {
          handlePlaySoundEffect(SoundType.close);
          handleEmtpyAllFields();
          scrollToTop();
        }} marginBottom={40} />

        {(showMessage)?(
          <MessageBox handleOnPress={handleCloseMessage} messageText={messageText} />
        ):(
          <></>
        )}

      </ScrollView>
      <StatusBar style="auto" /> 
    </View>
  );
};



export default Create;

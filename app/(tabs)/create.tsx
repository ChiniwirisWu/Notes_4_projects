import { View, ScrollView, } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from "expo-router";
import { Item } from "@/constants/listItem";
import { ItemInfo } from "@/constants/globalTypes";
import { defaultNoteValue } from "@/constants/defaultNoteObjectValues";
import g_style from "@/constants/styles";
import { generateKey, generateRandomInteger } from "@/constants/functions";
import { useDatabase } from "@/components/Shared/DatabaseProvider";
import { tryConnectDB } from "@/constants/functions";
import { CreateController } from "@/controllers/createController";
import { 
  useState, 
  useRef, 
  useCallback,
  useContext
} from "react";

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

const messageTexts = {
  succeed: "Note created succesfully!🥳",
  failed: "There was a problem creating this note. Hint: try with another title ⚠️"
};

enum MessageType {
  succeed,
  failed,
};

function getMessageText(messageType:MessageType) : string{
  switch(messageType){
    case MessageType.succeed: return messageTexts.succeed;
    case MessageType.failed: return messageTexts.failed;
    default: return "";
  }
};

const Create = () => {
  const db = useDatabase();
  const [isDBReady, setIsDBReady] = useState<boolean>(false);

  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [functionalRequirements, setFunctionalRequirements] = useState<Array<Item>>();
  const [nonFunctionalRequirements, setNonFunctionalRequirements] = useState<Array<Item>>();
  const [score, setScore] = useState<number>(1);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>("");
  const scrollRef = useRef<ScrollView | null>(null);


  const {handlePlaySoundEffect} = useContext<SoundManagerContextType>(SoundManagerContext);
  
  useFocusEffect(
    useCallback(()=> {
      handlePlaySoundEffect(SoundType.touched);
      tryConnectDB({db, setIsDBReady, isDBReady});
    }, [isDBReady])
  );

  const handleEmtpyAllFields = ()=>{
    setTitle("");
    setDescription("");
    setFunctionalRequirements([]);
    setNonFunctionalRequirements([]);
    setScore(1);
  };

  const scrollToTop = ()=>{
    if(scrollRef.current != null){
      scrollRef.current.scrollTo({x: 0, y:0});
    } 
  };

  const handleCloseMessage = ()=>{
    setShowMessage(false);
    handlePlaySoundEffect(SoundType.touched);
    if(scrollRef.current != null){
      scrollRef.current.scrollTo({x: 0, y:0});
    }
  }

  const handleSaveNewNote = ()=>{
    if(!db) return;

    CreateController.saveNewNoteIntoDB(db, {title, description, functionalRequirements, nonFunctionalRequirements, score}).then(res=>{

      if(res){
        console.log("created");
        handleEmtpyAllFields();
        handlePlaySoundEffect(SoundType.succeed);
        handleShowMessage(MessageType.succeed);
      } else {
        console.log("failed");
        handlePlaySoundEffect(SoundType.failed);
        handleShowMessage(MessageType.failed);
      }})
  };

  const handleShowMessage = (messageType:MessageType)=>{
    setMessageText(getMessageText(messageType));
    setShowMessage(true);
    setTimeout(()=>{
      if(scrollRef.current != null){
        scrollRef.current.scrollToEnd({animated:true});
      }
    }, 200)
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
          handlePlaySoundEffect(SoundType.touched);
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

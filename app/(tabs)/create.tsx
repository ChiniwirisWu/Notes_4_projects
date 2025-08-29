import { View, ScrollView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from "expo-router";
import { NoteTask } from "@/constants/types";
import g_styles from "@/constants/styles";
import { useDatabase } from "@/components/Shared/DatabaseProvider";
import { CreateController } from "@/controllers/createController";
import { 
  useState, 
  useRef, 
  useContext
} from "react";
import { 
  SoundType, 
  SoundManagerContext, 
  SoundManagerContextType 
} from "@/components/Shared/SoundManager";
import { MessageType, getMessage } from "@/constants/messages";

import Setting from "@/components/Shared/Setting";
import Title from "@/components/Shared/Title";
import SingleLineTextInput from "@/components/Create/SingleLineTextInput";
import TextAreaInput from "@/components/Create/TextareaInput";
import LongButton from "@/components/Shared/LongButton";
import IncrementableList from "@/components/Create/IncrementableList";
import Votation from "@/components/Create/Votation";
import MessageBox from "@/components/Shared/MessageBox";
import LoadingScreen from "@/components/Shared/LoadingScreen";



const Create = () => {
  const { handlePlaySoundEffect } = useContext<SoundManagerContextType>(SoundManagerContext);
  const [nonFunctionalRequirements, setNonFunctionalRequirements] = useState<Array<NoteTask>>([]);
  const [functionalRequirements, setFunctionalRequirements] = useState<Array<NoteTask>>([]);
  const [description, setDescription] = useState<string>("");
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>("");
  const scrollRef = useRef<ScrollView>(null);
  const [title, setTitle] = useState<string>("");
  const [score, setScore] = useState<number>(1);
  const db = useDatabase();
  
  // 1) connect to db if it is disconnected and sound whenever user focuses the screen.
  useFocusEffect(()=>{
    handlePlaySoundEffect(SoundType.bump);
  });

  // 2) clean up all the fields and just that!
  const handleEmtpyAllFields = ()=>{
    setFunctionalRequirements([]);
    setNonFunctionalRequirements([]);
    setDescription("");
    setTitle("");
    setScore(1);
  };

  const handleClearFields = ()=>{
    handlePlaySoundEffect(SoundType.close);
    handleEmtpyAllFields();
    if(scrollRef.current != null){
      scrollRef.current.scrollTo({x:0, y:0})
    }
  };

  const handleCloseMessage = ()=>{
    handlePlaySoundEffect(SoundType.close);
    setShowMessage(false);
    if(scrollRef.current != null){
      scrollRef.current.scrollTo({x:0, y:0})
    }
  };


  const handleSaveNewNote = ()=>{
    if(db){
    CreateController.saveNewNoteIntoDB(db, {title, description, functionalRequirements, nonFunctionalRequirements, score}).then(res=>{
      if(res){
        // if the note is saved then do success behaviour
        handleEmtpyAllFields();
        handlePlaySoundEffect(SoundType.success);
        handleShowMessage(MessageType.CREATED);
      } else {
        // if the note is NOT saved then do success behaviour
        handlePlaySoundEffect(SoundType.fail);
        handleShowMessage(MessageType.NOT_CREATED);
      }});
    }

  };

  const handleShowMessage = (messageType:MessageType)=>{
    // This timeout ensures that it will scroll after the note finishes doing DB queries.
    setTimeout(()=>{
      if(scrollRef.current != null){
        scrollRef.current.scrollToEnd({animated:true});
      }
    }, 200);

    setMessageText(getMessage(messageType));
    setShowMessage(true);
  }

  // If the database is not set yet, this cuts the way of making an error with SQL queries.
  if(!db){
    <LoadingScreen />
  }

  // It loads only if the database is setted.
  return (
    <View style={g_styles.container}>
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
        <LongButton text="Clear" handleOnPress={()=> {handleClearFields}} marginBottom={40} />

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

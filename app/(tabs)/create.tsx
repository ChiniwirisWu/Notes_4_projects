import { View, ScrollView, } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from "expo-router";
import { Item } from "@/constants/listItem";
import { defaultNoteValue } from "@/constants/defaultNoteObjectValues";
import g_style from "@/constants/styles";
import { generateKey, generateRandomInteger } from "@/constants/functions";
import { useDatabase } from "@/components/Shared/DatabaseProvider";
import { tryConnectDB } from "@/constants/functions";
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


const Create = () => {
  const db = useDatabase();
  const [isDBReady, setIsDBReady] = useState<boolean>(false);

  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [functionalRequirements, setFunctionalRequirements] = useState<Array<Item>>();
  const [nonFunctionalRequirements, setNonFunctionalRequirements] = useState<Array<Item>>();
  const [score, setScore] = useState<number>(1);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const scrollRef = useRef<ScrollView | null>(null);

  const {handlePlaySoundEffect} = useContext<SoundManagerContextType>(SoundManagerContext);
  
  useFocusEffect(
    useCallback(()=> {
      tryConnectDB({db, setIsDBReady});
    }, [isDBReady])
  );

  const handleEmtpyAllFields = ()=>{
    setTitle("");
    setDescription("");
    setFunctionalRequirements([]);
    setNonFunctionalRequirements([]);
    setScore(1);
    handlePlaySoundEffect(SoundType.pressed);
  };

  const handleCloseMessage = ()=>{
    setShowMessage(false);
    if(scrollRef.current != null){
      scrollRef.current.scrollTo({x: 0, y:0});
    }
  }

  const handleShowMessage = ()=>{
    setShowMessage(true);
    if(scrollRef.current != null){
      scrollRef.current.scrollToEnd();
    }
  }

  const handleSaveNewNote = async ()=>{

    try { 
      if(!db){
        console.error("La base de datos no ha sido inicializada todavia!");
        return;
      }

      const functionalRequirementsJSON = JSON.stringify(functionalRequirements);
      const nonFunctionalRequirementsJSON = JSON.stringify(nonFunctionalRequirements);
      const hashLength = 10;
      const alias = "note4projects";

      const statement = await db.prepareAsync(`
      INSERT INTO note (key, title, description, score, functionalRequirements, nonFunctionalRequirements) 
      VALUES ($key, $title, $description, $score, $functionalRequirements, $nonFunctionalRequirements);
      `);

      const result = await statement.executeAsync({
        $key: generateKey(generateRandomInteger(), hashLength, alias),
        $title: (title == "" || title == undefined) ? defaultNoteValue.title : title, 
        $description: (description == "" || description == undefined) ? defaultNoteValue.description : description, 
        $score: score, 
        $functionalRequirements: functionalRequirementsJSON,
        $nonFunctionalRequirements : nonFunctionalRequirementsJSON
      });

      // Show messages only if the note is saved.
      handleEmtpyAllFields();
      handleShowMessage();
    } catch (e){
      console.error(e);
    }
  };

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
        <LongButton text="Clear" handleOnPress={handleEmtpyAllFields} marginBottom={40} />

        {(showMessage)?(
          <MessageBox handleOnPress={handleCloseMessage} />
        ):(
          <></>
        )}

      </ScrollView>
      <StatusBar style="auto" /> 
    </View>
  );
};



export default Create;

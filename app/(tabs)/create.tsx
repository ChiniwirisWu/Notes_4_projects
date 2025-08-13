import { View, ScrollView, Modal, Text } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef, useCallback } from "react";

import Setting from "@/components/Shared/Setting";
import Title from "@/components/Shared/Title";
import SingleLineTextInput from "@/components/Create/SingleLineTextInput";
import TextAreaInput from "@/components/Create/TextareaInput";
import LongButton from "@/components/Shared/LongButton";
import IncrementableList from "@/components/Create/IncrementableList";
import Votation from "@/components/Create/Votation";
import { Item } from "@/constants/listItem";

import { useSQLiteContext } from "expo-sqlite";
import { generateKey } from "@/constants/functions";

import g_style from "@/constants/styles";
import { defaultNoteValue } from "@/constants/defaultNoteObjectValues";
import MessageBox from "@/components/Shared/MessageBox";
import g_styles from "@/constants/styles";
import { showErrorCSS } from "react-native-svg/lib/typescript/deprecated";
import { useFocusEffect } from "expo-router";

const Create = () => {
  const db = useSQLiteContext();
  const [isDBReady, setIsDBReady] = useState<boolean>(false);
  
  useFocusEffect(useCallback(()=>{
    console.log("Create component - Checking DB state...")
    if(db){
      console.log("Database ready to use!");
      setIsDBReady(true);
    } else {
      console.log("Database not to use!");
      setIsDBReady(false);
    }
  }, [isDBReady]));

  // These are the fields of a Note object that will be saved in the DB.
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [functionalRequirements, setFunctionalRequirements] = useState<Array<Item>>();
  const [nonFunctionalRequirements, setNonFunctionalRequirements] = useState<Array<Item>>();
  const [score, setScore] = useState<number>(1);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const scrollRef = useRef(null);

  const handleEmtpyAllFields = ()=>{
    console.log("emptyAllFields() executed");
    setTitle("");
    setDescription("");
    setFunctionalRequirements([]);
    setNonFunctionalRequirements([]);
    setScore(1);
  };

  const handleCloseMessage = ()=>{
    setShowMessage(false);
    scrollRef.current.scrollTo({x: 0, y:0});
  }

  const handleShowMessage = ()=>{
    setShowMessage(true);
    if(scrollRef.current != null){
      //scrollRef.current.scrollTo({x: 0, y: 0});
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

      const statement = await db.prepareAsync(`
      INSERT INTO note (title, description, score, functionalRequirements, nonFunctionalRequirements) 
      VALUES ($title, $description, $score, $functionalRequirements, $nonFunctionalRequirements);
      `);
      console.log("handleSaveNewNote() saving new object...");
      console.log({title, description, score, functionalRequirementsJSON, nonFunctionalRequirementsJSON});
      const result = await statement.executeAsync({
        $title: (title == "" || title == undefined) ? defaultNoteValue.title : title, 
        $description: (description == "" || description == undefined) ? defaultNoteValue.description : description, 
        $score: score, 
        $functionalRequirements: functionalRequirementsJSON,
        $nonFunctionalRequirements : nonFunctionalRequirementsJSON
      });
      console.log("handleSaveNewNote() object saved!");
      await result.resetAsync();
      handleEmtpyAllFields();
      handleShowMessage();
    } catch (e){
      console.error(e);
    }
  };

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

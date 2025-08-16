import { View, StyleSheet, ScrollView } from "react-native";
import SingleLineTextInput from "../Create/SingleLineTextInput";
import TextAreaInput from "../Create/TextareaInput";
import Votation from "../Create/Votation";
import LongButton from "../Shared/LongButton";
import MessageBox from "../Shared/MessageBox";
import { ItemInfoWithJSON } from "@/constants/globalTypes";
import { useSQLiteContext } from "expo-sqlite";
import { useFocusEffect } from "expo-router";

import { useState, useRef, useCallback } from "react";
import { useDatabase } from "../Shared/DatabaseProvider";
import { tryConnectDB } from "@/constants/functions";

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    width: "100%"
  }
});

const DetailsPage = ({pageInfo}: {pageInfo:ItemInfoWithJSON})=>{

  const [title, setTitle] = useState<string>(pageInfo.title);
  const [description, setDescription] = useState<string>(pageInfo.description);
  const [score, setScore] = useState<number>(pageInfo != undefined ? pageInfo.score : 1);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const scrollRef = useRef<ScrollView | null>(null);

  const db = useDatabase();
  const [isDBReady, setIsDBReady] = useState<boolean>(false);
  
  useFocusEffect(
    useCallback(()=> {
      tryConnectDB({db, setIsDBReady});
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
      console.log("Updating the note...");
      const statement = await db.prepareAsync("UPDATE note SET title=$title, description=$description, score=$score WHERE key=$key");
      const response = await statement.executeAsync({$title:title, $description:description, $score:score, $key:pageInfo.key});
      console.log({$title:title, $description:description, $score:score, $key: pageInfo.key})
      console.log(pageInfo);
      console.log("Note updated ✅");

    } catch (e){
      console.error(e);
    }
    console.log(`Details Page: updating details...`);
    console.log({title, score, description});
    handleShowMessage();
  }

  const handleShowMessage = ()=>{
    setShowMessage(true);
    if(scrollRef.current != null){
      scrollRef.current.scrollToEnd();
    }
  };

  return (
    <ScrollView style={styles.container} ref={scrollRef}>
      <SingleLineTextInput fieldName="Title" value={title} setValue={setTitle} />
      <TextAreaInput fieldName="Description" marginBottom={40} value={description} setValue={setDescription} />
      <Votation score={score} setScore={setScore} />
      <LongButton text={"Save"} handleOnPress={handleSaveChanges} />

      {(showMessage)?(
        <MessageBox handleOnPress={handleCloseMessage} />
      ):(
        <></>
      )}
    </ScrollView>
  ); 
}

export default DetailsPage;

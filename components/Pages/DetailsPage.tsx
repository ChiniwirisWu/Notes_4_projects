import { View, StyleSheet, ScrollView } from "react-native";
import SingleLineTextInput from "../Create/SingleLineTextInput";
import TextAreaInput from "../Create/TextareaInput";
import Votation from "../Create/Votation";
import LongButton from "../Shared/LongButton";
import MessageBox from "../Shared/MessageBox";
import { ItemInfo } from "@/constants/globalTypes";
import { useSQLiteContext } from "expo-sqlite";

import { useState, useRef } from "react";

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    width: "100%"
  }
});

type ScrollViewRef = React.RefObject<ScrollView>;

const DetailsPage = ({pageInfo, handleOnSave}: {pageInfo:ItemInfo, handleOnSave:(newPageInfo:ItemInfo)=> void})=>{

  const [title, setTitle] = useState<string>(pageInfo != undefined ? pageInfo.title : "");
  const [score, setScore] = useState<number>(pageInfo != undefined ? pageInfo.score : 1);
  const [description, setDescription] = useState<string>(pageInfo != undefined ? pageInfo.description : "");
  const [showMessage, setShowMessage] = useState<boolean>(true);
  const scrollRef = useRef<ScrollViewRef>(null);

  const db = useSQLiteContext();
  console.log("DetailsPage - Database status...");
  console.log(db);

  const handleCloseMessage = ()=>{
    setShowMessage(false);
    scrollRef.current.scrollTo({x: 0, y: 0});
  };

  const handleSaveChanges = async ()=>{
    try {
      console.log("Updating the note...");
      const statement = await db.prepareAsync("UPDATE note SET title=$title, description=$description, score=$score WHERE id=$key");
      const response = await statement.executeAsync({$title:title, $description:description, $score:score, $key:pageInfo.key});
      console.log("Note updated ✅");
      handleOnSave({
        key: pageInfo.key,
        title: title,
        description: description,
        score: score,
        functionalRequirements: pageInfo.functionalRequirements,
        nonFunctionalRequirements: pageInfo.nonFunctionalRequirements
      });
      console.log("Notes updated in the home screen  ✅");
      
    } catch (e){
      console.error(e);
    }
    console.log(`Details Page: updating details...`);
    console.log({title, score, description});
    handleShowMessage();
  }

  const handleShowMessage = ()=>{
    setShowMessage(true);
    scrollRef.current.scrollToEnd();
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

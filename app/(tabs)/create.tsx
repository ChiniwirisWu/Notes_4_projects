import { View, ScrollView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useState } from "react";

import Setting from "@/components/Shared/Setting";
import Title from "@/components/Shared/Title";
import SingleLineTextInput from "@/components/Create/SingleLineTextInput";
import TextAreaInput from "@/components/Create/TextareaInput";
import LongButton from "@/components/Shared/LongButton";
import IncrementableList from "@/components/Create/IncrementableList";
import Votation from "@/components/Create/Votation";
import { Item } from "@/constants/listItem";

import { useSQLiteContext } from "expo-sqlite";

import g_style from "@/constants/styles";

const Create = () => {
  const db = useSQLiteContext();
  console.log(`Create Component-Database status: ${db}`);

  // These are the fields of a Note object that will be saved in the DB.
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [functionalRequirements, setFunctionalRequirements] = useState<Array<Item>>();
  const [nonFunctionalRequirements, setNonFunctionalRequirements] = useState<Array<Item>>();
  const [score, setScore] = useState<number>(1);


  return (
    <ScrollView style={g_style.container}>
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
        title="Functional Requirements" 
        alias="functionalR"
        items={(nonFunctionalRequirements == undefined) ? [] : nonFunctionalRequirements} 
        setItems={setNonFunctionalRequirements}
      />
      <Votation score={score} setScore={setScore} />
      <LongButton text="Save/Quit" onPress={()=> {}} marginBottom={10} />
      <LongButton text="Clear" onPress={()=> {}} marginBottom={40} />
      <StatusBar style="auto" />
    </ScrollView>
  );
};


export default Create;

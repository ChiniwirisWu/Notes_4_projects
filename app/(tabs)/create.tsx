import { View, ScrollView } from "react-native";
import { StatusBar } from 'expo-status-bar';

import Setting from "@/components/Shared/Setting";
import Title from "@/components/Shared/Title";
import SingleLineTextInput from "@/components/Create/SigleLineTextInput";
import TextAreaInput from "@/components/Create/TextareaInput";
import LongButton from "@/components/Shared/LongButton";
import IncrementableList from "@/components/Create/IncrementableList";
import Votation from "@/components/Create/Votation";

import g_style from "@/constants/styles";

const Create = () => {

  return (
    <ScrollView style={g_style.container}>
      <Setting />
      <Title editable={false} />
      <SingleLineTextInput fieldName="Title" />
      <TextAreaInput fieldName="Description" marginBottom={40} />
      <IncrementableList title="Functional Requirements" alias="functionalR"/>
      <IncrementableList title="Functional Requirements" alias="functionalR"/>
      <Votation />
      <LongButton text="Save/Quit" onPress={()=> {}} marginBottom={10} />
      <LongButton text="Clear" onPress={()=> {}} marginBottom={40} />
      <StatusBar style="auto" />
    </ScrollView>
  );
};


export default Create;

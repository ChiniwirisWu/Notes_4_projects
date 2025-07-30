import { View, ScrollView } from "react-native";
import { StatusBar } from 'expo-status-bar';

import Setting from "@/components/Shared/Setting";
import Title from "@/components/Shared/Title";
import SingleLineTextInput from "@/components/Create/SigleLineTextInput";
import TextAreaInput from "@/components/Create/TextareaInput";
import SaveButton from "@/components/Shared/SaveButton";
import IncrementableList from "@/components/Create/IncrementableList";

import g_style from "@/constants/styles";

const Create = () => {

  return (
    <ScrollView style={g_style.container}>
      <Setting />
      <Title editable={false} />
      <SingleLineTextInput fieldName="Title" />
      <TextAreaInput fieldName="Description" />
      <IncrementableList title="Functional Requirements" alias="functionalR"/>
      <IncrementableList title="Functional Requirements" alias="functionalR"/>
      <SaveButton onSaveQuit={()=> {}} />
      <StatusBar style="auto" />
    </ScrollView>
  );
};


export default Create;

import { View } from "react-native";
import { StatusBar } from 'expo-status-bar';

import Setting from "@/components/setting";
import Title from "@/components/title";
import SingleLineTextInput from "@/components/sigleLineTextInput";
import TextAreaInput from "@/components/textareaInput";
import SaveButton from "@/components/saveButton";
import IncrementableList from "@/components/incrementableList";

import g_style from "@/constants/styles";

const Create = () => {

  return (
    <View style={g_style.container}>
      <Setting />
      <Title />
      <SingleLineTextInput fieldName="Title" />
      <TextAreaInput fieldName="Description" />
      <IncrementableList title="Functional Requirements" />
      <SaveButton onSaveQuit={()=> {}} />
      <StatusBar style="auto" />
    </View>
  );
};


export default Create;

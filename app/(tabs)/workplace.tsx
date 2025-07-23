import { View } from "react-native";
import { StatusBar } from 'expo-status-bar';

import Setting from "../../components/setting.tsx";
import Title from "../../components/title";
import SingleLineTextInput from "../../components/sigleLineTextInput.tsx";
import TextAreaInput from "../../components/textareaInput.tsx";
import SaveButton from "../../components/saveButton.tsx";

import g_style from "../../constants/styles.ts";

const Workplace = () => {

  return (
    <View style={g_style.container}>
      <Setting />
      <Title />
      <SingleLineTextInput fieldName="Title" />
      <TextAreaInput fieldName="Description" />
      <StatusBar style="auto" />
      <SaveButton onSaveQuit={()=> {}} />
    </View>
  );
};


export default Workplace;

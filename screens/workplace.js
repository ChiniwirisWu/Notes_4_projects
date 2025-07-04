import { View } from "react-native";
import { StatusBar } from 'expo-status-bar';

import Setting from "../components/setting.js";
import Title from "../components/title.js";
import SingleLineTextInput from "../components/sigleLineTextInput.js";
import TextAreaInput from "../components/textareaInput.js";
import SaveButton from "../components/saveButton.js";

import g_style from "../extra/styles.js";

const Workplace = () => {

  return (
    <View style={g_style.container}>
      <Setting />
      <Title />
      <SingleLineTextInput fieldName="Title" />
      <TextAreaInput fieldName="Description" />
      <StatusBar style="auto" />
      <SaveButton />
    </View>
  );
};


export default Workplace;

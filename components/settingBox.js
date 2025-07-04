import { View, StyleSheet, Text, TextInput } from "react-native";
import { useState } from "react";
import g_styles from "../extra/styles.js";
import SaveButton from "./saveButton.js";
import SettingButton from "./settingButton.js";

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000",
  },

  container: {
    marginTop: 50,
    width: "80%",
    padding: 10,
    height: "30%"
  },

});

const SettingBox = (props)=> {
  // I need to extract the values from somewhere.
  const [musicEnable, setMusicEnable] = useState(true);
  const [sfxEnable, setSfxEnable] = useState(false);

  return (
    <View style={styles.center}>
      <View style={styles.container}>
        <Text style={[g_styles.p, g_styles.titleMargin, {alignSelf: "center"}]}>Settings</Text>
        <SettingButton titleEnable="Music On" titleDisable="Music Off" settingEnable={musicEnable} onSettingSwitch={()=> setMusicEnable(!musicEnable)} />
        <SettingButton titleEnable="SFX On" titleDisable="SFX Off" settingEnable={sfxEnable} onSettingSwitch={()=> setSfxEnable(!sfxEnable)} />
        <SaveButton onSaveQuit={props.onSaveQuit} />
      </View>
    </View>
  );
}

export default SettingBox;

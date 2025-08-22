import { View, StyleSheet, Text, TextInput } from "react-native";
import { useState, useContext } from "react";
import g_styles from "@/constants/styles";
import { SoundManagerContext, SoundManagerContextType } from "./SoundManager";
import LongButton from "@/components/Shared/LongButton";
import SettingButton from "@/components/Shared/SettingButton";

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

type SettingBoxProps = {
  titleEnable:string,
  titleDisable:string,
  settingEnable:boolean,
  onSettingSwitch:()=>void
};

const SettingBox = ({handleSaveQuit} : {handleSaveQuit: ()=> void})=> {
  // I need to extract the values from somewhere.
  const { musicOn, sfxOn, handleTurnOffSfx, handleTurnOnSfx, handleTurnOffMusic, handleTurnOnMusic } = useContext<SoundManagerContextType>(SoundManagerContext);

  return (
    <View style={styles.center}>
      <View style={styles.container}>
        <Text style={[g_styles.p, g_styles.titleMargin, {alignSelf: "center"}]}>Settings</Text>
        <SettingButton props={{
            titleEnable:"Music On",
            titleDisable:"Music Off",
            settingEnable:musicOn,
            onSettingSwitch:()=> musicOn ? handleTurnOffMusic() : handleTurnOnMusic() 
        }}/>
        <SettingButton props={{
            titleEnable:"SFX On",
            titleDisable:"SFX Off",
            settingEnable:sfxOn,
            onSettingSwitch:()=> sfxOn ? handleTurnOffSfx() : handleTurnOnSfx()
        }}/>
        <LongButton text="Save/Quit" handleOnPress={handleSaveQuit} />
      </View>
    </View>
  );
}

export default SettingBox;

import { useState, useCallback, useContext } from "react";
import { useFocusEffect } from "expo-router";
import { useDatabase } from "./DatabaseProvider";

import { View, StyleSheet, Pressable, Modal } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SettingsController } from "@/controllers/settingsController";
import { tryConnectDB } from "@/constants/functions";
import { SoundManagerContext, SoundManagerContextType, SoundType } from "./SoundManager";
import { ERROR_MESSAGES } from "@/constants/messages";

import g_styles from "@/constants/styles";
import SettingBox from "@/components/Shared/SettingBox";

const Setting = () =>{
  const [showModal, setShowModal] = useState(false);
  const [isDBReady, setIsDBReady] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const db = useDatabase();
  const { handleTurnOnSfx, handleTurnOffSfx, handleTurnOnMusic, handleTurnOffMusic, handlePlaySoundEffect, sfxOn, musicOn } = useContext<SoundManagerContextType>(SoundManagerContext);

  // 1) This set's up the initial settings.
  useFocusEffect(useCallback(()=>{

    if(!tryConnectDB({db, setIsDBReady, isDBReady})){
      return; // quick return to re-render.
    };

    if(isDBReady && db != null){
      SettingsController.getSettings(db).then(result=>{
        // takes the values from DB and if musicOn or sfxOn it do a behaviour.
        const {title, musicOn, sfxOn} = result;   
        setTitle(title);
        (musicOn) ? handleTurnOnMusic() : handleTurnOffMusic();
        (sfxOn) ? handleTurnOnSfx() : handleTurnOffSfx();
      }); 
    };
  }, [isDBReady]));

  // 2) This handler updates the database "musicOn" variable and handles the SoundManager as well
  const setMusicOnDB = async ()=>{
    if(!db){
      console.warn(ERROR_MESSAGES.DATABASE_NOT_LOADED);
      return;
    };
    await SettingsController.updateMusicOn(db, !musicOn);
    (musicOn) ? handleTurnOffMusic() : handleTurnOnMusic(); // if it is on, then turn off and viceversa.
  };

  // 3) This handler updates the database "sfxOn" variable and handles the SoundManager as well
  const setSfxOnDB = async ()=>{
    if(!db){
      console.warn(ERROR_MESSAGES.DATABASE_NOT_LOADED);
      return;
    };
    await SettingsController.updateSfxOn(db, !sfxOn);
    (sfxOn) ? handleTurnOffSfx() : handleTurnOnSfx(); // if it is on, then turn off and viceversa.

  };

  
  return (
    <View style={styles.container}>
      <Modal
        visible={showModal}
        backdropColor={"#000"}
        onRequestClose={()=> setShowModal(false)}
      >
        <SettingBox 
          handleSaveQuit={()=> {
            handlePlaySoundEffect(SoundType.touched);
            setShowModal(false)
          }} 
          handleChangeMusicOn={setMusicOnDB}
          handleChangeSfxOn={setSfxOnDB}
        />
      </Modal>

      <Pressable style={[g_styles.pressable, {marginTop: 30}]} onPress={()=> setShowModal(true)}>

        <MaterialCommunityIcons
          name="dots-vertical"
          size={35}
          color="#fff"
        />

      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

});

export default Setting;


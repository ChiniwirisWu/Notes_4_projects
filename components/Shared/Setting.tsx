import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { useDatabase } from "./DatabaseProvider";

import { View, StyleSheet, Pressable, Modal } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SettingsController } from "@/controllers/settingsController";
import { tryConnectDB } from "@/constants/functions";

import g_styles from "@/constants/styles";
import SettingBox from "@/components/Shared/SettingBox";

const Setting = () =>{
  const [showModal, setShowModal] = useState(false);
  const [isDBReady, setIsDBReady] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [musicOn, setMusicOn] = useState<number>(1);
  const [sfxOn, setSfxOn] = useState<number>(1);
  const db = useDatabase();

  //TODO: enable the change of the value of musicOn and sfxOn and keep it in the database.
  
  useFocusEffect(useCallback(()=>{

    tryConnectDB({db, setIsDBReady});

    if(isDBReady && db != null){
      SettingsController.getSettings(db).then(result=>{
        const {title, musicOn, sfxOn} = result;   
        setTitle(title);
        setMusicOn(musicOn);
        setSfxOn(sfxOn);
      }); 
    };
  }, []));


  return (
    <View style={styles.container}>
      <Modal
        visible={showModal}
        backdropColor={"#000"}
        onRequestClose={()=> setShowModal(false)}
      >
        <SettingBox handleSaveQuit={()=> setShowModal(false)} />
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


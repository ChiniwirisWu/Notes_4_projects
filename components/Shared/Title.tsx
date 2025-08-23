import { useState, useCallback, useContext } from "react";
import { useDatabase } from "./DatabaseProvider";
import { useFocusEffect } from "expo-router";
import { tryConnectDB } from "@/constants/functions";
import { SettingsController } from "@/controllers/settingsController";
import { View, StyleSheet, TextInput, Pressable, Text, Modal } from "react-native";
import { SoundManagerContext, SoundManagerContextType, SoundType } from "./SoundManager";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fonts from "@/constants/fonts";
import TitleBox from "@/components/Shared/titleBox";


const Title = ({editable}: {editable:boolean}) =>{
  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [isDBReady, setIsDBReady] = useState<boolean>(false);
  const {handlePlaySoundEffect} = useContext<SoundManagerContextType>(SoundManagerContext);
  const db = useDatabase();

  useFocusEffect(
    useCallback(()=> {

      tryConnectDB({db, setIsDBReady, isDBReady});

      if(isDBReady && db != null){
        SettingsController.getTitle(db).then(response=>{
          setTitle(response.title);
        });
      };
    }, [isDBReady])
  );

  // this changes the title in the db and localy in it's state.
  const handleTitleChange = ()=>{
    if(db != null){
      SettingsController.updateTitle(db, title);
      setTitle(title);
      setShowModal(false);
      handlePlaySoundEffect(SoundType.touched);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={showModal}
        backdropColor={"#000"}
      >
        <TitleBox title={title} handleOnTitleChange={setTitle} handleTitleChange={handleTitleChange} />
      </Modal>

      <Pressable onPress={()=> (editable) ? setShowModal(true) : console.log("Non editable.")}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    justifyContent: "center"
  },

  text: {
    fontSize: 40,
    color: "#fff",
    fontFamily: Fonts.vt323,
  }

});

export default Title;


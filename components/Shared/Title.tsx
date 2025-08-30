import { useState, useContext, useEffect } from "react";
import { SettingsController } from "@/controllers/settingsController";
import { View, StyleSheet, Pressable, Text, Modal } from "react-native";
import { SoundManagerContext, SoundManagerContextType, SoundEffect } from "./SoundManager";
import Fonts from "@/constants/fonts";
import TitleBox from "@/components/Shared/titleBox";
import { useDatabase } from "./DatabaseProvider";


//1) editable param is set because I only want to modify it's name at home screen but use this component also in create screen.
const Title = ({editable}: {editable:boolean}) =>{

  const { handlePlaySoundEffect } = useContext<SoundManagerContextType>(SoundManagerContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const db = useDatabase();

  useEffect(()=>{
    if(db){
      fetchingTitle();
    };
  }, [db]);

  const fetchingTitle = async ()=>{
    if(db){
      SettingsController.getTitleFromDB(db).then(response=>{
        setTitle(response.title);
      });
    };
  };

  // 3) this changes the title in the db and localy in it's state.
  const handleTitleChange = ()=>{
    if(db){
      handlePlaySoundEffect(SoundEffect.success);
      // Update at the database
      SettingsController.updateTitleInDB(db, title);
      // Update locally so it renders the new element.
      setTitle(title);
      setShowModal(false);
    }
  };

  return (
    <View style={styles.container}>
      <Modal visible={showModal} backdropColor={"#000"}>
        <TitleBox 
          title={title} 
          handleOnTitleChange={setTitle} 
          handleTitleChange={handleTitleChange} 
        />
      </Modal>

      <Pressable onPress={()=> (editable) ? setShowModal(true) : null}>
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


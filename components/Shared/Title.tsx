import { View, StyleSheet, TextInput, Pressable, Text, Modal } from "react-native";
import { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fonts from "@/constants/fonts";
import TitleBox from "@/components/Shared/titleBox";


const Title = ({editable}: {editable:boolean}) =>{
  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("Brain Storming");

  // this changes the title in the db and localy in it's state.
  const handleTitleChange = ()=>{
    setTitle(title);
    setShowModal(false);
    //TODO: change the title in the database as well.
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


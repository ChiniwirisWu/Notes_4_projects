import { View, StyleSheet, TextInput, Pressable, Text, Modal } from "react-native";
import { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fonts from "../extra/fonts.tsx";
import TitleBox from "./titleBox.tsx";


const Title = () =>{
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.container}>
      <Modal
        visible={showModal}
        backdropColor={"#000"}
      >
        <TitleBox title="Brain storming" onSaveQuit={()=> setShowModal(false)} />
      </Modal>

      <Pressable onPress={()=> setShowModal(!showModal)}>
        <Text style={styles.text}>Brain storming</Text>
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


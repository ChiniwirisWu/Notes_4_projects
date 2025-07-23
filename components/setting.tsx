import { useState } from "react";
import { View, StyleSheet, Pressable, Modal } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import g_styles from "../constants/styles.ts";
import SettingBox from "./settingBox.tsx";

const Setting = () =>{
  const [showModal, setShowModal] = useState(true);

  return (
    <View style={styles.container}>
      <Modal
        visible={showModal}
        backdropColor={"#000"}
      >
        <SettingBox onSaveQuit={()=> setShowModal(false)} />
      </Modal>

      <Pressable style={g_styles.pressable} onPress={()=> setShowModal(true)}>

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


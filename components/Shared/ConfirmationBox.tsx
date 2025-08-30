// This component should always have a parent Context to get the handlers. 
import { View, Text, StyleSheet, Modal } from "react-native";
import { useImperativeHandle, forwardRef, useState, useContext } from "react";
import { SoundManagerContext, SoundManagerContextType, SoundEffect } from "./SoundManager";
import g_styles from "@/constants/styles";
import LongButton from "./LongButton";

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#000",
  },
  container: {
    paddingTop: 20
  },
  title: {
    fontSize: 30,
    marginBottom: 40,
    textAlign: "center"
  }
})

export interface ConfirmationBoxProps {
  message:string, 
  handleConfirm: ()=> void
};

export interface ConfirmationBoxMethods {
  handleOpenModal : ()=> void
};

const ConfirmationBox = forwardRef<ConfirmationBoxMethods, ConfirmationBoxProps>((props, ref)=>{
  const { handlePlaySoundEffect } = useContext<SoundManagerContextType>(SoundManagerContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { handleConfirm, message } = props;

  const handleCloseModal = ()=>{
    handlePlaySoundEffect(SoundEffect.bump);
    setShowModal(false);
  };

  const handleOpenModal = ()=>{
    handlePlaySoundEffect(SoundEffect.bump);
    setShowModal(true);
  };

  useImperativeHandle(ref, ()=> ({
    handleOpenModal
  }));
  
  return (
    <Modal visible={showModal} transparent={true} >
      <View style={styles.modalOverlay}>
        <View style={g_styles.container}>
          <Text style={[g_styles.p, styles.title]}>{message}</Text>
          <LongButton text="Yes" handleOnPress={()=>{
            handleConfirm();
            handleCloseModal();
          }} marginBottom={20} />
          <LongButton text="No" handleOnPress={handleCloseModal} marginBottom={20} />
        </View>
      </View>
    </Modal>
  );

});


export default ConfirmationBox;

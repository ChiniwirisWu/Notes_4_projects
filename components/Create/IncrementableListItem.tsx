import { Item, ItemStates, getStateColor } from "@/constants/listItem";
import { View, TextInput, StyleSheet, Modal } from "react-native";
import { useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import g_styles from "@/constants/styles";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import ConfirmationBox from "../Shared/ConfirmationBox";
import { runOnJS } from "react-native-reanimated";

const styles = StyleSheet.create({
  ListItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    height: 52,
  },
  textInput: {
    width: "100%"
  },
});

type IncrementableListItemParams = {
  itemInfo:Item, // key is used to modify or delete in the db with sql queries.
  onLongPress:()=> void,
  handleChangeText: (itemInfo:Item, itemIndex:number)=> void,
  itemIndex:number // this is used to modify or delete in the array in the moment of creation.
};


const IncrementableListItem = ({itemInfo, onLongPress, handleChangeText, itemIndex} : IncrementableListItemParams) => {

  // initialize with itemInfo from DB.
  const [state, setState] = useState<ItemStates>(itemInfo.state);
  const [title, setTitle] = useState<String>((state == ItemStates.empty) ? "Insert text" : itemInfo.title);

  const [showModal, setShowModal] = useState<boolean>(false);

  const onTitleChange = (text:String)=>{
    // It manages it's information by itself and also changes the database info. 
    const nextState = (text.length < 1) ? ItemStates.empty : ItemStates.filled;
    const nextTitle = (text.length < 1) ? "Insert text" : text;
    setState(nextState);
    setTitle(nextTitle);
    // update the db also.
    handleChangeText({key: itemInfo.key, title:nextTitle, state:nextState}, itemIndex);
  }

  const handleOpenDeleteBox = ()=>{
    try {
      setShowModal(true);
    } catch(e){
      console.error("Error: " + e);
    }
  }

  const handleOpenMarkBox = ()=>{
    try {
      if(state == ItemStates.filled){
        console.log("Element " + itemInfo.key + " marked");
      } else {
        console.log("Cannot mark an empty element.");
      }
    } catch(e){
      console.error("Error: " + e);
    }
  }

  const longPressGesture = Gesture.LongPress()
    .minDuration(500)
    .onEnd(()=>{
      runOnJS(handleOpenDeleteBox)();
    })

  const tapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(()=>{
      runOnJS(handleOpenMarkBox)();
    });

  const gestures = Gesture.Simultaneous(longPressGesture, tapGesture);

  return (
    <View style={styles.ListItem}>
      <GestureDetector gesture={gestures}>
        <FontAwesome6 name="square-plus" size={24} color={getStateColor(state)} />
      </GestureDetector>
      <TextInput 
        onChangeText={(e)=> onTitleChange(e)} 
        style={[g_styles.p, styles.textInput]} 
        value={(state == ItemStates.empty) ? undefined : title.toString()} 
        placeholderTextColor="#fff" 
        placeholder={title.toString()} 
      />
      <Modal
        visible={showModal}
        backdropColor={"#000"}
      >
        <ConfirmationBox message={"Delete this item"} onConfirm={()=> setShowModal(false)} onCancel={()=> setShowModal(false)} />
      </Modal>
    </View>

  );
};

export default IncrementableListItem;

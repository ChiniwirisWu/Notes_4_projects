import { useState } from "react";
import Animated, { 
  FlatList, 
  View, 
  Text, 
  Pressable, 
  StyleSheet, 
  TextInput,
} from "react-native";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { MessageStates,
  ItemStates, 
  Key, 
  Item,
  getMessage,
  getMessageColor,
  getStateColor
} 
from "@/constants/listItem"; import g_styles from "@/constants/styles";
import { generateKey } from "@/constants/functions";
import IconButton from "@/components/Shared/IconButton";
import IncrementableListItem from "./IncrementableListItem";
import ConfirmationBox from "../Shared/ConfirmationBox";


const styles = StyleSheet.create({
  container:{
    marginBottom: 50
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30
  },
  message: {
    textAlign: "center",
    color: "#fced0f",
    marginBottom: 10,
  }
});

type IncrementableListParams = {
  title:string, 
  alias:string
  items:(Item[]),
  setItems: (items:Item[])=> void
};


const IncrementableList = ({title, alias, items, setItems}: IncrementableListParams)=>{
  // ordinary states...
  const [showMessage, setShowMessage] = useState<boolean>(true); // if true shows message and hides list.
  const [messageState, setMessageState] = useState<MessageStates>(MessageStates.empty);
  const [messageColor, setMessageColor] = useState<String>(getMessageColor(messageState));

  // header button's on-type methods.
  const handleAddEmptyListItem = (id:number, alias:string)=>{
    const hashLength = 10;
    const newItem = {key: generateKey(id, hashLength, alias), title: "", state: ItemStates.empty};
    setItems([...items, newItem]);
    setShowMessage(false);
    console.log(items);
  };

  const updateListItem = (itemInfo:Item, itemIndex:number)=>{
    if(itemIndex <= items.length){
      const itemsCopy = items.slice();
      itemsCopy[itemIndex] = itemInfo;
      setItems(itemsCopy); 
    }
  }

  const onShowHide = ()=> {

    // 1) Set next State (empty, hidden, or shown). 
    let nextState = MessageStates.empty;

    if(messageState == MessageStates.hidden){
      // output: MessageStates.empty | MessageStates.shown.
      if(items.length < 1){
        // empty scenario.
        nextState = MessageStates.empty;
      } else {
        // show the elements.
        nextState = MessageStates.shown;
      }
    } else {
      // output: MessageStates.hidden.
      nextState = MessageStates.hidden;
    }

    setMessageState(nextState);

    // 2) Render messages color or list via "nextState".
    switch(nextState){
      // A) Color picking
      case MessageStates.hidden: 
        setShowMessage(true);
        setMessageColor(getMessageColor(nextState));
        break;

      case MessageStates.empty:
        setShowMessage(true);
        setMessageColor(getMessageColor(nextState));
        break;

      case MessageStates.shown:
        setShowMessage(false);
        break;
    }
  }

  const handleOpenDeleteBox = ()=>{
    // open delete box inside IncrementableListItem.
    //setShowModal(true);
    console.log("onOpenDeleteBox()");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={g_styles.p}>{title}</Text>
        <View style={styles.buttonsContainer}>
          <IconButton iconName="eye" handleOnPress={()=> onShowHide()} />
          <IconButton iconName="plus" handleOnPress={()=> handleAddEmptyListItem(items.length, alias)} />
        </View>
      </View>

      { showMessage ? (
        <Text style={[g_styles.p, styles.message, {color: messageColor.toString()}]}>{getMessage(messageState)}</Text>
      ):(
        <FlatList 
          data={items}
          renderItem={({item, index})=> (
            <IncrementableListItem 
              onLongPress={()=> handleOpenDeleteBox()} 
              itemInfo={item} 
              handleChangeText={updateListItem}
              itemIndex={index}
            />
          )}
          keyExtractor={item => (item.key == undefined)? "undefined-0" : item.key}
          scrollEnabled={false}
          nestedScrollEnabled={true}
          bounces={false}
        />
      )}

    </View>
  );
}

export default IncrementableList;

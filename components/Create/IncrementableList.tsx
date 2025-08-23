import { useState, useEffect, createContext, useContext } from "react";
import Animated, { FlatList, View, Text, StyleSheet, } from "react-native";
import g_styles from "@/constants/styles";
import { generateKey } from "@/constants/functions";
import { 
  MessageStates,
  ItemStates, 
  Item,
  getMessage,
  getMessageColor,
} 
from "@/constants/listItem"; 
import { SoundManagerContext, SoundManagerContextType, SoundType } from "../Shared/SoundManager";

import IconButton from "@/components/Shared/IconButton";
import IncrementableListItem from "./IncrementableListItem";


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


export interface IncrementableListContextType {
  handleOnDeleteListItem : (itemIndex:number)=> void,
  handleItemInfoChange: (itemInfo:Item, itemIndex:number)=> void,
};

export const IncrementableListContext = createContext<IncrementableListContextType>({
  handleOnDeleteListItem : (itemIndex:number)=> {},
  handleItemInfoChange: (itemInfo:Item, itemIndex:number)=> {}
});

const IncrementableList = ({title, alias, items, setItems}: IncrementableListParams)=>{
  const [showMessage, setShowMessage] = useState<boolean>(items.length < 1); 
  const [messageState, setMessageState] = useState<MessageStates>((items.length < 1) ? MessageStates.empty : MessageStates.shown);
  const [messageColor, setMessageColor] = useState<string>(getMessageColor(messageState));
  const [message, setMessage] = useState<string|null>(getMessage(messageState));
  const {handlePlaySoundEffect} = useContext<SoundManagerContextType>(SoundManagerContext);

  const showSelectedMessage = (messageState:MessageStates)=>{
    setShowMessage((messageState == MessageStates.shown) ? false : true);  
    setMessage(getMessage(messageState));
    setMessageState(messageState);
    setMessageColor(getMessageColor(messageState));
  };

  useEffect(()=>{
  // this ensures that it shows the empty message whenever the user clears the fields.
    if(items.length < 1){
      showSelectedMessage(MessageStates.empty);
    }
  }, [items]);

  // hader method 1  
  const handleAddEmptyListItem = (id:number, alias:string)=>{
    handlePlaySoundEffect(SoundType.touched);  
    const hashLength = 10;
    const newItem = {key: generateKey(id, hashLength, alias), title: "", state: ItemStates.empty};
    setItems([...items, newItem]);
    showSelectedMessage(MessageStates.shown); // the list should be shown whenever the user adds a new item.
  };

  const onShowHide = ()=> {

    handlePlaySoundEffect(SoundType.touched);  

    if(messageState == MessageStates.hidden){
      // output: MessageStates.empty | MessageStates.shown.
      if(items.length < 1){
        // empty scenario.
        showSelectedMessage(MessageStates.empty);
      } else {
        // show the elements.
        showSelectedMessage(MessageStates.shown);
      }
    } else {
      // output: MessageStates.hidden.
      showSelectedMessage(MessageStates.hidden);
    }
  }

  const handleOnDeleteListItem = (itemIndex:number)=>{
    if(itemIndex <= (items.length - 1) && itemIndex >= 0){
      let itemsCopy = items.slice();
      itemsCopy.splice(itemIndex, 1);
      setItems(itemsCopy); 
    };
  };

  const handleItemInfoChange = (itemInfo:Item, itemIndex:number)=>{
    if(itemIndex <= (items.length - 1)){
      const itemsCopy = items.slice();
      itemsCopy[itemIndex] = itemInfo;
      setItems(itemsCopy); 
    };
  };


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
        <Text style={[g_styles.p, styles.message, {color: messageColor}]}>{message}</Text>
      ):(
        <IncrementableListContext.Provider value={{handleOnDeleteListItem, handleItemInfoChange}}>
          <FlatList 
            data={items}
            renderItem={({item, index})=> (
              <IncrementableListItem 
                itemInfo={item} 
                itemIndex={index}
              />
            )}
            keyExtractor={(item, index) => (item.key == undefined)? `alias-${index}` : item.key}
            scrollEnabled={false}
            nestedScrollEnabled={true}
            bounces={false}
          />
        </IncrementableListContext.Provider>
      )}
    </View>
  );
}

export default IncrementableList;

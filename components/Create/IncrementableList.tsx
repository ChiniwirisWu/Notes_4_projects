import { useState, useEffect, createContext, useContext } from "react";
import Animated, { FlatList, View, Text, StyleSheet, } from "react-native";
import g_styles from "@/constants/styles";
import { generateKey } from "@/constants/functions";

import { NoteTask, NoteTaskState, NoteTaskListState } from "@/constants/types";
import { getMessageColor } from "@/constants/colors";
import { getMessage, MessageType } from "@/constants/messages";

import { SoundManagerContext, SoundManagerContextType, SoundType } from "../Shared/SoundManager";

import IconButton from "@/components/Shared/IconButton";
import IncrementableListItem from "./IncrementableListItem";


const styles = StyleSheet.create({
  container:{
    marginBottom: 50,
    flex: 1,
  },
  header: {
    flex: 1,
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
  items:(NoteTask[]),
  setItems: (items:NoteTask[])=> void
};

export interface IncrementableListContextType {
  handleOnDeleteListItem : (itemIndex:number)=> void,
  handleItemInfoChange: (itemInfo:NoteTask, itemIndex:number)=> void,
};

export const IncrementableListContext = createContext<IncrementableListContextType>({
  handleOnDeleteListItem : (itemIndex:number)=> {},
  handleItemInfoChange: (itemInfo:NoteTask, itemIndex:number)=> {}
});

const IncrementableList = ({title, alias, items, setItems}: IncrementableListParams)=>{
  const {handlePlaySoundEffect} = useContext<SoundManagerContextType>(SoundManagerContext);
  const [noteTaskListState, setNoteTaskListState] = useState<NoteTaskListState>((items.length < 1) ? NoteTaskListState.EMPTY : NoteTaskListState.SHOWN);
  const [messageColor, setMessageColor] = useState<string>(getMessageColor(noteTaskListState));
  const [showMessage, setShowMessage] = useState<boolean>(items.length < 1); 
  const [message, setMessage] = useState<string|null>(getMessage(MessageType.NONE));

  useEffect(()=>{
  // this ensures that it shows the empty message whenever the user clears the fields.
    if(items.length < 1){
      showSelectedMessage(noteTaskListState);
    }
  }, [items]);

  const showSelectedMessage = (listState:NoteTaskListState)=>{
    // No messages should be shown if the ListState is SHOWN.
    if(listState == NoteTaskListState.SHOWN){
      setShowMessage(false);
      setNoteTaskListState(listState);
      return;
    };

    setMessage(getMessage((listState == NoteTaskListState.HIDDEN) ? MessageType.HIDEN : MessageType.EMPTY));
    setMessageColor(getMessageColor(listState));
    setNoteTaskListState(listState);
    setShowMessage(true);
    return;
  };

  // hader method 1  
  const handleAddEmptyListItem = (id:number, alias:string)=>{
    handlePlaySoundEffect(SoundType.bump);  
    const newItem = {key: generateKey(id, alias), title: "", state: NoteTaskState.EMPTY};
    setItems([...items, newItem]);
    showSelectedMessage(NoteTaskListState.SHOWN); // the list should be shown whenever the user adds a new item.
  };

  const onShowHide = ()=> {

    handlePlaySoundEffect(SoundType.bump);  
    console.log("BUB!");

    if(noteTaskListState == NoteTaskListState.HIDDEN){
      // output: MessageStates.empty | MessageStates.shown.
      if(items.length < 1){
        // empty scenario.
        showSelectedMessage(NoteTaskListState.EMPTY);
      } else {
        // show the elements.
        showSelectedMessage(NoteTaskListState.SHOWN);
      }
    } else {
      // output: MessageStates.hidden.
      showSelectedMessage(NoteTaskListState.HIDDEN);
    }
  }

  const handleOnDeleteListItem = (itemIndex:number)=>{
    if(itemIndex <= (items.length - 1) && itemIndex >= 0){
      let itemsCopy = items.slice();
      itemsCopy.splice(itemIndex, 1);
      setItems(itemsCopy); 
      
      if(itemsCopy.length < 1){
        showSelectedMessage(NoteTaskListState.EMPTY);
      }
    };
  };

  const handleItemInfoChange = (itemInfo:NoteTask, itemIndex:number)=>{
    if(itemIndex <= (items.length - 1)){
      const itemsCopy = items.slice();
      itemsCopy[itemIndex] = itemInfo;
      setItems(itemsCopy); 
    };
  };


  return (
    <View style={[styles.container]}>
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

export default IncrementableList

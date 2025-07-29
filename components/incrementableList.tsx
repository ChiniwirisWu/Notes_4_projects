import Animated, { FlatList, View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import g_styles from "@/constants/styles";

const styles = StyleSheet.create({
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
  ListItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20
  },
  textInput: {
    width: "100%"
  },
  message: {
    textAlign: "center",
    color: "#fced0f",
    marginBottom: 10,
  }
});

const enum States {
  empty,
  filled,
};

const enum MessageStates {
  hidden,
  shown,
  filled,
  empty,
};

type Key = `${string}-${number}`;

type Item = {
  key: (Key | undefined),
  title?:String,
  state:States,
};

const SquareButton = ({iconName="question-circle", onPress} : {iconName?: string, onPress:()=> void})=>{
  return (
    <Pressable onPress={()=> onPress()}>
      <Animated.View>
        <Animated.Text><FontAwesome name={iconName} size={24} color="#fff" /></Animated.Text>
      </Animated.View>
    </Pressable>
  ); 
}

function getStateColor(state:States){
  switch (state){
    case States.filled: return "#0be646";
    case States.empty: return "#fced0f";
    default: return "#0be646";
  }
}

function getMessageColor(state:MessageStates) : (String | null){
  switch(state){
    case MessageStates.hidden: return "#fced0f";
    case MessageStates.empty: return "#9534eb";
    default: return null;
  }
}

const ListItem = ({itemInfo, index} : {itemInfo:Item, index:number}) => {

  const [state, setState] = useState(itemInfo.state);
  const [title, setTitle] = useState((state == States.empty) ? "Insert text" : itemInfo.title);

  const onTitleChange = (text:String)=>{
    setState((text.length < 1) ? States.empty : States.filled);
    setTitle((text.length < 1) ? "Insert text" : text);

  }

  return (
    <View style={styles.ListItem}>
      <FontAwesome6 name="square-plus" size={24} color={getStateColor(state)} />
      <TextInput onChangeText={(e)=> onTitleChange(e)} style={[g_styles.p, styles.textInput]} value={(state == States.empty) ? undefined : title} placeholderTextColor="#fff" placeholder={title} />
    </View>
  );
};

function generateKey(id:number, hashLength:number) : Key{
  console.log(id);
  const hash:string = Math.random().toString(36).substring(2, 2 + hashLength); 
  return `${hash}-${id}`;
}

function getMessage(state : MessageStates) : (String | null){
  switch(state){
    case MessageStates.empty: return "This list is empty";
    case MessageStates.hidden: return "List is hidden";
    default: return null;
  } 
}

const IncrementableList = ({title}: {title:string})=>{
  const [items, setItems] = useState<Array<Item>>([]);
  const [showMessage, setShowMessage] = useState<boolean>(true); // if true shows message and hides list.
  const [messageState, setMessageState] = useState<MessageStates>(MessageStates.empty);
  const [messageColor, setMessageColor] = useState(getMessageColor(messageState));

  const onAdd = (id:number)=>{
    const hashLength = 10;
    const newItem = {key: generateKey(id, hashLength), title: "", state: States.empty};
    setItems([...items, newItem]);
    setShowMessage(false);
  };

  const onShowHide = ()=> {

    setMessageState((messageState == MessageStates.hidden) ? MessageStates.shown : MessageStates.hidden);

    setMessageState((messageState == MessageStates.hidden) ? (
      (items.length < 1) ? MessageStates.empty : MessageStates.shown
    ) : (
      MessageStates.hidden
    ));


    switch(messageState){
      case MessageStates.hidden: 
        setShowMessage(true);
        setMessageColor(getMessageColor(messageState));
        break;

      case MessageStates.empty:
        setShowMessage(true);
        setMessageColor(getMessageColor(messageState));
        break;

      case MessageStates.shown:
        setShowMessage(false);
        break;
    }

    console.log(messageState);
    console.log(getMessageColor(messageState));
    console.log(showMessage);
  }


  return (
    <View>
      <View style={styles.header}>
        <Text style={g_styles.p}>{title}</Text>
        <View style={styles.buttonsContainer}>
          <SquareButton iconName="eye" onPress={()=> onShowHide()} />
          <SquareButton iconName="plus" onPress={()=> onAdd(1)} />
        </View>
      </View>

      { showMessage ? (
        <Text style={[g_styles.p, styles.message, {color: messageColor}]}>{getMessage(messageState)}</Text>
      ):(
        <View>
          <FlatList 
            data={items}
            renderItem={({item, index})=> <ListItem itemInfo={item} index={index} />}
            keyExtractor={item => (item.key == undefined)? "undefined-0" : item.key}
          />
        </View>
      )}

    </View>
  );
}

export default IncrementableList;

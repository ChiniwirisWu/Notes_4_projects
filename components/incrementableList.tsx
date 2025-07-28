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
  shown,
  hidden,
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
  const hash:string = Math.random().toString(36).substring(2, 2 + hashLength); 
  return `${hash}-${id}`;
}


const IncrementableList = ({title}: {title:string})=>{
  const [items, setItems] = useState([]);
  const [showMessage, setShowMessage] = useState(true);

  const getMessage = (state : MessageStates)=> {
  }

  const onAdd = ()=>{
    const hashLength = 10;
    const newItem = {key: generateKey(items.length, hashLength), title: "", state: States.empty};
    setItems({...items, ...newItem});
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={g_styles.p}>{title}</Text>
        <View style={styles.buttonsContainer}>
          <SquareButton iconName="eye" onPress={()=> console.log("eye")} />
          <SquareButton iconName="plus" onPress={()=> onAdd()} />
        </View>
      </View>

      { showMessage ? (
        <Text style={[g_styles.p, styles.message]}>This list is empty</Text>
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

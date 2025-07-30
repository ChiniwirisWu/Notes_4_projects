import { Item, ItemStates, getStateColor } from "@/constants/listItem";
import { View, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import g_styles from "@/constants/styles";

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


const ListItem = ({itemInfo} : {itemInfo:Item}) => {

  const [state, setState] = useState<ItemStates>(itemInfo.state);
  const [title, setTitle] = useState<String>((state == ItemStates.empty) ? "Insert text" : itemInfo.title);

  const onTitleChange = (text:String)=>{
    setState((text.length < 1) ? ItemStates.empty : ItemStates.filled);
    setTitle((text.length < 1) ? "Insert text" : text);
  }

  return (
    <View style={styles.ListItem}>
      <FontAwesome6 name="square-plus" size={24} color={getStateColor(state)} />
      <TextInput 
        onChangeText={(e)=> onTitleChange(e)} 
        style={[g_styles.p, styles.textInput]} 
        value={(state == ItemStates.empty) ? undefined : title.toString()} 
        placeholderTextColor="#fff" 
        placeholder={title.toString()} />
    </View>
  );
};

export default ListItem;

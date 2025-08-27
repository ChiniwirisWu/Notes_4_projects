import { View, StyleSheet, TextInput, Text } from "react-native";
import { useState, forwardRef, useImperativeHandle } from "react";
import g_styles from "@/constants/styles";

interface SearchBarProps {
  notesAmount:number,
  fetchAllItems: (alternativeFilterText:string)=> void
};

export interface SearchBarRef {
  getCurrentFilterText: ()=> string
};

const SearchBar = forwardRef<SearchBarRef, SearchBarProps>((props, ref)=>{

  const [filterText, setFilterText] = useState<string>("");
  const { notesAmount, fetchAllItems } = props;

  useImperativeHandle(ref, ()=> ({
    getCurrentFilterText
  }));

  const getCurrentFilterText = ()=>{
    return filterText;
  };

  const handleChangeText = (newFilterText:string)=>{
    setFilterText(newFilterText);
    fetchAllItems(newFilterText);
  };

  return (
    <View style={styles.container}>
      <TextInput style={g_styles.textInput} onChangeText={(text)=> handleChangeText(text)} />
      <Text style={[g_styles.p, styles.text]}>{notesAmount} Elements found</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },

  text: {
    color: "#ddd",
    alignSelf: "flex-start",
    fontSize: 20,
  }
});

export default SearchBar;


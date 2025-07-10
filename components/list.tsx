import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import g_styles from "../extra/styles.tsx";
import Vote from './vote.tsx';

enum Levels {
  common,
  uncommon,
  rare,
  epic,
  legendary,
};

type Idea = {
  name: string,
  vote: Levels,
};


const IdeaList = ({idea} : {idea:Idea})=>{
  const {name, vote} = idea;

  return (
    <View style={styles.item}>
      <Text style={g_styles.p}>{name}</Text>
      <Vote level={vote} />
    </View>
  )
}

const List = () => {
  
  const ideasList:Idea[] = [
    {name: 'Idea 3', vote: Levels.legendary},
    {name: 'Idea 1', vote: Levels.epic},
    {name: 'Idea 2', vote: Levels.rare},
    {name: 'Idea 3', vote: Levels.uncommon},
    {name: 'Idea 3', vote: Levels.common},
  ];
  
  return (
    <View style={styles.container}>
      <FlatList
        data={ideasList}
        renderItem={({item}) => <IdeaList idea={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  item:{
    width: "100%",
    height: 100,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10
  },

});

export default List;

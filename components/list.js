import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import g_styles from "../extra/styles.js";
import Vote from './vote';

const ListElement = ({name, votes})=>{
  return (
    <View style={styles.item}>
      <Text style={g_styles.p}>{name}</Text>
      <Vote votes={votes} />
    </View>
  )
}

const List = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {name: 'Idea 3', votes: 5},
          {name: 'Idea 1', votes: 4},
          {name: 'Idea 2', votes: 3},
          {name: 'Idea 3', votes: 2},
          {name: 'Idea 3', votes: 2},
          {name: 'Idea 3', votes: 2},
          {name: 'Idea 3', votes: 2},
          {name: 'Idea 3', votes: 2},
          {name: 'Idea 3', votes: 2},
          {name: 'Idea 3', votes: 2},
        ]}
        renderItem={({item}) => <ListElement name={item.name} votes={item.votes} />}
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

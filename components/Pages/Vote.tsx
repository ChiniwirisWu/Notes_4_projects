import { View, FlatList, StyleSheet } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';

enum Levels {
  common,
  uncommon,
  rare,
  epic,
  legendary,
};

const styles = StyleSheet.create({

  flatListContainer: {
    backgroundColor: "#d91202",
    gap: 5,
    minWidth: 160,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
  },
});

const Vote = ({level}:{level:Levels})=>{

  const levels:string[][] = [
    ["#c21002","#c21002","#c21002","#c21002", "#fff"],
    ["#c21002","#c21002", "#c21002", "#00c750", "#00c750"],
    ["#c21002","#c21002", "#00c0c7", "#00c0c7", "#00c0c7"],
    ["#7b06bf","#7b06bf","#7b06bf","#7b06bf"],
    ["#c99504","#c99504","#c99504","#c99504","#c99504"]
  ]
  
  const vote:string[] = levels[level];

  return (
    <View>
      <FlatList
        horizontal={true}
        data={vote}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({item})=> <AntDesign name="heart" size={24} color={item} />}
      />
    </View>
  )
}


export default Vote;

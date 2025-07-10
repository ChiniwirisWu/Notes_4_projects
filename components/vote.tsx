import { View, FlatList, StyleSheet } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';

enum Levels {
  common,
  uncommon,
  rare,
  epic,
  legendary,
};

const Vote = ({level}:{level:Levels})=>{

  const levels:string[][] = [
    ["#000","#000","#000","#000","#000", "#fff"],
    ["#000","#000","#000", "#00c750", "#00c750"],
    ["#000","#000", "#00c0c7", "#00c0c7", "#00c0c7"],
    ["#000","#7b06bf","#7b06bf","#7b06bf","#7b06bf"],
    ["#c99504","#c99504","#c99504","#c99504","#c99504"]
  ]
  
  const vote:string[] = levels[level];

  return (
    <View>
      <FlatList
        horizontal={true}
        data={vote}
        contentContainerStyle={styles.votesContainer}
        renderItem={({item})=> <AntDesign name="heart" size={24} color={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  votesContainer: {
    alignItems: "center",
    gap: 5
  }
});

export default Vote;

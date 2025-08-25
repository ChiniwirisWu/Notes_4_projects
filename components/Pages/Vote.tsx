import { View, FlatList, StyleSheet } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import { Levels } from "@/constants/types";
import { levelPatterns } from "@/constants/maps";


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

  const vote:string[] = levelPatterns[level];

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

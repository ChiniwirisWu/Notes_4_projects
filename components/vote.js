import { View, FlatList, StyleSheet } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';

const Vote = ({votes})=>{

  let types = {
    1 : ["#000","#000","#000","#000","#000", "#fff"], // blanco
    2 : ["#000","#000","#000", "#00c750", "#00c750"], // verde
    3 : ["#000","#000", "#00c0c7", "#00c0c7", "#00c0c7"], // azul
    4 : ["#000","#7b06bf","#7b06bf","#7b06bf","#7b06bf"], // morado
    5 : ["#c99504","#c99504","#c99504","#c99504","#c99504"], // dorado
  };
  
  let colors = types[votes];

  return (
    <View>
      <FlatList
        horizontal={true}
        data={colors}
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

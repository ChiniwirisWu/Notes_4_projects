import { View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import SquareButton from "../Shared/SquareButton";
import g_styles from "@/constants/styles";

const styles = StyleSheet.create({
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
    marginBottom: 100
  },
  scoreBox: {
    borderWidth: 5,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

const ScoreBox = ({score, baseWidth} : {score:number, baseWidth: number})=>{


  const colors = [
    {background: "#000", color: "#fff"},
    {background: "#00c750", color: "#fff"},
    {background: "#00c0c7", color: "#fff"},
    {background: "#7b06bf", color: "#fff"},
    {background: "#c99504", color: "#fff"},
  ];

  return (
    <View style={[styles.scoreBox,{width: baseWidth, height: baseWidth, backgroundColor: colors[score - 1].background}]}>
      <Text style={g_styles.p}>{score}</Text>
    </View>
  )
}

const Votation = ()=>{
  const buttonsBoxWidth = 40;
  const scoreBoxWidth = 50;

  const [score, setScore] = useState(1);

  const onAdd = ()=>{
    setScore(((score + 1) > 5) ? 5 : score + 1);
  }

  const onMinus = ()=>{
    setScore(((score - 1) < 1) ? 1 : score - 1);
  }

  return (
    <View>
      <Text style={[g_styles.p, {marginBottom: 20}]}>Votation (1 to 5)</Text>     

      <View style={styles.scoreContainer}>
        <SquareButton
          onPress={()=> onMinus()}
          baseWidth={buttonsBoxWidth}
          text="-"
        />
        <ScoreBox score={score} baseWidth={scoreBoxWidth} />

        <SquareButton
          onPress={()=> onAdd()}
          baseWidth={buttonsBoxWidth}
          text="+"
        />

      </View>
    </View>
  )
};

export default Votation;

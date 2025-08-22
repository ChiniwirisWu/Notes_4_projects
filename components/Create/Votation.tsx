import { View, StyleSheet, Text } from "react-native";
import { useState, useContext } from "react";
import SquareButton from "../Shared/SquareButton";
import g_styles from "@/constants/styles";
import { SoundManagerContext, SoundManagerContextType, SoundType } from "@/components/Shared/SoundManager";


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

type VotationParams = {
  score : number,
  setScore : (x: number) => void
}

const Votation = ({score, setScore}: VotationParams)=>{

  const buttonsBoxWidth = 40;
  const scoreBoxWidth = 50;
  const {handlePlaySoundEffect} = useContext<SoundManagerContextType>(SoundManagerContext);

  const onAdd = ()=>{
    setScore(((score + 1) > 5) ? 5 : score + 1);
    handlePlaySoundEffect(SoundType.pressed);
  }

  const onMinus = ()=>{
    setScore(((score - 1) < 1) ? 1 : score - 1);
    handlePlaySoundEffect(SoundType.pressed);
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

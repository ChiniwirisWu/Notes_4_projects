import React from 'react';
import {FlatList, StyleSheet, Text, View, Pressable} from 'react-native';
import { router } from "expo-router";
import g_styles from "@/constants/styles";
import { Item } from '@/constants/listItem';
import Vote from "@/components/Pages/Vote";
import { ItemInfoWithJSON } from '@/constants/globalTypes';

enum Levels {
  common,
  uncommon,
  rare,
  epic,
  legendary,
};

type Idea = {
  title: string,
  vote: Levels,
};

function getLevelFromNumber (x:number) : Levels{
  switch(x){
    case 1: return Levels.common;
    case 2: return Levels.uncommon;
    case 3: return Levels.rare;
    case 4: return Levels.epic;
    case 5: return Levels.legendary;
    default: return Levels.common;
    break;
  }
};


const IdeaListItem = ({idea} : {idea:ItemInfoWithJSON})=>{
  const {title, score} = idea;

  return (
    <Pressable onPress={()=> router.navigate({pathname: "/(tabs)/pages/details", params: {details: JSON.stringify(idea)}})}>
      <View style={styles.item}>
        <Text style={[g_styles.p, {flex: 1, paddingRight: 5}]}>{title}</Text>
        <Vote level={getLevelFromNumber(score)} />
      </View>
    </Pressable>
  )
}

const ProjectsList = ({ideasList}: {ideasList:ItemInfoWithJSON[]}) => {
  
  return (
    <View style={styles.container}>
      <FlatList
        data={ideasList}
        renderItem={({item}) => <IdeaListItem idea={item} />}
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
    paddingLeft: 10
  },
});

export default ProjectsList;

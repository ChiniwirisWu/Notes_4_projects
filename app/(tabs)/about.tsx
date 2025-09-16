import { View, Text, FlatList, ScrollView } from "react-native";
import { useFocusEffect } from "expo-router";
import { useContext } from "react";
import { SoundManagerContext, SoundManagerContextType, SoundEffect } from "@/components/Shared/SoundManager";
import g_styles from "@/constants/styles";
import { useEffect } from "react";


export default function About (){

  const { handlePlaySoundEffect } = useContext<SoundManagerContextType>(SoundManagerContext);

  useFocusEffect(()=>{
    handlePlaySoundEffect(SoundEffect.bump);
  });

  return (
  <View style={[g_styles.container, {paddingTop: 40}]}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={[g_styles.p, {fontSize: 40, marginBottom: 10}]}>About</Text>      
      <Text style={[g_styles.p, {marginBottom: 30}]}>This application is oriented to developers to save and structure their ideas for projects that avoids writing lots of details and instead focus on defining the most practical aspects of their projects which are the functional and non functional requirements.</Text>      
 
      <Text style={[g_styles.p, {fontSize: 40, marginBottom: 10}]}>What are Functional and Non Functional Requirements?</Text>      
      <Text style={[g_styles.p, {marginBottom: 30}]}>Functional requirements are the behaviours that programs will execute (an analogy are the methods from a class, an example could be “entering in cleaning mode” for a washer software) and Non Functional requirements are physical equipment to execute the program (an analogy are the properties from a class, and example could be “The Washer” or “It has to be developed with certain technologies”).</Text>      


      <Text style={[g_styles.p, {fontSize: 40, marginBottom: 10}]}>How to mark and delete items from the Requirement list?</Text>      
      <FlatList
        scrollEnabled={false}
        data={[
          "- Double tap on the “Plus icon ➕” to mark the requirement.","- Hold 2 seconds on the “Plus icon ➕” to delete the requirement."
        ]}
        renderItem={({item, index})=> <Text style={g_styles.p} key={index}>{item}</Text>}
      />


    </ScrollView>
  </View>
  );
};

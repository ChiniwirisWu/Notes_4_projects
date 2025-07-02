import { Pressable, Text, Animated, View, StyleSheet } from "react-native";
import g_styles from "../extra/styles.js";

const SaveButton = ()=> {
  const bgcRef = new Animated.Value(0);

  const handlePress = ()=>{
    console.log(buttonStyles)
    Animated.timing(bgcRef, {
      toValue: 1,
      duration: 60,
      useNativeDriver: true
    }).start();
  }

  const handleRelease = ()=>{
    console.log("release")
    Animated.timing(bgcRef, {
      toValue: 0,
      duration: 60,
      useNativeDriver: true
    }).start();
  }

  const buttonStyles = bgcRef.interpolate({
    inputRange: [0, 1],
    outputRange: ["#000", "#fff"]
  })

  return(
      <Pressable 
        onPressIn={handlePress}
        onPressOut={handleRelease}
      >
        <Animated.View style={[g_styles.saveBtnContainer, buttonStyles.container]}>
          <Text style={[g_styles.p, buttonStyles.text]}>Save/exit</Text>
        </Animated.View>
      </Pressable>
  );
};

export default SaveButton;

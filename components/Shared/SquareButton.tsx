import { Pressable, Text, View, StyleSheet } from "react-native";
import Animated, { useSharedValue, withSpring, useAnimatedStyle, interpolate } from "react-native-reanimated";
import g_styles from "@/constants/styles";

const SquareButton = ({onPress, baseWidth, text} : {onPress:()=>void, baseWidth:number, text:string})=> {
  const width = useSharedValue(baseWidth);

  const handlePressIn = ()=> {
    if(width.value == baseWidth){
      width.value = withSpring(width.value + 10);
    }
  }

  const handlePressOut = ()=> {
    width.value = withSpring(baseWidth);
  }

  const text_as = useAnimatedStyle(()=>({
    color: (width.value == baseWidth) ? "#fff" : "#000" 
  }));

  const view_as = useAnimatedStyle(()=>({
    width: width.value,
    backgroundColor: (width.value == baseWidth) ? "#000" : "#fff" 
  }));

  return(
      <Pressable 
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={[g_styles.saveBtnContainer, {height: baseWidth, width: baseWidth, marginBottom: -10}, view_as ]}>
          <Animated.Text style={[g_styles.p, {marginTop: -2},  text_as]}>{text}</Animated.Text>
        </Animated.View>
      </Pressable>
  );
};

export default SquareButton;

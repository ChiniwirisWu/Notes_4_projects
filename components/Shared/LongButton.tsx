import { Pressable, Text, View, StyleSheet } from "react-native";
import Animated, { useSharedValue, withSpring, useAnimatedStyle, interpolate } from "react-native-reanimated";
import g_styles from "@/constants/styles";

const LongButton = ({text, onPress, marginBottom} : {text:string, onPress:()=>void, marginBottom?:number})=> {
  const initialWidth = 300;
  const width = useSharedValue(initialWidth);

  const handlePressIn = ()=> {
    width.value = withSpring(width.value + 10);
  }

  const handlePressOut = ()=> {
    width.value = withSpring(initialWidth);
  }

  const text_as = useAnimatedStyle(()=>({
    color: (width.value == initialWidth) ? "#fff" : "#000" 
  }));

  const view_as = useAnimatedStyle(()=>({
    width: width.value,
    backgroundColor: (width.value == initialWidth) ? "#000" : "#fff" 
  }));

  return(
      <Pressable 
        style={{marginBottom: (marginBottom) ? marginBottom : 0}}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={[g_styles.saveBtnContainer, view_as ]}>
          <Animated.Text style={[g_styles.p, text_as]}>{text}</Animated.Text>
        </Animated.View>
      </Pressable>
  );
};

export default LongButton;

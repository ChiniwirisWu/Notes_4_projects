import Animated, { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type Icon_t = "eye" | "plus";

const SquareButton = ({iconName, onPress} : {iconName?: Icon_t, onPress:()=> void})=>{
  
  return (
    <Pressable onPress={()=> onPress()}>
      <Animated.View>
        <Animated.Text><FontAwesome name={iconName} size={24} color="#fff" /></Animated.Text>
      </Animated.View>
    </Pressable>
  ); 
}

export default SquareButton;

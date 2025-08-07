import Animated, { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type Icon_t = "eye" | "plus";

const IconButton = ({iconName, handleOnPress} : {iconName?: Icon_t, handleOnPress:()=> void})=>{
  
  return (
    <Pressable onPress={()=> handleOnPress()}>
      <Animated.View>
        <Animated.Text><FontAwesome name={iconName} size={24} color="#fff" /></Animated.Text>
      </Animated.View>
    </Pressable>
  ); 
}

export default IconButton;

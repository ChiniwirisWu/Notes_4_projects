import { Pressable, Text, View, StyleSheet } from "react-native";
import Animated, { useSharedValue, withSpring, useAnimatedStyle, interpolate } from "react-native-reanimated";
import g_styles from "@/constants/styles";

type SettingBoxProps = {
  titleEnable:string,
  titleDisable:string,
  settingEnable:boolean,
  onSettingSwitch:()=>void
};

const SettingButton = ({props}:{props:SettingBoxProps})=> {
  const initialWidth = 300;
  const width = useSharedValue(initialWidth);

  const handlePressIn = ()=> {
    width.value = withSpring(width.value + 10);
  }

  const handlePressOut = ()=> {
    width.value = withSpring(initialWidth);
  }

  const view_as = useAnimatedStyle(()=>({
    width: width.value,
  }));

  return(
      <Pressable 
        onPress={props.onSettingSwitch}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={[g_styles.saveBtnContainer, view_as, { backgroundColor: (props.settingEnable) ? "#fff" : "#000" } ]}>
          <Animated.Text style={[g_styles.p, { color: (props.settingEnable) ? "#000" : "#fff" }]}>{(props.settingEnable) ? props.titleEnable : props.titleDisable}</Animated.Text>
        </Animated.View>
      </Pressable>
  );
};

export default SettingButton;

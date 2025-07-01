import { StyleSheet } from "react-native";
import Fonts from "./fonts.js";

export default g_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 20,
    paddingHorizontal: 20,
    color: "#fff",
  },

  p : {
    fontSize: 25,
    color: "#fff",
    fontFamily: Fonts.vt323,
  },

  pressable : {
    width: 35,
    height: 35,
    marginRight: -10,
    alignSelf: "flex-end"
  }
});

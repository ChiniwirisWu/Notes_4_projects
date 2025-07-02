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
  },

  textInput: {
    height: 50,
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 5,
    outlineColor: "#fff",
    borderColor: "#fff",
    borderWidth: 5,
    marginBottom: 10,
    color: "#fff",
    fontFamily: Fonts.vt323,
  },

  titleMargin: {
    marginBottom: 20
  },

  saveBtnContainer: {
    height: 50,
    width: "100%",
    paddingHorizontal: 5,
    borderWitdh: 5,
    paddingBottom: 5,
    borderColor: "#fff",
    borderWidth: 5,
    marginBottom: 10,
    color: "#000",
    fontFamily: Fonts.vt323,
    alignItems: "center",
    justifyContent: "center",
  },

});

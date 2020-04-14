import { StyleSheet } from "react-native";

export default StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    flexDirection: "row",
    // Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    flex: 6,
    textAlign: "center",
    color: "#DF0000",
    fontWeight: "bold",
    fontSize: 24,
  },
  icon_button: {
    width: 20,
    height: 20,
  },
});

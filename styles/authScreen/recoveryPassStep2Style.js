import { StyleSheet } from "react-native";

export default StyleSheet.create({
  linear: {
    flex: 1,
    // justifyContent: 'center',
  },
  mlem: {
    color: "yellow",
    fontWeight: "bold",
    fontSize: 50,
  },
  textInput: {
    fontSize: 13,
    paddingTop: 3,
    paddingBottom: 3,
    width: 160,
    color: "white",
  },
  viewInput: {
    justifyContent: "center",
    width: 200,
    borderWidth: 0.5,
    borderRadius: 10,
    height: 40,
    marginTop: 15,
    backgroundColor: "#461321",
    flexDirection: "row",
    overflow: "hidden",
  },
  image: {
    width: 8,
    height: 8,
    padding: 8,
    margin: 10,
  },
  submitBtn: {
    justifyContent: "center",
    width: 200,
    borderWidth: 0.5,
    borderRadius: 10,
    height: 40,
    marginTop: 10,
    backgroundColor: "#8A0130",
    alignItems: "center",
  },
  line: {
    width: 100,
    borderWidth: 0.4,
    borderColor: "#adaaaa",
    marginTop: 10,
    marginBottom: 15,
  },
  textDecoration: {
    textDecorationLine: "underline",
    color: "white",
    fontSize: 12,
  },
});

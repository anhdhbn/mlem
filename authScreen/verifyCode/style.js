import { StyleSheet } from "react-native";

export default StyleSheet.create({
  linear: {
    flex: 1,
    // justifyContent: 'center',
  },
  textInput: {
    fontSize: 13,
    paddingTop: 3,
    paddingBottom: 3,
    width: 200,
    color: "white",
  },
  viewInput: {
    justifyContent: "center",
    width: 200,
    borderWidth: 0.5,
    borderRadius: 10,
    height: 40,
    marginTop: 10,
    backgroundColor: "#461321",
    flexDirection: "row",
    overflow: "hidden",
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
  container: {
    flex: 1,
    backgroundColor: "#F5F6CE",
  },
  titleWrapper: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  title: {
    color: "red",
    fontSize: 16,
    fontWeight: "800",
    paddingVertical: 30,
  },
});

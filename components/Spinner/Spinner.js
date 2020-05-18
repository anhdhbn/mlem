import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

function App() {
  const [spinner, setSpinner] = useState(true);

  return (
    <View style={styles.container}>
      <Spinner
        visible={spinner}
        color="black"
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      />
    </View>
  );
}
export default App;
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "black",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});

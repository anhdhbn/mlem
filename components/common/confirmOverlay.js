import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Overlay, CheckBox } from "react-native-elements";

export default function (props) {
  return <Overlay fullScreen={true} visible={true}></Overlay>;
}

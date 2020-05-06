import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Snackbar, Button } from "react-native-paper";

export default function SnackbarUpdating(props) {
  return (
    <Snackbar
      visible={props.visible}
      onDismiss={props._onDismissSnackBar}
      // action={{
      //   label: "Undo",
      //   onPress: () => {
      //     // Do something
      //   },
      // }}
    >
      Đang cập nhật
    </Snackbar>
  );
}

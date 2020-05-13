import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Snackbar, Button } from "react-native-paper";

export default function SnackbarUpdating(props) {
  return (
    <Snackbar
      visible={props.visible}
      onDismiss={props._onDismissSnackBar}
      duration={props.duration ? props.duration : 7000}
      action={
        props.actionText
          ? {
              label: props.actionText,
              onPress: () => {
                props._actionFunction
                  ? props._actionFunction
                  : props._onDismissSnackBar;
              },
            }
          : null
      }
      // action={{
      //   label: "Undo",
      //   onPress: () => {
      //     // Do something
      //   },
      // }}
    >
      {props.text}
    </Snackbar>
  );
}

import React, { useState } from "react";
import { View, Text } from "react-native";
import Toast from "react-native-root-toast";

function Toaster(props) {
  const visible = props.visible;
  const setVisible = props.setVisible;

  React.useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  });

  return (
    <View>
      <Toast
        visible={visible}
        position={50}
        shadow={false}
        animation={false}
        hideOnPress={true}
        position={Toast.positions.BOTTOM}
      >
        {props.notification} !
      </Toast>
    </View>
  );
}
export default Toaster;

import React, { useState } from "react";
import { Button, Overlay } from "react-native-elements";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native";
function Modal(props) {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleCancel = () => {
    props.handleCancel();
  };
  handleSubmit = () => {
    props.handleSubmit();
  };
  return (
    <View>
      <Overlay
        isVisible={props.modalConfirmVisible}
        onBackdropPress={toggleOverlay}
      >
        <View
          style={{
            width: 300,
            height: 180,
            alignItems: "center",
            position: "relative",
          }}
        >
          <View style={{ position: "absolute", top: 5, alignItems: "center" }}>
            <View>
              <Text style={{ fontSize: 20, paddingBottom: 10 }}>
                {props.title}
              </Text>
            </View>

            <View
              style={{
                width: 320,
                borderWidth: 1,
                borderColor: "#D20000",
                marginBottom: 7,
              }}
            ></View>
            <View>
              <Text style={{ fontSize: 16, padding: 8 }}>
                {props.titleBody}
                Bạn có muốn xác nhận đơn hàng này không
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              bottom: 0,
              position: "absolute",
            }}
          >
            <View>
              <TouchableOpacity
                style={{
                  width: 150,
                  height: 50,
                  backgroundColor: "gray",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 7,
                }}
                onPress={() => {
                  handleCancel();
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "700" }}>
                  {" "}
                  {props.titleCancel}{" "}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  width: 150,
                  height: 50,
                  backgroundColor: "red",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 7,
                }}
                onPress={() => {
                  handleSubmit();
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "white",
                    fontWeight: "700",
                  }}
                >
                  {" "}
                  {props.titleSubmit}{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Overlay>
    </View>
  );
}
export default Modal;

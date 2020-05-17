import React from "react";
import {
  Image,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";

export default function (props) {
  return (
    <View
      style={{
        bottom: 0,
        backgroundColor: "#fff",
        borderRadius: 10,
        margin: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          position: "relative",
          height: 40,
          padding: 10,
          marginBottom: 30,
          marginTop: 10,
        }}
      >
        <View style={{ paddingLeft: 10 }}>
          <Text style={{ fontSize: 19, fontWeight: "bold" }}>
            {props.totalPromoPrice}đ
          </Text>
          <Text style={{ textDecorationLine: "line-through", color: "grey" }}>
            {props.totalPrice}đ
          </Text>
        </View>
        <View style={{ position: "absolute", right: 20 }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Order");
            }}
            style={{
              backgroundColor: "#DC0000",
              borderRadius: 8,
              width: 60,
              height: 40,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                padding: 8,
                paddingLeft: 10,
                color: "#fff",
              }}
            >
              Xong
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

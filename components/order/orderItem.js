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
        // Card
        height: 70,
        borderRadius: 6,
        elevation: 3,
        backgroundColor: "#fff",
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginVertical: 6,
        // Another
        flexDirection: "row",
      }}
    >
      <View style={{ flex: 5, flexDirection: "column", marginLeft: 10 }}>
        <Text style={{ fontSize: 20 }}>{props.dish.nameDish}</Text>
        <View>
          <Text
            style={{
              textDecorationLine: "line-through",
              color: "grey",
            }}
          >
            {props.dish.price} đ
          </Text>
          <Text>{props.dish.promoPrice} đ</Text>
        </View>
      </View>

      <View style={{ right: 20, marginTop: 20 }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => props.subNumOfDish(props.dish.nameDish)}
          >
            <Image
              source={require("../../assets/icon/-.png")}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
          <Text style={{ marginLeft: 8, marginRight: 8, fontSize: 16 }}>
            {props.dish.quantity}
          </Text>
          <TouchableOpacity
            onPress={() => props.addNumOfDish(props.dish.nameDish)}
          >
            <Image
              source={require("../../assets/icon/+.png")}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

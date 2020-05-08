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
        backgroundColor: "#fff",
        height: 40,
        flexDirection: "row",
        position: "relative",
        paddingLeft: 8,
      }}
    >
      <View style={{ flexDirection: "row", paddingTop: 8 }}>
        <TouchableOpacity onPress={() => props.subTable()}>
          <Image
            source={require("../../assets/icon/-.png")}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
        <Text style={{ marginLeft: 8, marginRight: 8, fontSize: 16 }}>
          {props.numOfTable}
        </Text>
        <TouchableOpacity onPress={() => props.addTable()}>
          <Image
            source={require("../../assets/icon/+.png")}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
        <Text style={{ marginLeft: 8, marginRight: 8, fontSize: 16 }}>Bàn</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          right: 10,
          position: "absolute",
          paddingTop: 8,
        }}
      >
        <TouchableOpacity onPress={() => props.subPeople()}>
          <Image
            source={require("../../assets/icon/-.png")}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
        <Text style={{ marginLeft: 8, marginRight: 8, fontSize: 16 }}>
          {props.numOfPeople}
        </Text>
        <TouchableOpacity onPress={() => props.addPeople()}>
          <Image
            source={require("../../assets/icon/+.png")}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
        <Text style={{ marginLeft: 8, marginRight: 8, fontSize: 16 }}>
          Người
        </Text>
      </View>
    </View>
  );
}

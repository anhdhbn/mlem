import React from "react";
import {
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";

import Header from "../header/header";

export default function (props) {
  return (
    <ScrollView style={{ backgroundColor: "#F5F6F7" }}>
      {/* <Header title="Đặt Bàn" hideButtonBack={true}></Header>
      <View
        style={{
          backgroundColor: "#fff",
          height: 35,
          marginTop: 15,
          flexDirection: "row",
          position: "relative",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              padding: 8,
              color: "red",
            }}
          >
            Số bàn còn trống: 0
          </Text>
        </View>
        <View style={{ right: 20, position: "absolute", marginTop: 12 }}>
          <Image
            source={require("../../assets/icon/offline.png")}
            style={{ width: 12, height: 12 }}
          />
        </View>
      </View> */}
      <View style={{ alignItems: "center", marginTop: 30 }}>
        <Text
          style={{
            color: "red",
            fontSize: 23,
            fontWeight: "bold",
            marginTop: 6,
          }}
        >
          Nhà hàng tạm thời hết bàn!
        </Text>
        <Text
          style={{
            color: "red",
            fontSize: 23,
            fontWeight: "bold",
            marginTop: 6,
          }}
        >
          Mong quý khách quay lại sau!
        </Text>
        <Image
          source={require("../../assets/icon/vector-cute-sorry-smiley-illustration.jpg")}
          style={{ width: 350, height: 250, marginTop: 20 }}
        />
      </View>
    </ScrollView>
  );
}

import React, { Component } from "react";
import moment from "moment";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

import formatPrice from "../formatPrice";

export default class ItemHistoryCard extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   nameScreen: "",
    // };
  }

  render() {
    return (
      <View
        style={{
          borderRadius: 6,
          elevation: 3,
          backgroundColor: "#fff",
          shadowOffset: { width: 1, height: 1 },
          shadowColor: "#333",
          shadowOpacity: 0.3,
          shadowRadius: 2,
          marginVertical: 6,
          //
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                marginLeft: 7,
                marginVertical: 5,
                paddingLeft: 8,
                fontSize: 18,
                color: "#232A2F",
              }}
            >
              {moment(this.props.dmy).format("HH:mm") + " -"}
            </Text>
            <Text></Text>
            <Text
              style={{
                marginLeft: 7,
                marginVertical: 5,
                fontSize: 18,
                color: "#232A2F",
              }}
            >
              {moment(this.props.dmy).format("DD/MM/YYYY")}
            </Text>
          </View>

          <Text
            style={{
              marginLeft: 7,
              marginVertical: 5,
              fontSize: 16,
              marginTop: 10,
              paddingLeft: 8,
              color: "#8A8F9C",
            }}
          >
            {this.props.id}
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text
            style={{
              marginRight: 7,
              marginVertical: 5,
              paddingRight: 9,
              fontSize: 16,
              color: "#8A8F9C",
              textAlign: "right",
            }}
          >
            {this.props.status === 1
              ? "Tạo mới"
              : this.props.status === 2
              ? "Đã gửi"
              : this.props.status === 3
              ? "Đã xác nhận"
              : this.props.status === 4
              ? "Đã từ chối"
              : "Đã Thanh Toán"}
          </Text>
          <Text
            style={{
              marginRight: 7,
              marginTop: 10,
              marginVertical: 5,
              fontSize: 20,
              paddingRight: 9,
              fontWeight: "bold",
              color: "#232A2F",
              textAlign: "right",
            }}
          >
            {formatPrice(this.props.price)}
          </Text>
        </View>
      </View>
    );
  }
}

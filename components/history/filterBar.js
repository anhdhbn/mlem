import React, { Component } from "react";
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
  Modal,
} from "react-native";

// import ModalDropdown from "react-native-modal-dropdown";

// const filterTimeOption = ["Tất cả", "Theo ngày", "7 ngày gần đây"];

export default class FilterBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterTime: "Tất cả",
      filterStatus: "Trạng thái",
    };
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
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ alignItems: "center", flexDirection: "row" }}
          >
            <Text
              style={{
                marginLeft: 7,
                marginVertical: 10,
                color: "#8A8F9C",
                fontSize: 20,
              }}
            >
              {this.state.filterTime}
            </Text>
            <Image
              source={require("../../assets/icon/drop_down.png")}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Text
              style={{
                marginVertical: 10,
                color: "#8A8F9C",
                fontSize: 20,
              }}
            >
              {this.state.filterStatus}
            </Text>
            <Image
              source={require("../../assets/icon/drop_down.png")}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

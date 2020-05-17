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

import { Picker } from "native-base";

// import ModalDropdown from "react-native-modal-dropdown";

// const filterTimeOption = ["Tất cả", "Theo ngày", "7 ngày gần đây"];

export default class FilterBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterTime: "Tất cả",
      filterStatus: "Trạng thái",
      valueFilterTime: "0",
      valueFilterStatus: "0",
    };
  }

  onValueFilterStatusChange = (value) => {
    this.setState({
      valueFilterTime: value,
    });
    switch (value) {
      case 0:
        break;
      case 1:
        break;
      case 3:
        break;
      case 4:
        break;
    }
  };

  onValueFilterTimeChange = (value) => {
    this.setState({
      valueFilterStatus: value,
    });
  };

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
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
          <Picker
            note
            mode="dropdown"
            style={{ width: 120 }}
            selectedValue={this.state.valueFilterTime}
            onValueChange={this.onValueFilterTimeChange}
          >
            <Picker.Item label="Tất cả" value="0" />
            <Picker.Item label="7 ngày gần đây" value="1" />
            <Picker.Item label="30 ngày gần đây" value="2" />
            <Picker.Item label="Chọn ngày" value="3" />
          </Picker>
        </View>
        <View
          style={{ flex: 1, justifyContent: "flex-end", flexDirection: "row" }}
        >
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
          <View
          // style={{
          //   alignItems: "center",
          //   flexDirection: "row",
          //   justifyContent: "flex-end",
          // }}
          >
            <Picker
              note
              mode="dropdown"
              style={{ width: 140 }}
              selectedValue={this.state.valueFilterStatus}
              onValueChange={this.onValueFilterStatusChange}
            >
              <Picker.Item label="Trạng thái" value="0" />
              <Picker.Item label="Thành công" value="1" />
              <Picker.Item label="Đã xác nhận" value="2" />
              <Picker.Item label="Đã hủy" value="3" />
            </Picker>
          </View>
        </View>
      </View>
    );
  }
}

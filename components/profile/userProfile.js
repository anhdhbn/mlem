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
} from "react-native";

import ItemUserProfile from "./itemUserProfile";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "vietlinh16@coldmail.com",
      phoneNumber: "0123456716",
      dateOfBirth: "01/01/2020",
      adress: "186 Khương Trung, Thanh Xuân, Hà Nội",
    };
  }

  render() {
    return (
      <View>
        <Text style={{ color: "#8A8F9C", marginHorizontal: 10, fontSize: 16 }}>
          Hồ sơ
        </Text>
        <View
          style={{
            // Card
            borderRadius: 6,
            elevation: 3,
            backgroundColor: "#fff",
            shadowOffset: { width: 1, height: 1 },
            shadowColor: "#333",
            shadowOpacity: 0.3,
            shadowRadius: 2,
            marginVertical: 6,
            // Another
            flexDirection: "column",
          }}
        >
          <ItemUserProfile
            icon={require("../../assets/icon/settings.png")}
            title={"Email"}
            body={this.state.email}
          />
          <ItemUserProfile
            icon={require("../../assets/icon/settings.png")}
            title={"Điện thoại"}
            body={this.state.phoneNumber}
          />
          <ItemUserProfile
            icon={require("../../assets/icon/settings.png")}
            title={"Ngày sinh"}
            body={this.state.dateOfBirth}
          />
          <ItemUserProfile
            icon={require("../../assets/icon/settings.png")}
            title={"Địa chỉ"}
            body={this.state.adress}
          />
        </View>
      </View>
    );
  }
}

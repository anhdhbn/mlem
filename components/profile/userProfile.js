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
            icon={require("../../assets/icon/mail-black.png")}
            title={"Email"}
            body={this.props.email}
          />
          <ItemUserProfile
            icon={require("../../assets/icon/smartphone.png")}
            title={"Điện thoại"}
            body={this.props.phoneNumber}
          />
          <ItemUserProfile
            icon={require("../../assets/icon/gift.png")}
            title={"Ngày sinh"}
            body={this.props.dateOfBirth}
          />
          <ItemUserProfile
            icon={require("../../assets/icon/location.png")}
            title={"Địa chỉ"}
            body={this.props.address}
          />
        </View>
      </View>
    );
  }
}

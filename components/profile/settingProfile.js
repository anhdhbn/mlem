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

export default class SettingProfile extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   nameScreen: "",
    // };
  }

  render() {
    return (
      <View>
        <Text style={{ color: "#8A8F9C", marginHorizontal: 10, fontSize: 16 }}>
          Cài đặt
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
            title={"Cài đặt"}
          />
          <ItemUserProfile
            icon={require("../../assets/icon/settings.png")}
            title={"Đổi mật khẩu"}
          />
          <ItemUserProfile
            onPress={this.props._signOut}
            icon={require("../../assets/icon/settings.png")}
            title={"Đăng xuất"}
          />
        </View>
      </View>
    );
  }
}

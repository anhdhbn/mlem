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

import HeaderProfile from "../components/profile/headerProfile";
import UserProfile from "../components/profile/userProfile";
import SettingProfile from "../components/profile/settingProfile";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      urlAvatar:
        "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
      name: "Nguyễn Việt Linh",
    };
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderProfile
            urlAvatar={this.state.urlAvatar}
            name={this.state.name}
          ></HeaderProfile>
          <UserProfile></UserProfile>
          <SettingProfile></SettingProfile>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

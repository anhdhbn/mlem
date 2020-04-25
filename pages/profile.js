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

import profileService from "../services/profileService";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.createParams = this.createParams.bind(this);

    this.state = {
      // response was retured when login
      response: this.props.route.params.response,
      // Add data was responded in response when login.
      data: {
        account_AccountFoodFavorites: this.props.route.params.response
          .account_AccountFoodFavorites,
        address: this.props.route.params.response.address,
        avatar: this.props.route.params.response.avatar,
        displayName: this.props.route.params.response.displayName,
        dob: this.props.route.params.response.dob,
        email: this.props.route.params.response.email,
        errors: this.props.route.params.response.errors,
        expiredTimeCode: this.props.route.params.response.expiredTimeCode,
        id: this.props.route.params.response.id,
        password: this.props.route.params.response.password,
        passwordRecoveryCode: this.props.route.params.response
          .passwordRecoveryCode,
        phone: this.props.route.params.response.phone,
        roleId: this.props.route.params.response.roleId,
        salt: this.props.route.params.response.salt,
        token: this.props.route.params.response.token,
      },
    };
  }

  async get() {
    let response = await profileService.get();
    // console.log("[INFO] Response in profile after GET", response);
  }

  async update() {
    params = this.createParams();
    // console.log("[INFO] Params in profile: ", params);
    let response = await profileService.update(params);
    // console.log("[INFO] Response in profile after UPDATE", response);
  }

  createParams() {
    return this.state.data;
  }

  render() {
    return (
      // console.log("[INFO] Props in profile: ", this.state.response),
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderProfile
            urlAvatar={this.state.urlAvatar}
            name={this.state.name}
          />
          <UserProfile />
          <SettingProfile />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

import React, { Component, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import CheckData from "./checkData";

import { Button } from "react-native-elements";

import LinearGradient from "react-native-linear-gradient";
import styles from "../../styles/authScreen/signUpStyle";

import { LoginButton, AccessToken } from "react-native-fbsdk";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-community/google-signin";
import authServices from "../../customerServices/authServices";
import CTA from "../../components/CTA";
import { Header, ErrorText } from "../../components/shared";
import SnackBar from "../../components/common/snackbarUpdating";
import Notification from "../../providers/Notification/Notification";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navigation: this.props,
      visibleAlert: false,
      emailError: null,
      phoneNumberError: null,
      passwordError: null,
      confirmPasswordError: null,
      comparePasswordError: null,
      notification: null,
      loading: false,
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getSignUpData = this.getSignUpData.bind(this);
  }

  handleEmail(text) {
    this.setState({ email: text });
  }

  handlePhoneNumber(text) {
    this.setState({ phoneNumber: text });
  }

  handlePassword(text) {
    this.setState({ password: text });
  }

  handleConfirmPassword = (text) => {
    this.setState({ confirmPassword: text });
  };

  setLoading(state) {
    this.setState({ loading: state });
  }

  getSignUpData() {
    return {
      email: this.state.email.toString(),
      password: this.state.password.toString(),
      confirmPassword: this.state.password.toString(),
      phone: this.state.phoneNumber.toString(),
    };
  }

  async onSubmit() {
    this.setLoading(true);
    let data = this.getSignUpData();
     console.log(data);
    await authServices
      .createUser(data)
      .then(async res => {
        await this.props.signIn(data, false);
        this.setLoading(false);
      })
      .catch((err) => {
        // console.log("==========================================");
        const message = err;
        console.log("[INFO] message in signUp: ", message);
        /* message.errors.email!=undefined
        ?this.setState({
          notification: message.errors.email 
        })
        :message.errors.phone!= null 
        ? this.setState({
          notification:  message.errors.phone 
        })
        :message.errors.password!=null
        ?this.setState({
          notification: message.errors.password 
        })
        :message.errors.confirmPassword !=null 
        ?this.setState({
          notification:message.errors.confirmPassword
        }):null
        this.setAlert(true);*/
        this.setLoading(false); 
      });


  }

  setEmailError = () => {
    this.setState({ emailError: "Email không hợp lệ" });
  };

  cleanEmailError = () => {
    this.setState({ emailError: null });
  };

  setPhoneNumberError = () => {
    this.setState({ phoneNumberError: "SDT không hợp lệ" });
  };

  cleanPhoneNumberError = () => {
    this.setState({ phoneNumberError: null });
  };

  setPasswordError = () => {
    this.setState({ passwordError: "Mật khẩu không hợp lệ" });
  };

  cleanPasswordError = () => {
    this.setState({ passwordError: null });
  };

  setConfirmPasswordError = () => {
    this.setState({ confirmPasswordError: "Mật khẩu không hợp lệ" });
  };

  cleanConfirmPasswordError = () => {
    this.setState({ confirmPasswordError: null });
  };

  setComparePasswordError = () => {
    this.setState({
      comparePasswordError: "Mật khẩu xác nhận không trùng khớp",
    });
  };

  cleanComparePasswoedError = () => {
    this.setState({ comparePasswordError: null });
  };

  setAlert = (visible) => {
    this.setState({ visibleAlert: visible });
  };

  _onDismissSnackBar = () => {
    this.setState({ visibleAlert: false });
  };

  render() {
    return (
      <LinearGradient colors={["#C9463D", "#26071A"]} style={styles.linear}>
        <SnackBar
          visible={this.state.visibleAlert}
          _onDismissSnackBar={this._onDismissSnackBar}
          actionText="Hide"
          duration={5000}
          text={this.state.notification}
        />
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "white", fontWeight: "bold", marginTop: 10 }}>
            ĐĂNG KÝ
          </Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <View style={{ alignItems: "center", marginTop: 70 }}>
            <Text style={styles.mlem}>Mlem Mlem</Text>
          </View>
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <View>
              <LoginButton
                style={{
                  width: 291,
                  height: 43,
                }}
                onLoginFinished={(error, result) => {
                  if (error) {
                    console.log("login has error: " + result.error);
                  } else if (result.isCancelled) {
                    console.log("login is cancelled.");
                  } else {
                    AccessToken.getCurrentAccessToken().then(async (data) => {
                      console.log(
                        "[INFO] Facebook token: ",
                        data.accessToken.toString()
                      );
                      this.setLoading(true);
                      await this.props.signIn(
                        data.accessToken.toString(),
                        "fb"
                      );
                      this.setLoading(false);
                    });
                  }
                }}
                onLogoutFinished={() => console.log("logout.")}
              />
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              marginTop: 10,
              borderRadius: 20,
              marginBottom: 40,
            }}
          >
            <GoogleSigninButton
              style={{ width: 300, height: 50 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.White}
              onPress={this.signIn}
            />
          </View>

          <KeyboardAvoidingView behavior="padding">
            <View style={{ alignItems: "center" }}>
              {this.state.emailError ? (
                <View>
                  <Text>{this.state.emailError}</Text>
                </View>
              ) : null}
              <View style={styles.viewInput}>
                <Image
                  source={require("../../assets/icon/email.png")}
                  style={styles.image}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Nhập email"
                  placeholderTextColor="#c2bbba"
                  onChangeText={this.handleEmail}
                />
              </View>
              {this.state.phoneNumberError ? (
                <View>
                  <Text>{this.state.phoneNumberError}</Text>
                </View>
              ) : null}
              <View style={styles.viewInput}>
                <Image
                  source={require("../../assets/icon/phone.png")}
                  style={styles.image}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Số điện thoại"
                  placeholderTextColor="#c2bbba"
                  onChangeText={this.handlePhoneNumber}
                />
              </View>
              {this.state.passwordError ? (
                <View>
                  <Text>{this.state.passwordError}</Text>
                </View>
              ) : null}
              <View style={styles.viewInput}>
                <Image
                  source={require("../../assets/icon/key.png")}
                  style={styles.image}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Mật khẩu"
                  placeholderTextColor="#c2bbba"
                  secureTextEntry={true}
                  onChangeText={this.handlePassword}
                />
              </View>
              {this.state.confirmPasswordError ? (
                <View>
                  <Text>{this.state.confirmPasswordError}</Text>
                </View>
              ) : null}
              {this.state.comparePasswordError ? (
                <View>
                  <Text>{this.state.comparePasswordError}</Text>
                </View>
              ) : null}
              <View style={styles.viewInput}>
                <Image
                  source={require("../../assets/icon/key.png")}
                  style={styles.image}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Xác nhận mật khẩu"
                  placeholderTextColor="#c2bbba"
                  secureTextEntry={true}
                  onChangeText={this.handleConfirmPassword}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
          <View style={{ marginTop: 25, alignItems: "center" }}>
            {this.state.loading ? (
              <View style={{ marginTop: 20, alignItems: "center" }}>
                <TouchableOpacity style={styles.submitBtn}>
                  <Button type="clear" loading={true} />
                </TouchableOpacity>
              </View>
            ) : (
                <View style={{ marginTop: 20, alignItems: "center" }}>
                  <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={() => this.onSubmit()}
                  >
                    <Text style={styles.textBtnSubmit}>Đăng ký</Text>
                  </TouchableOpacity>
                </View>
              )}
          </View>
          <View style={styles.footer}>
            <View style={{ flexDirection: "row", marginTop: 60 }}>
              <Text style={{ color: "white", fontSize: 12 }}>
                Bạn đã có tài khoản?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("SignIn")}
              >
                <Text style={styles.textDecoration}> Đăng nhập!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

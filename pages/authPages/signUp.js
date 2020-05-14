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

// For sign up
import authServices from "../../services/authServices";
import CTA from "../../components/CTA";
import { Header, ErrorText } from "../../components/shared";
import SnackBar from "../../components/common/snackbarUpdating";

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

      loading: false,
      email: "test@testInternet.com",
      phoneNumber: "1234567890",
      password: "123456789",
      confirmPassword: "123456789",
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
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
    let checkData = new CheckData();
    if (checkData.checkEmail(this.state.email)) {
      this.cleanEmailError();
      if (checkData.checkPassword(this.state.password)) {
        this.cleanPasswordError();
        if (checkData.checkPassword(this.state.confirmPassword)) {
          this.cleanConfirmPasswordError();
          if (
            checkData.comparePassword(
              this.state.password,
              this.state.confirmPassword
            )
          ) {
            this.cleanComparePasswoedError();
            if (checkData.checkPhoneNumber(this.state.phoneNumber)) {
              this.cleanPhoneNumberError();
              this.setLoading(true);
              let data = this.getSignUpData();
              // console.log(data);

              let response = await authServices
                .createUser(data)
                .catch((reason) => {
                  // console.log("==========================================");
                  const message = reason.response.data;
                  console.log("[INFO] message in signUp: ", message);
                  this.setAlert(true);
                });

              this.setLoading(false);
              this.props.navigation.navigate("SignIn");
            } else {
              // SDT khong hop le
              this.setPhoneNumberError();
            }
          } else {
            // Password khoong giong nhau
            this.setComparePasswordError();
          }
        } else {
          // Confirm Password khoong hop le
          this.setConfirmPasswordError();
        }
      } else {
        // Password khoong hop le
        this.setPasswordError();
      }
    } else {
      // Email khoong hop le
      this.setEmailError();
    }
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
          text={"Thông tin đăng ký bị trùng"}
        />
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "white", fontWeight: "bold" }}>ĐĂNG KÝ</Text>
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={styles.mlem}>Mlem Mlem</Text>
        </View>
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <TouchableOpacity style={styles.fbWay}>
            <Image
              source={require("../../assets/icon/fb.png")}
              style={styles.imgFBGG}
            />
            <Text style={{ paddingRight: 30, color: "white" }}>
              tiếp tục với Facebook
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <TouchableOpacity style={styles.ggWay}>
            <Image
              source={require("../../assets/icon/gg.png")}
              style={styles.imgFBGG}
            />
            <Text style={{ paddingRight: 30, color: "black" }}>
              tiếp tục với Google
            </Text>
          </TouchableOpacity>
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
        {/* <CTA
          title={"Already have an account?"}
          ctaText={"Login"}
          onPress={() => this.props.navigation.navigate("SignIn")}
          style={{ marginTop: 50 }}
        ></CTA> */}
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
      </LinearGradient>
    );
  }
}

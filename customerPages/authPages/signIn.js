import React, { Component, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";

import { Button } from "react-native-elements";

import LinearGradient from "react-native-linear-gradient";
import styles from "../../styles/authScreen/signInStyle";
import SnackBar from "../../components/common/snackbarUpdating";
import CheckData from "./checkData";
// For sign up
import authServices from "../../customerServices/authServices";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props,
      isWrong: false,
      emailError: null,
      passwordError: null,
      loading: false,
      response: null,
      // email: null,
      // password: null,
      email: "vietlinh15@coldmail.com",
      password: "1234567890",
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getSignInData = this.getSignInData.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   // You don't have to do this check first, but it can help prevent an unneeded render
  //   if (nextProps.route.params.isWrong !== this.state.startTime) {
  //     this.setState({ startTime: nextProps.startTime });
  //   }
  // }

  handleEmail(text) {
    this.setState({ email: text });
  }

  handlePassword(text) {
    this.setState({ password: text });
  }

  setLoading(state) {
    this.setState({ loading: state });
  }

  getSignInData() {
    return {
      email: this.state.email.toString(),
      password: this.state.password.toString(),
    };
  }

  // async onSubmit() {
  //   if (this.checkData()) {
  //     this.setLoading(true);
  //     let data = this.getSignInData();
  //     // console.log(data);

  //     let response = await authServices.login(data);
  //     this.setLoading(false);
  //     if (response.token !== null) {
  //       this.props.navigation.navigate("MainBody", { response: response });
  //       // console.log(response);
  //     } else {
  //       Alert.alert("User name or password wrong :(");
  //     }
  //   }
  // }

  setIsWrong = (value) => {
    this.setState({ isWrong: value });
  };

  async onSubmit() {
    let checkData = new CheckData();
    if (checkData.checkEmail(this.state.email)) {
      this.cleanEmailError();
      if (checkData.checkPassword(this.state.password)) {
        this.cleanPasswordError();
        this.setLoading(true);
        let data = this.getSignInData();

        // console.log("[INFO] Props in signIn: ", this.props.navigation);
        console.log("[INFO] Sign in data: ", data);

        let isWrong = await this.props.signIn(data);

        // console.log("[INFO] Return isWrong: ", isWrong);
        this.setIsWrong(isWrong);

        this.setLoading(false);
      } else {
        // Thong bao Pass khong hop le
        this.setPasswordError();
      }
    } else {
      // Thong bao email khong hop le
      this.setEmailError();
    }
  }

  setEmailError = () => {
    this.setState({ emailError: "Email không được để trống" });
  };

  cleanEmailError = () => {
    this.setState({ emailError: null });
  };

  setPasswordError = () => {
    this.setState({ passwordError: "Mật khẩu phải bao gồm tối thiểu 8 ký tự" });
  };

  cleanPasswordError = () => {
    this.setState({ passwordError: null });
  };

  // checkData() {
  //   if (this.state.email === null) {
  //     Alert.alert("Email error");
  //     return false;
  //   }
  //   if (this.state.password === null) {
  //     Alert.alert("Password error");
  //     return false;
  //   }
  //   return true;
  // }

  _onDismissSnackBar = () => {
    console.log("Called on dissmis");
    this.setIsWrong(false);
  };

  render() {
    return (
      <LinearGradient colors={["#C9463D", "#26071A"]} style={styles.linear}>
        {/* <SnackBar
          visible={this.state.isWrong}
          _onDismissSnackBar={this._onDismissSnackBar}
          duration={5000}
          text={"Tên đăng nhập hoặc mật khẩu sai"}
        /> */}
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={{ color: "white", fontWeight: "bold" }}>ĐĂNG NHẬP</Text>
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
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.line}></View>
            <Text style={{ color: "white", fontSize: 11 }}>hoặc</Text>
            <View style={styles.line}></View>
          </View>
        </View>
        {this.state.isWrong ? (
          <View>
            <Text> Tên đăng nhập hoặc mật khẩu sai</Text>
          </View>
        ) : null}
        <KeyboardAvoidingView behavior="padding">
          <View style={{ alignItems: "center" }}>
            {this.state.emailError ? (
              <View>
                <Text> Tên đăng nhập không hợp lệ</Text>
              </View>
            ) : null}
            <View style={styles.viewInput}>
              <Image
                source={require("../../assets/icon/email.png")}
                style={styles.image}
              />
              <TextInput
                style={
                  this.state.isWrong ? styles.textInputWrong : styles.textInput
                }
                placeholder="Email / số điện thoại"
                placeholderTextColor="#c2bbba"
                // defaultValue={this.state.email}
                onChangeText={this.handleEmail}
              />
            </View>
            {this.state.passwordError ? (
              <View>
                <Text> Mật khẩu phải bao gồm tối thiểu 8 ký tự</Text>
              </View>
            ) : null}
            <View style={styles.viewInput}>
              <Image
                source={require("../../assets/icon/key.png")}
                style={styles.image}
              />
              <TextInput
                style={
                  this.state.isWrong ? styles.textInputWrong : styles.textInput
                }
                placeholder="Mật khẩu"
                placeholderTextColor="#c2bbba"
                secureTextEntry={true}
                // defaultValue={this.state.password}
                onChangeText={this.handlePassword}
              />
            </View>
            <View style={{ marginLeft: 120, marginTop: 3 }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("RecoveryPassStep1")
                }
              >
                <Text style={{ color: "white", fontSize: 11 }}>
                  Quên mật khẩu?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
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
              <Text style={styles.textBtnSubmit}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.footer}>
          <View style={{ flexDirection: "row", marginTop: 60 }}>
            <Text style={{ color: "white", fontSize: 12 }}>
              Bạn chưa có tài khoản?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SignUp")}
            >
              <Text style={styles.textDecoration}> Đăng ký ngay!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

export default SignIn;

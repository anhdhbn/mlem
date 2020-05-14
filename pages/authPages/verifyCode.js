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
import LinearGradient from "react-native-linear-gradient";
import CodeInput from "react-native-confirmation-code-input";
import styles from "../../styles/authScreen/verifyCodeStyle";
import authServices from "../../services/authServices";

import { Button } from "react-native-elements";
import CheckData from "./checkData";
import SnackBar from "../../components/common/snackbarUpdating";

class verifyCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props,
      visibleAlert: false,
      error: null,
      loading: false,
      resending: false,
      response: null,
    };

    this.setLoading = this.setLoading.bind(this);
    this.setResending = this.setResending.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this._onFulfill = this._onFulfill.bind(this);
  }

  setLoading(state) {
    this.setState({ loading: state });
  }

  setResending(state) {
    this.setState({ resending: state });
  }

  async onSubmit(code) {
    let isWrongCode = false;
    this.setLoading(true);
    let data = {
      id: this.props.response,
      passwordRecoveryCode: code.toString(),
    };

    let response = await authServices.verifyCode(data).catch((reason) => {
      // console.log("==========================================");
      const message = reason.response.data;
      // console.log("[INFO] message in signUp: ", message);
      this.setAlert(true);
      isWrongCode = true;
    });
    this.setLoading(false);
    // TODO: Handle code incorrect

    if (!isWrongCode) {
      this.props.navigation.navigate("RecoveryPassStep2VerifyCode", {
        id: response,
      });
    }
  }

  setAlert = (visible) => {
    this.setState({ visibleAlert: visible });
  };

  _onDismissSnackBar = () => {
    this.setState({ visibleAlert: false });
  };

  resendVerifyCode() {
    this.setResending(true);
    this.props.onSubmit();
    this.setResending(false);
  }

  _onFulfill(code) {
    // TODO: call API to check code here
    // If code does not match, clear input with: this.refs.codeInputRef1.clear()
    this.onSubmit(code);
    this.refs.codeInputRef2.clear();
  }

  // _onFinishCheckingCode(isValid, code) {
  //   this.props.navigation.navigate("RecoveryPassStep2");
  //   console.log(isValid);
  //   if (!isValid) {
  //     Alert.alert("Confirmation Code", "Code not match!", [{ text: "OK" }], {
  //       cancelable: false,
  //     });
  //   } else {
  //     this.setState({ code });
  //     Alert.alert("Confirmation Code", "Successful!", [{ text: "OK" }], {
  //       cancelable: false,
  //     });
  //   }
  // }
  render() {
    return (
      <>
        <LinearGradient colors={["#C9463D", "#26071A"]} style={styles.linear}>
          <SnackBar
            visible={this.state.visibleAlert}
            _onDismissSnackBar={this._onDismissSnackBar}
            actionText="Hide"
            duration={5000}
            text={"Mã xách thực không khớp"}
          />
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              style={{ flex: 2 }}
              onPress={() => this.props.navigation.navigate("SignIn")}
            >
              <Image
                source={require("../../assets/icon/back.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
            <View
              style={{
                position: "absolute",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  flex: 6,
                  fontSize: 20,
                }}
              >
                Nhập mã xác thực
              </Text>
            </View>
          </View>
          <View
            style={{ alignItems: "center", paddingVertical: 10, marginTop: 30 }}
          >
            <Image
              source={require("../../assets/icon/email.png")}
              style={{
                width: 80,
                height: 80,
              }}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "white" }}>
              Mã xác thực đã được gửi qua Email của bạn.
            </Text>
            <Text style={{ color: "white" }}>
              Vui lòng nhập mã xác thực để lấy lại mật khẩu.
            </Text>
          </View>

          <KeyboardAvoidingView behavior="padding">
            <View style={{ alignItems: "center", paddingBottom: 40 }}>
              <CodeInput
                ref="codeInputRef2"
                keyboardType="numeric"
                codeLength={4}
                className={"border-circle"}
                // compareWithCode="1234"
                autoFocus={false}
                codeInputStyle={{ fontWeight: "800" }}
                onFulfill={(code) => {
                  this._onFulfill(code);
                }}
                onCodeChange={(code) => {
                  this.state.code = code;
                }}
              />
            </View>
          </KeyboardAvoidingView>
          {this.state.resending ? (
            <Text> Resending verifyCode</Text>
          ) : (
            <View style={{ marginTop: 10, alignItems: "center" }}>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={() => this.resendVerifyCode()}
              >
                <Text
                  style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                >
                  Gửi lại mã xác nhận
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{
              marginTop: 10,
              marginBottom: 50,
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SignIn")}
            >
              <Text style={{ color: "white", fontSize: 14 }}>
                Quay lại đăng nhập!
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </>
    );
  }
}

export default verifyCode;

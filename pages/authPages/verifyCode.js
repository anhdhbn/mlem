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
class verifyCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props,
      error: null,
      loading: false,
      response: null,
      // email: null,
      email: "vietlinh15@coldmail.com",
    };

    this.setLoading = this.setLoading.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this._onFulfill = this._onFulfill.bind(this);
  }

  setLoading(state) {
    this.setState({ loading: state });
  }

  async onSubmit(code) {
    this.setLoading(true);
    let data = {
      id: this.props.response,
      passwordRecoveryCode: code.toString(),
    };
    let response = await authServices.verifyCode(data);
    this.setLoading(false);
    this.props.navigation.navigate("VerifyCode", { response });
  }

  _onFulfill(code) {
    // TODO: call API to check code here
    // If code does not match, clear input with: this.refs.codeInputRef1.clear()
    this.onSubmit(code);
    this.refs.codeInputRef1.clear();
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
          <View style={{ marginTop: 10, alignItems: "center" }}>
            <TouchableOpacity style={styles.submitBtn}>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Gửi lại mã xác nhận
              </Text>
            </TouchableOpacity>
          </View>
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

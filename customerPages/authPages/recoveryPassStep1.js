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
import styles from "../../styles/authScreen/recoveryPassStep1Style";
import authServices from "../../customerServices/authServices";

import { Button } from "react-native-elements";
import CheckData from "./checkData";
import SnackBar from "../../components/common/snackbarUpdating";

export default class recoveryPassStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props,
      visibleAlert: false,
      emailError: null,
      loading: false,
      response: null,
      // email: null,
      email: null,
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getData = this.getData.bind(this);
  }

  handleEmail(text) {
    this.setState({ email: text });
  }

  setLoading(state) {
    this.setState({ loading: state });
  }

  getData() {
    return {
      email: this.state.email.toString(),
    };
  }

  async onSubmit() {
    let checkData = new CheckData();
    if (checkData.checkEmail(this.state.email)) {
      this.cleanEmailError();
      let isWrongEmail = false;
      this.setLoading(true);
      let data = this.getData();
      console.log(data);

      let response = await authServices.forgotPassword(data).catch((reason) => {
        // console.log("==========================================");
        const message = reason.response.data;
        // console.log("[INFO] message in signUp: ", message);
        this.setAlert(true);
        isWrongEmail = true;
      });
      this.setLoading(false);
      // TODO: Handle mail incorrect
      // console.log("{INFO] Response in recoveryPassStep1: ", response);
      if (!isWrongEmail) {
        this.props.navigation.navigate("VerifyCode", {
          response: response,
        });
      }
    } else {
      this.setEmailError();
    }
  }

  setEmailError = () => {
    this.setState({ emailError: "Email không hợp lệ" });
  };

  cleanEmailError = () => {
    this.setState({ emailError: null });
  };

  setAlert = (visible) => {
    this.setState({ visibleAlert: visible });
  };

  _onDismissSnackBar = () => {
    this.setState({ visibleAlert: false });
  };

  render() {
    return (
      <>
        <LinearGradient colors={["#C9463D", "#26071A"]} style={styles.linear}>
          <SnackBar
            visible={this.state.visibleAlert}
            _onDismissSnackBar={this._onDismissSnackBar}
            actionText="Hide"
            duration={5000}
            text={"Email không trùng khớp với bất cứ tài khoản nào"}
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
                style={{ width: 8, height: 8 }}
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
                  fontSize: 16,
                }}
              >
                Quên mật khẩu
              </Text>
            </View>
          </View>
          <View style={{ alignItems: "center", marginTop: 80 }}>
            <Text style={styles.mlem}>Mlem Mlem</Text>
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
                  onChangeText={this.handleEmail}
                  placeholder="Email"
                  placeholderTextColor="#c2bbba"
                />
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
            <View style={{ marginTop: 10, alignItems: "center" }}>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={() => this.onSubmit()}
              >
                <Text
                  style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                >
                  Gửi
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{
              marginTop: 10,
              flex: 1,
              justifyContent: "flex-end",
              marginBottom: 90,
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

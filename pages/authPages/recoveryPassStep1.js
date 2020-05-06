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
import authServices from "../../services/authServices";

export default class recoveryPassStep1 extends Component {
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

    this.handleEmail = this.handleEmail.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getData = this.getData.bind(this);
    this.checkData = this.checkData.bind(this);
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
    if (this.checkData()) {
      this.setLoading(true);
      let data = this.getData();
      console.log(data);

      let response = await authServices.forgotPassword(data);
      this.setLoading(false);
      // TODO: Handle mail incorrect
      this.props.navigation.navigate("VerifyCode", {
        response: response,
        onSubmit: this.onSubmit,
      });
    }
  }

  checkData() {
    if (this.state.email === null) {
      Alert.alert("Email error");
      return false;
    }
    if (this.state.password === null) {
      Alert.alert("Password error");
      return false;
    }
    return true;
  }
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
                  fontSize: 16,
                }}
              >
                Quên mật khẩu
              </Text>
            </View>
          </View>
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Text style={styles.mlem}>Mlem Mlem</Text>
          </View>

          <KeyboardAvoidingView behavior="padding">
            <View style={{ alignItems: "center" }}>
              <View style={styles.viewInput}>
                <Image
                  source={require("../../assets/icon/email.png")}
                  style={{
                    width: 20,
                    height: 20,
                    padding: 12,
                    margin: 10,
                    marginLeft: 45,
                  }}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="email / số điện thoại"
                  placeholderTextColor="#c2bbba"
                />
              </View>
            </View>
          </KeyboardAvoidingView>
          {this.state.loading ? (
            <Text>loading</Text>
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
              marginBottom: 50,
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

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
import LinearGradient from "react-native-linear-gradient";
import styles from "../../styles/authScreen/signUpStyle";

// For sign up
import authServices from "../../services/authServices";
import CTA from "../../components/CTA";
import { Header, ErrorText } from "../../components/shared";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navigation: this.props,
      error: null,
      loading: false,
      email: null,
      phoneNumber: null,
      password: null,
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getSignUpData = this.getSignUpData.bind(this);
    this.checkData = this.checkData.bind(this);
  }

  handleEmail(text) {
    this.setState({ email: text });
  }

  handlePhoneNumber(text) {
    this.setState({ phoneNumber: text });
  }

  handlePassword(text) {
    this.setState({ password: text, confirmPassword: text });
  }

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
    if (this.checkData) {
      this.setLoading(true);
      let data = this.getSignUpData();
      console.log(data);

      let response = await authServices.createUser(data);
      this.setLoading(false);
      Alert.alert(
        "Registration Successful",
        response.message,
        [
          {
            text: "OK",
            onPress: () => this.props.navigation.navigate("SignIn"),
          },
        ],
        { cancelable: false }
      );
      // } catch (error) {
      //   setError(error.message);
      //   this.setLoading(false);
      // }
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
    if (this.state.confirmPassword === null) {
      Alert.alert("Confirm password error");
      return false;
    }
    if (this.state.phoneNumber === null) {
      Alert.alert("Phone number error");
      return false;
    }
    return true;
  }

  test() {
    authServices
      .createUser({
        email: "ahihidf@gmail.com",
        password: "ahihi123456",
        confirmPassword: "ahihi123456",
        phone: "0987123457",
      })
      .then((res) => {
        console.log(res);
      });
  }

  render() {
    return (
      <LinearGradient colors={["#C9463D", "#26071A"]} style={styles.linear}>
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
          </View>
        </KeyboardAvoidingView>
        <View style={{ marginTop: 25, alignItems: "center" }}>
          {this.state.loading ? (
            <Text>Loading</Text>
          ) : (
            <TouchableOpacity
              // onPress={() => this.props.navigation.navigate("SignIn")}
              onPress={() => this.onSubmit()}
              style={styles.submitBtn}
            >
              <Text style={styles.textBtnSubmit}>Đăng ký</Text>
            </TouchableOpacity>
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

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
import styles from "../../styles/authScreen/recoveryPassStep2Style";
import authServices from "../../services/authServices";

export default class recoveryPassStep2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navigation: this.props,
      error: null,
      loading: false,
      email: null,
      phoneNumber: null,
      password: null,
      confirmPassword: null,
    };

    this.handlePassword = this.handlePassword.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword(this);
    this.setLoading = this.setLoading.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getData = this.getData.bind(this);
    this.checkData = this.checkData.bind(this);
  }

  handlePassword(text) {
    this.setState({ password: text });
  }

  handleConfirmPassword(text) {
    this.setState({ confirmPassword: text });
  }

  setLoading(state) {
    this.setState({ loading: state });
  }

  getData() {
    return {
      id: this.props.id,
      password: this.state.password.toString(),
      confirmPassword: this.state.password.toString(),
    };
  }

  async onSubmit() {
    if (this.checkData()) {
      this.setLoading(true);
      let data = this.getData();
      console.log(data);

      let response = await authServices.recoveryPass(data);
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
    if (this.state.password === null) {
      Alert.alert("Password error");
      return false;
    }
    if (this.state.confirmPassword === null) {
      Alert.alert("Confirm password error");
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
                Thay đổi mật khẩu
              </Text>
            </View>
          </View>
          <View style={{ alignItems: "center", marginTop: 80 }}>
            <Text style={styles.mlem}>Mlem Mlem</Text>
          </View>

          <KeyboardAvoidingView behavior="padding">
            <View style={{ alignItems: "center" }}>
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
          {loading ? (
            <Text> Sending </Text>
          ) : (
            <View style={{ marginTop: 10, alignItems: "center" }}>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={() => this.onSubmit()}
              >
                <Text
                  style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                >
                  Xác nhận
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

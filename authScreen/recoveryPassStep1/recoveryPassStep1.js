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
import styles from "./style";

export default class recoveryPassStep1 extends Component {
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
                source={require("../../icon/back.png")}
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
                  source={require("../../icon/email.png")}
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
          <View style={{ marginTop: 10, alignItems: "center" }}>
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => this.props.navigation.navigate("VerifyCode")}
            >
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Gửi
              </Text>
            </TouchableOpacity>
          </View>
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

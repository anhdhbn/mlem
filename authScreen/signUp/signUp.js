/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "./style";

export default class SignUp extends Component {
  render() {
    return (
      <LinearGradient colors={["#C9463D", "#26071A"]} style={styles.linear}>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ color: "white", fontWeight: "bold" }}>ĐĂNG KÝ</Text>
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={styles.mlem}>Mlem Mlem</Text>
        </View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <TouchableOpacity style={styles.fbWay}>
            <Image
              source={require("../../icon/fb.png")}
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
              source={require("../../icon/gg.png")}
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
                source={require("../../icon/email.png")}
                style={styles.image}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Nhập email"
                placeholderTextColor="#c2bbba"
              />
            </View>
            <View style={styles.viewInput}>
              <Image
                source={require("../../icon/phone.png")}
                style={styles.image}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Số điện thoại"
                placeholderTextColor="#c2bbba"
              />
            </View>
            <View style={styles.viewInput}>
              <Image
                source={require("../../icon/key.png")}
                style={styles.image}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Mật khẩu"
                placeholderTextColor="#c2bbba"
                secureTextEntry={true}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <View style={{ marginTop: 25, alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SignIn")}
            style={styles.submitBtn}
          >
            <Text style={styles.textBtnSubmit}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={{ color: "white", fontSize: 12 }}>
            Bạn đã có tài khoản?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SignIn")}
          >
            <Text style={styles.textDecoration}> Đăng nhập!</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

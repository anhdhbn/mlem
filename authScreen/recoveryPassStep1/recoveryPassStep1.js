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
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Quên mật khẩu
            </Text>
          </View>
          <View style={{ alignItems: "center", marginTop: 15 }}>
            <Text style={styles.mlem}>Mlem?Mlem</Text>
          </View>

          <KeyboardAvoidingView behavior="padding">
            <View style={{ alignItems: "center" }}>
              <View style={styles.viewInput}>
                <Image
                  source={require("../../icon/envelope.png")}
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
            <TouchableOpacity style={styles.submitBtn}>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Gửi
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 60,
              marginTop: 10,
              marginBottom: 30,
            }}
          >
            <Text style={{ color: "white", fontSize: 12 }}>
              Quay lại đăng nhập
            </Text>
          </View>
        </LinearGradient>
      </>
    );
  }
}

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
import styles from "./style";
class verifyCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
    };
  }

  _onFulfill(code) {
    // TODO: call API to check code here
    // If code does not match, clear input with: this.refs.codeInputRef1.clear()
    if (code == "Q234E") {
      Alert.alert("Confirmation Code", "Successful!", [{ text: "OK" }], {
        cancelable: false,
      });
    } else {
      Alert.alert("Confirmation Code", "Code not match!", [{ text: "OK" }], {
        cancelable: false,
      });

      this.refs.codeInputRef1.clear();
    }
  }

  _onFinishCheckingCode2(isValid, code) {
    console.log(isValid);
    if (!isValid) {
      Alert.alert("Confirmation Code", "Code not match!", [{ text: "OK" }], {
        cancelable: false,
      });
    } else {
      this.setState({ code });
      Alert.alert("Confirmation Code", "Successful!", [{ text: "OK" }], {
        cancelable: false,
      });
    }
  }
  render() {
    return (
      <>
        <LinearGradient colors={["#C9463D", "#26071A"]} style={styles.linear}>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Nhập mã xác thực
            </Text>
          </View>
          <View style={{ alignItems: "center", paddingVertical: 10 }}>
            <Image
              source={require("./asset/envelope.png")}
              style={{
                width: 80,
                height: 80,
              }}
            ></Image>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "white" }}>
              Vui lòng nhập mã xác thực đã được gửi vào thư điện tử
            </Text>
          </View>

          <KeyboardAvoidingView behavior="padding">
            <View style={{ alignItems: "center", paddingBottom: 40 }}>
              <CodeInput
                ref="codeInputRef2"
                keyboardType="numeric"
                codeLength={5}
                className={"border-circle"}
                compareWithCode="12345"
                autoFocus={false}
                codeInputStyle={{ fontWeight: "800" }}
                onFulfill={(isValid, code) =>
                  this._onFinishCheckingCode2(isValid, code)
                }
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

export default verifyCode;

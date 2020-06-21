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

import ItemUserProfile from "./itemUserProfile";
import AsyncStorage from "@react-native-community/async-storage";
import authServices from "../../customerServices/authServices";

export default class SettingProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleCheckState: false,
      visibleAlert: false,
      textAlert: null,
      visibleModalChangePass: false,
      isUploading: false,
      modal: {
        oldPassword: null,
        newPassword: null,
        confirmPassword: null,
      },
    };
  }

  setIsUploading = (value) => {
    this.setState({
      isUploading: value,
    });
  };

  showModalChangePass = () => {
    this.setVisibleModalChangePass(true);
  };

  hideModalChangePass = () => {
    this.setVisibleModalChangePass(false);
  };

  setVisibleModalChangePass = (value) => {
    this.setState({ visibleModalChangePass: value });
  };

  setVisibleCheckState = (value) => {
    this.setState({ visibleCheckState: value });
  };

  onPressChangePass = async () => {
    let typeToken = null;
    try {
      typeToken = await AsyncStorage.getItem("typeToken");
    } catch (error) {}

    if (typeToken === null) {
    } else {
      console.log("[INFO] Type token: ", typeToken);
      if (typeToken == "gg") {
        this.createAlert(
          "Không thể đổi mật khẩu khi đăng nhập bằng tài khoản Google"
        );
      } else {
        this.createAlert(
          "Không thể đổi mật khẩu khi đăng nhập bằng tài khoản Facebook"
        );
      }
    }
  };

  // Cho modal thông báo
  createAlert = (textAlert) => {
    console.log("Create alert");
    this.setState({ textAlert: textAlert }, () => {
      this.setAlert(true);
    });
  };

  setAlert = (visible) => {
    this.setState({ visibleAlert: visible });
  };

  _onDismissSnackBar = () => {
    this.setAlert(false);
  };

  createParams() {
    return {
      // id: this.props.id,
      confirmPassword: this.state.modal.oldPassword.toString(),
      password: this.state.modal.oldPassword.toString(),
      confirmPassword: this.state.modal.oldPassword.toString(),
    };
  }

  _onsubmitModal = () => {
    this.hideModalChangePass();
    let params = this.createParams();
    console.log("[INFO] Params to update password: ", params);
    this.createAlert("Đang cập nhật");
    console.log("Code tiếp phần push params lên đi=========================");
    // await authServices.changePassword(params);
  };

  render() {
    return (
      <View>
        <Overlay
          isVisible={this.state.visibleModalChangePass}
          onBackdropPress={this.hideModalChangePass}
          fullScreen={true}
        >
          <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 25, padding: 10 }}>
                  Cập nhật mật khẩu
                </Text>
              </View>
              <View>
                <Text style={styles.modalItemTitle}>Mật khẩu cũ</Text>
                <Input
                  placeholder="Mật khẩu cũ"
                  onChangeText={(text) => {
                    this.setState({
                      ...this.state,
                      modal: {
                        ...this.state.modal,
                        oldPassword: text,
                      },
                    });
                  }}
                ></Input>
              </View>
              <View>
                <Text style={styles.modalItemTitle}>Mật khẩu mới</Text>
                <Input
                  placeholder="Mật khẩu mới"
                  onChangeText={(text) => {
                    this.setState({
                      ...this.state,
                      modal: {
                        ...this.state.modal,
                        newPassword: text,
                      },
                    });
                  }}
                ></Input>
              </View>
              <View>
                <Text style={styles.modalItemTitle}>Xác nhận mật khẩu mới</Text>
                <Input
                  placeholder="Xác nhận mật khẩu mới"
                  onChangeText={(text) => {
                    this.setState({
                      ...this.state,
                      modal: {
                        ...this.state.modal,
                        confirmPassword: text,
                      },
                    });
                  }}
                ></Input>
              </View>
              <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity onPress={() => this.hideModalChangePass()}>
                    <Image
                      source={require("../../assets/icon/cross.png")}
                      style={{ width: 20, height: 20, marginLeft: 10 }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  <TouchableOpacity onPress={() => this._onsubmitModal()}>
                    <Image
                      source={require("../../assets/icon/submit.png")}
                      style={{ width: 20, height: 20, marginRight: 10 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </Overlay>
        <Snackbar
          visible={this.state.visibleAlert}
          _onDismissSnackBar={this._onDismissSnackBar}
          actionText="Hide"
          duration={3000}
          text={this.state.textAlert}
        />

        <Text style={{ color: "#8A8F9C", marginHorizontal: 10, fontSize: 16 }}>
          Cài đặt
        </Text>
        <View
          style={{
            // Card
            borderRadius: 6,
            elevation: 3,
            backgroundColor: "#fff",
            shadowOffset: { width: 1, height: 1 },
            shadowColor: "#333",
            shadowOpacity: 0.3,
            shadowRadius: 2,
            marginVertical: 6,
            // Another
            flexDirection: "column",
          }}
        >
          {/* <ItemUserProfile
            icon={require("../../assets/icon/settings.png")}
            title={"Cài đặt"}
          /> */}
          <ItemUserProfile
            onPress={this.onPressChangePass}
            icon={require("../../assets/icon/changepass.png")}
            title={"Đổi mật khẩu"}
          />
          <ItemUserProfile
            onPress={this.props._signOut}
            icon={require("../../assets/icon/logout.png")}
            title={"Đăng xuất"}
          />
        </View>
      </View>
    );
  }
}

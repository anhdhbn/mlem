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
import { Input, Overlay } from "react-native-elements";
import Snackbar from "../../components/common/snackbarUpdating";

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
      this.setVisibleModalChangePass(true);
    } else {
      //console.log("[INFO] Type token: ", typeToken);
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
    //console.log("Create alert");
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
      oldPassword: this.state.modal.oldPassword.toString(),
      password: this.state.modal.newPassword.toString(),
      confirmPassword: this.state.modal.confirmPassword.toString(),
    };
  }

  _onsubmitModal = async () => {
    this.hideModalChangePass();
    let params = this.createParams();
    //console.log("[INFO] Params to update password: ", params);
    this.createAlert("Đang cập nhật");

    await authServices.changePassword(params).then(
      (res) => {
        this.createAlert("Cập nhật mật khẩu thành công");
      },
      (err) => {
        this.createAlert("Cập nhật mật khẩu thất bại");
      }
    );
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
              <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <TouchableOpacity onPress={() => this.hideModalChangePass()}>
                  <Image
                    style={{
                      width: 23,
                      height: 23,
                      padding: 10,
                      marginTop: 15,
                    }}
                    source={require("../../assets/icon/back.png")}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    padding: 12,
                    marginLeft: 100,
                  }}
                >
                  Đổi mật khẩu
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
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this._onsubmitModal()}
                    style={{
                      height: 40,
                      width: 90,
                      backgroundColor: "#D20000",
                      borderRadius: 8,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "white",
                        fontWeight: "700",
                      }}
                    >
                      Cập nhật
                    </Text>
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

        <Text
          style={{
            color: "#8A8F9C",
            marginHorizontal: 10,
            fontSize: 16,
            marginBottom: 7,
          }}
        >
          Quản lý
        </Text>
        <View
          style={{
            // Card
            elevation: 3,
            backgroundColor: "#fff",
            flexDirection: "column",
          }}
        >
          <View
            style={{
              height: 40,
              paddingTop: 10,
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              // onPress={this.onPressChangePass}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                  marginLeft: 10,
                  marginRight: 10,
                }}
                source={require("../../assets/icon/settings.png")}
              />
              <Text style={{ fontSize: 14 }}>Cài đặt</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            // Card
            elevation: 3,
            backgroundColor: "#fff",
            flexDirection: "column",
          }}
        >
          <View
            style={{
              height: 40,
              paddingTop: 10,
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={this.onPressChangePass}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                  marginLeft: 10,
                  marginRight: 10,
                }}
                source={require("../../assets/icon/changepass.png")}
              />
              <Text style={{ fontSize: 14 }}>Đổi mật khẩu</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            // Card
            elevation: 3,
            backgroundColor: "#fff",
            flexDirection: "column",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              height: 40,
              paddingTop: 10,
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={this.props._signOut}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                  marginLeft: 10,
                  marginRight: 10,
                }}
                source={require("../../assets/icon/logout.png")}
              />
              <Text style={{ fontSize: 14 }}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalItemTitle: {
    fontWeight: "bold",
    fontSize: 15,
    paddingLeft: 10,
    color: "#8A8F9C",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 8,
  },
  seeAll: {
    marginTop: 8,
    marginRight: 10,
  },
  foodname: {
    fontSize: 11,
  },
  price: {
    fontSize: 9,
    color: "#009FFF",
  },
});

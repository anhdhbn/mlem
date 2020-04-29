import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  Text,
} from "react-native";

// import Form from "react-native-basic-form";
import { Input } from "react-native-elements";

import HeaderProfile from "../components/profile/headerProfile";
import UserProfile from "../components/profile/userProfile";
import SettingProfile from "../components/profile/settingProfile";

import profileService from "../services/profileService";
import style from "../components/slider/style";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.createParams = this.createParams.bind(this);

    this.state = {
      // Modal
      visible: false,
      isLoading: false,
      error: null,
      // response was retured when login
      data: this.props.route.params.response,
      // Add data was responded in response when login.

      // data: {
      //   account_AccountFoodFavorites: this.props.route.params.response
      //     .account_AccountFoodFavorites,
      //   address: this.props.route.params.response.address,
      //   avatar: this.props.route.params.response.avatar,
      //   displayName: this.props.route.params.response.displayName,
      //   dob: this.props.route.params.response.dob,
      //   email: this.props.route.params.response.email,
      //   errors: this.props.route.params.response.errors,
      //   expiredTimeCode: this.props.route.params.response.expiredTimeCode,
      //   id: this.props.route.params.response.id,
      //   password: this.props.route.params.response.password,
      //   passwordRecoveryCode: this.props.route.params.response
      //     .passwordRecoveryCode,
      //   phone: this.props.route.params.response.phone,
      //   roleId: this.props.route.params.response.roleId,
      //   salt: this.props.route.params.response.salt,
      //   token: this.props.route.params.response.token,
      // },
      modal: {
        avatar: null,
        displayName: null,
        email: null,
        phone: null,
        dob: null,
        address: null,
        password: null,
      },
    };
  }

  async get() {
    let response = await profileService.get();
    console.log("[INFO] Response in profile after GET", response);
  }

  async update() {
    let params = this.createParams();
    // console.log("[INFO] Params in profile: ", params);
    let response = await profileService.update(params);
    console.log("[INFO] Response in profile after UPDATE", response);
    return response;
  }

  createParams = () => {
    let data = this.state.data;

    if (this.state.modal.avatar) {
      data.avatar = this.state.modal.avatar;
    }
    if (this.state.modal.displayName) {
      data.displayName = this.state.modal.displayName;
    }
    if (this.state.modal.email) {
      data.email = this.state.modal.email;
    }
    if (this.state.modal.dob) {
      data.dob = this.state.modal.dob;
    }
    if (this.state.modal.phone) {
      data.phone = this.state.modal.phone;
    }
    if (this.state.modal.address) {
      data.address = this.state.modal.address;
    }
    if (this.state.modal.password) {
      data.password = this.state.modal.password;
    }
    return data;
  };

  // For modal
  _showModal = () => this.setState({ visible: true });
  _hideModal = () => this.setState({ visible: false });
  _onsubmitModal = () => {
    this._hideModal();
    this.setState({ isLoading: true });
    this.update().then((response) => {
      this.setState({ data: response, isLoading: false });
    });
  };

  render() {
    return (
      // console.log("[INFO] Props in profile: ", this.state.response),
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderProfile
          avatar={this.state.data.avatar}
          name={this.state.data.displayName}
        />
        <UserProfile
          email={this.state.data.email}
          phoneNumber={this.state.data.phone}
          dateOfBirth={this.state.data.dob}
          address={this.state.data.address}
          onPress={this._showModal}
        />
        <SettingProfile />
        <TouchableOpacity
          onPress={() => {
            this.get();
          }}
        >
          <Text>Get</Text>
        </TouchableOpacity>
        <Modal transparent={true} visible={this.state.visible}>
          <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
            <View
              style={{
                backgroundColor: "#ffffff",
                margin: 50,
                padding: 10,
                borderRadius: 10,
                flex: 1,
              }}
            >
              <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View>
                    <Text
                      style={{ fontWeight: "bold", fontSize: 20, padding: 10 }}
                    >
                      Thay đổi thông tin cá nhân
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.modalItemTitle}>Họ và tên</Text>
                    <Input
                      placeholder="Họ và tên"
                      defaultValue={this.state.data.displayName}
                      onChangeText={(text) => {
                        this.setState({
                          ...this.state,
                          modal: {
                            ...this.state.modal,
                            displayName: text,
                          },
                        });
                      }}
                    ></Input>
                  </View>
                  <View>
                    <Text style={styles.modalItemTitle}>Email</Text>
                    <Input
                      placeholder="Email"
                      disabled={true}
                      defaultValue={this.state.data.email}
                      onChangeText={(text) => {
                        this.setState({
                          ...this.state,
                          modal: {
                            ...this.state.modal,
                            email: text,
                          },
                        });
                      }}
                    ></Input>
                  </View>
                  <View>
                    <Text style={styles.modalItemTitle}>Số điện thoại</Text>
                    <Input
                      placeholder="Số điện thoại"
                      defaultValue={this.state.data.phone}
                      onChangeText={(text) => {
                        this.setState({
                          ...this.state,
                          modal: {
                            ...this.state.modal,
                            phone: text,
                          },
                        });
                      }}
                    ></Input>
                  </View>
                  <View>
                    <Text style={styles.modalItemTitle}>Ngày sinh</Text>
                    <Input
                      placeholder="Ngày sinh"
                      defaultValue={this.state.data.dob}
                      onChangeText={(text) => {
                        this.setState({
                          ...this.state,
                          modal: {
                            ...this.state.modal,
                            dob: text,
                          },
                        });
                      }}
                    ></Input>
                  </View>
                  <View>
                    <Text style={styles.modalItemTitle}>Địa chỉ</Text>
                    <Input
                      placeholder="Địa chỉ"
                      defaultValue={this.state.data.address}
                      onChangeText={(text) => {
                        this.setState({
                          ...this.state,
                          modal: {
                            ...this.state.modal,
                            address: text,
                          },
                        });
                      }}
                    ></Input>
                  </View>
                  <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                    <View style={{ flex: 1 }}>
                      <TouchableOpacity onPress={() => this._hideModal()}>
                        <Image
                          source={require("../assets/icon/cross.png")}
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
                          source={require("../assets/icon/submit.png")}
                          style={{ width: 20, height: 20, marginRight: 10 }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
              </SafeAreaView>
            </View>
          </View>
        </Modal>
      </ScrollView>
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

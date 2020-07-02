import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";

console.disableYellowBox = true;

// import Form from "react-native-basic-form";
import { Input, Overlay } from "react-native-elements";
import { DatePicker } from "native-base";

// import ImagePicker from "react-native-image-picker";
import ImagePicker from "react-native-image-crop-picker";

import HeaderProfile from "../components/profile/headerProfile";
import UserProfile from "../components/profile/userProfile";
import SettingProfile from "../components/profile/settingProfile";

import profileService from "../customerServices/profileService";

import SnackbarUpdating from "../components/common/snackbarUpdating";
import { Snackbar } from "react-native-paper";

import style from "../components/slider/style";
import * as baseRequest from "../customerServices/requests";
import RNFetchBlob from "rn-fetch-blob";

import moment from "moment";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.createParams = this.createParams.bind(this);
    this.postImageWithUrl = this.postImageWithUrl.bind(this);
    // //console.log(props.route.params)
    this.state = {
      // For react-native-image-picker
      options: {
        title: "Select Avatar",
        // customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
        storageOptions: {
          skipBackup: true,
          path: "images",
        },
      },
      // Modal
      visibleAvaModal: false,
      visible: props.route.params.showModal ? true : false,
      isLoading: false,
      error: null,
      // response was retured when login
      data: this.props.route.params.response,
      modal: {
        avatar: null,
        displayName: null,
        email: null,
        phone: null,
        dob: null,
        address: null,
        password: null,
        imageId: null,
      },
    };
  }

  async get() {
    let response = await profileService.get();
  }

  async update() {
    let params = this.createParams();
    //console.log("[INFO] Params in profile: ", params);
    let response = await profileService.update(params);
    return response;
  }

  async postImageWithUrl(url, filename) {
    const host = baseRequest.BASE_API_URL;
    await RNFetchBlob.fetch(
      "POST",
      `${host}/api/image/upload`,
      {
        // dropbox upload headers

        "Content-Type": "multipart/form-data",
        // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
        // Or simply wrap the file path with RNFetchBlob.wrap().
      },
      [
        // element with property `filename` will be transformed into `file` in form data

        {
          name: "file",
          filename: filename,
          data: RNFetchBlob.wrap(url),
        },
        // custom content type
      ]
    )
      .then((res) => {
        let data = JSON.parse(res.data);
        // //console.log(data);
        // //console.log(
        //   "[INFO] Uri image: ",
        //   "http://112.213.88.49:20000" + data.url
        // );

        const imageId = data.id;

        this.setState({
          ...this.state,
          modal: {
            ...this.state.modal,
            // avatar: imageId,
            imageId: imageId,
          },
        });
        //console.log(imageId, this.state.modal.imageId);
      })
      .catch((err) => {
        // error handling ..
        Alert.log("Upload error");
        //console.log(err);
      });
  }

  createParams = () => {
    let data = this.state.data;
    // data.imageId = this.state.modal.imageId;
    if (this.state.modal.imageId) {
      data.imageId = this.state.modal.imageId;
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

  // For Avatar

  // For modal
  _showModal = () => this.setState({ visible: true });
  _hideModal = () => this.setState({ visible: false });

  _onsubmitModal = async () => {
    await this.setState({ isLoading: true });
    this.update().then((response) => {
      //console.log(response);
      this.setState({ data: response, isLoading: false });
    });
    this.setState({ visible: false });
  };

  _setDate = (newDate) => {
    newDate = moment(newDate).add(7, 'hours')
    this.setState({
      ...this.state,
      modal: {
        ...this.state.modal,
        dob: newDate,
      },
    });
    //console.log("ngay sinh:", newDate);
  };

  hanlderAvatar = async (func) => {
    func({
      width: 300,
      height: 300,
      cropping: true,
    }).then(async (image) => {
      // //console.log(image.path)
      // const source = "data:image/jpeg;base64," + image.data;
      this._hideModal();

      const names = image.path.split("/");
      const name = names[names.length - 1];

      this.setState({ isLoading: true });
      this.setState({
        visibleAvaModal: false,
      });
      await this.postImageWithUrl(image.path, name);
      // this.state.modal.imageId = imageId
      this._onsubmitModal();
    });
  };

  _changeAvatar = () => {
    this.setState({
      visibleAvaModal: true,
    });
  };

  _onDismissSnackBar = () => {
    //console.log("[INFO] Ondimiss snackbar");
  };
  render() {
    return (
      // //console.log("[INFO] Props in profile: ", this.state.response),
      <>
        <SnackbarUpdating
          visible={this.state.isLoading}
          _onDismissSnackBar={this._onDismissSnackBar}
          text={"Đang cập nhật"}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderProfile
            avatar={
              this.state.data.image?.url
                ? `${baseRequest.BASE_API_URL}${this.state.data.image?.url}`
                : null
            }
            _changeAvatar={this._changeAvatar}
            _changeInfo={this._showModal}
            name={this.state.data.displayName}
          />
          <UserProfile
            email={this.state.data.email}
            phoneNumber={this.state.data.phone}
            dateOfBirth={
              this.state.data.dob
                ? this.state.data.dob.toString().substr(0, 10)
                : null
            }
            address={this.state.data.address}
            // onPress={this._showModal}
          />
          <View
            style={
              this.state.isLoading
                ? { paddingBottom: 60 }
                : { paddingBottom: 0 }
            }
          >
            <SettingProfile _signOut={this.props.route.params._signOut} />
          </View>
          <Overlay
            isVisible={this.state.visible}
            onBackdropPress={this._hideModal}
            fullScreen={true}
          >
            <SafeAreaView>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                  <TouchableOpacity onPress={() => this._hideModal()}>
                    <Image
                      style={{
                        width: 23,
                        height: 23,
                        padding: 10,
                        marginTop: 15,
                      }}
                      source={require("../assets/icon/back.png")}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 20,
                      padding: 12,
                      marginLeft: 40,
                    }}
                  >
                    Cập nhật thông tin cá nhân
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
                  <DatePicker
                    defaultDate={
                      this.state.data.dob
                        ? new Date(this.state.data.dob)
                        : new Date(1999, 1, 1)
                    }
                    // defaultDate={new Date(1999, 1, 1)}
                    minimumDate={new Date(1970, 1, 1)}
                    maximumDate={new Date(2018, 12, 31)}
                    // locale={"vi"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    format={"YYYY-MM-DD"}
                    placeHolderText="Chọn ngày"
                    textStyle={{ color: "#000" }}
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={this._setDate}
                    disabled={false}
                  />
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
        </ScrollView>
        <Overlay
          visible={this.state.visibleAvaModal}
          onBackdropPress={() => {
            this.setState({ visibleAvaModal: false });
          }}
        >
          <View style={{ height: 100, width: 300, justifyContent: "center" }}>
            <View style={{ height: 40, flexDirection: "row" }}>
              <TouchableOpacity
                style={{ flexDirection: "row", padding: 8 }}
                onPress={() => this.hanlderAvatar(ImagePicker.openCamera)}
              >
                <Image
                  source={require("../assets/icon/camera.png")}
                  style={{ width: 20, height: 20, padding: 10, marginRight: 5 }}
                />
                <Text style={{ fontSize: 16 }}> Chụp ảnh </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity
                style={{ flexDirection: "row", padding: 8 }}
                onPress={() => this.hanlderAvatar(ImagePicker.openPicker)}
              >
                <Image
                  source={require("../assets/icon/lib.png")}
                  style={{ width: 20, height: 20, padding: 10, marginRight: 5 }}
                />
                <Text style={{ fontSize: 16 }}> Chọn ảnh từ album </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Overlay>
      </>
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

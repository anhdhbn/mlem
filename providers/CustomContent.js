import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome";
import { Avatar, Overlay } from "react-native-elements";
import ImagePicker from "react-native-image-crop-picker";

import * as baseRequest from "../customerServices/requests";
import RNFetchBlob from "rn-fetch-blob";
import profileServices from "../providerServices/profileServices";

export default function CustomContent(props) {
  const [
    visibleBackgroundImageModal,
    setVisibleBackgroundImageModal,
  ] = useState(false);

  const [ImageId, setImageId] = useState();
  const [urlImage, setUrlImage] = useState();
  const [data, setData] = useState(props.response);

  const hanlderBackgroundImage = async (func) => {
    func({
      width: 350,
      height: 200,
      cropping: true,
    }).then(async (image) => {
      setVisibleBackgroundImageModal(false);
      const names = image.path.split("/");
      const name = names[names.length - 1];
      // console.log(name)
      // this.setState({ isLoading: true });
      await postImageWithUrl(image.path, name);
      // this._onsubmitModal();
    });
  };

  const postImageWithUrl = async (url, filename) => {
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
        // console.log(data)
        const path = `${baseRequest.BASE_API_URL}${data.url}`;
        // setImageId(data.id)
        setUrlImage(path)
        changeImageId(data.id)
      })
      .catch((err) => {
        // error handling ..
        // Alert.log("Upload error");
        console.log(err);
      });
    }

  const changeImageId = async(id) => {
    data.imageId = id;
    let response = await profileServices.update(data).then(res => {
      console.log(res)
      console.log("Set new data")
      setData(res);
      
    }).catch(err => {
      console.log(err.data)
    });
  }


 
  useEffect(() => {
    console.log("Response after sign in: ", props.response)
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            height: 200,
            top: -6,
            alignContent: "center",
            backgroundColor: "#D20000",
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            position: "relative",
          }}
        >
          <View style={{ position: "absolute" }}>
            <Image
              style={{ width: 350, height: 200 }}
              source={data.image?.url ? {uri: `${baseRequest.BASE_API_URL}${data.image?.url}`} : require("../assets/icon/bia.png")}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              marginLeft: 10,
              marginRight: 20,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
              Thông tin nhà hàng
            </Text>
            <TouchableOpacity>
              <Image
                style={{ width: 21, height: 21 }}
                source={require("../assets/icon/pen-white.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 15, marginTop: 60 }}>
            <View>
              <Avatar
                rounded
                size={70}
                source={require("../assets/icon/mm.png")}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginLeft: 15,
              marginRight: 20,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "white",
              }}
            >
              Mlem Mlem
            </Text>
            <TouchableOpacity
              onPress={() => setVisibleBackgroundImageModal(true)}
            >
              <Image
                style={{ width: 23, height: 23 }}
                source={require("../assets/icon/camera-white.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="home" color="red" size={size} />
          )}
          label="Đơn đặt hàng"
          onPress={() => {
            props.navigation.navigate("Home");
          }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="th-list" color="red" size={size} />
          )}
          label="Thực đơn"
          onPress={() => {
            props.navigation.navigate("Menu");
          }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="credit-card" color="red" size={size} />
          )}
          label="Thanh toán"
          onPress={() => {
            props.navigation.navigate("Payment");
          }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="bell-o" color="red" size={size} />
          )}
          label="Thông báo"
          onPress={() => {
            props.navigation.navigate("Notification");
          }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="bar-chart-o" color="red" size={size} />
          )}
          label="Thống kê"
          onPress={() => {
            props.navigation.navigate("Statistic");
          }}
        />
        <DrawerItem
          style={{ marginTop: 232 }}
          icon={({ color, size }) => (
            <Icon name="sign-out" color="red" size={size} />
          )}
          label="Đăng xuất"
          onPress={() => {
            // console.log("[INFO] sign out props: ", props);
            props.signOut();
          }}
        />
      </DrawerContentScrollView>
      <Overlay
        visible={visibleBackgroundImageModal}
        onBackdropPress={() => setVisibleBackgroundImageModal(false)}
      >
        <View style={{ height: 100, width: 300, justifyContent: "center" }}>
          <View style={{ height: 40, flexDirection: "row" }}>
            <TouchableOpacity
              style={{ flexDirection: "row", padding: 8 }}
              onPress={() => hanlderBackgroundImage(ImagePicker.openCamera)}
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
              onPress={() => hanlderBackgroundImage(ImagePicker.openPicker)}
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
    </View>
  );
}

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
  ImageBackground,
  Dimensions,
} from "react-native";

import { Avatar } from "react-native-elements";

var width = Dimensions.get("window").width;

export default class HeaderProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <View
          style={{
            width: width,
            alignSelf: "center",
            backgroundColor: "#FFFFFF",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,

            elevation: 8,
            //
          }}
        >
          <Avatar
            rounded
            size={150}
            source={
              this.props.avatar
                ? {
                    uri: this.props.avatar,
                  }
                : require("../../assets/icon/user.png")
            }
            // style={{ paddingVertical: 20 }}
            imageProps={(resizeMode = "center")}
            // showAccessory={true}
            // onAccessoryPress={() => {
            //   console.log("[INFO] Press accessoryPress");
            // }}
            onPress={this.props._changeAvatar}
            containerStyle={{ marginVertical: 20 }}
          />
          {/* <View
            style={{
              margin: 30,
              width: 150,
              height: 150,
              borderRadius: 75,
              overflow: "hidden",
              // borderWidth: 3,
              // borderColor: "#FF4040",
              backgroundColor: "#FF4040",
            }}
          >
            <Image
              source={{ uri: this.props.avatar }}
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: "contain",
              }}
              resizeMode="center"
            ></Image>
          </View> */}

          <View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                paddingBottom: 30,
                textAlign: "center",
              }}
            >
              {this.props.name}
            </Text>
          </View>
          <TouchableOpacity></TouchableOpacity>
        </View>
      </>
    );
  }
}

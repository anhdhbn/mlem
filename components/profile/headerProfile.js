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
            imageProps={(resizeMode = "center")}
            onPress={this.props._changeAvatar}
            containerStyle={{ marginVertical: 20 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            height: 50,
            backgroundColor: "#ffffff",
            position: "relative",
            justifyContent: "center",
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            borderBottomWidth: 0.3,
            marginBottom: 8,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {this.props.name}
            </Text>
          </View>
          <TouchableOpacity
            style={{ position: "absolute", right: 30 }}
            onPress={this.props._changeInfo}
          >
            <Image
              style={{ width: 21, height: 21, marginTop: 6 }}
              source={require("../../assets/icon/pen.png")}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

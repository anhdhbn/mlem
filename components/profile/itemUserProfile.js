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

export default class ItemUserProfile extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   nameScreen: "",
    // };
  }

  render() {
    return (
      <View
        style={{
          paddingVertical: 10,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ flex: 2 }}
          source={this.props.icon}
          style={{
            height: 18,
            width: 18,
            marginHorizontal: 10,
          }}
        ></Image>
        {this.props.body === undefined ? (
          <Text
            style={{
              flex: 7,
              textAlign: "left",
              textAlignVertical: "center",
              fontSize: 16,
              color: "#232A2F",
            }}
          >
            {this.props.title}
          </Text>
        ) : (
          <>
            <Text
              style={{
                flex: 3,
                textAlign: "left",
                textAlignVertical: "center",
                fontSize: 16,
                color: "#232A2F",
              }}
            >
              {this.props.title}
            </Text>
            <Text
              style={{
                flex: 11,
                textAlign: "right",
                textAlignVertical: "center",
                marginRight: 10,
                fontSize: 16,
                color: "#8A8F9C",
              }}
            >
              {this.props.body}
            </Text>
          </>
        )}
      </View>
    );
  }
}

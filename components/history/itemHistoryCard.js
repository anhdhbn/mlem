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

export default class ItemHistoryCard extends Component {
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
          borderRadius: 6,
          elevation: 3,
          backgroundColor: "#fff",
          shadowOffset: { width: 1, height: 1 },
          shadowColor: "#333",
          shadowOpacity: 0.3,
          shadowRadius: 2,
          marginVertical: 6,
          //
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text
            style={{
              marginLeft: 7,
              marginVertical: 5,
              fontSize: 20,
              color: "#232A2F",
            }}
          >
            {this.props.dmy}
          </Text>
          <Text
            style={{
              marginLeft: 7,
              marginVertical: 5,
              fontSize: 16,
              color: "#232A2F",
            }}
          >
            {this.props.id}
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text
            style={{
              marginRight: 7,
              marginVertical: 5,
              fontSize: 16,
              color: "#8A8F9C",
              textAlign: "right",
            }}
          >
            {this.props.status}
          </Text>
          <Text
            style={{
              marginRight: 7,
              marginVertical: 5,
              fontSize: 25,
              fontWeight: "bold",
              color: "#232A2F",
              textAlign: "right",
            }}
          >
            {this.props.price}
          </Text>
        </View>
      </View>
    );
  }
}
